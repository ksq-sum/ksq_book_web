"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";

export function TextReveal({
  children,
  className,
  duration = 0.5,
  delay = 0,
  ease = [0.33, 1, 0.68, 1],
  threshold = 0.2,
  mode = "block",
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // 文本动画变体
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease
      }
    }
  };
  
  // 如果是普通块显示模式
  if (mode === "block") {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeIn}
        >
          {children}
        </motion.div>
      </div>
    );
  }
  
  // 字符逐个显示模式
  if (mode === "chars") {
    const text = children.toString();
    const characters = Array.from(text);
    
    const charVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          delay: delay + i * 0.02, // 每个字符依次显示
          ease
        }
      })
    };
    
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="flex flex-wrap">
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={charVariants}
              className={char === " " ? "inline-block w-[0.3em]" : ""}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }
  
  // 词语逐个显示模式
  if (mode === "words") {
    const text = children.toString();
    const words = text.split(" ");
    
    const wordVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          delay: delay + i * 0.1, // 每个词语依次显示
          ease
        }
      })
    };
    
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="flex flex-wrap">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={wordVariants}
              className="mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }
  
  return <div className={className}>{children}</div>;
}

// 演示组件
export function TextRevealDemo() {
  return (
    <div className="space-y-8">
      <TextReveal mode="block">
        Magic UI will change the way you design.
      </TextReveal>
      
      <TextReveal mode="words" delay={0.2}>
        Beautiful animations that will surprise you.
      </TextReveal>
      
      <TextReveal mode="chars" delay={0.4}>
        Every character comes to life.
      </TextReveal>
    </div>
  );
} 