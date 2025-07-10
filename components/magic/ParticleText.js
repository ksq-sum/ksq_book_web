import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/magic/ParticleText.module.scss';

const ParticleText = ({ 
  text,
  fontSize = '4rem',
  particleSize = 2,
  particleColor = 'var(--accent, #3e8bff)',
  interactive = true,
  className = ''
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const frameRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || !canvasRef.current || isInitializedRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // 绘制文本并获取粒子位置
    ctx.font = `bold ${fontSize} Inter, Arial, sans-serif`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    const particles = [];
    const stepSize = Math.ceil(6 - particleSize); // 控制粒子密度
    
    for (let y = 0; y < canvas.height; y += stepSize) {
      for (let x = 0; x < canvas.width; x += stepSize) {
        const index = (y * canvas.width + x) * 4;
        if (pixels[index + 3] > 0) { // 如果像素不透明
          const homeX = x;
          const homeY = y;
          
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            homeX,
            homeY,
            size: Math.random() * particleSize + 1,
            speed: Math.random() * 3 + 1
          });
        }
      }
    }
    
    particlesRef.current = particles;
    isInitializedRef.current = true;
    
    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const particle of particles) {
        // 计算粒子距离目标位置的距离
        let dx = particle.homeX - particle.x;
        let dy = particle.homeY - particle.y;
        
        // 如果开启交互并且鼠标在画布内，计算粒子与鼠标的距离
        if (interactive && mouseRef.current.x && mouseRef.current.y) {
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const distToMouse = Math.sqrt((particle.x - mx) ** 2 + (particle.y - my) ** 2);
          
          if (distToMouse < 100) {
            const angle = Math.atan2(particle.y - my, particle.x - mx);
            const repelForce = (100 - distToMouse) * 0.05;
            dx += Math.cos(angle) * repelForce;
            dy += Math.sin(angle) * repelForce;
          }
        }
        
        // 更新粒子位置
        particle.x += dx * 0.05;
        particle.y += dy * 0.05;
        
        // 绘制粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [dimensions, fontSize, particleColor, particleSize, text, interactive]);

  useEffect(() => {
    if (!interactive || !canvasRef.current) return;
    
    const handleMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };
    
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  return (
    <motion.div 
      ref={containerRef}
      className={`${styles.particleTextContainer} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ fontSize }}
    >
      <canvas ref={canvasRef} className={styles.particleCanvas} />
      <div className={styles.textShadow}>{text}</div>
    </motion.div>
  );
};

export default ParticleText; 