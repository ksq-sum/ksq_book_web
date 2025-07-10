import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './MagicText.module.scss';

const MagicText = ({ 
  children, 
  variant = 'default', // default, gradient, glow
  animation = 'none', // none, reveal, float, shake
  color = 'current',
  gradientColors = ['#3e8bff', '#bb2cd9'],
  glowColor = 'rgba(62, 139, 255, 0.5)',
  delay = 0,
  className = '',
  ...props 
}) => {
  const textRef = useRef(null);
  
  // 变体样式
  const variantStyles = {
    default: {
      color: color !== 'current' ? color : 'inherit',
    },
    gradient: {
      background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.2)',
      textShadow: '0 0 1px rgba(0, 0, 0, 0.1)',
      opacity: 0.9,
    },
    glow: {
      color: color !== 'current' ? color : 'inherit',
      textShadow: `0 0 10px ${glowColor}`,
    }
  };
  
  // 动画变体
  const animationVariants = {
    none: {},
    reveal: {
      hidden: { 
        opacity: 0, 
        y: 20 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          ease: "easeOut",
          delay: delay
        }
      }
    },
    float: {
      animate: {
        y: [0, -10, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: delay
        }
      }
    },
    shake: {
      animate: {
        x: [0, -5, 5, -5, 5, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 3,
          ease: 'easeInOut',
          delay: delay
        }
      }
    }
  };
  
  // 组件样式
  const textStyles = {
    ...variantStyles[variant],
  };
  
  // 动画初始状态和动画状态
  const initialState = animation === 'reveal' 
    ? 'hidden' 
    : undefined;
  
  const animateState = animation === 'reveal' 
    ? 'visible' 
    : animation !== 'none' 
      ? 'animate' 
      : undefined;

  // 获取文本内容用于data-content属性
  const content = typeof children === 'string' ? children : '';

  return (
    <motion.span
      ref={textRef}
      className={`${styles.magicText} ${styles[variant]} ${className}`}
      style={textStyles}
      initial={initialState}
      animate={animateState}
      variants={animationVariants[animation]}
      data-content={content}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default MagicText; 