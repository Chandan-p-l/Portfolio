import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { WytherPage } from './pages/WytherPage';
import { LabPage } from './pages/LabPage';
import { ContentPage } from './pages/ContentPage';
import { ContactPage } from './pages/ContactPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/wyther" element={<WytherPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
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

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
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
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#F4F2EC] relative selection:bg-[#FF2B2B] selection:text-white grain-overlay">
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
    </Router>
  );
}

