import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { IoIosNotificationsOutline, IoIosCreate } from "react-icons/io";
import { BiSolidGroup } from "react-icons/bi";
const links = [
  {
    label: "Home",
    link: "/",
    icon: <AiFillHome />,
  },
  {
    label: "Users",
    link: "/users",
    icon: <AiOutlineUser />,
  },
  {
    label: "Communities",
    link: "/communities",
    icon: <BiSolidGroup />,
  },
  {
    label: "Create",
    link: "/new-post",
    icon: <IoIosCreate />,
  },
  {
    label: "Notifications",
    link: "/notifications",
    icon: <IoIosNotificationsOutline />,
  },
];

export default links;
