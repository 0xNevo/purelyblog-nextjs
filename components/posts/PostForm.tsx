"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import MyButton from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BiPhotoAlbum } from "react-icons/bi";
import { useState } from "react";
import { PostUpsertValidation } from "@/lib/validations/post/post";
import { savePost } from "@/lib/actions/posts.actions";
import handleImageChange from "@/lib/utils/handleImageChange";

type Props = {
  id?: string;
  image?: string;
  title?: string;
  text?: string;
};

const PostForm = ({ id, image, title, text }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const router = useRouter();

  const anyImage = preview || image;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PostUpsertValidation>>({
    resolver: zodResolver(PostUpsertValidation),
  });

  const onSubmit = async (values: z.infer<typeof PostUpsertValidation>) => {
    try {
      values.image = image || null;
      if (preview) {
        values.image = preview;
      }
      const res = await savePost({ ...values, author: userId, id });
      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Post saved successfully");
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const resetFileInput = () => {
    resetField("image");
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 w-full">
        <div
          className={`bg-gray-200 border-2 rounded-xl p-2 ${
            anyImage ? "h-80" : "h-48"
          } flex flex-row items-center justify-center gap-2`}
        >
          {anyImage ? (
            <Image
              width={225}
              height={225}
              src={anyImage}
              alt="Post image"
              className="rounded object-cover"
            />
          ) : (
            <span className="text-primary">
              <BiPhotoAlbum size={125} className="opacity-50" />
            </span>
          )}

          <div className="flex flex-col gap-1">
            <FileInput
              helperText={`${
                !preview ? "Upload the image to describe your post" : ""
              }`}
              id="image"
              onChangeCapture={(e) =>
                handleImageChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  setPreview
                )
              }
              {...register("image")}
            />
            {preview && (
              <MyButton text="Reset image" onClickHandler={resetFileInput} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <TextInput
            defaultValue={title}
            color={errors.title && "failure"}
            id="title"
            placeholder="Title"
            shadow
            type="text"
            className={`${!errors.title && "mb-4"}`}
            {...register("title")}
          />

          {errors.title && (
            <span className="text-sm italic text-red-500 mb-4">
              {errors.title.message}
            </span>
          )}

          <Textarea
            defaultValue={text}
            rows={10}
            color={errors.text && "failure"}
            id="text"
            placeholder="Tell your story..."
            shadow
            className={`${!errors.text && "mb-4"}`}
            {...register("text")}
          />

          {errors.text && (
            <span className="text-sm italic text-red-500 mb-4">
              {errors.text.message}
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
    </form>
  );
};

export default PostForm;
