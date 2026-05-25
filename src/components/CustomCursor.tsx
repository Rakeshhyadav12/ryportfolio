import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, hidden]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-card') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setHovered(!!isInteractive);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neonCyan pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          boxShadow: hovered 
            ? '0 0 20px rgba(0, 240, 255, 0.8), inset 0 0 10px rgba(0, 240, 255, 0.4)' 
            : '0 0 8px rgba(189, 0, 255, 0.2)',
          borderColor: hovered ? '#00f0ff' : '#bd00ff',
          backgroundColor: clicked 
            ? 'rgba(0, 240, 255, 0.1)' 
            : hovered 
              ? 'rgba(0, 240, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0)',
        }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 400 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 400 }),
        }}
        animate={{
          x: cursorX.get() + 12,
          y: cursorY.get() + 12,
          scale: hovered ? 0 : 1,
        }}
      />
    </>
  );
};
