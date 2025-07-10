import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import { MagicButton, MagicText } from '../components/magic';
import { TextAnimate } from '../components/magicui/text-animate';
import { CoolMode } from '../components/magicui/cool-mode';
import { DockDemo } from '../components/DockDemo';
import { TextReveal } from '@/components/magicui/text-reveal';
import { TextRevealColor } from '@/components/magicui/text-reveal-color';
import { SkillsBeam } from '@/components/SkillsBeam';
import Head from 'next/head';
import Container from '../components/Container';
import dynamic from 'next/dynamic';
import { AnimatedPinDemo } from '../components/AnimatedPinDemo';
import { FinanceDashboardDemo } from '../components/FinanceDashboardDemo';
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

// 动态导入Aurora Background组件，禁用SSR
const AuroraBackground = dynamic(
  () => import('../components/ui/aurora-background').then(mod => mod.AuroraBackground),
  { ssr: false }
);

const skills = [
  {
    name: "前端开发",
    description: "React, Vue3, Next.js, Tailwind CSS",
    time: "精通",
    icon: "💻",
    color: "#00C9A7",
  },
  {
    name: "后端开发",
    description: "Python (FastAPI, Django), Java (Spring)",
    time: "精通",
    icon: "⚙️",
    color: "#FFB800",
  },
  {
    name: "数据库",
    description: "MySQL, MongoDB, Redis, PostgreSQL",
    time: "熟练",
    icon: "🗄️",
    color: "#FF3D71",
  },
  {
    name: "DevOps",
    description: "Docker, CI/CD, Linux, AWS",
    time: "熟练",
    icon: "🚀",
    color: "#1E86FF",
  },
  {
    name: "AI应用开发",
    description: "Ollama, LangChain, 大语言模型应用",
    time: "专业",
    icon: "🤖",
    color: "#EC4899",
  },
];

