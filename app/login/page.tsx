"use client";
import React from 'react'
import Login from '../components/forms/Login'
import { useForm, FormProvider } from "react-hook-form";


function Page() {
    const methods = useForm(); // هنا بننشئ الـ form methods
  
  return (
    <main
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* محتوى الفورم */}
      <div className="relative z-10 w-full max-w-lg px-4">
        <FormProvider {...methods}>
      <Login />
        </FormProvider>
      </div>
    </main>
  )
}

export default Page
