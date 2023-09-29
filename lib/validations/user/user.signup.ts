import z from "zod";

export const UserSignupValidation = z
  .object({
    name: z.string().min(3, "Name should be al least 3 characters long!"),
    email: z
      .string()
      .email("You should provide a valid email")
      .min(4, "Email should be al least 3 characters long!"),
    password: z
      .string()
      .min(6, "Password should be al least 6 characters long!"),
    username: z
      .string()
      .min(3, "Username should be al least 3 characters long!"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
