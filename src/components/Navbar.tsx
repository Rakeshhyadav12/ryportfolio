import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Cpu, Briefcase, Award, MessageSquare, Sun, Moon } from 'lucide-react';

interface NavItem {
  label: string;
  targetId: string;
  icon: React.ComponentType<any>;
}

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', targetId: 'hero', icon: Home },
    { label: 'About', targetId: 'about', icon: User },
    { label: 'Skills', targetId: 'skills', icon: Cpu },
    { label: 'Projects', targetId: 'projects', icon: Briefcase },
    { label: 'Experience', targetId: 'experience', icon: Award },
    { label: 'Contact', targetId: 'contact', icon: MessageSquare },
  ];

  // Scroll detection to update active sections & backgrounds
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <>
      {/* Top Brand Logo Banner (Fixed) */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
        <motion.div 
          className="pointer-events-auto cursor-pointer font-orbitron font-bold text-xl tracking-wider text-white"
          onClick={() => scrollToSection('hero')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-neonCyan">RY</span>
          <span className="text-xs ml-2 text-neonPurple font-sans uppercase font-medium tracking-[0.2em] hidden sm:inline">AI & FullStack</span>
        </motion.div>

        {/* Global Theme Switcher */}
        <motion.button
          onClick={toggleTheme}
          className="pointer-events-auto p-2.5 rounded-full border border-white/10 glass-panel text-white hover:text-neonCyan transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Toggle Theme"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-neonPurple" />}
        </motion.button>
      </header>

      {/* Desktop Floating Dock */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.div
          className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-all duration-500 shadow-glass ${
            scrolled 
              ? 'bg-darkBg/80 border-neonPurple/20 backdrop-blur-md px-6 shadow-neonPurple/5' 
              : 'bg-white/5 border-white/10 backdrop-blur-sm'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.targetId;

            return (
              <button
                key={item.targetId}
                onClick={() => scrollToSection(item.targetId)}
                className={`relative px-4 py-2 text-sm font-display rounded-full transition-all duration-300 flex items-center gap-2 group ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-r from-neonCyan/20 to-neonPurple/20 rounded-full border border-neonCyan/30 shadow-neonCyan/10"
                    style={{ zIndex: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={14} className={`relative z-10 ${isActive ? 'text-neonCyan' : 'text-white/60 group-hover:text-neonCyan transition-colors'}`} />
                <span className="relative z-10 font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </motion.div>
      </nav>

      {/* Mobile Bottom Float Bar */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 md:hidden flex justify-center">
        <motion.div
          className="flex justify-between items-center w-full max-w-sm px-6 py-3 rounded-2xl border border-neonPurple/15 bg-darkBg/95 backdrop-blur-xl shadow-glass shadow-neonPurple/10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.targetId;

            return (
              <button
                key={item.targetId}
                onClick={() => scrollToSection(item.targetId)}
                className="relative p-2.5 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 group active:scale-90"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMobileGlow"
                    className="absolute inset-0 bg-neonCyan/10 rounded-xl border border-neonCyan/20 shadow-neonCyan/5"
                    style={{ zIndex: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon size={20} className={`relative z-10 ${isActive ? 'text-neonCyan' : 'text-white/50 group-hover:text-neonCyan'}`} />
                <span className={`relative z-10 text-[9px] font-sans font-medium tracking-wider uppercase ${isActive ? 'text-white' : 'text-white/40'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
};
