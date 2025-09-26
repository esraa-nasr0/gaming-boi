import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { FaXmark } from "react-icons/fa6";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({ onChange }: { onChange?: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-8 group/file block rounded-2xl cursor-pointer w-full relative overflow-hidden bg-gradient-to-br from-sky-50 to-white dark:from-neutral-950 dark:to-neutral-900 shadow-lg"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-200 text-lg">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-500 dark:text-neutral-400 text-sm mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md flex flex-col items-start justify-start md:h-24 p-5 mt-4 max- mx-auto rounded-2xl",
                    "shadow-lg shadow-sky-100 dark:shadow-neutral-800 border border-neutral-200/50 dark:border-neutral-800/50"
                  )}
                >
                  {file.type.startsWith("image/") && (
                    <div className="relative w-32 h-24 rounded-xl overflow-hidden">
                      <Image
                        fill
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-full px-3 py-1 w-fit flex-shrink-0 text-sm bg-sky-100 text-sky-700 dark:bg-neutral-800 dark:text-sky-300 shadow-sm"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(idx);
                      }}
                      className="ml-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaXmark className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                      modified {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-xl z-40 bg-gradient-to-tr from-sky-100 to-sky-50 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center h-24 mt-4 w-full max-w-[9rem] mx-auto rounded-2xl shadow-lg border border-dashed border-sky-300"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <UploadIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <UploadIcon className="h-6 w-6 text-sky-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[10rem] mx-auto rounded-2xl"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  
  return (
    <div className="flex bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-neutral-950 dark:to-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          const bgClass = index % 2 === 0
            ? "bg-white/60 dark:bg-neutral-950"
            : "bg-sky-50 dark:bg-neutral-950 shadow-[0px_0px_1px_2px_rgba(255,255,255,0.8)_inset] dark:shadow-[0px_0px_1px_2px_rgba(0,0,0,0.8)_inset]";
          
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[6px] ${bgClass}`}
            />
          );
        })
      )}
    </div>
  );
}