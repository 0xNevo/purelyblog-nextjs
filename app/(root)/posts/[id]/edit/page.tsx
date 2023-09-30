import PostForm from "@/components/posts/PostForm";
import { getPost } from "@/lib/actions/posts.actions";
import toast from "react-hot-toast";

const Page = async ({ params }: { params: { id: string } }) => {
  const { post, error } = await getPost(params.id);

  if (error) {
    toast.error(error);
    return;
  }

  return (
    <PostForm
      title={post.title}
      text={post.text}
      image={post.image}
      id={post.id.toString()}
    />
  );
};

export default Page;
