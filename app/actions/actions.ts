"use server";
import User from "../models/user";
import { protect } from "./auth";

export const removeFromWishList = async (gameId: string) => {
    try {
        const result = await protect(); // تغيير من decode إلى result
        
        if (result.error) {
            return { error: result.error };
        }
        
        const user = await User.findById((result.decode as any).id); // استخدام result.decode
        if (!user) return { error: "User not found" };
        
        user.wishlist = user.wishlist.filter((id: string) => id !== gameId);
        await user.save();
        
        return { success: "Removed from wishlist" };
    } catch(error: any) {
        console.error("Remove from wishlist error:", error);
        return { error: "Failed to remove from wishlist", details: error.message };
    }
}


export const addToWishList = async (gameId: string) => {
    try {
        const result = await protect(); // تغيير من decode إلى result
        
        if (result.error) {
            return { error: result.error };
        }
        
        const user = await User.findById((result.decode as any).id); // استخدام result.decode
        if (!user) return { error: "User not found" };
        
        // إزالة اللعبة إذا كانت موجودة ثم إضافتها (لتجنب التكرار)
        user.wishlist = [...user.wishlist.filter((id: string) => id !== gameId), gameId];
        user.wishlist.push(gameId);
        await user.save();
        
        return { success: "Game added to wishlist" }; // تصحيح الرسالة
    } catch(error: any) {
        console.error("Add to wishlist error:", error);
        return { error: "Failed to add to wishlist", details: error.message };
    }
}