import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: string;
}

export function CustomCursor({ cursorText = '', cursorVariant = 'default' }: CustomCursorProps) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springDotX = useSpring(mouseX, { damping: 35, stiffness: 450, mass: 0.1 });
  const springDotY = useSpring(mouseY, { damping: 35, stiffness: 450, mass: 0.1 });

  const springRingX = useSpring(mouseX, { damping: 26, stiffness: 280, mass: 0.15 });
  const springRingY = useSpring(mouseY, { damping: 26, stiffness: 280, mass: 0.15 });

  const [isHovered, setIsHovered] = useState(false);
  const [activeText, setActiveText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check target element or closest parent for data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorEl = target.closest('[data-cursor], [data-cursor-text], a, button, input');
        if (cursorEl) {
          setIsHovered(true);
          const customText = cursorEl.getAttribute('data-cursor-text');
          const cursorType = cursorEl.getAttribute('data-cursor');
          if (customText) {
            setActiveText(customText);
          } else if (cursorType === 'project') {
            setActiveText('VIEW\n→');
          } else if (cursorType === 'drag') {
            setActiveText('DRAG');
          } else if (cursorType === 'cta') {
            setActiveText('GO →');
          } else if (cursorType === 'open' || cursorEl.tagName === 'A') {
            setActiveText('OPEN →');
          } else if (cursorType === 'inspect') {
            setActiveText('INSPECT');
          } else if (cursorType === 'explore') {
            setActiveText('EXPLORE');
          } else {
            setActiveText('');
          }
        } else {
          setIsHovered(false);
          setActiveText('');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  const displayText = cursorText || activeText;
  const isLarge = Boolean(displayText || cursorVariant === 'project' || isHovered);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Pinpoint inner core: Vibrant Red with Crisp White Border */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 -ml-[6px] -mt-[6px] rounded-full bg-[#FF2B2B] border-2 border-white shadow-[0_0_10px_rgba(255,43,43,0.8)] pointer-events-none z-20 will-change-transform"
        style={{
          x: springDotX,
          y: springDotY,
        }}
        animate={{
          scale: isLarge ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing outer ring: Dual Red & White combination */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center text-center font-tech transition-colors duration-200 z-10 will-change-transform ${
          displayText
            ? 'bg-gradient-to-br from-[#FF2B2B] via-red-600 to-white text-black font-extrabold text-[10px] tracking-wider leading-tight shadow-[0_0_25px_rgba(255,43,43,0.6)] border-2 border-white'
            : isHovered
            ? 'bg-white/20 border-2 border-[#FF2B2B] shadow-[0_0_15px_rgba(255,43,43,0.4)]'
            : 'border-2 border-white/80 bg-black/40 shadow-[0_0_12px_rgba(255,43,43,0.3)]'
        }`}
        style={{
          x: springRingX,
          y: springRingY,
        }}
        animate={{
          width: displayText ? 88 : isHovered ? 52 : 32,
          height: displayText ? 88 : isHovered ? 52 : 32,
          marginLeft: displayText ? -44 : isHovered ? -26 : -16,
          marginTop: displayText ? -44 : isHovered ? -26 : -16,
        }}
      >
        {displayText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="whitespace-pre-line select-none px-2 uppercase text-black font-extrabold drop-shadow-sm"
          >
            {displayText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
