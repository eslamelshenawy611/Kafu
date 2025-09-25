// components/SplashScreen/SplashScreen.jsx
'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 33.33;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) {
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: '#000000'
          }}
        >
          {/* خلفية متحركة بالألوان المحددة */}
          <div className="absolute inset-0">
            {/* تدرجات متحركة */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, #ff883e33 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, #ff883e33 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, #ff883e33 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* دوائر متحركة بالألوان */}
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, #ff883e22 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                x: [-100, 100, -100],
                y: [-50, 50, -50],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, #fef8f422 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{
                x: [100, -100, 100],
                y: [50, -50, 50],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* نمط الشبكة */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(#c4c4c4 1px, transparent 1px),
                  linear-gradient(90deg, #c4c4c4 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="relative"
            >
              {/* Logo مع تأثير Glow */}
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 30px #ff883e66)",
                    "drop-shadow(0 0 50px #ff883e99)",
                    "drop-shadow(0 0 30px #ff883e66)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <img
                  src="/LOGO_KAFU.png"
                  alt="Logo"
                  className="w-32 h-32 md:w-48 md:h-48 object-contain"
                />
              </motion.div>

              {/* دائرة متحركة حول اللوجو */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: '#ff883e33' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 md:w-80">
              {/* شريط التحميل الخلفي */}
              <div 
                className="w-full h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: '#c4c4c422' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #ff883e, #ff883ecc)',
                    boxShadow: '0 0 20px #ff883e66'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* نص التحميل */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm mt-4 font-light tracking-wider"
                style={{ color: '#c4c4c4' }}
              >
                {Math.round(loadingProgress)}%
              </motion.p>
            </div>

            {/* نص متحرك */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center"
            >
              <h2 
                className="text-xl md:text-2xl font-bold mb-2 tracking-wider"
                style={{ color: '#fef8f4' }}
              >
                KAFU
              </h2>
              <p 
                className="text-sm md:text-base"
                style={{ color: '#c4c4c4' }}
              >
                Explore Our World
              </p>
            </motion.div>
          </div>

          {/* جزيئات متحركة */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? '#ff883e44' : '#fef8f422',
                }}
                animate={{
                  y: [-20, -60, -20],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}