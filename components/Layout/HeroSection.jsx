'use client'

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import'../../app/globals.css';
export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [activeService, setActiveService] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const services = [
    { key: 'it', label: 'Information Technology' },
    { key: 'digitalMarketing', label: 'Digital Marketing' },
    { key: 'branding', label: 'Branding & Advertising' },
    { key: 'socialMedia', label: 'Social Media' },
    { key: 'production', label: 'Production' }
  ];

  const socialLinks = [
   
    { 
      icon: FaInstagram, 
      href: 'https://www.instagram.com/kafu.marketing?igsh=MWhidHlxYWs1NzN6bA%3D%3D&utm_source=qr', 
      label: 'Instagram',
      bgColor: 'bg-black/60',
      textColor: 'text-pink-500 hover:text-pink-600' 
    },
    { 
      icon: FaWhatsapp, 
      href: 'https://wa.me/971504616041', 
      label: 'WhatsApp',
      bgColor: 'bg-black/60',
 textColor: 'text-green-500 hover:text-green-600'    },
    { 
      icon: FaEnvelope, 
      href: 'mailto:marketingkafu@gmail.com', 
      label: 'Email',
      bgColor: 'bg-black/60',
  textColor: 'text-orange-500 hover:text-orange-600'    },
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* <div className="absolute inset-0 bg-black" /> */}
        
        {shouldLoadVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            style={{ 
              opacity: videoLoaded ? 1 : 0, 
              transition: 'opacity 2s ease-in-out' 
            }}
            loading="lazy"
          >
            <source src="/videos/Astronaut_s_Cosmic_Swing_Animation.mp4" type="video/mp4" />
            <source src="/videos/config.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,17,31,0.3)] to-[rgba(6,17,31,0.6)]" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 lg:px-10">
        <div className={`max-w-[840px] ${isRTL ? 'mr-auto lg:mr-[120px] text-right' : 'lg:ml-[120px] text-left'}`}>
          <div className="py-20 md:py-24">
            
            {/* Main Title - مع اللون الجديد */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <div className={`${isRTL ? 'font-cairo text-right' : 'font-sora text-left'}`}>
                {/* EXPLORE OUR */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-2"
                >
                  <span className="text-white text-2xl md:text-4xl lg:text-5xl font-normal tracking-[0.2em] uppercase">
                    {isRTL ? 'اكتشف عالمنا' : 'EXPLORE OUR'}
                  </span>
                </motion.div>

                {/* PLANET + LIMITLESS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
                >
                  {/* PLANET */}
                  <span className="text-white text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide">
                    {isRTL ? 'كوكب' : 'PLANET'}
                  </span>

                  {/* LIMITLESS - مع اللون الجديد #FF883E */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative inline-block"
                  >
                    <div 
                      className="px-6 py-3 md:px-8 md:py-4 rounded-2xl relative overflow-hidden"
                      style={{
                        backgroundColor: '#FF883E'
                      }}
                    >
                      <span className="text-white text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide relative z-10">
                        {isRTL ? 'اللامحدود' : 'LIMITLESS'}
                      </span>
                      
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Services Chips - بالحجم واللون والخلفية المطلوبة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`flex flex-wrap gap-1 md:gap-2 mb-12 ${isRTL ? 'justify-end lg:justify-start' : 'justify-start'}`}
            >
              {services.map((service, index) => (
                <motion.button
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveService(service.key === activeService ? null : service.key)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeService === service.key
                      ? 'bg-[#FF883E] text-white shadow-lg'
                      : 'bg-black/60 backdrop-blur-sm text-white/90 hover:bg-black/70 hover:text-white'
                  }`}
                >
                  {service.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Social Media Icons - بالألوان المطلوبة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`flex gap-3 ${isRTL ? 'justify-end lg:justify-start' : 'justify-start'}}`}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center public/videos/footer image.png transition-all duration-300 ${social.bgColor} ${social.textColor} shadow-lg hover:spin-once`}
                >
                  <social.icon size={20} /> 
                </motion.a>
              ))}
            </motion.div>

           
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/80 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}