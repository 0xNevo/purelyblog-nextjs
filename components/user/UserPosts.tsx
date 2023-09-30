import { getUserPosts } from "@/lib/actions/posts.actions";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiMessageSquareEdit } from "react-icons/bi";
import PostCard from "../posts/PostCard";

const UserPosts = async ({ userId }: { userId: string }) => {
  const { posts, error } = await getUserPosts(userId);

  if (error) {
    toast.error(error);
    return;
  }

  if (posts?.length == 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-10">
        <span className="text-cyan-700">
          <BiMessageSquareEdit size={150} className="opacity-25" />
        </span>
        <span className="text-3xl">Creating posts</span>
        <span className="text-xl">
          After creating the post it will be available on your profile page.
        </span>
        <Link href="/new-post">
          <span className="text-xl text-cyan-700 underline">
            Create your first post
          </span>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-8 my-4">
      {posts?.map((post) => (
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
      ))}
    </div>
  );
};

export default UserPosts;
