"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const TextReveal = ({ 
  children, 
  className,
  height = "auto", // 默认为自动高度
  threshold = 0.2,
  customColors = false,
  activeColor = "text-black dark:text-white",
  inactiveColor = "text-black/20 dark:text-white/20",
  textSize = "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
}) => {
  const targetRef = useRef(null);
  const isInView = useInView(targetRef, {
    once: false,
    threshold
  });
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 20%"]
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div 
      ref={targetRef} 
      className={cn("relative", className)}
      style={{ height }}
    >
      <div className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word 
              key={i} 
              progress={scrollYProgress} 
              range={[start, end]}
              isInView={isInView}
              customColors={customColors}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              textSize={textSize}
            >
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
};

const Word = ({ 
  children, 
  progress, 
  range, 
  isInView,
  customColors,
  activeColor,
  inactiveColor,
  textSize
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className={cn("relative mx-1 lg:mx-1.5", textSize)}>
      <span className={cn("absolute", customColors ? inactiveColor : "opacity-30")}>
        {children}
      </span>
      <motion.span 
        style={{ opacity: opacity }} 
        className={customColors ? activeColor : "text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};
