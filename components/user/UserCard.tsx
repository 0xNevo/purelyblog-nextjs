import Image from "next/image";
import Link from "next/link";

type UserCardProps = {
  username: string;
  name: string;
  email: string;
  image: string;
};

const UserCard = ({ username, name, email, image }: UserCardProps) => {
  return (
    <Link href={`/users/${username}`}>
      <div className="flex items-center space-x-4 hover:bg-gray-100 p-2 transition rounded">
        <div className="shrink-0">
          <Image
            alt="Neil image"
            className="rounded-full"
            height="32"
            src={image}
            width="32"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {name} ({username})
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {email}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
