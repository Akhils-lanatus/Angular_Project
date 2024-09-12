import { errorHandler } from "../utils/errorHandler.js";
import { TaskModel } from "../models/task.model.js";
import mongoose from "mongoose";
export const postTaskController = async (req, res) => {
  try {
    const { title, description, assignedTo, taskCreatedAT, priority, status } =
      req.body;
    const response = await TaskModel.create({
      title,
      description,
      taskCreatedAT: new Date(taskCreatedAT),
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
export const updateTaskController = async (req, res) => {
  try {
    const { title, description, assignedTo, taskCreatedAT, priority, status } =
      req.body;
    const { id } = req.params;
    const newDate = new Date(taskCreatedAT);
    const response = await TaskModel.findByIdAndUpdate(id, {
      title,
      description,
      assignedTo,
      priority,
      taskCreatedAT: newDate,
    });

    if (response) {
      return res.status(200).json({
        success: true,
        response,
        message: "Task Updated successfully",
      });
    }
  } catch (error) {
    const message = errorHandler(error) || "Internal server error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
