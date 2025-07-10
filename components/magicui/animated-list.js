"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedList = ({
  children,
  className,
  delay = 1000,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {React.Children.map(children, (child, i) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.5,
              delay: isInView ? i * (delay / 10000) : 0,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};