import SearchBar from "@/components/shared/SearchBar";
import UserCard from "@/components/user/UserCard";
import { getUsers } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";

const Page = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession();
  const currentUser = session?.user?.email || "";
  const result = await getUsers({
    currentUser,
    searchString: searchParams?.q as string,
  });

  if (result?.error) {
    console.log(result.error);
    return;
  }

  return (
    <div>
      <SearchBar searchType="users" />
      <ul className="my-4 divide-y divide-gray-200 dark:divide-gray-700">
        {result?.results && result?.results > 0 ? (
          result?.users?.map((user) => (
            <li key={user._id} className="py-2 sm:py-4">
              <UserCard
                name={user.name}
                username={user.username}
                email={user.email}
                image={user.image}
              />
            </li>
          ))
        ) : (
          <p className="text-2xl font-bold">No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default Page;
