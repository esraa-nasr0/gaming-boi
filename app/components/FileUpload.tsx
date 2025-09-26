"use client";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export function FileUploadDemo({
  name,
  onChange,
}: {
  name: string;
  onChange?: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const form = useFormContext();

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    form.setValue(name, files);
    onChange?.(files);
  };

  return (
  <div
  className="w-full min-h-20 flex flex-col items-center justify-center
    rounded-xl border-2 border-dashed border-white/30
    bg-white/5 backdrop-blur-md
    hover:border-pink-400 transition-all duration-300
    shadow-inner"
>
  <FileUpload onChange={handleFileUpload} />

  {files.length > 0 && (
    <p className="text-xs text-gray-300 mt-2">{files[0].name}</p>
  )}
</div>

  );
}
