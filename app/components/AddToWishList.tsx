"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import { useWishlist } from "../context/wishlistContext";

function AddToWishList({ gameId, plus }: { gameId: string; plus?: boolean }) {
  const { wishList, handleAddToWishList } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // render placeholder عشان مايحصلش mismatch
    return plus ? <PlusCircle className="opacity-0" /> : <Button disabled>Loading...</Button>;
  }

  const isInWishList = wishList.includes(gameId);

  return (
    plus ? (
      isInWishList ? (
        <XCircle onClick={() => handleAddToWishList(gameId)} />
      ) : (
        <PlusCircle onClick={() => handleAddToWishList(gameId)} />
      )
    ) : (
      <Button className="capitalize" onClick={() => handleAddToWishList(gameId)}>
        {isInWishList ? "Remove from WishList" : "Add to WishList"}
      </Button>
    )
  );
}

export default AddToWishList;
