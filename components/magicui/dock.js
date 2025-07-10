"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const Dock = ({
  className,
  children,
  magnification = 1.7, 
  distance = 100,
  direction = "bottom",
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  let containerClasses = "flex items-center justify-center gap-2 p-2";
  let dockDirection = "";

  switch (direction) {
    case "top":
      containerClasses = "flex flex-row items-end justify-center gap-2 p-2";
      dockDirection = "top-0";
      break;
    case "bottom":
      containerClasses = "flex flex-row items-start justify-center gap-2 p-2";
      dockDirection = "bottom-0";
      break;
    case "left":
      containerClasses = "flex flex-col items-end justify-center gap-2 p-2";
      dockDirection = "left-0";
      break;
    case "right":
      containerClasses = "flex flex-col items-start justify-center gap-2 p-2";
      dockDirection = "right-0";
      break;
    case "middle":
      containerClasses = "flex flex-row items-center justify-center gap-2 p-2";
      dockDirection = "";
      break;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-full bg-white p-1 shadow-xl dark:bg-black",
        dockDirection,
        containerClasses,
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child, {
          mousePosition,
          isMouseOver,
          containerRef,
          magnification,
          distance,
          direction,
          index,
        });
      })}
    </div>
  );
};

export const DockIcon = ({
  className,
  children,
  mousePosition,
  isMouseOver,
  containerRef,
  magnification = 1.7,
  distance = 100,
  direction = "bottom",
  index,
  ...props
}) => {
  const iconRef = useRef(null);
  const scale = React.useMemo(() => {
    if (!isMouseOver || !iconRef.current || !containerRef.current) return 1;

    const iconRect = iconRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    let distanceToMouse;
    
    if (direction === "left" || direction === "right") {
      // 垂直方向上的距离
      const iconCenter = iconRect.top + iconRect.height / 2 - containerRect.top;
      distanceToMouse = Math.abs(mousePosition.y - iconCenter);
    } else {
      // 水平方向上的距离
      const iconCenter = iconRect.left + iconRect.width / 2 - containerRect.left;
      distanceToMouse = Math.abs(mousePosition.x - iconCenter);
    }

    // 计算缩放比例 (放大倍数根据距离递减)
    const scale = Math.max(
      1,
      magnification - (distanceToMouse / distance) * magnification
    );
    
    return distanceToMouse < distance ? scale : 1;
  }, [mousePosition, isMouseOver, magnification, distance, direction]);

  return (
    <div
      ref={iconRef}
      className={cn("transition-transform duration-200", className)}
      style={{
        transform: `scale(${scale})`,
        zIndex: scale > 1 ? 10 : 1
      }}
      {...props}
    >
      {children}
    </div>
  );
}; 