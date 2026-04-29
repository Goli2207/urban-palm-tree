import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Worker from "../models/Worker.js";
import { protect } from "../middleware/authMiddleware.js";
import { generateBookingId } from "../utils/generateBookingId.js";
import { generateServiceOtp } from "../utils/generateServiceOtp.js";

const router = express.Router();

const assignWorker = async (serviceId, excludedWorkerIds = []) => {
  const worker = await Worker.findOne({
    skills: serviceId,
    _id: { $nin: excludedWorkerIds },
    isAvailable: true
  }).sort({ rating: -1, experience: -1, updatedAt: 1 });

  return worker;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.post("/", protect, async (req, res) => {
  try {
    const {
      serviceId,
      serviceIds,
      serviceName,
      address,
      preferredDate,
      preferredTime,
      date,
      time,
      issueDescription,
      problemDescription,
      location
    } = req.body;

    const resolvedDate = preferredDate || date;
    const resolvedTime = preferredTime || time;
    const resolvedIssue = issueDescription || problemDescription;
    const requestedServiceIds = Array.isArray(serviceIds)
      ? serviceIds.filter(Boolean)
      : serviceId
        ? [serviceId]
        : [];

    if (
      (!requestedServiceIds.length && !serviceName) ||
      !address ||
      !resolvedDate ||
      !resolvedTime ||
      !resolvedIssue ||
      location?.latitude == null ||
      location?.longitude == null
    ) {
      return res.status(400).json({ message: "Please provide complete booking details." });
    }

    const uniqueServiceIds = [...new Set(requestedServiceIds)];

    if (uniqueServiceIds.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "One or more selected services are invalid." });
    }

    const services = uniqueServiceIds.length
      ? await Service.find({ _id: { $in: uniqueServiceIds } })
      : [
          await Service.findOne({
            name: {
              $regex: `^${escapeRegex(serviceName.trim())}$`,
              $options: "i"
            }
          })
        ].filter(Boolean);

    if (!services.length || (uniqueServiceIds.length && services.length !== uniqueServiceIds.length)) {
      return res.status(404).json({ message: "One or more selected services were not found." });
    }

    const assignedWorkers = [];

    for (const service of services) {
      const worker = await assignWorker(
        service._id,
        assignedWorkers.map((assignedWorker) => assignedWorker._id)
      );

      if (!worker) {
        return res.status(404).json({
          message: `No worker is available for ${service.name}. Please remove it or try again later.`
        });
      }

      assignedWorkers.push(worker);
    }

    const booking = await Booking.create({
      bookingId: generateBookingId(),
      user: req.user._id,
      service: services[0]._id,
      services: services.map((service) => service._id),
      worker: assignedWorkers[0]._id,
      workers: assignedWorkers.map((worker) => worker._id),
      address,
      preferredDate: resolvedDate,
      preferredTime: resolvedTime,
      issueDescription: resolvedIssue,
      location,
      serviceOtp: generateServiceOtp(),
      status: "pending"
    });

    await Worker.updateMany(
      { _id: { $in: assignedWorkers.map((worker) => worker._id) } },
      { $set: { isAvailable: false } }
    );

    const populatedBooking = await Booking.findById(booking._id)
      .populate("service")
      .populate("services")
      .populate("worker", "name phone experience rating")
      .populate("workers", "name phone experience rating")
      .populate("user", "name email");

    return res.status(201).json({
      message: "Booking confirmed successfully.",
      booking: populatedBooking,
      worker: populatedBooking.worker
    });
  } catch (error) {
    return res.status(500).json({ message: "Booking creation failed.", error: error.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service")
      .populate("services")
      .populate("worker", "name phone experience rating")
      .populate("workers", "name phone experience rating")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings.", error: error.message });
  }
});

router.patch("/:bookingId/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["pending", "completed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Please provide a valid booking status." });
    }

    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    booking.status = status;
    await booking.save();

    if (["completed", "cancelled"].includes(status)) {
      const workerIds = booking.workers?.length ? booking.workers : [booking.worker].filter(Boolean);
      await Worker.updateMany({ _id: { $in: workerIds } }, { $set: { isAvailable: true } });
    }

    const populatedBooking = await Booking.findById(booking._id)
      .populate("service")
      .populate("services")
      .populate("worker", "name phone experience rating")
      .populate("workers", "name phone experience rating")
      .populate("user", "name email");

    return res.json({
      message: "Booking status updated successfully.",
      booking: populatedBooking
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking status.", error: error.message });
  }
});

export default router;
