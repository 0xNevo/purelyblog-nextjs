import Button from "@/components/ui/Button";
import UserPosts from "@/components/user/UserPosts";
import { getUser } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { BiEditAlt, BiArchive } from "react-icons/bi";

const page = async ({ params }: { params: { username: string } }) => {
  const { user, error } = await getUser({ username: params.username });
  const session = await getServerSession();

  const isSelf = user?.email === session?.user?.email;

  if (error) {
    toast.error(error);
    return;
  }

  return (
    <div>
      <div className="flex flex-row gap-28 px-10 mb-10">
        <div>
          <Image
            src={user.image}
            width={175}
            height={175}
            alt={user.username}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-xl font-bold">{user.username}</span>
            {isSelf ? (
              <>
                <Button
                  text="Edit profile"
                  bgColor="bg-gray-100"
                  textColor="text-black"
                  icon={<BiEditAlt />}
                  src={`/users/${params.username}/edit`}
                />
                <Button
                  text="Show archive"
                  bgColor="bg-gray-100"
                  textColor="text-black"
                  icon={<BiArchive />}
                />
              </>
            ) : (
              <Button
                text="Follow"
                bgColor="bg-cyan-700"
                textColor="text-white"
              />
            )}
          </div>
          <div className="flex flex-row gap-8 items-center">
            <div>
              <span className="font-bold">0</span> posts
            </div>
            <div>
              <span className="font-bold">0</span> followers
            </div>
            <div>
              <span className="font-bold">0</span> following
            </div>
          </div>
          <div className="text-sm">{user.bio}</div>
        </div>
      </div>
      <hr />
      <UserPosts userId={user._id} />
    </div>
  );
};

export default page;
