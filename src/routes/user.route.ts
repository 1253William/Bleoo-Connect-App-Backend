import express from "express";
const router = express.Router();
import { userData } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";

/**
 * @swagger
 * /api/v1/status/profile:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get logged-in user
 *     description: Returns the details of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "642fc5365ebf3ab83d7d501a"
 *                     fullName:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "jane@example.com"
 *                     role:
 *                       type: string
 *                       example: "Applicant"
 *                     isAccountDeleted:
 *                        type: boolean
 *                        example: false
 *       401:
 *         description: Unauthorized, missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal Server Error.
 */
//@route GET /api/v1/status/profile
//@desc Get Data/Profile/Details of Logged-in user
//@access public
router.get('/profile', authMiddleware, authorizedRoles("User"), userData);




export default router;

