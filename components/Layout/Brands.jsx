'use client'

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';

export default function BrandsSection() {
  const { t, isRTL, language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // البيانات مع اللوجوهات الجديدة
  const brandsData = {
    ar: [
      {
        name: "BAIC",
        logo: "/componies-logos/BAIC.png",
        position: { top: '15%', left: '8%' },
        size: 'w-24 h-24'
      },
      {
        name: "Texas", 
        logo: "/componies-logos/TEXAS.png",
        position: { top: '20%', right: '12%' },
        size: 'w-20 h-20'
      },
      {
        name: "TikTok",
        logo: "/componies-logos/TIKTOK.png",
        position: { top: '15%', left: '50%', transform: 'translateX(-50%)' },
        size: 'w-32 h-16'
      },
      {
        name: "Astoria",
        logo: "/componies-logos/ASTORIA.png",
        position: { top: '45%', left: '15%' },
        size: 'w-28 h-20'
      },
      {
        name: "Global Village",
        logo: "/componies-logos/Global village.png",
        position: { top: '45%', right: '10%' },
        size: 'w-26 h-22'
      },
     
    ],
    en: [
      {
        name: "BAIC",
        logo: "/componies-logos/BAIC.png",
        position: { top: '15%', left: '8%' },
        size: 'w-24 h-24'
      },
      {
        name: "Texas",
        logo: "/componies-logos/TEXAS.png",
        position: { top: '20%', right: '12%' },
        size: 'w-20 h-20'
      },
      {
        name: "TikTok",
        logo: "/componies-logos/TIKTOK.png",
        position: { top: '15%', left: '50%', transform: 'translateX(-50%)' },
        size: 'w-32 h-16'
      },
      {
        name: "Astoria",
        logo: "/componies-logos/ASTORIA.png",
        position: { top: '45%', left: '15%' },
        size: 'w-28 h-20'
      },
      {
        name: "Global Village",
        logo: "/componies-logos/Global village.png",
        position: { top: '45%', right: '10%' },
        size: 'w-26 h-22'
      },
     
    ]
  };

  const brands = brandsData[language] || brandsData.en;

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      id="brands"
      style={{
        background: 'linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #0f4c75 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-20"
        >
          {/* Title with Circle Design */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'rgba(255, 136, 62, 0.8)' }}
              >
                ⭐
              </motion.div>
              <h2 className={`text-h2 lg:text-h2-lg font-bold text-white ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'عملاؤنا المحبوبون' : 'OUR BELOVED CLIENTS'}
              </h2>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`text-body lg:text-body-lg text-white/90 max-w-4xl mx-auto leading-relaxed ${isRTL ? 'font-cairo' : 'font-inter'}`}
          >
            {isRTL 
              ? 'نتشرف بالتعاون مع مجموعة متنوعة من العملاء الذين يثقون بنا لتحقيق رؤاهم. قصص نجاحهم تلهمنا لدفع الحدود وتحقيق نتائج استثنائية.'
              : 'We are honored to collaborate with a diverse range of clients who trust us to bring their visions to life. Their success stories inspire us to push boundaries and deliver exceptional results.'
            }
          </motion.p>
        </motion.div>

        {/* Brands Logos Scattered */}
        <div className="relative min-h-[500px] lg:min-h-[600px]">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1, 
                rotate: 0 
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.8 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="absolute cursor-pointer group"
              style={brand.position}
            >
              {/* Logo Container */}
              <div className={`${brand.size} relative`}>
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 255, 255, 0.1)',
                      '0 0 30px rgba(255, 136, 62, 0.3)',
                      '0 0 20px rgba(255, 255, 255, 0.1)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  className="absolute inset-0 rounded-lg"
                />
                
                {/* Logo */}
                <div className="relative w-full h-full bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-2xl group-hover:bg-white transition-all duration-300">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-lg"
                    style={{ display: 'none' }}
                  >
                    {brand.name.substring(0, 2)}
                  </div>
                </div>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-navy-dark/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg pointer-events-none"
                >
                  {brand.name}
                </motion.div>
              </div>

              {/* Floating Animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16 relative z-20"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-white">
            <div className="text-center">
              <motion.span 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1, delay: 2 }}
                className={`text-4xl lg:text-5xl font-bold block mb-2 ${isRTL ? 'font-cairo' : 'font-sora'}`}
                style={{ color: '#ff883e' }}
              >
                {brands.length}+
              </motion.span>
              <p className={`text-sm text-white/80 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'شريك مميز' : 'Trusted Partners'}
              </p>
            </div>

            <div className="w-1 h-12 bg-white/30 hidden sm:block" />

            <div className="text-center">
              <motion.span 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1, delay: 2.2 }}
                className={`text-4xl lg:text-5xl font-bold block mb-2 ${isRTL ? 'font-cairo' : 'font-sora'}`}
                style={{ color: '#ff883e' }}
              >
                100%
              </motion.span>
              <p className={`text-sm text-white/80 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'رضا العملاء' : 'Client Satisfaction'}
              </p>
            </div>

            <div className="w-1 h-12 bg-white/30 hidden sm:block" />

            <div className="text-center">
              <motion.span 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1, delay: 2.4 }}
                className={`text-4xl lg:text-5xl font-bold block mb-2 ${isRTL ? 'font-cairo' : 'font-sora'}`}
                style={{ color: '#ff883e' }}
              >
                5+
              </motion.span>
              <p className={`text-sm text-white/80 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'سنوات خبرة' : 'Years Experience'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}