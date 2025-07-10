import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './MagicBackground.module.scss';

const MagicBackground = ({ 
  children,
  variant = 'gradient', // gradient, noise, particles
  colors = ['#0f172a', '#1e293b'],
  speed = 10,
  className = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // 粒子效果
  useEffect(() => {
    if (variant !== 'particles' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // 调整画布大小
    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // 绘制粒子
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // 移动粒子
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 边界检查
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });
    };
    
    animate();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [variant, colors]);
  
  // 背景样式
  const backgroundStyle = {};
  
  if (variant === 'gradient') {
    backgroundStyle.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    backgroundStyle.backgroundSize = '200% 200%';
    backgroundStyle.animation = `gradientAnimation ${speed}s ease infinite`;
  } else if (variant === 'noise') {
    backgroundStyle.backgroundColor = colors[0];
    backgroundStyle.backgroundImage = 'url("/noise.png")';
    backgroundStyle.backgroundBlendMode = 'overlay';
    backgroundStyle.animation = `noiseAnimation ${speed / 5}s steps(2) infinite`;
  }
  
  return (
    <div 
      ref={containerRef}
      className={`${styles.magicBackground} ${styles[variant]} ${className}`}
      style={backgroundStyle}
      {...props}
    >
      {variant === 'particles' && (
        <canvas ref={canvasRef} className={styles.particleCanvas} />
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default MagicBackground; 