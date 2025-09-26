"use client";
import React from "react";
import { motion } from "framer-motion";

const MotionItem = ({
  children,
  className,
  initial,
  animate,
  whileInView,
  exit,
  transition, // أضف هذا
}: {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileInView?: any;
  exit?: any;
  transition?: any; // وأضف النوع هنا
}) => {
  return (
    <motion.div
      initial={initial}
      exit={exit}
      animate={animate}
      whileInView={whileInView}
      transition={transition} // واستخدمه هنا
      className={`${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;