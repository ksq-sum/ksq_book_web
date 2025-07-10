import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/magic/MagicButton.module.scss';

const MagicButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  glowColor = 'var(--accent)',
  hoverScale = 1.05,
  trailEffect = true
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const buttonRef = useRef(null);
  const trailsRef = useRef([]);
  const requestRef = useRef();

  // 处理鼠标移动
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // 处理鼠标轨迹效果
  useEffect(() => {
    if (!trailEffect || !isHover) return;
    
    const trails = [];
    
    const animateTrails = () => {
      // 添加当前鼠标位置到轨迹数组
      if (isHover) {
        trails.push({ ...mousePosition, opacity: 1, scale: 1 });
      }
      
      // 更新和渲染轨迹
      for (let i = 0; i < trails.length; i++) {
        trails[i].opacity -= 0.03;
        trails[i].scale -= 0.02;
        
        // 移除透明度太低的轨迹
        if (trails[i].opacity <= 0) {
          trails.splice(i, 1);
          i--;
        }
      }
      
      trailsRef.current = [...trails];
      requestRef.current = requestAnimationFrame(animateTrails);
    };
    
    requestRef.current = requestAnimationFrame(animateTrails);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      trailsRef.current = [];
    };
  }, [isHover, mousePosition, trailEffect]);

  // 确定按钮样式类
  const buttonClass = `
    ${styles.magicButton} 
    ${styles[variant]} 
    ${styles[size]} 
    ${disabled ? styles.disabled : ''}
    ${className}
  `;

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: disabled ? 1 : hoverScale }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 20 
      }}
      style={{
        '--glow-color': glowColor
      }}
    >
      <span className={styles.buttonContent}>{children}</span>
      
      {isHover && !disabled && (
        <motion.span 
          className={styles.glow}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            backgroundColor: glowColor
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.25 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
      
      {trailEffect && trailsRef.current.map((trail, index) => (
        trail.opacity > 0 && (
          <motion.span
            key={index}
            className={styles.trail}
            style={{
              left: trail.x,
              top: trail.y,
              opacity: trail.opacity,
              scale: trail.scale,
              backgroundColor: glowColor
            }}
          />
        )
      ))}
      
      <span className={styles.border} />
    </motion.button>
  );
};

export default MagicButton; 