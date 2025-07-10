import '../styles/globals.scss'
import 'tailwindcss/tailwind.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 添加页面加载事件监听
    const handleRouteChangeStart = () => {
      setIsLoading(true);
      document.body.classList.add('page-transitioning');
    };
    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.classList.remove('page-transitioning');
      }, 100); // 短暂延迟以确保DOM完全加载
    };

    // 首次加载时设置为非加载状态
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    // 添加路由事件监听
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      // 组件卸载时移除事件监听
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <style jsx global>{`
        body {
          opacity: ${isLoading ? 0 : 1};
          transition: opacity 0.5s ease;
          overflow-x: hidden; /* 防止水平滚动 */
        }
        
        /* 防止页面切换时出现双滚动条 */
        html {
          overflow-y: scroll; /* 始终显示垂直滚动条 */
        }
        
        /* 隐藏过渡期间的溢出内容 */
        #__next {
          overflow-x: hidden;
          position: relative;
          width: 100%;
        }
      `}</style>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </>
  )
}

export default MyApp 