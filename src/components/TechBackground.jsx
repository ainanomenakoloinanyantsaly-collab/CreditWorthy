import React from 'react';
import { motion } from 'framer-motion';

const Orb = ({ color, size, startX, startY, delay, duration }) => (
  <motion.div
    initial={{ x: startX, y: startY, scale: 0.8, opacity: 0.5 }}
    animate={{ 
      x: [startX, startX + 100, startX - 100, startX],
      y: [startY, startY - 100, startY + 100, startY],
      scale: [0.8, 1.2, 0.9, 0.8],
      opacity: [0.5, 0.8, 0.4, 0.5]
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: "easeInOut",
      delay
    }}
    style={{
      position: 'absolute',
      width: `${size}vw`,
      height: `${size}vw`,
      borderRadius: '50%',
      background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
      filter: 'blur(100px)',
      pointerEvents: 'none',
      zIndex: -1
    }}
  />
);

const TechBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: 0, 
      background: 'var(--bg-color)', // Deep background
    }}>
      {/* Mesh Gradient Fluid Orbs */}
      <Orb color="rgba(14, 165, 233, 0.4)" size={60} startX="10%" startY="-10%" delay={0} duration={20} />
      <Orb color="rgba(139, 92, 246, 0.3)" size={70} startX="60%" startY="20%" delay={2} duration={25} />
      <Orb color="rgba(56, 189, 248, 0.3)" size={50} startX="20%" startY="60%" delay={5} duration={18} />
      <Orb color="rgba(236, 72, 153, 0.15)" size={80} startX="-20%" startY="40%" delay={1} duration={30} />

      {/* Very subtle tech grid overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default TechBackground;
