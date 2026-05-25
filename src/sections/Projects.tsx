import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { GitBranch, ExternalLink, X } from 'lucide-react';

const Card3DTilt: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse coordinate from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Set rotation on mouse position (max 10 degrees)
    setRotateY(mouseX * 15);
    setRotateX(-mouseY * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer transition-transform duration-200 ease-out select-none active:scale-[0.98]"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 w-full bg-[#030014] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,240,255,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-neonPurple font-semibold">03 / INVENTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Premium <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">Showcase</span>
          </h2>
          <div className="h-1 w-20 bg-neonCyan/30 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project: Project) => (
            <Card3DTilt key={project.id} onClick={() => setActiveProject(project)}>
              <div className="interactive-card border border-white/5 bg-cardDark rounded-2xl overflow-hidden shadow-glass relative group h-[380px] flex flex-col justify-between">
                
                {/* Visual Image Background */}
                <div className="h-44 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full border border-neonCyan/30 bg-black/55 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-neonCyan font-semibold">
                    {project.category}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-lg text-white group-hover:text-neonCyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/55 font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology tag ribbon */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span 
                        key={t}
                        className="px-2 py-0.5 rounded border border-white/5 bg-white/5 text-[9px] font-mono text-white/40 group-hover:border-neonPurple/20 group-hover:text-white/60 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded border border-white/5 bg-white/5 text-[9px] font-mono text-white/30">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Link indicators */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-[10px] font-mono text-neonCyan tracking-wider uppercase flex items-center gap-1">
                      <span>View Details</span>
                      <ExternalLink size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <div className="flex gap-2">
                      <a 
                        href={project.github}
                        onClick={(e) => e.stopPropagation()} 
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-white/55 hover:text-white hover:border-white/20 transition-all active:scale-95"
                      >
                        <GitBranch size={13} />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Full Screen Detail Modal Overlay */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto no-scrollbar"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-4xl rounded-3xl border border-white/10 bg-darkBg/95 backdrop-blur-xl shadow-2xl shadow-black overflow-hidden relative text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full border border-white/10 bg-black/55 text-white hover:text-neonCyan transition-colors active:scale-90"
                >
                  <X size={18} />
                </button>

                {/* Hero Banner Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-6 h-56 md:h-full min-h-[220px] relative">
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-darkBg via-darkBg/10 to-transparent" />
                  </div>

                  {/* Detail Panel */}
                  <div className="md:col-span-6 p-6 md:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-neonCyan uppercase tracking-widest block font-medium">
                          {activeProject.category}
                        </span>
                        <h3 className="text-2xl font-display font-extrabold text-white">
                          {activeProject.title}
                        </h3>
                      </div>

                      <p className="text-xs text-white/60 font-light leading-relaxed">
                        {activeProject.longDescription}
                      </p>

                      {/* Technical Features */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-semibold">
                          System Specifications
                        </span>
                        <ul className="space-y-1.5 text-xs text-white/70 font-light">
                          {activeProject.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-neonPurple mt-1">&#9670;</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Metrics Matrix if present */}
                    {activeProject.metrics && (
                      <div className="grid grid-cols-3 gap-2 bg-white/5 border border-white/5 p-3 rounded-xl">
                        {activeProject.metrics.map((metric) => (
                          <div key={metric.label} className="text-center">
                            <span className="block font-orbitron font-extrabold text-sm text-neonCyan">{metric.value}</span>
                            <span className="text-[9px] font-mono text-white/40 uppercase font-semibold">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action trigger links */}
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-98"
                      >
                        <GitBranch size={14} />
                        <span>Source Code</span>
                      </a>
                      
                      <a
                        href={activeProject.demo}
                        onClick={(e) => { e.preventDefault(); alert("System running simulator successfully. Live sandbox preview activated."); }}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple text-white text-xs font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-98"
                      >
                        <ExternalLink size={14} />
                        <span>Live Preview</span>
                      </a>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
