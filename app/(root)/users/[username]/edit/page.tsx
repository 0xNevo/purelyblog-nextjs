import UserEditForm from "@/components/user/UserEditForm";
import { getUser } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";

const Page = async ({ params }: { params: { username: string } }) => {
  const result = await getUser({ username: params.username });

  if (result?.error) {
    toast.error(result.error);
    return;
  }
  const { user } = result;
  return (
    <>
      <h1 className="text-2xl font-bold">Edit user {user.username}</h1>
      <UserEditForm
        name={user.name}
        username={user.username}
        email={user.email}
        image={user.image}
        bio={user.bio}
      />
    </>
  );
};

export default Page;
