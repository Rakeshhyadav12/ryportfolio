import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ArrowRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hi there! I am Rakesh's autonomous Portfolio AI Agent. Ask me anything about his skills, projects, or background!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { label: "What is your main stack?", query: "What is your main technology stack?" },
    { label: "Explain MediSight AI", query: "Can you explain the MediSight AI project?" },
    { label: "Are you open to relocate?", query: "Are you open to relocation or remote work?" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const triggerAIResponse = (userQuery: string) => {
    setIsTyping(true);

    // Dynamic responses tailored to Rakesh's portfolio
    let responseText = "";
    const lowerQuery = userQuery.toLowerCase();

    if (lowerQuery.includes("stack") || lowerQuery.includes("skills") || lowerQuery.includes("technology")) {
      responseText = "Rakesh works across Full Stack and AI. His main toolkit consists of PyTorch/TensorFlow, Python/FastAPI for AI systems, and React/Next.js/TS for creative frontend engineering. He is also fluent in ROS2 for Robotics pipelines.";
    } else if (lowerQuery.includes("medisight") || lowerQuery.includes("medical") || lowerQuery.includes("radiology")) {
      responseText = "MediSight AI is a premium neural vision transformer system that classifies lung/brain diagnostic anomalies on X-Rays/CTs in under 3 seconds. It boasts a 98.4% model accuracy and features high-fidelity WebSockets streaming.";
    } else if (lowerQuery.includes("relocate") || lowerQuery.includes("remote") || lowerQuery.includes("work")) {
      responseText = "Yes! Rakesh is open to hybrid opportunities in major tech hubs (like Bengaluru, Delhi-NCR, Mumbai) or full-time remote roles globally. Reach out via the Contact form to schedule an interview!";
    } else {
      responseText = "Excellent question! Rakesh is a passionate builder. If you'd like to collaborate on high-performance AI models or modern frontend portals, shoot a message using the Contact section below!";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    triggerAIResponse(text);
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[380px] h-[480px] rounded-2xl border border-neonCyan/20 bg-darkBg/95 backdrop-blur-xl shadow-glass shadow-neonCyan/10 flex flex-col overflow-hidden mb-4"
          >
            {/* Widget Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-neonCyan/10 to-neonPurple/10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-neonCyan rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
                <span className="font-orbitron text-xs font-semibold tracking-wider text-white">RAKESH_PORTFOLIO_AGENT_V1.0</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-white/50 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-darkBg/30"
            >
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-neonCyan/20 to-neonPurple/20 border border-neonCyan/30 text-white rounded-br-none'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed font-sans">{msg.text}</p>
                    <span className="text-[9px] text-white/30 block text-right mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-neonCyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-neonCyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-neonCyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions Grid */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-black/20 border-t border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neonCyan block mb-1">Quick Prompts</span>
                <div className="flex flex-col gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.query)}
                      className="text-[11px] text-white/70 hover:text-white bg-white/5 border border-white/5 hover:border-neonCyan/30 rounded-lg py-1.5 px-3 text-left transition-all duration-200 flex items-center justify-between group active:scale-98"
                    >
                      <span className="font-sans font-medium">{q.label}</span>
                      <ArrowRight size={10} className="text-neonCyan opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Message Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputVal); }}
              className="p-3 bg-black/40 border-t border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a neural query..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-neonCyan/50 rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2 bg-gradient-to-r from-neonCyan to-neonPurple rounded-xl text-white hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-neonCyan to-neonPurple hover:glow-cyan flex items-center justify-center text-white shadow-lg shadow-neonCyan/20 active:scale-90 hover:scale-105 transition-all"
        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
        whileHover={{ scale: 1.05 }}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </motion.button>
    </div>
  );
};
