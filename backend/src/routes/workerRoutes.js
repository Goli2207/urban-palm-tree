import express from "express";
import Worker from "../models/Worker.js";
import Service from "../models/Service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { serviceSlug } = req.query;
    const query = {};

    if (serviceSlug) {
      const service = await Service.findOne({ slug: serviceSlug });

      if (!service) {
        return res.status(404).json({ message: "Service not found." });
      }

      query.skills = service._id;
    }

    const workers = await Worker.find(query).populate("skills", "name slug");
    return res.json(workers);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch workers.", error: error.message });
  }
});

export default router;
