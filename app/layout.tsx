import type { Metadata } from "next";
import {Open_Sans ,Geist , Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const robotoCondensed = Open_Sans({
  weight:[ "400","600", "700"],
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gaming boy",
  description: "This is a Gaming Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.className} antialiased`}
      >
        <QueryProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000} // 3 ثواني
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark" 
         />
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
