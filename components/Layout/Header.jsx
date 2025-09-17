'use client'

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FaPhone, FaGlobe, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-dark/90 backdrop-blur-lg py-2 md:py-3' : 'py-3 md:py-4'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo - مبسط بدون حركات معقدة */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block flex-shrink-0"
          >
            <motion.img
              src="/LOGO_KAFU.png"
              alt="KAFU Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled 
                  ? 'h-[50px] sm:h-[60px] md:h-[70px]' 
                  : 'h-[60px] sm:h-[75px] md:h-[85px]'
              }`}
              // تأثير توهج خفيف فقط
              animate={{
                filter: [
                  "brightness(1) drop-shadow(0 0 0 transparent)",
                  "brightness(1.05) drop-shadow(0 0 8px rgba(255,136,62,0.2))",
                  "brightness(1) drop-shadow(0 0 0 transparent)"
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.a>

          {/* Desktop Navigation - مطابق للصورة بالضبط */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Phone Number مع أيقونة بيضاء */}
            <motion.a
              href="tel:+962793131000"
              whileHover={{ scale: 1.02 }}
              className={`text-white/90 text-sm flex items-center gap-2 hover:text-white transition-colors duration-200 font-medium ${
                isRTL ? 'flex-row-reverse' : ''
              }`}
            >
              <FaPhone className="text-white text-sm" />
              <span dir="ltr">+962-79-313-1000</span>
            </motion.a>

            {/* Contact Us Button - أخضر مع أيقونة WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/971504616041"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-green-500/25"
            >
              <FaWhatsapp className="text-base" />
              <span>{isRTL ? 'تواصل معنا' : 'Contact Us'}</span>
            </motion.a>

            {/* Language Toggle - أبيض مع دائرة رمادية كما في الصورة */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleLanguage}
              className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 hover:bg-gray-100 shadow-lg"
            >
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                <FaGlobe className="text-xs text-gray-600" />
              </div>
              <span>{isRTL ? 'English' : 'العربية'}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </nav>

        {/* Mobile Menu - محدث */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-navy-dark/95 backdrop-blur-lg rounded-2xl p-4 space-y-3 shadow-2xl border border-white/10">
                {/* Phone Number Mobile */}
                <motion.a
                  href="tel:+962793131000"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white/90 flex items-center gap-2 justify-center py-2 hover:text-white transition text-sm font-medium"
                >
                  <FaPhone className="text-white" />
                  <span dir="ltr">+962-79-313-1000</span>
                </motion.a>

                {/* Contact Button Mobile */}
                <motion.a
                  href="https://wa.me/971504616041"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaWhatsapp />
                  <span>{isRTL ? 'تواصل معنا' : 'Contact Us'}</span>
                </motion.a>

                {/* Language Button Mobile */}
                <motion.button
                  onClick={toggleLanguage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white text-gray-800 w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 justify-center hover:bg-gray-100 shadow-lg"
                >
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaGlobe className="text-xs text-gray-600" />
                  </div>
                  <span>{isRTL ? 'English' : 'العربية'}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}