import mongoose, { Schema } from 'mongoose';
const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    taskCreatedAT: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const TaskModel = mongoose.model('Task', TaskSchema);
