import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Container from '../components/Container';
import styles from '../styles/About.module.scss';
import Marquee from '../components/magic/Marquee';
import MagicButton from '../components/magic/MagicButton';

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

// 技能数据
const skills = [
  {
    category: '前端开发',
    items: ['HTML/CSS', 'JavaScript', 'React', 'Vue', 'Next.js', 'TypeScript', 'SCSS/SASS', 'Tailwind CSS']
  },
  {
    category: '后端开发',
    items: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'RESTful API', 'GraphQL']
  },
  {
    category: '设计工具',
    items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch']
  },
  {
    category: '其他技能',
    items: ['Git', 'Docker', 'AWS', 'Firebase', 'MongoDB', 'MySQL', 'PostgreSQL', '敏捷开发']
  }
];

// 经验数据
const experiences = [
  {
    position: '高级前端开发工程师',
    company: '科技创新有限公司',
    period: '2020年 - 现在',
    description: '负责公司主要产品的前端架构设计和开发工作，优化用户体验，提高网站性能。引入现代前端技术栈，实现了产品的全面升级。',
    achievements: [
      '重构了公司的主要产品界面，提高了加载速度53%',
      '设计并实现了组件库系统，提高了团队开发效率',
      '优化了移动端用户体验，增加了30%的移动端用户留存率'
    ]
  },
  {
    position: '前端开发工程师',
    company: '互联网科技有限公司',
    period: '2018年 - 2020年',
    description: '参与多个Web应用项目的开发，负责实现用户界面和交互功能。与后端团队紧密协作，确保前后端数据交互的顺畅。',
    achievements: [
      '开发了公司电子商务平台的前端部分，月交易额增长40%',
      '实现了响应式设计，确保在各种设备上的良好体验',
      '优化了网站SEO，使有机流量增加了25%'
    ]
  },
  {
    position: '网页设计师',
    company: '创意设计工作室',
    period: '2016年 - 2018年',
    description: '负责网站的视觉设计和前端实现，参与客户需求分析和用户体验设计。为多个行业的客户提供定制化网站设计服务。',
    achievements: [
      '为超过30个客户提供了定制化网站设计服务',
      '开发了工作室的设计系统，提高了项目交付速度',
      '多个设计作品获得行业奖项认可'
    ]
  }
];

// 教育背景数据
const education = [
  {
    degree: '计算机科学硕士',
    school: '北京大学',
    period: '2014年 - 2016年',
    description: '专注于人机交互和用户体验设计研究，参与了多个科研项目和学术论文发表。'
  },
  {
    degree: '计算机科学与技术学士',
    school: '清华大学',
    period: '2010年 - 2014年',
    description: '主修计算机科学与技术，辅修交互设计。获得多项奖学金和编程竞赛奖项。'
  }
];

export default function About() {
  return (
    <Layout>
      <Head>
        <title>关于我 | 个人作品集</title>
        <meta name="description" content="了解我的专业背景、技能、经验和教育经历" />
      </Head>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        {/* 个人简介部分 */}
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroContent}>
              <h1>你好，我是<span className={styles.name}>王明</span></h1>
              <h2 className={styles.jobTitle}>全栈开发工程师 & UI/UX设计师</h2>
              <p className={styles.bio}>
                我拥有超过6年的网站和应用程序开发经验，专注于创造美观、高效且用户友好的数字体验。
                我热爱将创意想法转化为实际产品，并且善于解决复杂的技术挑战。
                我相信良好的设计和高质量的代码是成功数字产品的基础。
              </p>
              <div className={styles.personaStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>6+</span>
                  <span className={styles.statLabel}>年工作经验</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>完成项目</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>30+</span>
                  <span className={styles.statLabel}>满意客户</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 技能部分 */}
        <section className={styles.skills}>
          <Container>
            <div className={styles.sectionHeader}>
              <h2>我的技能</h2>
              <p>多年来我积累了广泛的技术技能，让我能够处理从设计到开发的各个环节</p>
            </div>
            
            <div className={styles.skillsGrid}>
              {skills.map((skillGroup, index) => (
                <div className={styles.skillCard} key={index}>
                  <h3>{skillGroup.category}</h3>
                  <ul>
                    {skillGroup.items.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 工作经验部分 */}
        <section className={styles.experience}>
          <Container>
            <div className={styles.sectionHeader}>
              <h2>工作经验</h2>
              <p>我的专业背景涵盖了从设计到全栈开发的多个领域</p>
            </div>
            
            <div className={styles.timeline}>
              {experiences.map((exp, index) => (
                <div className={styles.timelineItem} key={index}>
                  <div className={styles.timelineContent}>
                    <span className={styles.period}>{exp.period}</span>
                    <h3 className={styles.position}>{exp.position}</h3>
                    <h4 className={styles.company}>{exp.company}</h4>
                    <p className={styles.description}>{exp.description}</p>
                    <ul className={styles.achievements}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 教育背景部分 */}
        <section className={styles.education}>
          <Container>
            <div className={styles.sectionHeader}>
              <h2>教育背景</h2>
              <p>我的学术背景为我的专业发展奠定了坚实的基础</p>
            </div>
            
            <div className={styles.educationGrid}>
              {education.map((edu, index) => (
                <div className={styles.educationCard} key={index}>
                  <span className={styles.period}>{edu.period}</span>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <h4 className={styles.school}>{edu.school}</h4>
                  <p className={styles.description}>{edu.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 联系部分 */}
        <section className={styles.contact}>
          <Container>
            <div className={styles.contactContent}>
              <h2>对我的经历感兴趣？</h2>
              <p>如果您想了解更多关于我的专业经验或讨论潜在的合作机会，请随时联系我。</p>
              <a href="/contact" className={styles.contactButton}>联系我</a>
            </div>
          </Container>
        </section>
      </motion.div>
    </Layout>
  );
} 