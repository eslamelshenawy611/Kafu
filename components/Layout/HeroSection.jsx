'use client'

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaWhatsapp,
  FaEnvelope,
  FaTiktok,
  FaLinkedinIn
} from 'react-icons/fa';
import '../../app/globals.css'; 

export default function HeroSection() {
  const { t, isRTL, language } = useLanguage(); // إضافة language
  const [activeService, setActiveService] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef(null);
  
  // Check desktop device
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024); 
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Services content with translations
  const servicesContent = {
    en: [
      { key: 'it', label: 'Digital Marketing' },
      { key: 'digitalMarketing', label: 'Influencer Strategy' },
      { key: 'branding', label: 'Event Planning & Management' },
      { key: 'socialMedia', label: 'Media' },
    ],
    ar: [
      { key: 'it', label: 'التسويق الرقمي' },
      { key: 'digitalMarketing', label: 'استراتيجية المؤثرين' },
      { key: 'branding', label: 'تخطيط وإدارة الفعاليات' },
      { key: 'socialMedia', label: 'الإعلام' },
    ]
  };

  // Get services based on current language - إذا لم يكن language متاح، استخدم isRTL
  const services = language ? servicesContent[language] : (isRTL ? servicesContent.ar : servicesContent.en);

  // Social links
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
      href: 'https://wa.me/+971504616041', 
      label: 'WhatsApp',
      bgColor: 'bg-black/60',
      textColor: 'text-green-500 hover:text-green-600'    
    },
    { 
      icon: FaEnvelope, 
      href: isDesktop 
        ? 'https://mail.google.com/mail/?view=cm&fs=1&to=marketingkafu@gmail.com'
        : 'mailto:marketingkafu@gmail.com',
      label: 'Email',
      bgColor: 'bg-black/60',
      textColor: 'text-orange-500 hover:text-orange-600'    
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
      href: 'https://www.linkedin.com/company/109021030/admin/page-posts/published/', 
      label: 'LinkedIn',
      bgColor: 'bg-black/60',
      textColor: 'text-blue-500 hover:text-blue-600'
    }
  ];

  // فحص دعم الفيديو والاتصال
  useEffect(() => {
    const checkVideoSupport = () => {
      const isMobile = window.innerWidth < 768;
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      // عدم تشغيل الفيديو على الاتصالات البطيئة
      if (connection && connection.effectiveType) {
        const slowConnections = ['slow-2g', '2g'];
        if (slowConnections.includes(connection.effectiveType)) {
          setShowVideo(false);
          return;
        }
      }

      // فحص دعم تنسيقات الفيديو
      const video = document.createElement('video');
      const canPlayWebM = video.canPlayType('video/webm').replace(/no/, '');
      const canPlayMP4 = video.canPlayType('video/mp4').replace(/no/, '');
      
      if (!canPlayWebM && !canPlayMP4) {
        setShowVideo(false);
        return;
      }
      
      // تشغيل الفيديو بعد تأخير بسيط لتحسين الأداء
      setTimeout(() => {
        setShowVideo(true);
      }, isMobile ? 2000 : 1000);
    };

    checkVideoSupport();

    // إعادة الفحص عند تغيير حجم الشاشة
    window.addEventListener('resize', checkVideoSupport);
    return () => window.removeEventListener('resize', checkVideoSupport);
  }, []);

  // مراقبة تحميل الفيديو
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;

      // مراقبة تقدم التحميل
      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          if (duration > 0) {
            setLoadingProgress((bufferedEnd / duration) * 100);
          }
        }
      };

      // معالجة تحميل الفيديو بنجاح
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        setLoadingProgress(100);
      };

      // معالجة الأخطاء
      const handleError = (e) => {
        console.error('Video loading error:', e);
        setHasVideoError(true);
        setShowVideo(false);
      };

      video.addEventListener('progress', handleProgress);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      // محاولة تشغيل الفيديو
      video.play().catch(err => {
        console.error('Video autoplay failed:', err);
      });

      return () => {
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [showVideo]);

  return (
    <>
      <section 
        className="relative flex items-center overflow-hidden seamless-sections hero-section"
        style={{ 
          minHeight: "100vh",
          height: "100vh"
        }}
      >
        {/* طبقة الخلفية */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          
          {/* صورة Poster الأساسية (تظهر دائماً) */}
          <img
            src="/hero-poster.png"
            alt="Hero Background"
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="eager"
          />

          {/* الفيديو */}
          {showVideo && !hasVideoError && (
            <>
              <video
                ref={videoRef}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 
                  ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                poster="/hero-poster.png"
              >
                {/* WebM أولاً لأنه أصغر حجماً وأفضل جودة */}
                <source src="/videos/hero-bg.webm" type="video/webm" />
                {/* MP4 للتوافق الأوسع */}
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
              </video>

              {/* شريط تقدم التحميل */}
              {!isVideoLoaded && loadingProgress < 100 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/50">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              {/* مؤشر التحميل */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-orange-500"></div>
                    <p className="text-white/80 text-xs md:text-sm">{Math.round(loadingProgress)}%</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* تدرج Overlay لتحسين قراءة النص */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          
          {/* Overlay إضافي للجزء العلوي */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
        </div>

        {/* المحتوى الرئيسي */}
        <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1320px] mx-auto">
            <div className={`max-w-full md:max-w-[600px] lg:max-w-[840px] ${
              isRTL 
                ? 'mr-auto md:mr-8 lg:mr-[120px] text-right' 
                : 'ml-auto md:ml-8 lg:ml-[120px] text-left'
            }`}>

              {/* العنوان الرئيسي */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 md:mb-8 lg:mb-10"
              >
                <div className={`${isRTL ? 'font-roboto text-right' : 'font-cairo text-left'}`}>
                  {/* EXPLORE OUR */}
                  <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-1 md:mb-2"
                  >
                    <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-[0.15em] md:tracking-[0.2em] uppercase drop-shadow-lg">
                      {isRTL ? 'اكتشف' : 'EXPLORE OUR'}
                    </span>
                  </motion.div>

                  {/* WORLD */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide drop-shadow-xl">
                      {isRTL ? 'عالمنا' : 'World'}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* أزرار الخدمات */}
              <div
                className={`flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10 lg:mb-12 ${
                  isRTL ? "justify-end md:justify-start" : "justify-start"
                }`}
              >
                {services.map((service, index) => (
                  <div
                    key={service.key}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm md:text-base font-medium rounded-lg bg-black/60 text-white/90 border border-white/10"
                    style={{ cursor: "default" }}
                  >
                    {service.label}
                  </div>
                ))}
              </div>

              {/* أيقونات وسائل التواصل الاجتماعي */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.8,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                className={`flex gap-3 sm:gap-4 ${
                  isRTL ? 'justify-end md:justify-start' : 'justify-start'
                }`}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { opacity: 0, y: 25, scale: 0.7 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 18, 
                          duration: 0.3 
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, 12, -12, 0],
                      y: -6,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-200 ${social.bgColor} ${social.textColor} shadow-lg backdrop-blur-sm border border-white/10 hover:border-white/20`}
                  >
                    <social.icon 
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-200 group-hover:scale-110" 
                    />
                    
                    {/* Tooltip - مخفي على الموبايل */}
                    <span className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>

            </div>
          </div>
        </div>

        {/* التدرج السفلي للانتقال السلس */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to top, 
              rgba(0,0,0,1) 0%, 
              rgba(0,0,0,0.95) 10%,
              rgba(0,0,0,0.8) 25%, 
              rgba(0,0,0,0.5) 50%,
              rgba(0,0,0,0.2) 75%,
              transparent 100%
            )`
          }}
        />

      </section>

      {/* CSS إضافي للموبايل في global.css */}
      <style jsx global>{`
        /* تحسين الخطوط على الموبايل */
        @media (max-width: 640px) {
          .hero-section {
            min-height: 100vh;
            min-height: -webkit-fill-available;
            min-height: 100dvh;
          }
        }

        /* إصلاح مشكلة viewport height على iOS */
        @supports (-webkit-touch-callout: none) {
          .hero-section {
            min-height: -webkit-fill-available;
          }
        }

        /* تحسين أداء الفيديو على الموبايل */
        @media (max-width: 768px) {
          video {
            object-position: center center;
          }
        }

        /* منع التكبير عند النقر المزدوج على الأزرار */
        @media (max-width: 768px) {
          button {
            touch-action: manipulation;
          }
        }
      `}</style>
    </>
  );
}