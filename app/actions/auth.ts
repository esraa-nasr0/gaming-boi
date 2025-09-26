"use server";

import { cookies } from "next/headers";
import User from "../models/user";
import connect from "./connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_EXPIRES = 90 * 60;

interface JWTPayload {
  id: string;
}

interface UserData {
  email: string;
  password: string;
  name?: string;
}

// واجهة المستخدم
export interface UserType {
  _id: string;
  email: string;
  name?: string;
  wishlist?: string[];
}

// واجهة الاستجابة
export interface AuthResponse {
  success?: string;
  error?: string;
  data?: { user: UserType; token: string } | UserType;
  decode?: JWTPayload;
  details?: string;
}

interface ProtectResult {
  error?: string;
  decode?: JWTPayload;
}

const generateToken = async ({ id }: JWTPayload): Promise<string> => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: JWT_EXPIRES,
  });
};

// تسجيل مستخدم جديد
export const signup = async (data: UserData): Promise<AuthResponse> => {
  try {
    await connect();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { error: "Email already exists" };
    }

    await User.create({ ...data, password: hashedPassword });
    return { success: "User created successfully" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("SIGNUP_ERROR:", msg);
    return { error: "Error creating user", details: msg };
  }
};


// تسجيل الدخول
export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  try {
    await connect();
    const cookieStore = await cookies();
    
    const user = await User.findOne({ email: data.email }).select("+password");
    
    if (!user) {
      return { error: "User not found" };
    }
    
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { error: "Incorrect email or password!" };
    }
    
    const userObj: UserType = JSON.parse(JSON.stringify(user));
    const token = await generateToken({ id: user._id.toString() });
    
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return { success: "Login successful", data: { user: userObj, token } };
  } catch {
    return { error: "Login failed" };
  }
};

// حماية الصفحات والتحقق من token
export const protect = async (): Promise<ProtectResult> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) return { error: "You are not authorized to perform this action" };
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return { error: "JWT secret not configured" };
    
    const decode = jwt.verify(token, jwtSecret) as JWTPayload;
    if (!decode) return { error: "You are not authorized to perform this action" };
    
    return { decode };
  } catch {
    return { error: "Invalid or expired token" };
  }
};

// الحصول على بيانات المستخدم
export const getUser = async (): Promise<AuthResponse> => {
  try {
    await connect();
    const result = await protect();
    
    if (result.error) return { error: result.error };
    if (!result.decode) return { error: "Authentication failed" };
    
    const user = await User.findById(result.decode.id);
    if (!user) return { error: "User not found" };
    
    const userObj: UserType = JSON.parse(JSON.stringify(user));
    return { data: userObj };
  } catch {
    return { error: "Failed to get user information" };
  }
};

// تسجيل الخروج
export const logout = async (): Promise<AuthResponse> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: "Logout successful" };
  } catch {
    return { error: "Logout failed" };
  }
};