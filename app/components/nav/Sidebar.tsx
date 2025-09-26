"use client";
import React from "react";
import { FaHome, FaHeart } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUser } from "@/lib/queryFunctions";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/actions/auth";
import { toast } from "react-toastify";
import NavLink from "./NavLink";
import Logo from "../defaults/Logo";

const NAV_LINKS = [
  { label: "Home", link: "/", icon: <FaHome /> },
  { label: "Games", link: "/games", icon: <CgGames /> },
  { label: "Wishlist", link: "/wishlist", icon: <FaHeart /> },
];

type SidebarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

function Sidebar({ open, setOpen }: SidebarProps) {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success(res.success);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } else {
      toast.error(res.error);
    }
    setOpen(false);
  };

  return (
    <>
      {/* Overlay للشاشات الصغيرة */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden z-40 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full w-[240px] transform transition-transform duration-300 ease-in-out
          bg-gradient-to-b from-[#0f0c29]/95 via-[#302b63]/95 to-[#24243e]/95 backdrop-blur-xl border-r border-white/10
          text-gray-100 flex flex-col ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="py-6 px-5 flex flex-col gap-4 h-full">
          <Logo />

          <nav className="flex flex-col gap-3 mt-6">
            {NAV_LINKS.map((navLink, index) => (
              <NavLink 
                key={index} 
                navLink={navLink} 
                onClick={() => setOpen(false)} 
              />
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/20">
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              </div>
            ) : user?.data ? (
              <div className="flex flex-col gap-3">
                <NavLink
                  navLink={{
                    label: "Settings",
                    link: "/settings",
                    icon: <IoSettingsOutline />,
                  }}
                  onClick={() => setOpen(false)}
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-fuchsia-400 hover:text-red-500 hover:bg-white/10 transition-colors"
                >
                  <SlLogout size={20} />
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;