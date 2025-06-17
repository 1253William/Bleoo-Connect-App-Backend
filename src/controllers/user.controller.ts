import {Request, Response} from 'express';
import UserModel, { User } from '../models/user.model'
import { AuthRequest } from '../types/authRequest'
require('dotenv').config();

//@route GET /api/v1/status/profile
//@desc Get Data/Profile/Details of Logged-in user
//@access Private
export const userData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: user
        })


    } catch (error) {
        console.log({ message: "Error fetching user data", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}


//@route PUT /api/v1/status/profile
//@desc Update Data/Profile/Details of Logged-in user
//@access Private