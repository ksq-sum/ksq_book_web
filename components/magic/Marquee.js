import React, { useRef, useEffect } from 'react';
import styles from '../../styles/magic/Marquee.module.scss';

const Marquee = ({ 
  children, 
  direction = 'left', 
  speed = 40, 
  pauseOnHover = true,
  className = '',
  itemClassName = '',
  gap = 30
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const requestRef = useRef(null);
  const pausedRef = useRef(false);
  const multiplierRef = useRef(1);
  const positionRef = useRef(0);
  const childrenArray = React.Children.toArray(children);

  // 复制多个子元素，确保滚动效果连续
  const duplicatedChildren = [...childrenArray, ...childrenArray, ...childrenArray];

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    
    if (!container || !inner) return;
    
    // 暂停动画的事件处理函数
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        pausedRef.current = true;
      }
    };
    
    // 恢复动画的事件处理函数
    const handleMouseLeave = () => {
      pausedRef.current = false;
    };
    
    // 设置动画方向
    if (direction === 'right') {
      multiplierRef.current = -1;
    }
    
    // 添加事件监听器
    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // 动画函数
    const animate = () => {
      if (!pausedRef.current) {
        positionRef.current += 0.2 * (speed / 40) * multiplierRef.current;
        
        // 当滚动到一定位置时，重置位置，实现无缝循环效果
        const innerWidth = inner.offsetWidth / 3;
        if (Math.abs(positionRef.current) >= innerWidth) {
          positionRef.current = 0;
        }
        
        inner.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (pauseOnHover) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [direction, pauseOnHover, speed]);

  return (
    <div 
      ref={containerRef} 
      className={`${styles.marqueeContainer} ${className}`}
    >
      <div ref={innerRef} className={styles.marqueeInner}>
        {duplicatedChildren.map((child, index) => (
          <div 
            key={index} 
            className={`${styles.marqueeItem} ${itemClassName}`}
            style={{ marginRight: `${gap}px` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee; 