import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// 页面过渡动画变体
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 }
};

const Layout = ({ children, title = '个人作品集', description = '一个创意作品集网站' }) => {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ 
          type: 'linear', 
          duration: 0.3, 
          ease: "easeOut" 
        }}
      >
        {children}
      </motion.main>
      
      <Footer />
    </>
  );
};

export default Layout; 