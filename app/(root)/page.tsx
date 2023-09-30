import PostCard from "@/components/posts/PostCard";
import { getPosts } from "@/lib/actions/posts.actions";

export default async function Home() {
  const { posts, error } = await getPosts();

  if (error) {
    return <div>Oops! Something went wrong...</div>;
  }

  if (posts?.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-10">Latest posts</h1>
        <div className="flex flex-col gap-8">
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
      </div>
    </div>
  );
}
