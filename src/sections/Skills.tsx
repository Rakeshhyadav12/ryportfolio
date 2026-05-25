import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';
import type { SkillCategory } from '../data/portfolioData';
import { Brain, Layout, Database, Cpu, Wrench } from 'lucide-react';

const IconMapper: Record<string, React.ComponentType<any>> = {
  Brain: Brain,
  Layout: Layout,
  Database: Database,
  Cpu: Cpu,
  Wrench: Wrench,
};

export const Skills: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="relative min-h-screen py-24 w-full bg-[#030014] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      {/* Decorative background grid and lighting */}
      <div className="grid-overlay" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-neonCyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-neonPurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-neonCyan font-semibold">02 / CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Interactive <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <div className="h-1 w-20 bg-neonPurple/30 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category: SkillCategory, idx: number) => {
            const IconComponent = IconMapper[category.icon] || Brain;

            return (
              <motion.div
                key={category.title}
                className="interactive-card border border-white/5 bg-cardDark rounded-2xl p-6 shadow-glass relative overflow-hidden group flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: idx % 2 === 0 ? 'rgba(0, 240, 255, 0.2)' : 'rgba(189, 0, 255, 0.2)' }}
              >
                {/* Dynamic border highlighting on hover */}
                <div className={`absolute -inset-px bg-gradient-to-r ${
                  idx % 2 === 0 
                    ? 'from-neonCyan/0 to-neonCyan/0 group-hover:from-neonCyan/10 group-hover:to-neonCyan/10' 
                    : 'from-neonPurple/0 to-neonPurple/0 group-hover:from-neonPurple/10 group-hover:to-neonPurple/10'
                } transition-all duration-300 rounded-2xl -z-10`} />

                {/* Card Title & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-neonCyan transition-colors">
                      {category.title}
                    </h3>
                    <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${
                      idx % 2 === 0 ? 'text-neonCyan border-neonCyan/20' : 'text-neonPurple border-neonPurple/20'
                    }`}>
                      <IconComponent size={18} />
                    </div>
                  </div>

                  {/* Skills Progress meters */}
                  <div className="space-y-4 py-2">
                    {category.skills.map((skill, sIdx) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white/70 hover:text-white transition-colors">{skill.name}</span>
                          <span className="text-white/40">{skill.level}%</span>
                        </div>
                        
                        {/* Progress Bar Track */}
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/15 relative">
                          <motion.div 
                            className={`h-full rounded-full ${
                              idx % 2 === 0 
                                ? 'bg-gradient-to-r from-neonCyan to-cyan-400 shadow-[0_0_6px_#00f0ff]' 
                                : 'bg-gradient-to-r from-neonPurple to-fuchsia-400 shadow-[0_0_6px_#bd00ff]'
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: sIdx * 0.05 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cyber decorative line at the bottom */}
                <div className={`h-[1px] w-full mt-4 ${
                  idx % 2 === 0 ? 'bg-gradient-to-r from-neonCyan/30 to-transparent' : 'bg-gradient-to-r from-neonPurple/30 to-transparent'
                }`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
