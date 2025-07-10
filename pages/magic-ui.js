import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Container from '../components/Container';
import { 
  MagicButton, 
  GlowCard, 
  MagicCard, 
  MagicText,
  MagicBackground 
} from '../components/magic';
import { motion } from 'framer-motion';
import styles from '../styles/MagicUI.module.scss';

export default function MagicUIPage() {
  const [activeBackground, setActiveBackground] = useState('gradient');
  
  return (
    <Layout title="Magic UI 组件库 | 个人作品集" description="Magic UI 组件库展示页面">
      <Head>
        <title>Magic UI 组件库</title>
        <meta name="description" content="展示Magic UI组件库的各种交互式组件" />
      </Head>
      
      <MagicBackground 
        variant={activeBackground} 
        color="var(--accent)"
        secondaryColor="#050505"
        intensity={1.2}
      >
        <Container>
          <div className={styles.magicUiPage}>
            <motion.div 
              className={styles.header}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>
                <MagicText variant="gradient" animation="reveal">
                  Magic UI 组件库
                </MagicText>
              </h1>
              <p className={styles.description}>
                一套美观、交互式的React UI组件，为您的网站增添魔法般的体验
              </p>
            </motion.div>
            
            <section className={styles.backgroundSection}>
              <h2>
                <MagicText variant="highlight">背景效果</MagicText>
              </h2>
              <div className={styles.backgroundControls}>
                {['gradient', 'particles', 'wave', 'noise'].map((type) => (
                  <button 
                    key={type}
                    className={`${styles.backgroundButton} ${activeBackground === type ? styles.active : ''}`}
                    onClick={() => setActiveBackground(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </section>
            
            <section className={styles.buttonsSection}>
              <h2>
                <MagicText variant="highlight">按钮</MagicText>
              </h2>
              <div className={styles.buttonsGrid}>
                <MagicButton>默认按钮</MagicButton>
                <MagicButton variant="secondary">次要按钮</MagicButton>
                <MagicButton variant="ghost">幽灵按钮</MagicButton>
                <MagicButton glowColor="rgba(255, 105, 180, 0.6)">
                  自定义颜色
                </MagicButton>
                <MagicButton size="large" hoverScale={1.08}>
                  大尺寸按钮
                </MagicButton>
                <MagicButton disabled>禁用按钮</MagicButton>
              </div>
            </section>
            
            <section className={styles.cardsSection}>
              <h2>
                <MagicText variant="highlight">卡片</MagicText>
              </h2>
              <div className={styles.cardsGrid}>
                <GlowCard
                  title="发光卡片"
                  description="这是一个带有发光效果的卡片组件，当鼠标悬停时会产生光晕效果。"
                  glowColor="rgba(62, 139, 255, 0.5)"
                />
                
                <MagicCard
                  title="3D卡片"
                  subtitle="具有3D倾斜效果的交互式卡片"
                  image="/images/placeholder.jpg"
                  glowColor="rgba(255, 105, 180, 0.5)"
                >
                  <p className={styles.cardContent}>
                    这个卡片具有3D变换效果，当鼠标悬停时会根据鼠标位置进行倾斜。
                  </p>
                </MagicCard>
              </div>
            </section>
            
            <section className={styles.textSection}>
              <h2>
                <MagicText variant="highlight">文字效果</MagicText>
              </h2>
              <div className={styles.textExamples}>
                <div className={styles.textExample}>
                  <h3>渐变文字</h3>
                  <MagicText variant="gradient" color="linear-gradient(90deg, #ff6b6b, #4ecdc4)">
                    这是一段渐变色文字效果
                  </MagicText>
                </div>
                
                <div className={styles.textExample}>
                  <h3>打字机效果</h3>
                  <MagicText variant="outline" animation="typewriter" speed={0.8}>
                    这是一段打字机动画效果的文字
                  </MagicText>
                </div>
                
                <div className={styles.textExample}>
                  <h3>波浪动画</h3>
                  <MagicText variant="glow" animation="wave" repeat={true}>
                    这是一段波浪动画效果的文字
                  </MagicText>
                </div>
                
                <div className={styles.textExample}>
                  <h3>高亮效果</h3>
                  <MagicText variant="highlight" highlightColor="rgba(255, 220, 100, 0.4)">
                    这是一段带有高亮效果的文字
                  </MagicText>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </MagicBackground>
    </Layout>
  );
} 