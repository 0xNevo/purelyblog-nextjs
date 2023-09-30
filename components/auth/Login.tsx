"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserLoginValidation } from "@/lib/validations/user/user.login";
import { Button, TextInput } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserLoginValidation>>({
    resolver: zodResolver(UserLoginValidation),
  });

  const onSubmit = async (values: z.infer<typeof UserLoginValidation>) => {
    try {
      const { email, password } = values;

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid credentials");
        return;
      }
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const onGitHubSignIn = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center flex-col w-full md:w-1/2 xl:w-1/4 h-full bg-white rounded p-12 border-2 border-gray-200 shadow-2xl">
      <h1 className="font-bold text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full mt-6"
      >
        <TextInput
          id="email"
          color={errors.email && "failure"}
          placeholder="Email"
          shadow
          type="text"
          className={`${!errors.email && "mb-4"}`}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-sm italic text-red-500 mt-1 mb-4">
            {errors.email.message}
          </span>
        )}

        <TextInput
          color={errors.password && "failure"}
          id="password"
          placeholder="Password"
          shadow
          type="password"
          className={`${!errors.password && "mb-4"}`}
          {...register("password")}
        />
        {errors.password && (
          <span className="text-sm italic text-red-500 mt-1 mb-4">
            {errors.password.message}
          </span>
        )}

        <Button
          type="submit"
          variant="primary"
          isProcessing={isSubmitting}
          disabled={isSubmitting}
          processingSpinner={
            <AiOutlineLoading className="h-6 w-6 animate-spin" />
          }
        >
          Login
        </Button>

        <Button onClick={onGoogleSignIn} color="light" className="my-3">
          Sign in with Google
          <span className="flex items-center ml-1 ">
            <FcGoogle size={20} />
          </span>
        </Button>

        <Button onClick={onGitHubSignIn} color="light">
          Sign in with GitHub
          <span className="flex items-center ml-1 ">
            <AiFillGithub size={20} />
          </span>
        </Button>

        <div className="ml-auto">
          <Link href={"/auth/signup"} className="text-sm mt-3">
            Don&#39;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