const SkillItem = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-zinc-900/80 dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-gray-900 dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-700 dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList delay={300}> {/* 降低延迟值 */}
        {skills.map((item, idx) => (
          <SkillItem {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 dark:from-black/40"></div>
    </div>
  );
}

export default function Home() {
  // 用于客户端渲染检查
  const [isMounted, setIsMounted] = useState(false); 
  // 用于控制动画显示
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // 在组件挂载后设置状态
  useEffect(() => {
    // 先设置为已挂载
    setIsMounted(true);
    
    // 给浏览器一点时间进行初始渲染
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100); // 100ms的延迟，确保浏览器有时间完成初始渲染
    
    return () => clearTimeout(timer);
  }, []);
  
  // 动画变体
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout title="KSQ - 创意开发者" description="专注于创建极具视觉吸引力和功能性的现代应用程序和网站">
      <Head>
        <title>KSQ - 创意开发者</title>
        <meta name="description" content="KSQ - 全栈开发者与UI设计师" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        /* 隐藏内容直到客户端渲染完成 */
        .content-hidden {
          opacity: 0;
          visibility: hidden;
        }
        .content-visible {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.5s ease;
        }
        
        /* 确保加载时页面不会滚动到其它部分 */
        html, body {
          overflow-x: hidden;
          height: ${!isMounted ? '100vh' : 'auto'};
          overflow: ${!isMounted ? 'hidden' : 'auto'};
        }
      `}</style>

      {/* Hero部分 */}
      <section className={styles.hero}>
        {isMounted ? (
          <AuroraBackground>
            <Container>
              <div className={styles.heroContent}>
                <motion.div
                  className={styles.heroText}
                  initial="hidden"
                  animate={shouldAnimate ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.h1
                    variants={fadeIn}
                    className={styles.heroTitle}
                  >

                    <TextAnimate 
                      animation="slideUp" 
                      by="word" 
                      className={styles.makeItLike} 
                      as="span"
                      startOnView={false}
                      once={true}
                      delay={0.3}
                      duration={0.8}
                    >
                      Hi, I’m KSQ
                    </TextAnimate>
                    <br />
                    <div className={styles.reallyGoodWrapper}>
                      <TextAnimate 
                        animation="slideUp" 
                        by="word" 
                        delay={0.7} 
                        duration={0.8}
                        className={styles.reallyGood} 
                        as="span"
                        startOnView={false}
                        once={true}
                      >
                        全栈开发人员 和 软件工程师
                      </TextAnimate>
                    </div>
                  </motion.h1>
                  <motion.div 
                    className={styles.viewAllWrapper}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <DockDemo />
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className={styles.heroVisual}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className={styles.profileImage}>
                    <div className={styles.profileCircle}></div>
                  </div>
                </motion.div>
              </div>
            </Container>
          </AuroraBackground>
        ) : (
          <div className={styles.loadingContainer}></div>
        )}
      </section>
      
      {/* 其余部分用div包裹，确保只有在isMounted后才显示 */}
      <div className={isMounted ? "content-visible" : "content-hidden"}>
        {/* 简介部分 */}
        <section className={styles.overview}>
          <Container>
            <motion.div 
              className={styles.overviewContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <TextReveal 
                className={styles.sectionTitle}
                threshold={0.3}
                customColors={true}
                activeColor="#ffffff"
                inactiveColor="rgba(255, 255, 255, 0.3)"
                style={{
                  fontWeight: 'bold',
                  fontSize: '3rem',
                  lineHeight: 1.2,
                  marginBottom: '2rem',
                  position: 'relative',
                  paddingBottom: '0.5rem'
                }}
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  我的经历
                  <motion.span 
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)',
                      borderRadius: '1.5px'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
                  />
                </span>
              </TextReveal>
              
              <div className={styles.overviewGrid}>
                <div>
                  <TextReveal 
                    className={styles.overviewText}
                    darkMode={true}
                  >
                    本人拥有4年全栈开发经验，精通Python（FastAPI、Django）和Java（Spring全家桶）双技术栈
                  </TextReveal>

                  
                  <TextReveal 
                    className={styles.overviewText}
                    darkMode={true}
                  >
                    熟练掌握Vue3、React等前端框架
                  </TextReveal>
                  <TextReveal 
                    className={styles.overviewText}
                    darkMode={true}
                  >
                    主导过MES生产系统、WMS仓库系统、智能表格管理平台等多个企业级项目的架构设计与开发
                  </TextReveal>
                  <TextReveal 
                    className={styles.overviewText}
                    darkMode={true}
                  >
                    在技术创新方面，成功部署Ollama大语言模型，获得人工智能自动化流程比赛"流程设计奖"
                  </TextReveal>
                  <TextReveal 
                    className={styles.overviewText}
                    darkMode={true}
                  >
                    能够独立完成从需求分析到系统上线的全流程工作
                  </TextReveal>
                </div>
                
                <div className={styles.skills}>
                  <AnimatedListDemo />
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
        
        {/* 项目部分 */}
        <section className={styles.projects}>
          <Container>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn}>
                <MagicText 
                  animation="reveal"
                  variant="gradient"
                  gradientColors={['#3B82F6', '#8B5CF6']}
                >
                  projects
                </MagicText>
                <br />
                <MagicText 
                  animation="reveal" 
                  delay={0.1}
                  variant="gradient"
                  gradientColors={['#8B5CF6', '#EC4899']}
                >
                  worth making.
                </MagicText>
              </motion.h2>
              
              <motion.p 
                className={styles.sectionSubtitle}  // 这里加上 position: relative
              >
                精选作品集展示了我在前端、后端和UI设计方面的专业技能。每个项目都是对创意与功能完美结合的追求。
              </motion.p>

              
            </motion.div>
            
            
            <motion.div 
              className={styles.featuredProjects}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* 特色项目1 */}
              <motion.div 
                className={styles.featuredProject}
                variants={scaleUp}
              >
                <div className={styles.projectImage}>
                  <AnimatedPinDemo />
                </div>
                <div className={styles.projectInfo}>
                  <h3>智能家居</h3>
                  <p>
                    一个集成多种智能家居设备的控制中心，通过直观的界面和智能算法，提供无缝的家居自动化体验。
                  </p>
                  <div className={styles.projectLinks}>
                    <a href="#" className={styles.projectLink}>
                      访问网站 <span>→</span>
                    </a>
                    <a href="#" className={styles.projectLink}>
                      GitHub <span>→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* 特色项目2 */}
              <motion.div 
                className={styles.featuredProject}
                variants={scaleUp}
              >
                <div className={styles.projectImage} >
                  <FinanceDashboardDemo />
                </div>
                <div className={styles.projectInfo}>
                  <h3>金融数据分析仪表板</h3>
                  <p>
                    为金融分析师设计的数据可视化平台，将复杂的金融数据转化为易于理解的交互式图表和报告。
                  </p>
                  <div className={styles.projectLinks}>
                    <a href="#" className={styles.projectLink}>
                      访问网站 <span>→</span>
                    </a>
                    <a href="#" className={styles.projectLink}>
                      GitHub <span>→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            
          </Container>
        </section>
        
        {/* 客户展示部分 */}
        <section className={styles.clients}>
          <Container>
            <motion.h2
              className={styles.clientsTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              Clients.
              <motion.span 
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      height: '3px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)',
                      borderRadius: '1.5px'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '20%' }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
              />
            </motion.h2>
            
            <motion.div 
              className={styles.clientsGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* 客户标志 */}
              {Array.from({ length: 10 }).map((_, index) => (
                <motion.div 
                  key={index}
                  className={styles.clientLogo}
                  variants={fadeIn}
                >
                  <div className={styles.logoPlaceholder}></div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
        
        {/* 理念部分 */}
        <section className={styles.approach}>
          <Container>
            <motion.div
              className={styles.approachContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} style={{ position: 'relative' }}>
                Approach.
              <motion.span 
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(12, 12, 12, 0.8) 0%, rgba(12, 12, 12, 0.2) 100%)',
                      borderRadius: '1.5px'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '40%' }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
              />
              </motion.h2>
              
              <motion.div 
                className={styles.approachText}
                variants={fadeIn}
              >
                <p>
                  我的设计和开发过程以用户为中心，注重细节，并融合最新的技术趋势和设计理念。
                  从概念构思到最终交付，我遵循一套结构化的方法，确保每个项目既满足功能需求，
                  又能提供卓越的用户体验。
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={styles.processItems}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: "🔍",
                  title: "发现与研究",
                  description: "深入了解业务需求和用户期望，确定项目范围和关键目标。"
                },
                {
                  icon: "🎨",
                  title: "设计与原型",
                  description: "创建直观的用户界面和流畅的交互体验，通过迭代优化设计方案。"
                },
                {
                  icon: "💻",
                  title: "开发与测试",
                  description: "使用最佳实践和现代技术栈构建可靠、高性能的应用。"
                },
                {
                  icon: "🚀",
                  title: "部署与维护",
                  description: "确保产品顺利上线，并提供持续的优化和支持服务。"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={styles.processItem}
                  variants={fadeIn}
                >
                  <div className={styles.processIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
        
        {/* 作品展示部分 */}
        <section className={styles.showcase}>
          <Container>
            <div className={styles.showcaseGrid}>
              <motion.div
                className={styles.showcaseItem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.showcaseImage}>
                  <div className={styles.showcasePlaceholder}></div>
                </div>
                <h3>Discover</h3>
                <p>interactions</p>
              </motion.div>
              
              <motion.div
                className={styles.showcaseItem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className={styles.showcaseImage}>
                  <div className={styles.showcasePlaceholder}></div>
                </div>
                <h3>Design</h3>
                <p>interfaces</p>
              </motion.div>
            </div>
          </Container>
        </section>
        
        {/* 联系部分 */}
        <section className={styles.contact}>
          <Container>
            <motion.div
              className={styles.contactContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn}>
                <MagicText animation="reveal">
                  Ready to bring your next
                </MagicText>
                <br />
                <MagicText animation="reveal" delay={0.1}>
                  digital idea to life?
                </MagicText>
              </motion.h2>
              
              <motion.div 
                className={styles.contactCta}
                variants={fadeIn}
              >
                <Link href="/contact">
                  <MagicButton size="large">
                    联系我 →
                  </MagicButton>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      </div>
    </Layout>
  );
} 