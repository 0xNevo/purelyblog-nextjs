import z from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const UserEditValidation = z.object({
  name: z
    .string()
    .min(3, "Name should be al least 3 characters long!")
    .max(30, "Name should be less than 50 characters long!"),
  email: z
    .string()
    .email("You should provide a valid email")
    .min(4, "Email should be al least 3 characters long!")
    .max(50, "Email should be less than 50 characters long!"),
  username: z
    .string()
    .min(3, "Username should be al least 3 characters long!")
    .max(20, "Username should be less than 20 characters long!"),
  bio: z.string().max(160, "Bio should be less than 160 characters long!"),
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
