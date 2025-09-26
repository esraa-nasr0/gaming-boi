"use client";
import React, { useState } from "react";
import Sidebar from "../components/nav/Sidebar";
import Navbar from "../components/nav/Navbar";
import { WishlistProvider } from "../context/wishlistContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <WishlistProvider>
          <main className="background h-screen overflow-hidden">
            <div className="flex h-full">
              {/* Sidebar */}
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <Navbar onMenuClick={toggleSidebar} />

                <div className="flex-1 overflow-y-auto p-3">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </WishlistProvider>
      </body>
    </html>
  );
}