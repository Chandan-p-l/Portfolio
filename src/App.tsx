import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { SeoManager } from './components/SeoManager';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { WytherPage } from './pages/WytherPage';
import { ProjectPage } from './pages/ProjectPage';
import { LabPage } from './pages/LabPage';
import { BlogPage } from './pages/BlogPage';
import { PostPage } from './pages/PostPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();

  // initial={false}: the prerendered first paint shows content immediately;
  // the red curtain only plays on in-app navigation.
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/wythher" element={<WytherPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // lerp-based smoothing follows the wheel closely, so scrolling feels fluid rather than floaty.
    const lenis = new Lenis({
      lerp: 0.14,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    (window as any).lenis = lenis;

    let animationFrame: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F2EC] relative selection:bg-[#FF2B2B] selection:text-white grain-overlay">
      <SeoManager />

      {/* Loading Sequence */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navigation />

      {/* Auto Scroll To Top on Route Transition */}
      <ScrollToTop />

      {/* Main Routed Content */}
      <main id="main-content" className="relative z-10">
        <AnimatedRoutes />
      </main>
    </div>
  );
}
