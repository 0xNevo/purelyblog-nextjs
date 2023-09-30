import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 1,
      unique: true,
      trim: true,
      required: true,
      max: 30,
    },
    text: {
      type: String,
      trim: true,
      min: 1,
      max: 2000,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
