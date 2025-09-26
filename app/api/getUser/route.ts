// app/api/getUser/route.ts
import { NextResponse } from "next/server";
import { getUser } from "@/app/actions/auth";

export async function GET() {
  const res = await getUser();
  if (res.error) {
    return NextResponse.json({ error: res.error }, { status: 401 });
  }
  return NextResponse.json(res);
}
