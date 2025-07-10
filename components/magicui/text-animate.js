"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  blurIn: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  blurInUp: {
    initial: { opacity: 0, filter: "blur(10px)", y: 10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
  },
  wave: {
    initial: { opacity: 0, rotateZ: -5 },
    animate: { opacity: 1, rotateZ: 0 },
  },
};

export const TextAnimate = React.forwardRef(
  (
    {
      children,
      className,
      delay = 0,
      duration = 0.3,
      variants,
      as: Component = "p",
      by = "word",
      startOnView = true,
      once = false,
      animation = "fadeIn",
      ...props
    },
    ref
  ) => {
    const text = React.useMemo(() => {
      if (typeof children !== "string") {
        return { items: [children], isString: false };
      }

      let items = [];
      let isString = true;

      switch (by) {
        case "text":
          items = [children];
          break;
        case "word":
          items = children.split(" ");
          break;
        case "character":
          items = children.split("");
          break;
        case "line":
          items = children.split("\n");
          break;
        default:
          items = [children];
          break;
      }

      return { items, isString };
    }, [children, by]);

    const { items, isString } = text;

    // Support custom animation variants, fall back to preset variants
    const presetVariants = animations[animation] || animations.fadeIn;
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: duration / 4,
          delayChildren: delay,
          when: "beforeChildren"
        },
      },
    };

    const child = variants || {
      hidden: { ...presetVariants.initial },
      visible: {
        ...presetVariants.animate,
        transition: {
          duration,
          ease: "easeOut"
        },
      },
    };

    if (!isString) {
      return (
        <Component ref={ref} className={className} {...props}>
          {children}
        </Component>
      );
    }

    return (
      <Component ref={ref} className={cn(className)} {...props}>
        <motion.span
          initial="hidden"
          animate={startOnView ? undefined : "visible"}
          whileInView={startOnView ? "visible" : undefined}
          viewport={{ once }}
          variants={container}
          style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
        >
          {items.map((item, idx) => (
            <motion.span
              key={idx}
              variants={child}
              style={{
                display: "inline-block",
                whiteSpace: by === "character" ? "pre" : "pre-wrap",
                marginRight: by === "character" ? "0" : "0.3em",
              }}
            >
              {item}
              {by === "word" && idx !== items.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }
);

TextAnimate.displayName = "TextAnimate"; 