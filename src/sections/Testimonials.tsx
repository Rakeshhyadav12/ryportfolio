import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData } from '../data/portfolioData';
import type { Testimonial } from '../data/portfolioData';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-24 w-full bg-[#030014] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      {/* Dynamic background lights */}
      <div className="glow-blob glow-purple w-[400px] h-[400px] -top-20 right-10" />
      <div className="glow-blob glow-cyan w-[400px] h-[400px] -bottom-20 left-10" />

      <div className="max-w-5xl w-full mx-auto px-6 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-neonPurple font-semibold">05 / REVIEWS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Client & colleague <span className="bg-gradient-to-r from-neonCyan to-neonPurple bg-clip-text text-transparent">Endorsements</span>
          </h2>
          <div className="h-1 w-20 bg-neonCyan/30 mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {testimonialsData.map((testimonial: Testimonial, index: number) => {
              if (index !== currentIndex) return null;

              return (
                <motion.div
                  key={testimonial.id}
                  className="w-full border border-white/5 bg-cardDark rounded-3xl p-8 sm:p-12 shadow-glass relative flex flex-col md:flex-row gap-8 items-center md:items-start"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Decorative glowing overlay */}
                  <div className="absolute -inset-px bg-gradient-to-r from-neonCyan/5 to-neonPurple/5 rounded-3xl -z-10" />

                  {/* Avatar Frame */}
                  <div className="w-20 h-20 rounded-full border-2 border-neonCyan/40 p-1 flex-shrink-0 relative">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neonPurple border border-white/10 flex items-center justify-center text-white">
                      <Quote size={10} />
                    </div>
                  </div>

                  {/* Testimonial Quote & Info */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-light italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-[11px] font-mono text-neonCyan uppercase tracking-wider mt-0.5">
                        {testimonial.role} &bull; <span className="text-white/40">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
        </div>

        {/* Carousel Controllers */}
        <div className="flex items-center justify-between max-w-xs mx-auto pt-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-xl border border-white/5 hover:border-neonCyan/30 bg-white/5 text-white/50 hover:text-white transition-all active:scale-90"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-neonCyan' : 'w-2.5 bg-white/10'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-xl border border-white/5 hover:border-neonPurple/30 bg-white/5 text-white/50 hover:text-white transition-all active:scale-90"
            aria-label="Next Slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
