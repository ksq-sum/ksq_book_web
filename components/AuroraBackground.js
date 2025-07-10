import React, { useEffect, useRef } from 'react';
import styles from '../styles/AuroraBackground.module.scss';

const AuroraBackground = ({ 
  colors = ["#3B82F6", "#8B5CF6", "#EC4899"],
  blur = 30,
  speed = "slow",
  size = "large"
}) => {
  const canvasRef = useRef(null);
  const speedFactor = speed === "slow" ? 0.001 : speed === "medium" ? 0.002 : 0.003;
  const sizeFactor = size === "small" ? 0.5 : size === "medium" ? 0.75 : 1;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // 设置画布尺寸
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // 创建渐变点
    const points = [];
    const pointsCount = 3;
    
    for (let i = 0; i < pointsCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: (100 + Math.random() * 100) * sizeFactor,
        color: colors[i % colors.length]
      });
    }
    
    // 动画循环
    const render = () => {
      time += speedFactor;
      
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新点的位置
      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        
        // 边界检查
        if (point.x < -point.radius) point.x = canvas.width + point.radius;
        if (point.x > canvas.width + point.radius) point.x = -point.radius;
        if (point.y < -point.radius) point.y = canvas.height + point.radius;
        if (point.y > canvas.height + point.radius) point.y = -point.radius;
      }
      
      // 绘制渐变点
      for (const point of points) {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        );
        
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // 清理
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors, speedFactor, sizeFactor]);
  
  return (
    <div className={styles.auroraContainer} style={{ filter: `blur(${blur}px)` }}>
      <canvas ref={canvasRef} className={styles.auroraCanvas} />
    </div>
  );
};

export default AuroraBackground; 