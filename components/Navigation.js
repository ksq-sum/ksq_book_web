import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '../styles/Navigation.module.scss';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false); // 默认假设背景为浅色
  const router = useRouter();
  
  // 监听滚动事件，控制导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 检测当前视窗中导航栏下方的背景颜色
  const checkBackgroundColor = () => {
    // 首页特殊处理 - 首页使用Aurora背景，应该使用深色文本
    if (router.pathname === '/' && !isScrolled) {
      setIsDarkBackground(true);
      return;
    }
    
    // 获取导航栏元素
    const navElement = document.querySelector(`.${styles.navigation}`);
    if (!navElement) return;
    
    // 创建一个点，位于导航栏下方中央
    const navRect = navElement.getBoundingClientRect();
    const pointX = navRect.left + navRect.width / 2;
    const pointY = navRect.bottom + 10; // 导航栏下方10像素处
    
    // 获取该点下方元素
    const elementAtPoint = document.elementFromPoint(pointX, pointY);
    if (!elementAtPoint) return;
    
    // 获取背景颜色
    const bgColor = window.getComputedStyle(elementAtPoint).backgroundColor;
    if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)') return;
    
    // 转换为RGB值
    const rgb = bgColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return;
    
    // 计算亮度（使用感知亮度公式）
    // R * 0.299 + G * 0.587 + B * 0.114
    const brightness = (parseInt(rgb[0]) * 0.299 + parseInt(rgb[1]) * 0.587 + parseInt(rgb[2]) * 0.114);
    
    // 亮度阈值为128（0-255的中点）
    setIsDarkBackground(brightness < 128);
  };

  // 监听背景颜色变化
  useEffect(() => {
    // 初始检查
    // 使用setTimeout确保DOM已完全加载
    const initialCheck = setTimeout(() => {
      checkBackgroundColor();
    }, 100);
    
    // 滚动时检查
    const handleScrollForBg = () => {
      checkBackgroundColor();
    };
    
    // 窗口大小改变时也检查
    const handleResize = () => {
      checkBackgroundColor();
    };
    
    window.addEventListener('scroll', handleScrollForBg);
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener('scroll', handleScrollForBg);
      window.removeEventListener('resize', handleResize);
    };
  }, [isScrolled, router.pathname]);
  
  // 路由变化时重新检测背景颜色
  useEffect(() => {
    // 页面完成过渡动画后检测背景颜色
    const routeChangeCheck = setTimeout(() => {
      checkBackgroundColor();
    }, 300); // 等待页面过渡动画完成
    
    // 第二次检测，确保所有元素都已渲染
    const secondCheck = setTimeout(() => {
      checkBackgroundColor();
    }, 600);
    
    // 路由事件监听
    const handleRouteChangeStart = () => {
      // 可以在这里设置加载状态
    };
    
    const handleRouteChangeComplete = (url) => {
      // 路由变化完成后，延迟检测背景颜色
      setTimeout(() => {
        checkBackgroundColor();
      }, 100);
    };
    
    // 监听路由事件
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      clearTimeout(routeChangeCheck);
      clearTimeout(secondCheck);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.pathname, router.events, isScrolled]);

  // 判断当前活动页面
  const isActive = (path) => {
    return router.pathname === path;
  };

  // 导航菜单项
  const navItems = [
    { label: '首页', path: '/' },
    { label: '项目', path: '/projects' },
    { label: '关于', path: '/about' },
    { label: '联系', path: '/contact' }
  ];

  // 首页特殊处理 - 为首页直接应用适当的样式
  const isHomePage = router.pathname === '/';
  
  const navClass = `${styles.navigation} 
                    ${isScrolled ? styles.scrolled : ''} 
                    ${!isScrolled && !isHomePage && isDarkBackground ? styles.darkBg : ''} 
                    ${!isScrolled && (isHomePage || !isDarkBackground) ? styles.lightBg : ''}`;

  return (
    <motion.nav 
      className={navClass}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>KSQ</span>
        </Link>
        
        {/* 桌面导航 */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <motion.li 
              key={item.path}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link 
                href={item.path}
                className={isActive(item.path) ? styles.active : ''}
                scroll={false}
              >
                <span className={styles.navLabel}>{item.label}</span>
                {isActive(item.path) && (
                  <motion.span 
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
        
        {/* 移动端菜单按钮 */}
        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {/* 移动端导航 */}
      <motion.div 
        className={styles.mobileMenu}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ul>
          {navItems.map((item) => (
            <motion.li 
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -10
              }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={isActive(item.path) ? styles.active : ''}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 