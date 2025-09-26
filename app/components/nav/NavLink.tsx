"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  label: string;
  link: string;
  icon: React.ReactElement<{ className?: string }>;
};

function NavLink({
  navLink,
  onClick,
}: {
  navLink: NavItem;
  onClick?: () => void;
}) {
  const { label, link, icon } = navLink;
  const pathName = usePathname();
  const isActive = pathName === link;

  return (
    <Link
      href={link}
      onClick={onClick}
      className={`flex items-center gap-2 p-2 my-2 rounded-md transition-colors duration-200
        ${isActive ? "bg-fuchsia-600 text-white" : "text-gray-200 hover:text-purple-300"}
      `}
    >
      {React.cloneElement(icon, {
        className: `${icon.props.className || ""} w-5 h-5`,
      })}
      <span>{label}</span>
    </Link>
  );
}

export default NavLink;
