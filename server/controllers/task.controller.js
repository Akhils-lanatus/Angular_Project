import { errorHandler } from "../utils/errorHandler.js";
import { TaskModel } from "../models/task.model.js";
export const postTaskController = async (req, res) => {
  try {
    const { title, description, assignedTo, createdAt, priority, status } =
      req.body;
    const response = await TaskModel.create({
      title,
      description,
      createdAt: new Date(createdAt),
      assignedTo,
      priority,
      status,
    });
    if (response) {
      return res.status(200).json({
        success: true,
        response,
        message: "Task created successfully",
      });
    }

    console.log(title, description, assignedTo, createdAt, priority, status);
  } catch (error) {
    const message = errorHandler(error) || "Internal server error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
