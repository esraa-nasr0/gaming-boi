"use server";
import User from "../models/user";
import { protect } from "./auth";
import { Types } from "mongoose";

// تعريف نوع للنتيجة المرجعة من protect
interface ProtectResult {
  error?: string;
  decode?: {
    id: string | Types.ObjectId;
  };
}

export const removeFromWishList = async (gameId: string) => {
  try {
    const result = await protect() as ProtectResult;
    
    if (result.error) {
      return { error: result.error };
    }
    
    if (!result.decode) {
      return { error: "Authentication failed" };
    }
    
    const user = await User.findById(result.decode.id);
    if (!user) return { error: "User not found" };
    
    user.wishlist = user.wishlist.filter((id: string) => id !== gameId);
    await user.save();
    
    return { success: "Removed from wishlist" };
  } catch (error: unknown) {
    console.error("Remove from wishlist error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { error: "Failed to remove from wishlist", details: errorMessage };
  }
}

export const addToWishList = async (gameId: string) => {
  try {
    const result = await protect() as ProtectResult;
    
    if (result.error) {
      return { error: result.error };
    }
    
    if (!result.decode) {
      return { error: "Authentication failed" };
    }
    
    const user = await User.findById(result.decode.id);
    if (!user) return { error: "User not found" };
    
    // إزالة اللعبة إذا كانت موجودة ثم إضافتها (لتجنب التكرار)
    user.wishlist = user.wishlist.filter((id: string) => id !== gameId);
    user.wishlist.push(gameId);
    await user.save();
    
    return { success: "Game added to wishlist" };
  } catch (error: unknown) {
    console.error("Add to wishlist error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { error: "Failed to add to wishlist", details: errorMessage };
  }
}