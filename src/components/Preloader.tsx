import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState(0);
  const [visible, setVisible] = useState(true);

  const logs = [
    "INITIALIZING NEURAL PORTFOLIO SYSTEM...",
    "ESTABLISHING SECURE WEB SOCKET CONNECTIONS...",
    "MOUNTING COMPILER CORE COMPONENT ASSETS...",
    "PRE-PARSING RADIOLOGY AI IMAGE MODELS...",
    "ORBITAL POSITION DATA SYNCHRONIZED...",
    "ESTABLISHING 3D GRAPHICS PIPELINES...",
    "COMPILATION COMPLETE. STARTING INTERACTIVE RENDER..."
  ];

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 600);
          return 100;
        }
        // Accelerate near the end
        const step = prev > 80 ? 4 : Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Log cyclical indexes
  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveLog((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#030014] z-[99999] flex flex-col items-center justify-center px-6"
        >
          {/* Glowing Background Blob */}
          <div className="absolute w-[300px] h-[300px] bg-neonPurple/10 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute w-[200px] h-[200px] bg-neonCyan/10 rounded-full blur-[60px] animate-pulse delay-700" />

          {/* Central Logo Indicator */}
          <div className="relative z-10 text-center space-y-8 max-w-lg w-full">
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl border-2 border-neonCyan flex items-center justify-center shadow-neonCyan">
                <span className="font-orbitron font-extrabold text-2xl text-white">RY</span>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-orbitron font-bold text-5xl tracking-widest bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">
                  {progress}%
                </span>
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">BOOT_SYS</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-neonCyan to-neonPurple shadow-[0_0_8px_#00f0ff]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Terminal logs mockup */}
            <div className="h-16 text-left border border-white/5 bg-black/40 rounded-xl p-3 backdrop-blur-md overflow-hidden font-mono text-[10px] text-white/50 leading-relaxed shadow-inner">
              <span className="text-neonCyan mr-2">&gt;&gt;</span>
              <span className="text-white/80">{logs[activeLog]}</span>
              <div className="text-white/30 text-[9px] mt-1 font-mono tracking-wide">
                SYS_VER: 1.0.4 | NODE_POOL: ACTIVE | WebGL2: DETECTED
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
