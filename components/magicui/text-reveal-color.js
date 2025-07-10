"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { motion, useAnimation, useScroll, useTransform, useInView } from "framer-motion";

export function TextRevealColor({
  children,
  className,
  delay = 0,
  threshold = 0.3,
  charDelay = 0.01,
  activeColor = "#000000",
  inactiveColor = "#cccccc",
  fontSize,
  lineHeight,
  staggerOnExit = true,
  exitDuration = 0.2,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    margin: "0px 0px -50px 0px", // 提前触发一点
    once: false // 允许重复触发
  });
  
  // 使用滚动进度来创建平滑过渡
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // 处理文本内容
  const text = children?.toString() || "";
  const characters = Array.from(text);
  
  return (
    <div 
      ref={ref} 
      className={cn("", className)}
      style={{
        fontSize: fontSize,
        lineHeight: lineHeight
      }}
      {...props}
    >
      <div className="relative">
        {characters.map((char, index) => {
          // 为每个字符创建独特的进度值
          const textProgress = useTransform(
            scrollYProgress,
            [0.1, 0.3, 0.5, 0.7],  // 滚动进度值
            [0, 0.3, 1, 1]         // 映射到透明度
          );
          
          return (
            <motion.span
              key={`${index}-${char}`}
              initial={{ color: inactiveColor }}
              animate={{ 
                color: isInView ? activeColor : inactiveColor,
                transition: {
                  duration: 0.3,
                  delay: isInView 
                    ? delay + index * charDelay 
                    : (staggerOnExit ? exitDuration - (index * 0.01) : 0), // 倒序消失
                  ease: [0.33, 1, 0.68, 1]
                }
              }}
              className={char === " " ? "inline-block px-[0.2em]" : "inline-block"}
              style={{
                // 使用滚动进度来增强颜色过渡
                color: isInView ? activeColor : inactiveColor,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
} 