import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessageSquare, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const orbCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Typing Effect State
  const roles = [
    "AI / Machine Learning Engineer",
    "Robotics & Control System Developer",
    "Creative Frontend Architect",
    "Full Stack Systems Innovator"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // typing speed dynamics
  useEffect(() => {
    let timer: number;
    const currentFullText = roles[roleIndex];

    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        if (typedText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 1800); // Wait on complete
          return;
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      const speed = isDeleting ? 30 : 60;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Background Starfield particle simulation
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }> = [];
    const maxParticles = 60;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse push
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const force = (120 - distance) / 120;
          p.x -= (dx / distance) * force * 1.5;
          p.y -= (dy / distance) * force * 1.5;
        }

        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3D Point Orb Simulation
  useEffect(() => {
    const canvas = orbCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Coordinate structure of 3D points
    const points: Array<{ x3d: number; y3d: number; z3d: number }> = [];
    const maxPoints = 280;
    const radius = Math.min(width, height) * 0.35;

    // Distribute nodes evenly on spherical mesh using Fibonacci Lattice
    for (let i = 0; i < maxPoints; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / maxPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      points.push({
        x3d: radius * Math.sin(phi) * Math.cos(theta),
        y3d: radius * Math.sin(phi) * Math.sin(theta),
        z3d: radius * Math.cos(phi)
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;

      // Adjust spin rate dynamically on hover
      if (Math.abs(clientX) < radius * 1.5 && Math.abs(clientY) < radius * 1.5) {
        mouseX = clientX * 0.0002;
        mouseY = clientY * 0.0002;
      } else {
        mouseX = 0;
        mouseY = 0;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate rotational speeds
      const currentAngleX = 0.002 + mouseY;
      const currentAngleY = 0.003 + mouseX;

      // Sines & Cosines of angles
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const centerOffset = { x: width / 2, y: height / 2 };

      // Project and draw 3D particles
      points.forEach((p) => {
        // Rotate X
        let y1 = p.y3d * cosX - p.z3d * sinX;
        let z1 = p.z3d * cosX + p.y3d * sinX;

        // Rotate Y
        let x2 = p.x3d * cosY - z1 * sinY;
        let z2 = z1 * cosY + p.x3d * sinY;

        p.x3d = x2;
        p.y3d = y1;
        p.z3d = z2;

        // Simple perspective projection
        const focalLength = 400;
        const scale = focalLength / (focalLength + z2);
        const projX = x2 * scale + centerOffset.x;
        const projY = y1 * scale + centerOffset.y;

        // Color shifts based on depth (Z axis)
        const depthVal = (z2 + radius) / (radius * 2); // 0 to 1
        const opacity = 0.2 + depthVal * 0.7;
        const size = (1.5 + depthVal * 2.5) * (scale * 0.8);

        // Mix Cyan neon and Purple neon based on depth
        ctx.beginPath();
        ctx.arc(projX, projY, size, 0, Math.PI * 2);
        
        const baseColor = depthVal > 0.5 
          ? `rgba(0, 240, 255, ${opacity})` 
          : `rgba(189, 0, 255, ${opacity * 0.8})`;

        ctx.fillStyle = baseColor;
        ctx.fill();

        // Draw active connective fibers for nodes near the front camera
        if (z2 < -radius * 0.3) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.06})`;
          ctx.lineWidth = 0.3;
          points.forEach((otherP) => {
            const dx = p.x3d - otherP.x3d;
            const dy = p.y3d - otherP.y3d;
            const dz = p.z3d - otherP.z3d;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (dist < 45 && otherP.z3d < -radius * 0.3) {
              const otherScale = focalLength / (focalLength + otherP.z3d);
              const otherProjX = otherP.x3d * otherScale + centerOffset.x;
              const otherProjY = otherP.y3d * otherScale + centerOffset.y;
              ctx.beginPath();
              ctx.moveTo(projX, projY);
              ctx.lineTo(otherProjX, otherProjY);
              ctx.stroke();
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030014] pt-20"
    >
      {/* Background Starfield */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Decorative Blur Ambient Blobs */}
      <div className="glow-blob glow-cyan w-[500px] h-[500px] -top-40 -left-40" />
      <div className="glow-blob glow-purple w-[500px] h-[500px] -bottom-40 -right-40" />

      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Copy/Text */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-neonCyan/20 bg-neonCyan/5 text-neonCyan font-mono text-xs tracking-wider"
          >
            <Terminal size={12} className="animate-pulse" />
            <span>NEURAL NETWORK LINK_ESTABLISHED</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hi, I am <span className="bg-gradient-to-r from-neonCyan via-white to-neonPurple bg-clip-text text-transparent">Rakesh Yadav</span>
            </motion.h1>

            <motion.div 
              className="h-8 md:h-10 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl font-mono text-white/70 typewriter-cursor">
                {typedText}
              </p>
            </motion.div>

            <motion.p
              className="text-base text-white/50 max-w-xl font-sans font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              An engineering specialist fusing complex Deep Learning models, high-performance Full Stack systems, physical Robotics control stacks, and premium interactive frontend experiences.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple hover:glow-cyan text-white font-medium flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-97 transition-all duration-300 group shadow-lg shadow-neonCyan/15"
            >
              <span>View Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-neonPurple/50 bg-white/5 text-white/90 font-medium flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-97 hover:bg-neonPurple/5 transition-all duration-300"
            >
              <MessageSquare size={16} />
              <span>Contact Me</span>
            </button>
            
            <a
              href="#resume"
              onClick={(e) => { e.preventDefault(); alert("Resume download trigger placeholder. Under fully operational status."); }}
              className="px-6 py-3 rounded-xl border border-white/5 hover:border-white/20 bg-transparent text-white/60 hover:text-white font-medium flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-97 transition-all duration-300"
            >
              <Download size={15} />
              <span>Download CV</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: 3D Orb Visual */}
        <div className="lg:col-span-5 w-full h-[320px] sm:h-[400px] lg:h-[500px] flex items-center justify-center relative select-none">
          {/* Neon background circle decoration */}
          <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:w-[320px] rounded-full border border-neonPurple/10 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[280px] sm:w-[365px] h-[280px] sm:w-[365px] rounded-full border border-dashed border-neonCyan/5 animate-pulse pointer-events-none" />

          {/* Spherical interactive canvas */}
          <canvas ref={orbCanvasRef} className="absolute inset-0 cursor-crosshair z-10" />

          {/* Depth Label overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/30 bg-black/60 border border-white/5 px-3 py-1 rounded-full backdrop-blur-md z-20 pointer-events-none tracking-widest uppercase">
            3D_NEURAL_SPHERE_GRID
          </div>
        </div>
      </div>
    </section>
  );
};
