"use client";
import { useForm, FormProvider } from "react-hook-form";
import SignUp from "../components/forms/SignUp";


function Page() {
      const methods = useForm(); // هنا بننشئ الـ form methods
  
  return (
    <main
      className="relative h-screen w-full flex items-center min-h-max justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* محتوى الفورم */}
      <div className="relative z-10 w-full max-w-lg px-4">
        <FormProvider {...methods}>
        <SignUp />
        </FormProvider>
      </div>

    </main>
  )
}

export default Page
