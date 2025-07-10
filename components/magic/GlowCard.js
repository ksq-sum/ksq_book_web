import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/magic/GlowCard.module.scss';

const GlowCard = ({ 
  title, 
  description, 
  icon, 
  className = '', 
  glowColor = 'rgba(62, 139, 255, 0.5)',
  children
}) => {
  return (
    <motion.div 
      className={`${styles.glowCard} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -5,
        boxShadow: `0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${glowColor}`
      }}
      style={{
        '--glow-color': glowColor
      }}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      
      {title && <h3 className={styles.title}>{title}</h3>}
      
      {description && <p className={styles.description}>{description}</p>}
      
      {children}
      
      <div className={styles.glowEffect}></div>
    </motion.div>
  );
};

export default GlowCard; 