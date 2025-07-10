import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './MagicCard.module.scss';

const MagicCard = ({ 
  children, 
  depth = 30, 
  glowColor = 'rgba(62, 139, 255, 0.15)',
  className = '',
  ...props 
}) => {
  const cardRef = useRef(null);
  
  // 鼠标位置跟踪
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // 弹簧效果，使运动更加平滑
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]), springConfig);
  
  // 光照效果
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [-80, 80]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [-80, 80]), springConfig);
  
  // 处理鼠标移动
  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // 计算鼠标在卡片内的相对位置 (-0.5 到 0.5)
    const xPos = (event.clientX - rect.left) / rect.width - 0.5;
    const yPos = (event.clientY - rect.top) / rect.height - 0.5;
    
    x.set(xPos);
    y.set(yPos);
  };
  
  // 鼠标离开时重置
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      className={`${styles.magicCard} ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className={styles.content}>
        {children}
      </div>
      
      <motion.div 
        className={styles.glow} 
        style={{ 
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 70%)`,
          opacity: useTransform(
            rotateX, 
            [-depth, 0, depth], 
            [0.8, 0.2, 0.8]
          ),
        }}
      />
    </motion.div>
  );
};

export default MagicCard; 