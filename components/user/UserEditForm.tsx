"use client";

import { updateUser } from "@/lib/actions/user.actions";
import { UserEditValidation } from "@/lib/validations/user/user.edit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import FilterChangedFields from "@/lib/utils/filterChangedFields";
import { uploadOne } from "@/lib/utils/cloudinary";
import MyModal from "../ui/Modal";

type Props = {
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
};

const UserEditForm = ({ name, username, email, image, bio }: Props) => {
  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserEditValidation>>({
    resolver: zodResolver(UserEditValidation),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserEditValidation>) => {
    try {
      const oldValues = { name, username, email, bio, image };
      values.image = image;

      if (preview) {
        const result = await uploadOne({
          file: preview,
          folder: "purelyblog/users",
          public_id: session?.user?.id as string,
        });
        if (typeof result === "string") values.image = result;
      }

      const updatedFields = FilterChangedFields(values, oldValues);

      if (Object.keys(updatedFields).length === 0) {
        toast("No changes were made");
        return;
      }

      const res = await updateUser(session?.user?.id as string, updatedFields);
      if (res?.error) {
        toast.error(res.error);
        return;
      }

      sessionUpdate({
        name: name,
        username: username,
        email: email,
        bio: bio,
      });

      toast.success("User updated successfully");
      router.push(`/users/${updatedFields.username || username}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-4 w-1/2 items-center">
          <Image
            width={225}
            height={225}
            src={preview || image}
            alt={username}
            className="rounded-full h-[225px] w-[225px] object-cover"
          />
          <FileInput
            id="image"
            onChangeCapture={handleImageChange}
            {...register("image")}
          />

          {errors.image && (
            <span className="text-sm italic text-red-500 mt-1 mb-4">
              {errors.image.message as string}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <TextInput
            defaultValue={name}
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
            defaultValue={username}
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
            defaultValue={email}
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
            defaultValue={bio}
            id="bio"
            color={errors.bio && "failure"}
            placeholder="Bio"
            shadow
            type="text"
            className={`${!errors.bio && "mb-4"}`}
            {...register("bio")}
          />
          {errors.bio && (
            <span className="text-sm italic text-red-500 mt-1 mb-4">
              {errors.bio.message}
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
            Save
          </Button>
        </div>
      </div>
      <Button color="failure" onClick={() => setIsOpen(true)}>
        Delete my account
      </Button>
      <MyModal title="test" openModal={isOpen} setOpenModal={setIsOpen}>
        <h1>dfdfdf</h1>
      </MyModal>
    </form>
  );
};

export default UserEditForm;
