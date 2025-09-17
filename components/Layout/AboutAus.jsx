'use client'

import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AboutSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden section-padding"
      id="about"
      
      style={{ backgroundImage: "url('/About-section-creative.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
       }}
    >
      {/* Background Stars
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div> */}

      {/* Floating Planets */}
      {/* <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: '#ff883e40',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              rotate: 360
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div> */}

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className={`text-h2 lg:text-h2-lg font-bold mb-6 text-[#FF883E] ${isRTL ? 'font-roboto' : 'font-inter'}`}
          >
            {t('aboutUs')}
          </motion.h2>
          
          {/* <motion.p 
            className={`text-body lg:text-body-lg max-w-3xl mx-auto font-bold${isRTL ? 'font-cairo' : 'font-inter'}`}
            style={{ color: '#8c8c8c'  }}
          >
            {t('aboutSubtitle')}
          </motion.p> */}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Side - Team Image */}
          {/* <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/About-section.png" 
                alt="Kafu Agency Team"
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-full h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl rounded-2xl"
                style={{ display: 'none' }}
              >
                
              </div> */}
              
              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
             
            </div> */}

            {/* Decorative Elements */}
            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -left-4 w-8 h-8 border-2 border-[#ff883e] rounded-full opacity-60"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#ff883e] rounded-full opacity-80"
            />
          </motion.div> */}

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <h3 className={`text-h3 lg:text-h2 font-bold text-white mb-4 ${isRTL ? 'font-roboto' : 'font-inter'}`}>
                {isRTL ? (
                  <>
                   {' '}وكالة  <span style={{ color: '#ff883e' }}>Kafu</span> تؤمن بقوة التأثير {' '}
                   وتولد من شغف الابتكار
                  </>
                ) : (
                  <>
                       <span style={{ color: '#ff883e' }}>Kafu </span>{' '}
 Agency believes in the of {' '}
                     influence and is driven by a passion for innovation.
                  </>
                )}
              </h3>
              <h4 className={`text-h4 font-bold text-white  mb-6 ${isRTL ? 'font-roboto' : 'font-inter'}`}>
                {isRTL ? (
                  <>
                  
                  </>
                ) : (
                  <>
                     {' '}
                  </>
                )}
              </h4>
            </div>

            {/* Description */}
            <p className={`text-body leading-relaxed ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
               style={{ color: '#F5F5F5' }}>
              {t('companyDescription')}
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/about-details"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ 
                  background: 'linear-gradient(135deg, #ff883e, #ff3d7f)',
                }}
              >
                {isRTL ? 'اعرف المزيد' : 'SEE MORE'}
                {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}