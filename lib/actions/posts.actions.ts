"use server";

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { deleteOne, uploadOne } from "../utils/cloudinary";

type PostParams = {
  title: string;
  text: string;
  author: string;
  image?: string;
  parentId?: string;
  id?: string;
};

export const savePost = async ({
  id,
  title,
  text,
  image,
  parentId,
  author,
}: PostParams) => {
  try {
    await connectToDB();
    const post = id
      ? await Post.findByIdAndUpdate(id, { title, text, image })
      : await Post.create({ title, text, image, parentId, author });

    if (image) {
      const result = await uploadOne({
        file: image,
        folder: "purelyblog/posts",
        public_id: `${post._id}`,
      });
      if (typeof result === "string") post.image = result;
      await post.save();
    }
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deletePost = async (id: string) => {
  try {
    await connectToDB();
    const post = await Post.findById(id);
    if (post?.image) {
      await deleteOne({
        public_id: post._id,
        folder: "purelyblog/posts",
      });
    }
    await Post.findByIdAndDelete(id);
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const getPosts = async () => {
  try {
    await connectToDB();
    const query = Post.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "author", model: User });

    const posts = await query.exec();
    return { posts };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const getPost = async (id: string) => {
  try {
    await connectToDB();
    const post = await Post.findById(id).populate({
      path: "author",
      model: User,
    });
    return { post };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    await connectToDB();
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", model: User });

    return { posts };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};


export const getPostsByAuthor = async(userId: string) => {
  try {
    await connectToDB();
    const query = Post.find({author: userId})
      .sort({ createdAt: -1 })
      .populate({ path: "author", model: User });

    const posts = await query.exec();
    return { posts };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
}
