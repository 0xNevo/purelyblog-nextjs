"use client";

import links from "../../constants/links";
import Link from "next/link";
import AvatarDropDown from "../user/AvatarDropDown";
import { usePathname, useRouter } from "next/navigation";

type Link = {
  label: string;
  link: string;
  icon: React.ReactNode;
};

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="hidden md:block sticky left-0 top-0 h-screen text-cyan-900 bg-gray-300 bg-light border-r-2 w-[26rem] border-gray-300">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold text-neutral-800 m-10">PurelyBlog</h1>
        <div className="flex flex-col gap-6 px-10">
          {links.map((link: Link) => {
            const isActive =
              (pathname.includes(link.link) && link.link.length > 1) ||
              pathname === link.link;
            return (
              <Link
                href={link.link}
                key={link.label}
                className="text-lg font-bold"
              >
                <div
                  className={`flex flex-row gap-3 p-2 items-center rounded-lg transition ${
                    isActive
                      ? "text-white bg-cyan-700 hover:bg-cyan-900"
                      : "border-b-[1px] border-gray-300 hover:bg-gray-200 hover:border-gray-100"
                  }`}
                >
                  <span className="text-2xl">{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mx-10 mt-auto mb-10">
          <AvatarDropDown />
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
