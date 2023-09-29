export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/new-post",
    "/notifications",
    "/users/:username/edit",
  ],
};
