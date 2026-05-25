import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { statsData } from '../data/portfolioData';
import { Brain, Code2 } from 'lucide-react';

const CountUp: React.FC<{ value: number; duration?: number; suffix: string }> = ({ value, duration = 1200, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const totalSteps = 40;
    const stepDuration = duration / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-orbitron font-extrabold text-3xl sm:text-4xl text-neonCyan">
      {count}{suffix}
    </span>
  );
};

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 w-full bg-[#030014] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      {/* Decorative Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(189,0,255,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-neonPurple font-semibold">01 / DISCOVERY</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Story-Driven <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-neonCyan/30 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* Narrative & Stats Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Story Content (Left side) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white/90">
              Fusing Deep Science and Frontend Craft
            </h3>
            
            <div className="space-y-4 font-sans text-sm text-white/60 leading-relaxed font-light">
              <p>
                My name is <strong className="text-white font-medium">Rakesh Yadav</strong>. I have spent the last half-decade designing high-performance technological systems. My work focuses on constructing solutions that lie at the intersection of AI models, complex robotics software, and engaging frontend design.
              </p>
              <p>
                From deploying visual SLAM networks on Raspberry Pi microcomputers to coding highly secure React applications managing radioactive analysis diagnostics, my experience covers both back-end physics and front-end user experience design.
              </p>
              <p>
                I believe in code craftsmanship. To me, a portfolio is not just a repository of code: it is a digital landscape. That is why I design with micro-animations, glassmorphism templates, and fast 60fps canvas particles.
              </p>
            </div>

            {/* Core Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm flex items-start gap-3">
                <div className="p-2 bg-neonCyan/10 text-neonCyan rounded-lg">
                  <Brain size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">AI & Vision Systems</h4>
                  <p className="text-[11px] text-white/50 mt-1 font-light leading-normal">Deep learning diagnostic models, radiology scanning, YOLO detection.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm flex items-start gap-3">
                <div className="p-2 bg-neonPurple/10 text-neonPurple rounded-lg">
                  <Code2 size={18} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Full Stack Architecture</h4>
                  <p className="text-[11px] text-white/50 mt-1 font-light leading-normal">Distributed pipelines, high-throughput Redis databases, API gateways.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Matrix Grid (Right side) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 w-full">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="interactive-card border border-white/5 bg-cardDark rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-glass relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(0, 240, 255, 0.2)' }}
              >
                {/* Glow backdrop on card hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-neonCyan/0 to-neonPurple/0 group-hover:from-neonCyan/10 group-hover:to-neonPurple/10 transition-all duration-300 rounded-2xl -z-10" />
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-neonCyan/5 rounded-full blur-xl group-hover:bg-neonCyan/10 transition-colors" />

                <CountUp value={stat.value} suffix={stat.suffix} />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors mt-2 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}

            {/* Big quote box */}
            <div className="col-span-2 p-6 rounded-2xl border border-neonPurple/10 bg-gradient-to-r from-neonPurple/5 to-transparent backdrop-blur-md space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-[50px] font-display text-white/5 select-none leading-none">&ldquo;</div>
              <p className="text-xs italic text-white/70 font-light leading-relaxed relative z-10">
                &quot;The best way to predict the future is to build it ourselves, component by component, network by network.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neonPurple rounded-full" />
                <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase font-semibold">Autonomous Philosophy</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
