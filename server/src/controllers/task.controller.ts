import { Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler.js';
import { TaskModel } from '../models/task.model.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserModel } from '../models/useraAuth.model.js';

export const postTaskController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      assignedTo,
      taskCreatedAT,
      priority,
      status,
      email,
    } = req.body;

    const response = await TaskModel.create({
      title,
      description,
      taskCreatedAT: new Date(taskCreatedAT),
      assignedTo,
      priority,
      status,
      email,
    });

    if (response) {
      return res.status(201).json({
        success: true,
        response,
        message: 'Task created successfully',
      });
    }
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const getTaskController = async (req: Request, res: Response) => {
  try {
    const cookieToken = req.headers.authorization?.split(
      'Bearer '
    )[1] as string;
    console.log(cookieToken);
    const verifiedToken = jwt.verify(
      cookieToken,
      process.env.JWT_TOKEN as string
    ) as JwtPayload;

    const response = await TaskModel.aggregate([
      {
        $match: {
          email: verifiedToken.email,
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'email',
          foreignField: 'email',
          as: 'jd',
        },
      },
      {
        $addFields: {
          joinedData: { $arrayElemAt: ['$jd', 0] },
        },
      },
    ]);

    const tasks = response[0]?.jd || null;

    return res.status(200).json({
      success: true,
      response: tasks,
    });
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await TaskModel.findByIdAndDelete(id);

    const message = `${response?.title || 'Task'} deleted successfully`;

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo, taskCreatedAT, priority, status } =
      req.body;
    const { id } = req.params;
    const newDate = new Date(taskCreatedAT);

    const response = await TaskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        assignedTo,
        priority,
        taskCreatedAT: newDate,
      },
      { new: true }
    );

    if (response) {
      return res.status(200).json({
        success: true,
        response,
        message: 'Task updated successfully',
      });
    }
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const getSelectedTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const response = await TaskModel.findById(id);

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
