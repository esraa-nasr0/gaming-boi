"use server";

import { cookies } from "next/headers";
import User from "../models/user";
import connect from "./connect";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


const JWT_EXPIRES = 90 * 60;


const generateToken = async ({ id }: { id: any }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!!, {
    expiresIn: JWT_EXPIRES,
  });
};

export const signup = async (data: any) => {
  try {
    await connect();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // تأكدي إن الايميل مش موجود قبل الإنشاء
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { error: "Email already exists" };
    }

    const user = await User.create({ ...data, password: hashedPassword });
    // const userObj = JSON.parse(JSON.stringify(user));

    return { success: "User created successfully" };
  } catch (err: any) {
    console.log(err);
    return { error: "Error creating user" };
  }
};


export const login = async (data: { email: string; password: string }) => {
  try {
    await connect();
    const cookie = await cookies();
    console.log(data);
    const user = await User.findOne({ email: data.email }).select("+password");
    console.log(user);
    if (!user) {
      return { error: "User not found" };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { error: "Incorrect email or password !" }; //not make them know if it is the password or email
    }
    const userObj = JSON.parse(JSON.stringify(user));
    const token = await generateToken({ id: user._id });
    console.log(token);
   cookie.set("token", token, {
  httpOnly: true,
  maxAge: JWT_EXPIRES,
  sameSite: "lax",  // "lax" يشتغل محلي وعلى البراوزر عادي
  path: "/",
  secure: process.env.NODE_ENV === "production", // يخليها true بس في البروودكشن
});

    return { success: "Login successful", data: { user: userObj, token } };
 
  } catch (error: any) {
    console.log(error);
    return { error: "Login failed", details: error.message };
  }
};
// review game update
export const protect = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    
    if (!token) {
      return { error: "You are not authorized to perform this action" };
    }
    
    const decode = jwt.verify(token, process.env.JWT_SECRET!!);
    
    if (!decode) {
      return { error: "You are not authorized to perform this action" };
    }
    
    return { decode };
  } catch (error) {
    console.error("JWT verification error:", error);
    return { error: "Invalid or expired token" };
  }
};


export const getUser = async () => {
  try {
    await connect();
    
    const result = await protect();
    
    // تحقق إذا كان هناك error في protect
    if (result.error) {
      return { error: result.error };
    }
    
    // الآن decode موجود في result.decode
    const user = await User.findById((result.decode as any).id);
    
    if (!user) {
      return { error: "User not found" };
    }
    
    const userObj = JSON.parse(JSON.stringify(user));
    return { data: userObj };
  } catch (error) {
    console.error("Get user error:", error);
    return { error: "Failed to get user information" };
  }
};


export const logout = async () => {
  try {
    (await cookies()).delete("token");
    return { success: "Logout successful" };
  } catch (error) {
    return { error: "Logout failed" };
  }
};
