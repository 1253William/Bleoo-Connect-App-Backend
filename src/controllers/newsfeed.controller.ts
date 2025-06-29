import {Request, Response} from "express";
import {AuthRequest} from "../types/authRequest";
import PostModel from "../models/post.model"
import mongoose from "mongoose";

//News Feed Algorithm
//The news feed screen fetches timely or latest updates for events, announcements, posts
//The news feed screen allows the user to make a post, then can edit that post, and delete it.
// - Users can view posts from fellow alumni.
// - Ability to like and comment on posts.
// - Admin panel to create official school updates.

//User Actions to handle in Feed
// - Post: Text, image, or video post with metadata
// - Like: Users can like/unlike a post (store user ID in likes array)
// - Comment: Users can reply to posts, forming threaded conversations
// - Repost: Similar to retweet — show in user’s followers' feeds
// - Follow: Adds user to the following list, updates feed accordingly
// - Feed load: Aggregates posts from the following users + system account (e.g., @AAOBA)

//Feed Composition Logic
//For MVP use Pull Model(fan-in), for Post-MVP use Push Model (fan-out-on-write) and hybrid model
//Pull Model - Fetch posts dynamically from followed users each time.
//Push model (Fan-out-on-write) - When a user posts, push the post to all followers’ feeds.

//### When User Visits Feed:
// 1. Fetch most recent posts from:
//     - `@AAOBA` account (always top).
//     - Users they follow (sorted by `createdAt`).
//     - Reposts from followed users.
//     - Comments/likes on their posts (optional as “engagement updates”).
// const feed = await PostModel.find({
//   $or: [
//     { author: { $in: user.following } },
//     { reposts: user._id }
//   ]
// })
// .sort({ createdAt: -1 })
// .limit(20)
// .populate("author", "fullName profileImage");

//## **Like Action**
// Like/Unlike:
// - Add or remove userId from the post's `likes` array.
// - Optionally send notification to the post's author.

//## **Repost Action**
// - Create a new post with:
// - Increment repost count.
//{
//   author: currentUser._id,
//   originalPost: post._id
// }


//## **Comment Action**
// - Create a new `Comment` doc.
// - Push commentId to `Post.comments[]`.

//- Use Redis to cache the latest feed (per user) for quicker access.
// - Use MongoDB Indexing on `createdAt`, `author`, and `likes`.
// - Paginate using `.limit()` and `.skip()` or cursor-based pagination.

//@route POST /api/v1/feed/posts
//@desc Create a post
//@access Private
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
     try{
         const userId = req.user?.userId;
         if(!userId) {
             res.status(400).json({ success: false, message: "User not found" });
             return;
         }
         const { text, media } = req.body;
         if(!text || !media.url ) {
             res.status(400).json({ success: false, message: "Post must contain text or media" });
             return;
         }

         if(media?.type && !["image", "video"].includes(media.type)) {
             res.status(400).json({ success: false, message: "Media type must be a valid image or video" });
             return;
         }

         const post = await PostModel.create({
             author: new mongoose.Types.ObjectId(userId),
             text: text || "",
             media: media?.url
                ?{
                 url: media.url,
                 type: media.type,
                 }
                :undefined,
         })

         res.status(201).json({
             success: true,
             message: "Post successfully created",
             data: post
         });

     }catch (error) {
         console.log({ message: "Error creating post", error });
         res.status(500).json({ success: false, error: "Internal Server Error" });
         return;
     }
}


//@route POST /api/v1/posts/:id/like
//@desc Like/Unlike a post
//@access Private


//@route POST /api/v1/posts/:id/comment
//@desc Add/Create a comment to a post
//@access Private


//@route POST /api/v1/posts/:postId/repost
//@desc Repost a post
//@access Private


//@route POST /api/v1/posts/feed
//@desc Get feed from followings and public(paginated)
//@access Private

//@route GET /api/v1/posts/:id
//@desc Get a post
//@access Private


//@route PUT /api/v1/posts/:id
//@desc Edit a post
//@access Private


//@route DELETE /api/v1/posts/:id
//@desc Delete a post (Permanent)
//@access Private

