'use client'

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaArrowUp ,
  FaTiktok, 
   FaLinkedinIn
} from 'react-icons/fa';

export default function Footer() {
  const { t, isRTL } = useLanguage();  
    const [isDesktop, setIsDesktop] = useState(false);
useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  const currentYear = new Date().getFullYear();

  // Social links
  const socialLinks = [
    {
      icon: FaWhatsapp,
      href: "https://wa.me/+971504616041",
      color: "hover:text-[#25D366]",
      label: "WhatsApp"
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/kafu.marketing",
      color: "hover:text-[#E4405F]",
      label: "Instagram"
    },
    {
      icon: FaEnvelope,
      href: isDesktop 
    ? 'https://mail.google.com/mail/?view=cm&fs=1&to=marketingkafu@gmail.com'
    : 'mailto:marketingkafu@gmail.com', 
      color: "hover:text-[#ff883e]",
      label: "Email"
    },
     {
        icon: FaTiktok,
        href: 'https://www.tiktok.com/@kafu.marketing?_t=ZS-901OYIsjVxM&_r=1', 
        label: 'TikTok',
        bgColor: 'bg-black/60',
        textColor: 'text-white hover:text-gray-300'
      },
      {
        icon: FaLinkedinIn,
        href: 'https://www.linkedin.com/company/109021030/admin/page-posts/published/', // ضع رابط اللينكد إن هنا
        label: 'LinkedIn',
        bgColor: 'bg-black/60',
        textColor: 'text-blue-500 hover:text-blue-600'
      }
  ];

  // Contact info
  const contactInfo = [
    {
      icon: FaPhone,
      text: "+971509256578",
      href: "tel:+971509256578",
      label: t('phone')
    },
    {
      icon: FaEnvelope,
      text: "marketingkafu@gmail.com",
      href: isDesktop 
    ? 'https://mail.google.com/mail/?view=cm&fs=1&to=marketingkafu@gmail.com'
    : 'mailto:marketingkafu@gmail.com',
      label: t('email')
    },
    {
      icon: FaMapMarkerAlt,
      text: t('locationText'),
      href: null,
      label: t('location')
    }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Top Shadow for smooth transition */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,0.95) 10%,
            rgba(0,0,0,0.8) 25%, 
            rgba(0,0,0,0.5) 50%,
            rgba(0,0,0,0.2) 75%,
            transparent 100%
          )`
        }}
      />

      {/* Main Gradient Background - متوافق مع باقي الأقسام */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 10% 90%, rgba(232, 124, 57, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 90% 80%, rgba(212, 81, 19, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, rgba(255, 136, 62, 0.1) 0%, transparent 60%)
          `
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 136, 62, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(212, 81, 19, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%'
        }}
      />

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E87C39" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <h3 className={`text-xl lg:text-2xl font-semibold mb-4 ${
                isRTL ? 'font-cairo text-right' : 'font-sora text-left'
              }`}
              style={{ color: '#E87C39' }}>
                {t('ourVision')}
              </h3>
              <p className={`leading-relaxed text-sm lg:text-base ${
                isRTL ? 'font-cairo text-right' : 'font-inter text-left'
              }`}
              style={{ color: '#e0e0e0' }}>
                {t('visionText')}
              </p>
            </motion.div>

            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col items-center justify-center"
            >
              {/* Logo with glow effect */}
              <div className="relative mb-6">
                <motion.img
                  src="/LOGO_KAFU.png"
                  alt="KAFU Logo"
                  className="h-32 lg:h-36 w-auto object-contain"
                  animate={{
                    filter: [
                      "brightness(1) drop-shadow(0 0 0 transparent)",
                      "brightness(1.1) drop-shadow(0 0 20px rgba(232, 124, 57, 0.4))",
                      "brightness(1) drop-shadow(0 0 0 transparent)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Glow background */}
                <div className="absolute inset-0 blur-xl -z-10 rounded-full" 
                     style={{ background: 'radial-gradient(circle, rgba(232, 124, 57, 0.2) 0%, transparent 70%)' }} />
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 rounded-full border
                      flex items-center justify-center text-white text-xl
                      transition-all duration-300
                      ${social.color}
                    `}
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(232, 124, 57, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(232, 124, 57, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(232, 124, 57, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(232, 124, 57, 0.3)';
                    }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`lg:col-span-4 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <h3 className={`text-xl lg:text-2xl font-semibold mb-6 text-white ${
                isRTL ? 'font-cairo' : 'font-sora'
              }`}>
                {t('contactUs')}
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className={`flex items-center gap-3 hover:text-white transition-colors duration-300 ${
                          isRTL ? 'flex-row-reverse' : ''
                        }`}
                        style={{ color: '#e0e0e0' }}
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                             style={{ 
                               backgroundColor: 'rgba(232, 124, 57, 0.15)',
                               color: '#E87C39'
                             }}
                             onMouseEnter={(e) => {
                               e.currentTarget.style.backgroundColor = 'rgba(232, 124, 57, 0.3)';
                             }}
                             onMouseLeave={(e) => {
                               e.currentTarget.style.backgroundColor = 'rgba(232, 124, 57, 0.15)';
                             }}>
                          <item.icon className="text-sm" />
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className={`text-xs mb-1 ${isRTL ? 'font-cairo' : 'font-inter'}`}
                             style={{ color: '#a0a0a0' }}>
                            {item.label}
                          </p>
                          <p className={`text-sm lg:text-base ${isRTL ? 'font-cairo' : 'font-inter'} ${
                            item.text.includes('@') || item.text.includes('+') ? 'dir-ltr' : ''
                          }`}>
                            {item.text}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className={`flex items-center gap-3 ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`} style={{ color: '#e0e0e0' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                             style={{ 
                               backgroundColor: 'rgba(232, 124, 57, 0.15)',
                               color: '#E87C39'
                             }}>
                          <item.icon className="text-sm" />
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className={`text-xs mb-1 ${isRTL ? 'font-cairo' : 'font-inter'}`}
                             style={{ color: '#a0a0a0' }}>
                            {item.label}
                          </p>
                          <p className={`text-sm lg:text-base ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t" style={{ borderColor: 'rgba(232, 124, 57, 0.2)' }}>
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                                className={`text-sm ${
                  isRTL ? 'font-cairo text-center md:text-right' : 'font-inter text-center md:text-left'
                }`}
                style={{ color: '#a0a0a0' }}
              >
                © {currentYear} KAFU. {t('allRightsReserved')}
              </motion.p>

              {/* Scroll to Top Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="group w-12 h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #E87C39, #d45113)',
                  boxShadow: '0 4px 15px rgba(232, 124, 57, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(232, 124, 57, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(232, 124, 57, 0.3)';
                }}
                aria-label="Scroll to top"
              >
                <FaArrowUp className="text-sm group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1" 
           style={{ background: 'linear-gradient(90deg, transparent 0%, #E87C39 20%, #d45113 50%, #E87C39 80%, transparent 100%)' }} />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 2 === 0 ? '#E87C39' : '#d45113',
              opacity: 0.2
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </footer>
  );
}