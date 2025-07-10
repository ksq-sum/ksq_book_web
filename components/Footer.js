import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // 页脚链接分组
  const footerLinks = [
    {
      title: '导航',
      links: [
        { label: '首页', href: '/' },
        { label: '项目', href: '/projects' },
        { label: '关于', href: '/about' },
        { label: '技能', href: '/skills' },
        { label: '经历', href: '/experience' },
        { label: '联系', href: '/contact' }
      ]
    },
    {
      title: '联系我',
      links: [
        { label: 'hello@ksq.com', href: 'mailto:hello@ksq.com' },
        { label: '+86 123 4567 8910', href: 'tel:+8612345678910' }
      ]
    },
    {
      title: '社交媒体',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'Dribbble', href: 'https://dribbble.com' }
      ]
    }
  ];
  
  // 动画变体
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.footer 
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <Link href="/">
              <span className={styles.logoText}>KSQ</span>
            </Link>
            <p className={styles.tagline} style={{position:'relative'}}>
              bringing your digital<br />ideas to life.
              <motion.span 
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      height: '1.5px',
                      background: 'linear-gradient(90deg, rgba(253, 253, 253, 0.6) 100%, rgba(253, 253, 253, 0.6) 100%)',
                      borderRadius: '1.5px'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '45%' }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
                />
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            {footerLinks.map((group, index) => (
              <div key={index} className={styles.linkGroup}>
                <h3 style={{position:'relative'}}>{group.title}
                <motion.span 
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      height: '1.5px',
                      background: 'linear-gradient(90deg, rgba(253, 253, 253, 0.6) 100%, rgba(253, 253, 253, 0.6) 100%)',
                      borderRadius: '1.5px'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '30%' }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 1.6,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
                />
                </h3>
                <ul>
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                        {link.label}
                      </a>
                      
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright} style={{position:'relative'}}>
            &copy; {currentYear} KSQ. All rights reserved.
            <>
            <div style={{ position: 'relative', width: '100%', height: '10px' }}>
  <motion.span
    style={{
      position: 'absolute',
      bottom: '0',
      left: 0,
      height: '1.5px',
      borderRadius: '1.5px',
      background: 'linear-gradient(90deg, rgba(253, 253, 253, 0.6) 100%, rgba(253, 253, 253, 0.6) 100%)',
    }}
    initial={{ width: 0 }}
    whileInView={{ width: '100%' }}
    transition={{
      duration: 1.2,
      delay: 2.4,
      ease: [0.16, 1, 0.3, 1],
    }}
    viewport={{ once: true }}
  />
  <span
    style={{
      position: 'absolute',
      bottom: '-3px',
      left: '100%',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: 'rgba(253, 253, 253, 0.6)',
      transform: 'translateX(3px)',
    }}
  />
            </div>

        </>

          </div>
          
          <div className={styles.madeWith}>
            <span>设计与开发 by KSQ</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 