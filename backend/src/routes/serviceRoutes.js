import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const services = await Service.find({}).sort({ name: 1 });
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch services.", error: error.message });
  }
});

export default router;
