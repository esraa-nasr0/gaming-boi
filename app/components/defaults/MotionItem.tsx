"use client";
import React from "react";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";

type MotionItemProps = Omit<MotionProps, "className" | "children"> & {
  children: React.ReactNode;
  className?: string;
};

const MotionItem = ({
  children,
  className,
  initial,
  animate,
  whileInView,
  exit,
  transition,
}: MotionItemProps) => {
  return (
    <motion.div
      initial={initial}
      exit={exit}
      animate={animate}
      whileInView={whileInView}
      transition={transition}
      className={className || ""}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;