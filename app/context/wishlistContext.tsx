"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useGetUser } from "@/lib/queryFunctions";
import Spinner from "../components/defaults/Spinner";
import { toast } from "react-toastify";
import { addToWishList, removeFromWishList } from "../actions/actions";

interface WishlistContextType {
    wishList: string[];
    handleAddToWishList: (gameId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [mount , setMounted] = useState(false);
    const { user, isLoading } = useGetUser();
    const [wishList, setWishList] = 
    useLocalStorageState<string[]>
    ("wishList",user?.data? [...user?.data.wishlist] : []);
    console.log(user);
    

    useEffect(() => {
        setMounted(true);
    }, []);

   const handleAddToWishList = async (gameId: string) => {
  if (!mount) return null;

  const isInWishList = wishList.some((wish) => wish === gameId);

  if (user?.data) {
    try {
      const res = await fetch(isInWishList ? "/api/wishlist/remove" : "/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gameId }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.success);
        // تحديث الـ wishlist من السيرفر بعد العملية
        if (isInWishList) {
          setWishList((prev) => prev.filter((wish) => wish !== gameId));
        } else {
          setWishList((prev) => [...prev, gameId]);
        }
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  } else {
    // fallback في حالة مفيش user
    if (isInWishList) {
      setWishList((prev) => prev.filter((wish) => wish !== gameId));
    } else {
      setWishList((prev) => [...prev, gameId]);
    }
  }
};
if(!mount) return null ;
if (isLoading) return <Spinner/>;
    return (
        <WishlistContext.Provider value={{ wishList, handleAddToWishList }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
