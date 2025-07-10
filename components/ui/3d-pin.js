"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 服务器端和客户端通用的基础卡片组件
function BaseCard({ children, className, href, title }) {
  return (
    <a
      href={href || "/"}
      className="relative block"
    >
      <div className="rounded-2xl bg-black border border-white/[0.1] p-4">
        <div className={cn("relative", className)}>{children}</div>
      </div>
    </a>
  );
}

// 客户端专用的3D Pin组件
export function PinContainer({
  children,
  title,
  href,
  className,
  containerClassName,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  // 在服务器端或初始渲染时使用基础卡片
  if (!isMounted) {
    return <BaseCard href={href} title={title} className={className}>{children}</BaseCard>;
  }

  // 客户端渲染后使用完整的3D效果
  return (
    <a
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </a>
  );
}

// 波纹和标题效果组件
export function PinPerspective({ title, href }) {
  return (
    <motion.div className="pointer-events-none w-64 h-56 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-10 flex-none inset-0" >
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
          >
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
            
          }}
          className="absolute left-1/2 top-1/2 ml-[-2.5rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          {/* <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0.5, 0],
              scale: 1,
              z: 0,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 0,
            }}
            className="absolute left-1/2 top-1/2 h-[6rem] w-[6rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          ></motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0.5, 0],
              scale: 1,
              z: 0,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 2,
            }}
            className="absolute  h-[5.5rem] w-[5.5rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          ></motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0.5, 0],
              scale: 1,
              z: 0,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 4,
            }}
            className="absolute  h-[5rem] w-[5rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          ></motion.div> */}

        </div>

        <>
          <motion.div className="absolute left-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-16 group-hover/pin:h-32 blur-[2px]" />
          <motion.div className="absolute left-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-16 group-hover/pin:h-32" />
          <motion.div className="absolute left-1/2 -translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[3px] h-[3px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute left-1/2 -translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[1px] h-[1px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
}
