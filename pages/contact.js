import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Container from '../components/Container';
import styles from '../styles/Contact.module.scss';

// 页面过渡动画
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// 联系方式数据
const contactMethods = [
  {
    icon: 'envelope',
    title: '电子邮件',
    value: 'contact@example.com',
    link: 'mailto:contact@example.com'
  },
  {
    icon: 'phone',
    title: '电话',
    value: '+86 188 8888 8888',
    link: 'tel:+8618888888888'
  },
  {
    icon: 'map-marker',
    title: '地址',
    value: '北京市朝阳区XX街XX号',
    link: 'https://maps.google.com/?q=北京市朝阳区'
  }
];

export default function Contact() {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'
  
  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除错误信息
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // 验证表单
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = '请输入您的姓名';
    }
    
    if (!formData.email.trim()) {
      errors.email = '请输入您的邮箱';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = '请输入主题';
    }
    
    if (!formData.message.trim()) {
      errors.message = '请输入消息内容';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    // 模拟表单提交
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // 重置状态
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };
  
  return (
    <Layout>
      <Head>
        <title>联系我 | 个人作品集</title>
        <meta name="description" content="通过表单或其他联系方式与我取得联系" />
      </Head>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        {/* 联系页面标题 */}
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroContent}>
              <h1>联系我</h1>
              <p className={styles.subtitle}>让我们一起开始一个项目，或者只是打个招呼</p>
            </div>
          </Container>
        </section>

        {/* 联系信息和表单部分 */}
        <section className={styles.contactSection}>
          <Container>
            <div className={styles.contactGrid}>
              {/* 联系信息 */}
              <div className={styles.contactInfo}>
                <h2>与我取得联系</h2>
                <p className={styles.contactText}>
                  无论您有项目需求，想要合作，或者只是想打个招呼，都可以随时通过以下方式联系我。
                  我通常会在24小时内回复您的邮件或信息。
                </p>
                
                <div className={styles.contactMethods}>
                  {contactMethods.map((method, index) => (
                    <div className={styles.contactMethod} key={index}>
                      <div className={styles.contactIcon}>
                        <i className={`fas fa-${method.icon}`}></i>
                      </div>
                      <div className={styles.contactDetails}>
                        <h3>{method.title}</h3>
                        <a href={method.link} target={method.icon === 'map-marker' ? '_blank' : undefined} rel="noreferrer">
                          {method.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.socialLinks}>
                  <h3>在社交媒体上关注我</h3>
                  <div className={styles.socialIcons}>
                    <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* 联系表单 */}
              <div className={styles.contactForm}>
                <h2>发送消息</h2>
                
                {formStatus === 'success' ? (
                  <div className={styles.formSuccess}>
                    <div className={styles.successIcon}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3>消息已发送!</h3>
                    <p>感谢您的留言。我会尽快回复您。</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">姓名</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={formErrors.name ? styles.inputError : ''}
                      />
                      {formErrors.name && <span className={styles.errorMessage}>{formErrors.name}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">邮箱</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? styles.inputError : ''}
                      />
                      {formErrors.email && <span className={styles.errorMessage}>{formErrors.email}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="subject">主题</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={formErrors.subject ? styles.inputError : ''}
                      />
                      {formErrors.subject && <span className={styles.errorMessage}>{formErrors.subject}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="message">消息</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={formErrors.message ? styles.inputError : ''}
                      ></textarea>
                      {formErrors.message && <span className={styles.errorMessage}>{formErrors.message}</span>}
                    </div>
                    
                    <button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? (
                        <span className={styles.submitting}>
                          <i className="fas fa-spinner fa-spin"></i> 正在发送...
                        </span>
                      ) : '发送消息'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Container>
        </section>
        
        {/* 地图部分 */}
        <section className={styles.mapSection}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapOverlay}>
              <Container>
                <div className={styles.mapContent}>
                  <h2>来访我们</h2>
                  <p>北京市朝阳区XX街XX号</p>
                  <a href="https://maps.google.com/?q=北京市朝阳区" target="_blank" rel="noreferrer" className={styles.directionsButton}>
                    获取导航 <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </Container>
            </div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
} 