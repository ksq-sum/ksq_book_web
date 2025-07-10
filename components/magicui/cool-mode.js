"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function CoolMode({
  children,
  className,
  particle = "circle",
  size = 6,
  particleCount = 30,
  speedHorz = 1,
  speedUp = 1,
  ...props
}) {
  const ref = React.useRef(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [particles, setParticles] = React.useState([]);

  // 创建粒子
  const createParticle = (x, y) => {
    return {
      key: Math.random(),
      x,
      y,
      speedHorz: Math.random() * speedHorz * 2 - speedHorz,
      speedUp: Math.random() * speedUp * 2.5 + 0.1,
      angle: Math.random() * 2 * Math.PI,
      spin: Math.random() > 0.5 ? 1 : -1,
      spinSpeed: Math.random() * 0.2 - 0.1,
      ttl: Math.random() * 200 + 100,
      opacity: 1,
      size: Math.random() * size + size / 2,
    };
  };

  // 处理点击事件
  const handleClick = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    // 创建新的粒子
    const newParticles = Array.from({ length: particleCount }, () =>
      createParticle(x, y)
    );

    setParticles((prev) => [...prev, ...newParticles]);
  };

  // 动画循环
  React.useEffect(() => {
    let animationFrame;
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.speedHorz,
            y: p.y - p.speedUp,
            angle: p.angle + p.spinSpeed,
            ttl: p.ttl - 1,
            opacity: p.ttl / 100,
            size: Math.max(0, p.size - 0.1),
          }))
          .filter((p) => p.ttl > 0 && p.size > 0)
      );
      animationFrame = requestAnimationFrame(animate);
    };

    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [particles]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {particles.map((p) => {
        const style = {
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${p.x}px, ${p.y}px) rotate(${p.angle}rad)`,
          opacity: p.opacity,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: particle === "circle" ? "50%" : "0",
          backgroundColor: particle === "circle" ? 
            `hsl(${Math.random() * 60 + 200}, 100%, 70%)` : "transparent",
          backgroundImage:
            particle !== "circle" ? `url(${particle})` : "none",
          backgroundSize: "contain",
          pointerEvents: "none",
        };

        return <div key={p.key} style={style} />;
      })}
    </div>
  );
} 