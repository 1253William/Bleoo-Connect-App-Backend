import mongoose, { Schema, Document, Model } from 'mongoose';

export type Post = Document & {
    author: mongoose.Types.ObjectId;
    text: string;
    media?: {
        url: string;
        type: 'image' | 'video';
    };
    likes: mongoose.Types.ObjectId[]; // users who liked
    reposts: mongoose.Types.ObjectId[]; //users who reposted
    comments: mongoose.Types.ObjectId[];  // optional, populated from CommentModel
    originalPost?: mongoose.Types.ObjectId; // used for reposting

}

const PostSchema: Schema<Post> = new Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        media: {
            url: { type: String },
            type: { type: String, enum: ['image', 'video'] }
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        originalPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    },
    {
        timestamps: true,
    }

)

const PostModel: Model<Post> = mongoose.model<Post>('Post', PostSchema);

export default PostModel;