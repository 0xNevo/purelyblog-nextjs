"use server";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

type createParams = {
  name: string;
  email: string;
  password?: string;
  username: string;
  image?: string;
};

type UpdateParams = {
  name?: string;
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
};

type GetUserParams = {
  email?: string;
  username?: string;
  id?: string;
};

type GetAllUsersParams = {
  currentUser?: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
};

export async function createUser({
  name,
  username,
  email,
  password,
}: createParams) {
  try {
    connectToDB();

    const isExisted = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isExisted) return { error: "Email or username is already used." };

    await User.create({
      name,
      email,
      username,
      password,
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateUser(
  userId: string,
  { name, username, email, bio, image }: UpdateParams
) {
  connectToDB();

  const user = await User.findByIdAndUpdate(userId, {
    name,
    email,
    username,
    bio,
    image,
  });

  if (!user) return { error: "User not found" };

  revalidatePath(`/users/${username}`);
  return { success: true };
}

export async function deleteUser({ email }: { email: string }) {}

export async function getUser(Params: GetUserParams) {
  try {
    connectToDB();

    const user = await User.findOne(Params);

    return { user };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getUsers({
  currentUser,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: GetAllUsersParams) {
  try {
    connectToDB();

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      email: { $ne: currentUser },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
        { email: { $regex: regex } },
      ];
    }

    const usersQuery = User.find(query)
      .sort({ createdAt: sortBy })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("email name username image");

    const users = await usersQuery.exec();

    return { users, results: users.length };
  } catch (err: any) {
    return { error: err.message };
  }
}
