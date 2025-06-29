import express from 'express';
const router = express.Router();
import { createPost,
        } from "../controllers/newsfeed.controller";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";



//Features of News Feed/Home Screen:
// - User can create, view, edit, delete (permanently to remove media assets) post (text, image, video)
// - A post can get a Like, comment, repost
// - Get feed (paginated) with posts from followings by default AAOBA account which is Admin

//@route POST /api/v1/feed/posts
//@desc Create a new post
//@access private
router.post('/posts', authMiddleware, authorizedRoles("User"), createPost);


export default router;