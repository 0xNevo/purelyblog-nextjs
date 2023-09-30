import Link from "next/link";

const SavedPosts = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        You haven&#39;t saved any post yet.{" "}
        <Link href="/">
          <span className="text-cyan-700 underline hover:cursor-pointer">
            Go to Posts
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SavedPosts;
