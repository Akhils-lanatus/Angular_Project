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
export const getTaskController = async (req, res) => {
  try {
    const response = await TaskModel.find(
      {},
      {
        updatedAt: 0,
        __v: 0,
      }
    );

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await TaskModel.findByIdAndDelete(id);
    const message = `${
      response?.title ? response.title : "Title"
    } deleted successfully`;

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log(error);
  }
};
