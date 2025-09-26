import { NextResponse } from "next/server";
import { removeFromWishList } from "@/app/actions/actions";

export async function POST(req: Request) {
  try {
    const { gameId } = await req.json();
    
    if (!gameId) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }
    
    const res = await removeFromWishList(gameId);

    if (res.error) {
      return NextResponse.json({ error: res.error }, { status: 401 });
    }

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}