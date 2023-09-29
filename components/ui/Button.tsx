"use client";

import Link from "next/link";

type Props = {
  onClickHandler?: () => void;
  text: string;
  src?: string | null;
  bgColor?: string;
  textColor?: string;
  width?: number | string;
  height?: number | string;
  icon?: JSX.Element | null;
  isActive?: boolean;
};

const MyButton = ({
  onClickHandler,
  text,
  src = null,
  bgColor = "bg-cyan-700",
  textColor = "text-white",
  width = 24,
  height = 12,
  icon = null,
  isActive = true,
}: Props) => {
  if (src === null)
    return (
      <button
        onClick={onClickHandler}
        disabled={!isActive}
        className={`${textColor} ${bgColor} cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed flex flex-row items-center gap-2 py-1 px-2 justify-center rounded-lg customButtonBg w-${width} h-${height} transition`}
      >
        {icon} {text}
      </button>
    );
  return (
    <Link href={src}>
      <button
        onClick={onClickHandler}
        disabled={!isActive}
        className={`${textColor} ${bgColor} cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed flex flex-row items-center gap-2 py-1 px-2 justify-center rounded-lg customButtonBg w-${width} h-${height} transition`}
      >
        {icon} {text}
      </button>
    </Link>
  );
};

export default MyButton;
