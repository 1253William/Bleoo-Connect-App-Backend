import mongoose, { Schema, Document, Model } from 'mongoose';

export type Comment = Document & {
    authorId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    content: string;
}

const PostSchema: Schema<Comment> = new Schema(
    {
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    }

)

const CommentModel: Model<Comment> = mongoose.model<Comment>('Comment', PostSchema);

export default CommentModel;