import React from 'react';
import { motion } from 'framer-motion';
import { timelineData, certificationsData } from '../data/portfolioData';
import type { TimelineItem } from '../data/portfolioData';
import { Award, Briefcase, GraduationCap, GitBranch, Code, ExternalLink } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="relative min-h-screen py-24 w-full bg-[#030014] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      <div className="grid-overlay" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-neonCyan font-semibold">04 / HISTORY</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Journey & <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">Credentials</span>
          </h2>
          <div className="h-1 w-20 bg-neonCyan/30 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Vertical Timeline (Left Column - 7/12 width) */}
          <div className="lg:col-span-7 space-y-8 relative">
            {/* Center spine line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-neonCyan via-neonPurple to-transparent opacity-20 pointer-events-none" />

            {timelineData.map((item: TimelineItem, index: number) => {
              const IsWork = item.type === 'experience';
              
              return (
                <motion.div
                  key={item.id}
                  className="flex gap-6 relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline icon nodes */}
                  <div className={`relative z-10 w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md shadow-lg ${
                    IsWork 
                      ? 'border-neonCyan/40 bg-neonCyan/10 text-neonCyan shadow-neonCyan/10' 
                      : 'border-neonPurple/40 bg-neonPurple/10 text-neonPurple shadow-neonPurple/10'
                  }`}>
                    {IsWork ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                  </div>

                  {/* Journey Content Card */}
                  <div className="flex-1 border border-white/5 bg-cardDark p-6 rounded-2xl shadow-glass relative group hover:border-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-white/30 font-semibold uppercase tracking-wider">
                      {item.period}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-display font-extrabold text-sm sm:text-base text-white group-hover:text-neonCyan transition-colors">
                          {item.role}
                        </h4>
                        <p className="text-[11px] font-mono text-white/50">
                          {item.company} &bull; <span className="italic">{item.location}</span>
                        </p>
                      </div>

                      {/* Accomplishments */}
                      <ul className="space-y-1.5 text-xs text-white/60 font-light leading-relaxed">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-neonCyan mt-1">&rsaquo;</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technology list tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 rounded border border-white/5 bg-white/5 text-[9px] font-mono text-white/40 group-hover:text-white/60 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Credentials, Profiles & Achievements (Right Column - 5/12 width) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Certifications Card */}
            <motion.div
              className="border border-white/5 bg-cardDark rounded-2xl p-6 shadow-glass relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ borderColor: 'rgba(189, 0, 255, 0.2)' }}
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <div className="p-2 bg-neonPurple/10 text-neonPurple rounded-lg">
                  <Award size={18} />
                </div>
                <h3 className="font-display font-extrabold text-sm tracking-wider text-white uppercase">
                  Professional Badges
                </h3>
              </div>

              <ul className="space-y-3">
                {certificationsData.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-2 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-white/70 font-light group-hover/item:text-white transition-colors">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              className="border border-white/5 bg-cardDark rounded-2xl p-6 shadow-glass relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ borderColor: 'rgba(0, 240, 255, 0.2)' }}
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <div className="p-2 bg-neonCyan/10 text-neonCyan rounded-lg">
                  <Award size={18} />
                </div>
                <h3 className="font-display font-extrabold text-sm tracking-wider text-white uppercase">
                  Notable Achievements
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-white/70 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-neonCyan mt-0.5">&#9670;</span>
                  <div>
                    <strong className="text-white font-medium">1st Place Winner</strong> &bull; National Robotics & Sensor Fusion Hackathon. Designed tracking dual axis controller models.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neonCyan mt-0.5">&#9670;</span>
                  <div>
                    <strong className="text-white font-medium">President</strong> &bull; Computer Science Society, STU. Mentored 400+ junior student developers.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neonCyan mt-0.5">&#9670;</span>
                  <div>
                    <strong className="text-white font-medium">Open Source</strong> &bull; Contributed core edge models and visual SLAM pipelines to ROS2 robotics databases.
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Coding Profiles Navigation Card */}
            <motion.div
              className="border border-white/5 bg-gradient-to-r from-neonCyan/5 via-transparent to-neonPurple/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-display font-semibold text-xs tracking-widest text-white/50 uppercase mb-4">
                Cyber Sandboxes
              </h3>

              <div className="flex flex-col gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl border border-white/5 hover:border-neonCyan/35 bg-white/5 hover:bg-neonCyan/5 text-white/80 hover:text-white flex items-center justify-between transition-all group/btn"
                >
                  <div className="flex items-center gap-3">
                    <GitBranch size={16} className="text-white/60 group-hover/btn:text-neonCyan transition-colors" />
                    <span className="text-xs font-sans font-medium">GitHub Repository Portal</span>
                  </div>
                  <ExternalLink size={12} className="text-white/30 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl border border-white/5 hover:border-neonPurple/35 bg-white/5 hover:bg-neonPurple/5 text-white/80 hover:text-white flex items-center justify-between transition-all group/btn"
                >
                  <div className="flex items-center gap-3">
                    <Code size={16} className="text-white/60 group-hover/btn:text-neonPurple transition-colors" />
                    <span className="text-xs font-sans font-medium">LeetCode Algorithmic (Top 2%)</span>
                  </div>
                  <ExternalLink size={12} className="text-white/30 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
