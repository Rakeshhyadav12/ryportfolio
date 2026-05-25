import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, GitBranch, Link2, Share2, Terminal, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    // Simulate futuristic transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Auto dismiss success alert
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-24 w-full bg-[#030014] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      <div className="grid-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonCyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-neonCyan font-semibold">06 / NETWORK</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Initialize <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">Connection</span>
          </h2>
          <div className="h-1 w-20 bg-neonPurple/30 mx-auto md:mx-0 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Column (Left side - 5/12 width) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Collaborate On Future Tech
              </h3>
              
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                Have a medical scanning model to deploy, an automation control system to write, or a creative WebGL platform that needs building? Send me a transmission and let&apos;s create something remarkable.
              </p>

              {/* Contact Info cards */}
              <div className="space-y-4 pt-4">
                
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="p-3 bg-neonCyan/10 text-neonCyan rounded-lg">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Neural Mail</span>
                    <a href="mailto:rakesh@example.com" className="text-xs text-white hover:text-neonCyan font-medium transition-colors">
                      rakesh@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="p-3 bg-neonPurple/10 text-neonPurple rounded-lg">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Operational Hub</span>
                    <span className="text-xs text-white font-medium">
                      Bengaluru, India
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels ribbons */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-semibold">
                Synchronized Ports
              </span>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-neonCyan/30 text-white/70 hover:text-white flex items-center gap-2 hover:scale-[1.03] transition-all duration-300 shadow-sm active:scale-97 group"
                >
                  <GitBranch size={14} className="group-hover:text-neonCyan transition-colors" />
                  <span className="text-xs font-medium font-display">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-neonPurple/30 text-white/70 hover:text-white flex items-center gap-2 hover:scale-[1.03] transition-all duration-300 shadow-sm active:scale-97 group"
                >
                  <Link2 size={14} className="group-hover:text-neonPurple transition-colors" />
                  <span className="text-xs font-medium font-display">LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-neonCyan/30 text-white/70 hover:text-white flex items-center gap-2 hover:scale-[1.03] transition-all duration-300 shadow-sm active:scale-97 group"
                >
                  <Share2 size={14} className="group-hover:text-neonCyan transition-colors" />
                  <span className="text-xs font-medium font-display">Twitter</span>
                </a>
              </div>
            </div>

          </div>

          {/* Form Column (Right side - 7/12 width) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full border border-white/5 bg-cardDark rounded-3xl p-6 sm:p-8 shadow-glass relative overflow-hidden flex flex-col justify-between">
              
              {/* Submission visual loading overlays */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-darkBg/90 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neonCyan/20 bg-neonCyan/5 text-neonCyan font-mono text-xs animate-pulse">
                      <Terminal size={12} />
                      <span>TRANSMITTING DATA PACKETS...</span>
                    </div>
                    <div className="w-10 h-10 border-2 border-t-neonCyan border-r-neonPurple border-b-transparent border-l-transparent rounded-full animate-spin" />
                  </motion.div>
                )}

                {submitSuccess && (
                  <motion.div
                    className="absolute inset-0 bg-darkBg/95 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <CheckCircle2 size={44} className="text-neonCyan animate-bounce" />
                    <h4 className="font-display font-extrabold text-lg text-white">TRANSMISSION_SUCCESS</h4>
                    <p className="text-xs text-white/50 max-w-xs text-center font-light leading-relaxed">
                      Your neural data packet has successfully passed check arrays. I will analyze your transmission and respond shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actual form body */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Horizontal grouping */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-mono uppercase text-white/40 tracking-wider font-semibold block">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Alan Turing"
                      className="w-full bg-white/5 border border-white/5 hover:border-white/15 focus:border-neonCyan/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-mono uppercase text-white/40 tracking-wider font-semibold block">Neural Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alan@computational.net"
                      className="w-full bg-white/5 border border-white/5 hover:border-white/15 focus:border-neonCyan/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[10px] font-mono uppercase text-white/40 tracking-wider font-semibold block">Subject Matrix</label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Deep Learning Pipeline Project"
                    className="w-full bg-white/5 border border-white/5 hover:border-white/15 focus:border-neonCyan/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase text-white/40 tracking-wider font-semibold block">Transmission Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Initialize transmission detailing core architecture and project specifications..."
                    className="w-full bg-white/5 border border-white/5 hover:border-white/15 focus:border-neonCyan/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple hover:glow-cyan text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-99 transition-all duration-300 shadow-md shadow-neonCyan/10"
                >
                  <Send size={12} />
                  <span>Transmit packet</span>
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
