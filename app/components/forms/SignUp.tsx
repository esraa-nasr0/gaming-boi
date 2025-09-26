"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "../nav/FormInput";
import { FileUploadDemo } from "../FileUpload";
import { signup } from "@/app/actions/auth"; 
import { toast } from "react-toastify";

// Validation Schema
const signUpSchema = z
  .object({
    avatar: z.any().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      avatar: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
  if (data.avatar) {
    const formData = new FormData();
    formData.append("file", data.avatar); // الصورة اللي المستخدم اختارها
    formData.append("upload_preset", "ml_default"); // لازم كله small letters

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dveash0km/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        return;
      }
      const uploaded = await res.json();
      data.avatar = {
      source_url: uploaded.secure_url, // <-- لازم يتماشى مع schema
      public_id: uploaded.public_id,
      };
      const response = await signup(data);
      if (response.success) {
          console.log(response.success);
          toast.success(response.success);
          window.location.href = "/login";
        }else{
          console.error(response.error);
              toast.error(response.error);
        }
    } catch (error) {
      console.error("Upload error:", error);
    }
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative">
      {/* Glassy Card */}
      <div
        className="relative z-10 w-full max-w-2xl p-8 rounded-2xl
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_0_30px_rgba(0,0,0,0.3)]"
      >
        {/* Title */}
        <div className="font-semibold my-2 items-center justify-center md:text-2xl lg:text-3xl flex gap-2">
          <h1 className="text-fuchsia-600">Gaming</h1>
          <span className="text-white">Boi</span>
        </div>

        {/* Upload Avatar */}
        <div className="mb-4">
          <FileUploadDemo
            name="avatar"
            onChange={(files) => {
              if (files && files.length > 0) {
                form.setValue("avatar", files[0]);
              }
            }}
          />
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput name="name" label="Name" type="text" />
              <FormInput name="email" label="Email" type="email" />
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput name="password" label="Password" type="password" />
              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12
           bg-purple-600 text-gray-50 font-semibold text-[20px] 
             rounded-[2rem] border-3 border-purple-400 
             shadow-[0_0_12px_#f472b6]   
             transition-all duration-200
             hover:bg-fuchsia-700 
             hover:border-pink-200 
             hover:shadow-[0_0_16px_#fbcfe8] 
             hover:scale-95"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        {/* Messages */}
        {message && (
          <p
            className={`text-center mt-4 ${
              message.type === "error" ? "text-purple-400" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Footer */}
        <p className="text-gray-300 text-center mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => (window.location.href = "/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
