import { Request, Response } from 'express';
import { UserModel } from '../models/useraAuth.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if (!name || !email || !password || !confirm_password) {
      throw new Error('Please fill all fields');
    }
    if (password.trim() !== confirm_password.trim()) {
      throw new Error("Password didn't match");
    }

    await UserModel.findOne({ email });
    //if already registered will show duplicate error - 11000

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    if (!hashedPass) {
      throw new Error('Error in hashing pass');
    }

    const user = await UserModel.create({
      name,
      email,
      password: hashedPass,
    });

    const createdUser = await UserModel.findOne(
      { _id: user._id },
      { name: 1, email: 1, role: 1, _id: 1 }
    );

    if (!createdUser) {
      throw new Error('User registration failed');
    }

    return res.status(201).json({
      success: true,
      message: 'User Registered Successfully',
      response: createdUser,
    });
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const userLoginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('All fields are required');
    }

    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      throw new Error('No such email found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordCorrect) {
      throw new Error('Invalid Credentials');
    }

    const payload = {
      _id: userExist._id,
      role: userExist.role,
      email: userExist.email,
    };

    const tokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;
    const token = await jwt.sign(
      { ...payload, exp: tokenExp },
      process.env.JWT_TOKEN
    );

    return res.status(200).json({
      success: true,
      message: 'Login Successful',
      response: {
        _id: userExist._id,
        email: userExist.email,
        name: userExist.name,
        role: userExist.role,
      },
      _token: token,
      _expiresIn: tokenExp,
    });
  } catch (error) {
    const message = errorHandler(error) || 'Internal server error';
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
