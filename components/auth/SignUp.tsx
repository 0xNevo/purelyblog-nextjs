"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { UserSignupValidation } from "@/lib/validations/user/user.signup";
import { Button, TextInput } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserSignupValidation>>({
    resolver: zodResolver(UserSignupValidation),
  });

  const onSubmit = async (values: z.infer<typeof UserSignupValidation>) => {
    try {
      const { email, name, username, password } = values;
      const res = await createUser({ name, username, email, password });

      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Signed up successfully");
      router.push("/auth/signin");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col w-full md:w-1/2 xl:w-1/4 h-full bg-white rounded p-12 border-2 border-gray-200">
      <h1 className="font-bold text-2xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full mt-6"
      >
        <TextInput
          color={errors.name && "failure"}
          id="Name"
          placeholder="Name"
          shadow
          type="text"
          className={`${!errors.name && "mb-4"}`}
          {...register("name")}
        />

        {errors.name && (
          <span className="text-sm italic text-red-500 mt-1 mb-4">
            {errors.name.message}
          </span>
        )}

        <TextInput
          color={errors.username && "failure"}
          id="username"
          placeholder="Username"
          shadow
          type="text"
          className={`${!errors.username && "mb-4"}`}
          {...register("username")}
        />

        {errors.username && (
          <span className="text-sm italic text-red-500 mt-1 mb-4">
            {errors.username.message}
          </span>
        )}

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

        <TextInput
          id="confpassword"
          color={errors.confirm && "failure"}
          placeholder="Confirm Password"
          shadow
          type="password"
          className={`${!errors.confirm && "mb-4"}`}
          {...register("confirm")}
        />

        {errors.confirm && (
          <span className="text-sm italic text-red-500 mt-1 mb-4">
            {errors.confirm.message}
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
          Sign Up
        </Button>

        <div className="ml-auto">
          <Link href={"/auth/signin"} className="text-sm mt-3">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
