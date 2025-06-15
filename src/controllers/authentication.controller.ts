import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel, { User } from '../models/user.model'
// import { AuthRequest } from '../types/authRequest'
require('dotenv').config();


//JWT
const { ACCESS_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
}


//@route POST /api/v1/auth/register
//@desc Sign Up User (Create User and Hash Password)
//@access Public
export const register = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, userName, email, password, role, isAccountDeleted } = req.body;

        //Validation
        if (!fullName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Full Name, Email, Password are required"
            });
            return
        }

        if(!userName) {
            res.status(400).json({
                success: false,
                message: "Username is required and must be unique"
            });
            return
        }

        if(password.length < 8) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
            return
        }

        //Check for existing username
        const Username = await UserModel.findOne({ userName }) as User;
        if (Username) {
            res.status(400).json({
                success: false,
                message: "Username already taken"
            });
            return
        }

        //Check for existing user
        const existingUser = await UserModel.findOne({ email }) as User;
        if (existingUser) {
            // Restore user's account if it was deleted
            if (existingUser.isAccountDeleted) {
                existingUser.isAccountDeleted = false;
                await existingUser.save();

                res.status(200).json({
                    success: true,
                    message: 'Account restored successfully. Please log in.',
                });
                return;
            }

            res.status(400).json({
                success: false,
                message: 'User already exists, try logging in.',
            });
            return;
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create New User
        const newUser: User = await UserModel.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            userName,
            isAccountDeleted
        });

        //Remove password in response object
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userWithoutPassword
        });

    } catch (error: unknown) {
        console.log({message: "Error signing up user", error: error});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return
    }
}