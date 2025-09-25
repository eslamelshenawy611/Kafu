'use client'

import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';

// --- مكون النجم (Star) ---
const Star = () => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 0.5}px`,
      height: `${Math.random() * 2 + 0.5}px`,
    }}
    animate={{ opacity: [0.1, 0.8, 0.1] }}
    transition={{ 
      duration: Math.random() * 3 + 2, 
      delay: Math.random() * 3, 
      repeat: Infinity 
    }}
  />
);

// --- الخلفية المتحركة ---
const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* 1. السديم الناري المتحرك */}
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 100%, #ff883e 0%, #d45113 25%, transparent 60%),
          radial-gradient(ellipse at 80% 90%, #fef8f4 0%, #ffc9a9 20%, transparent 50%),
          radial-gradient(ellipse at 20% 85%, #ffc9a9 0%, #d45113 20%, transparent 55%)
        `,
        backgroundSize: '150% 150%',
      }}
      animate={{ 
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    {/* 2. شرائط الضوء المتموجة (Aurora) */}
    <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
      <defs>
        <filter id="aurora-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </defs>
      <motion.path
        d="M -100,50 C 300,150 500,-50 900,100 S 1300,250 1700,50"
        fill="none"
        stroke="#4ade80" // أخضر
        strokeWidth="40"
        filter="url(#aurora-blur)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 10, delay: 1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.path
        d="M 1700,200 C 1300,300 1100,100 700,250 S 300,0 -100,200"
        fill="none"
        stroke="#ff883e" // برتقالي
        strokeWidth="40"
        filter="url(#aurora-blur)"
        initial={{ pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 10, delay: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </svg>

    {/* 3. النجوم */}
    {[...Array(200)].map((_, i) => <Star key={`star-${i}`} />)}

    {/* 4. الشبكة الهندسية المتحركة */}
    <motion.svg 
      className="absolute inset-0 w-full h-full opacity-40" 
      preserveAspectRatio="xMidYMid slice"
      animate={{ opacity: [0.1, 0.4, 0.1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
        <path d="M 20 20 L 300 250 L 20 500 L 20 20" stroke="white" strokeWidth="0.5" fill="none" />
        <path d="M 900 80 L 1200 300 L 900 520" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="300" cy="250" r="3" fill="white" />
        <circle cx="900" cy="80" r="2" fill="white" />
        <circle cx="900" cy="520" r="2" fill="white" />
    </motion.svg>
  </div>
);

// --- مكون الفاصل العلوي ---
// const TopShapeDivider = () => (
//     <div className="custom-shape-divider-top-1758460901" style={{zIndex: 5}}>
//         <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
//             <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
//             <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
//         </svg>
//     </div>
// );

// --- مكون الفاصل السفلي ---
// const BottomShapeDivider = () => (
//  <div className="custom-shape-divider-bottom-1758482505">
//     <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//         <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
//         <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
//         <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
//     </svg>
// </div>
// );


export default function AboutSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden section-padding bg-black  mx-2" 
      id="about"

  

    >
      <AnimatedBackground />
      <div className="container-fluid relative z-10 flex items-center justify-center min-h-screen  ">
        
        {/* حاوية المحتوى الفعلية */}
        <div>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.h2
                className={`text-h2 lg:text-h2-lg font-bold mb-6 text-white ${isRTL ? 'font-roboto' : 'font-inter'}`}
                style={{ textShadow: '0 2px 15px rgba(255, 136, 62, 0.6)' }}
              >
                {t('aboutUs')}
              </motion.h2>
              <motion.p 
                className={`text-body lg:text-body-lg max-w-3xl mx-auto font-bold text-gray-300 ${isRTL ? 'font-roboto' : 'font-inter'}`}
              >
                {t('aboutSubtitle')}
              </motion.p>
            </motion.div>

            {/* --- Main Content --- */}
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-stretch bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                
                {/* Image Column */}
                <motion.div
                  className="w-full md:w-2/5 relative min-h-[300px] md:min-h-0"
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                    src="/aboutus.png"
                    alt={t('aboutUsImageAlt', { defaultValue: 'Kafu agency creative team' })}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Text Column */}
                <motion.div
                  className={`w-full md:w-3/5 flex flex-col justify-center space-y-6 p-8 md:p-12 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
                  initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div>
                    <h3 className={`text-h3 lg:text-h2 font-bold text-white mb-4 ${isRTL ? 'font-roboto' : 'font-inter'}`}>
                        {/* ... Your h3 content ... */}
                    </h3>
                  </div>
                  <p className={`text-body leading-relaxed ${isRTL ? 'font-roboto' : 'font-inter'}`} style={{ color: '#f0f0f0' }}>
                    {t('companyDescription')}
                  </p>
                </motion.div>
              </div>
            </div>
        </div>
      </div>
  
<div 
  className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
  style={{
    background: `
      linear-gradient(to top, 
        rgba(0,0,0,1) 0%, 
        rgba(0,0,0,0.95) 10%,
        rgba(0,0,0,0.8) 25%, 
        rgba(0,0,0,0.5) 50%,
        rgba(0,0,0,0.2) 75%,
        transparent 100%
      )
    `
  }}
/>

      {/* --- خط زخرفي اختياري للانتقال --- */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px z-21"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #ff883e 20%, #d45113 50%, #ff883e 80%, transparent 100%)',
          opacity: 0.3
        }}
      />
                  <div
        className="absolute top-0 left-0 right-0 h-16 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.02) 90%, transparent 100%)",
          // boxShadow: "0 -10px 30px rgba(0,0,0,0.8)",
        }}
      />
    </section>
  );
}