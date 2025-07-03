const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  startDate: {
    type: String,
    required: [true, "Start date is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(
          value
        );
      },
      message: "Start date must be in DD-MM-YYYY format",
    },
  },
  endDate: {
    type: String,
    required: [true, "End date is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(
          value
        );
      },
      message: "End date must be in DD-MM-YYYY format",
    },
  },
  priority: {
    type: String,
    required: true,
    enum: {
      values: ["High", "Medium", "Low"],
      message: "Priority must be High, Medium, or Low",
    },
    default: "Medium",
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Todo", "InProgress", "Completed"],
      message: "Status must be Todo, InProgress, or Completed",
    },
    default: "Todo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
exports.Task = mongoose.model("Task", taskSchema);
