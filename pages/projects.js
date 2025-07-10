import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Container from '../components/Container';
import { MagicText } from '../components/magic';
import styles from '../styles/Projects.module.scss';
import Link from 'next/link';

export default function Projects() {
  // 项目分类
  const categories = ['全部', '网站开发', '应用程序', 'UI/UX设计', '数据可视化'];
  const [activeCategory, setActiveCategory] = useState('全部');
  
  // 项目数据
  const projects = [
    {
      id: 1,
      title: 'Smart home control platform',
      description: '一个集成多种智能家居设备的控制中心，提供无缝的家居自动化体验。',
      image: '/images/project-1.jpg',
      categories: ['网站开发', '应用程序'],
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: '金融数据分析仪表板',
      description: '为金融分析师设计的数据可视化平台，将复杂的金融数据转化为易于理解的交互式图表和报告。',
      image: '/images/project-2.jpg',
      categories: ['数据可视化', '网站开发'],
      technologies: ['Vue.js', 'D3.js', 'Firebase'],
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'AI内容创作助手',
      description: '基于最新AI技术的内容创作工具，帮助用户快速生成高质量的文案、图片和设计元素。',
      image: '/images/project-3.jpg',
      categories: ['应用程序', 'UI/UX设计'],
      technologies: ['React Native', 'Python', 'TensorFlow'],
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: '电子商务平台重设计',
      description: '对现有电子商务平台进行全面的用户体验和界面重设计，提高转化率和用户满意度。',
      image: '/images/project-4.jpg',
      categories: ['UI/UX设计', '网站开发'],
      technologies: ['Figma', 'Adobe XD', 'HTML/CSS'],
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: '健康追踪应用',
      description: '一款专注于个人健康管理的移动应用，提供活动追踪、营养分析和健康目标设定等功能。',
      image: '/images/project-5.jpg',
      categories: ['应用程序', 'UI/UX设计'],
      technologies: ['Flutter', 'Firebase', 'RESTful API'],
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: '股市趋势分析工具',
      description: '一个高级的股票市场分析工具，使用机器学习算法预测市场趋势并提供投资建议。',
      image: '/images/project-6.jpg',
      categories: ['数据可视化', '应用程序'],
      technologies: ['Python', 'Django', 'Scikit-learn', 'Chart.js'],
      link: '#',
      github: '#'
    }
  ];
  
  // 根据当前选中的类别过滤项目
  const filteredProjects = activeCategory === '全部' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));
  
  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Layout title="项目 | 个人作品集" description="查看我的项目作品集">
      <Head>
        <title>项目 | KSQ</title>
        <meta name="description" content="探索我的项目作品集，包括网站开发、应用程序、UI/UX设计和数据可视化等作品。" />
      </Head>
      
      <section className={styles.projectsHero}>
        <Container>
          <div className={styles.heroContent}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <MagicText variant="gradient" animation="reveal">
                Projects
              </MagicText>
            </motion.h1>
            
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              探索我的项目作品集，这些作品展示了我在各个领域的技能和创意解决方案。
            </motion.p>
          </div>
        </Container>
      </section>
      
      <section className={styles.projectsSection}>
        <Container>
          <motion.div
            className={styles.categories}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          <motion.div
            className={styles.projectsGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                variants={itemVariants}
              >
                <div className={styles.projectImage}>
                  <div className={styles.imagePlaceholder}>
                    {/* 实际项目中替换为真实图片 */}
                    {/* <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" /> */}
                  </div>
                </div>
                
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className={styles.projectTech}>
                    {project.technologies.map((tech, index) => (
                      <span key={index}>{tech}</span>
                    ))}
                  </div>
                  
                  <div className={styles.projectLinks}>
                    <a href={project.link} target="_blank" rel="noreferrer" className={styles.projectLink}>
                      访问网站 <span>→</span>
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className={styles.projectLink}>
                      GitHub <span>→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
      
      <section className={styles.contactCta}>
        <Container>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2>有项目想要合作？</h2>
            <p>我随时准备好接受新的挑战，让我们一起创造令人惊叹的数字体验。</p>
            <Link href="/contact" className={styles.ctaButton}>联系我 →</Link>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
} 