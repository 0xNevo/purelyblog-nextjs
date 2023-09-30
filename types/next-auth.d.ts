import { DefaultUser, DefaultProfile } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { username: string; isBoarded: boolean };
  }
  interface User extends DefaultUser {
    username: string;
    isBoarded: boolean;
  }

  interface Profile extends DefaultProfile {
    picture: string;
    login: string;
    avatar_url: string;
  }
}
