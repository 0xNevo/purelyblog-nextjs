import PostCard from "@/components/posts/PostCard";
import { getPost } from "@/lib/actions/posts.actions";
import toast from "react-hot-toast";

const Page = async ({ params }: { params: { id: string } }) => {
  const result = await getPost(params.id);

  if (result?.error) {
    toast.error(result.error);
    return;
  }
  const { post } = result;

  return (
    <PostCard
      key={post._id}
      id={post._id.toString()}
      text={post.text}
      title={post.title}
      image={post.image}
      createdAt={post.createdAt}
      authorUsername={post.author.username}
      authorName={post.author.name}
      authorImage={post.author.image}
    />
  );
};

export default Page;
