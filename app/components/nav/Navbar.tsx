"use client";
import React from "react";
import Search from "./Search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetUser } from "@/lib/queryFunctions";
import { Skeleton } from "@/components/ui/skeleton";
import User from "../User";
import { HiMenuAlt3 } from "react-icons/hi";

type NavbarProps = {
  onMenuClick?: () => void;
};

function Navbar({ onMenuClick }: NavbarProps) {
  const { user, isLoading } = useGetUser();

  return (
    <nav className="w-full ">
      <header className="flex items-center justify-between px-4 py-3 md:px-8 gap-4">
        {/* زر القائمة للسيدبار - للشاشات الصغيرة فقط */}
        <button
          onClick={onMenuClick}
          className="lg:hidden bg-white/10 backdrop-blur-lg p-2 rounded-lg text-white shadow-md hover:bg-white/20 transition-colors"
          aria-label="فتح القائمة"
        >
          <HiMenuAlt3 size={24} />
        </button>

        {/* شريط البحث - يأخذ المساحة المتبقية */}
        <div className="flex-1 max-w-2xl mx-4">
          <Search />
        </div>

        {/* قسم المستخدم/تسجيل الدخول */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="hidden md:block space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>
          ) : user?.data ? (
            <User user={user.data} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex w-24 h-10 bg-black/30 text-gray-50 hover:text-fuchsia-400 hover:bg-black/40 transition"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-24 h-10 bg-fuchsia-600 text-white hover:bg-fuchsia-500 transition"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </nav>
  );
}

export default Navbar;