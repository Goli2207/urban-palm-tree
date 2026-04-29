import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
      }
    ],
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true
    },
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true
      }
    ],
    address: {
      type: String,
      required: true,
      trim: true
    },
    preferredDate: {
      type: String,
      required: true
    },
    preferredTime: {
      type: String,
      required: true
    },
    issueDescription: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    serviceOtp: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Booking", bookingSchema);
