import z from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const PostUpsertValidation = z.object({
  title: z
    .string()
    .min(1, "Title should be at least 1 characters long!")
    .max(30, "Title should be less than 50 characters long!"),
  text: z
    .string()
    .min(1, "Content text should be at least 3 characters long!")
    .max(2000, "Content text should be less than 160 characters long!"),
  image: z
    .any()
    .refine((files) => {
      if (files.length === 0) return true;
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((files) => {
      if (files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});
