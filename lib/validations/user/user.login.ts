import z from "zod";

export const UserLoginValidation = z.object({
  email: z
    .string()
    .email("You should provide a valid email")
    .min(3, "Email should be al least 3 characters long!"),
  password: z.string().min(6, "Password should be al least 6 characters long!"),
});
