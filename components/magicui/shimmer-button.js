"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";

export function ShimmerButton({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.8)",
  shimmerSize = "2px",
  borderRadius = "8px",
  shimmerDuration = "2.5s",
  background = "rgba(0, 0, 0, 0.9)",
  href,
  ...props
}) {
  const ButtonComponent = href ? Link : "button";
  const buttonProps = href ? { href } : {};

  return (
    <ButtonComponent
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 font-semibold text-white transition-colors focus:outline-none",
        className
      )}
      style={{
        borderRadius: borderRadius,
        background: background,
      }}
      {...buttonProps}
      {...props}
    >
      {/* 闪光效果容器 */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius }}>
        {/* 顶部闪光 */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: shimmerSize,
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            width: "200%",
            animation: `shimmer-horizontal ${shimmerDuration} linear infinite`,
          }}
        />
        
        {/* 右侧闪光 */}
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{
            width: shimmerSize,
            background: `linear-gradient(180deg, transparent, ${shimmerColor}, transparent)`,
            height: "200%",
            animation: `shimmer-vertical ${shimmerDuration} linear infinite`,
            animationDelay: `${parseFloat(shimmerDuration) * 0.25}s`,
          }}
        />
        
        {/* 底部闪光 */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: shimmerSize,
            background: `linear-gradient(270deg, transparent, ${shimmerColor}, transparent)`,
            width: "200%",
            animation: `shimmer-horizontal-reverse ${shimmerDuration} linear infinite`,
            animationDelay: `${parseFloat(shimmerDuration) * 0.5}s`,
          }}
        />
        
        {/* 左侧闪光 */}
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: shimmerSize,
            background: `linear-gradient(0deg, transparent, ${shimmerColor}, transparent)`,
            height: "200%",
            animation: `shimmer-vertical-reverse ${shimmerDuration} linear infinite`,
            animationDelay: `${parseFloat(shimmerDuration) * 0.75}s`,
          }}
        />
      </div>
      
      <style jsx global>{`
        @keyframes shimmer-horizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes shimmer-horizontal-reverse {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes shimmer-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes shimmer-vertical-reverse {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
      
      <div className="relative z-10">{children}</div>
    </ButtonComponent>
  );
} 