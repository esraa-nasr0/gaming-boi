"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "../nav/FormInput";
import { login } from "@/app/actions/auth";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginSchema = z.infer<typeof loginSchema>;

function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await login(data);

    if (res.error) {
      console.error(res.error);
      toast.error(res.error);
    } else {
      toast.success("Login successful 🎉");

      // مش هنخزن توكن في localStorage خالص
      // الكوكيز اتخزنت أوتوماتيك من السيرفر

      window.location.href = "/"; // redirect بعد النجاح
    }
  };

  return (
    <div
      className="opstacity-0 y-30 bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-3xl p-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-96">
          <div className="font-semibold my-2 items-center justify-center md:text-2xl lg:text-3xl flex gap-2">
            <h1 className="text-fuchsia-600">Gaming</h1>
            <span className="text-white">Boi</span>
          </div>

          <FormInput name="email" label="email" type="email" />
          <FormInput name="password" label="password" type="password" />

          <Button
            type="submit"
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
            Sign In
          </Button>
        </form>
      </Form>

      <p
        className="text-gray-400 text-center mt-4"
        onClick={() => (window.location.href = "/signup")}
      >
        Don't have an account?{" "}
        <span className="text-fuchsia-500 cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
