"use server";
import cloudinary from "cloudinary";

type Params = {
  file: string;
  public_id: string;
  folder: string;
  width?: number;
  height?: number;
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOne = async ({
  file,
  public_id,
  folder,
  width = 800,
  height = 800,
}: Params) => {
  try {
    const result = await cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        folder: folder,
        resource_type: "image",
        width,
        height,
      },
      function (error, result) {
        if (error) return error;
        return result?.secure_url;
      }
    );
    return result?.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export const deleteOne = async ({
  folder,
  public_id,
}: {
  folder: string;
  public_id: string;
}) => {
  cloudinary.v2.uploader.destroy(`${folder}/${public_id}`);
};
