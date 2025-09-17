"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaRocket, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function ServicesSection() {
  const { t, isRTL } = useLanguage();
  const [hoveredService, setHoveredService] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, visible: false });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const planetRefs = useRef({});
  const resizeTimeoutRef = useRef(null);
  const [cardPersistent, setCardPersistent] = useState(false);
  
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // ⭐ تحديث constants للكارد لتدعم جميع الأحجام
  const CARD_CONFIG = {
    width: isMobile ? Math.min(280, viewportSize.width - 40) : 320, // عرض متجاوب
    height: isMobile ? 380 : 450,
    padding: isMobile ? 10 : 20,
  };

  // ⭐ تحسين client-side state initialization
  useEffect(() => {
    setIsClient(true);
    
    const updateViewportSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setViewportSize({ width, height });
        
        // تحديد نوع الجهاز
        setIsMobile(width < 768); // sm breakpoint
        setIsTablet(width >= 768 && width < 1024); // md to lg
      }
    };
    
    updateViewportSize();
    
    // تحسين event listener مع debouncing
    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updateViewportSize, 150);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // ⭐ تحسين حساب موضع الكارد
  const calculateCardPosition = useCallback((planetElement) => {
    if (!isClient || !planetElement || typeof window === 'undefined') {
      return;
    }

    try {
      const planetRect = planetElement.getBoundingClientRect();
      const planetCenterX = planetRect.left + planetRect.width / 2;
      const planetCenterY = planetRect.top + planetRect.height / 2;
      
      // تحديث أبعاد الكارد حسب حجم الشاشة
      const cardWidth = isMobile ? Math.min(280, viewportSize.width - 40) : 320;
      const cardHeight = isMobile ? 380 : 450;
      const padding = isMobile ? 10 : 20;
      
      const positions = [
        // يمين الكوكب
        {
          x: planetRect.right + 15,
          y: planetCenterY - cardHeight / 2,
          name: 'right',
          priority: isMobile ? 2 : 1
        },
        // يسار الكوكب
        {
          x: planetRect.left - cardWidth - 15,
          y: planetCenterY - cardHeight / 2,
          name: 'left',
          priority: isMobile ? 3 : 2
        },
        // أسفل الكوكب
        {
          x: planetCenterX - cardWidth / 2,
          y: planetRect.bottom + 15,
          name: 'bottom',
          priority: 1 // أولوية عالية على الموبايل
        },
        // أعلى الكوكب
        {
          x: planetCenterX - cardWidth / 2,
          y: planetRect.top - cardHeight - 15,
          name: 'top',
          priority: 4
        },
      ];

      // ترتيب المواضع حسب الأولوية
      positions.sort((a, b) => a.priority - b.priority);

      let bestPosition = positions[0];
      
      for (const pos of positions) {
        const fitsHorizontally = pos.x >= padding && 
                                pos.x + cardWidth <= viewportSize.width - padding;
        const fitsVertically = pos.y >= padding && 
                              pos.y + cardHeight <= viewportSize.height - padding;

        if (fitsHorizontally && fitsVertically) {
          bestPosition = pos;
          break;
        }
      }

      // ضمان البقاء داخل الشاشة
      const clampedX = Math.max(
        padding,
        Math.min(bestPosition.x, viewportSize.width - cardWidth - padding)
      );
      
      const clampedY = Math.max(
        padding,
        Math.min(bestPosition.y, viewportSize.height - cardHeight - padding)
      );

      setCardPosition({
        x: clampedX,
        y: clampedY,
        visible: true
      });

    } catch (error) {
      console.error('Error calculating card position:', error);
    }
  }, [isClient, viewportSize.width, viewportSize.height, isMobile]);

  // باقي الدوال كما هي...
  const handlePlanetHover = useCallback((serviceKey, event) => {
    setHoveredService(serviceKey);
    setCardPersistent(true);
    
    const planetElement = event.currentTarget;
    planetRefs.current[serviceKey] = planetElement;
    
    setTimeout(() => calculateCardPosition(planetElement), 10);
  }, [calculateCardPosition]);

  const handleCardDismiss = useCallback(() => {
    setHoveredService(null);
    setCardPersistent(false);
    setCardPosition(prev => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    if (!isClient || !cardPersistent) return;

    const handleClickOutside = (event) => {
      const isCardClick = cardRef.current && cardRef.current.contains(event.target);
      const isPlanetClick = Object.values(planetRefs.current).some(
        planetRef => planetRef && planetRef.contains(event.target)
      );

      if (!isCardClick && !isPlanetClick) {
        handleCardDismiss();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isClient, cardPersistent, handleCardDismiss]);

  // ⭐ تحسين دالة حساب المواضع الدائرية
  const getCircularPosition = (index, total, radius) => {
    if (isMobile) {
      // مواضع محسنة للهواتف المحمولة
      const mobilePositions = [
        { x: 50, y: 25 },      // أعلى وسط
        { x: 75, y: 40 },      // أعلى يمين
        { x: 75, y: 70 },      // أسفل يمين
        { x: 25, y: 70 },      // أسفل يسار
        { x: 25, y: 40 },      // أعلى يسار
      ];
      
      const position = mobilePositions[index] || { x: 50, y: 50 };
      return { ...position, angle: 0 };
      
    } else if (isTablet) {
      // تخطيط خاص بالتابلت
      const angle = (index * 360) / total - 90;
      const radian = (angle * Math.PI) / 180;
      const tabletRadius = radius * 0.9; // نصف قطر أصغر قليلاً
      const x = 50 + tabletRadius * Math.cos(radian);
      const y = 50 + tabletRadius * Math.sin(radian);
      return { x, y, angle: angle + 90 };
      
    } else {
      // تخطيط الديسكتوب العادي
      const angle = (index * 360) / total - 90;
      const radian = (angle * Math.PI) / 180;
      const x = 50 + radius * Math.cos(radian);
      const y = 50 + radius * Math.sin(radian);
      return { x, y, angle: angle + 90 };
    }
  };

  // ⭐ تحسين بيانات الخدمات مع أحجام responsive
  const services = [
    {
      key: "socialMedia",
      image: "service-image/e6f464b6-71c5-4eda-9816-2428319b08bf.jpg",
      gradient: "from-blue-500 via-purple-600 to-pink-500",
      size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24", // أحجام متدرجة
    },
    {
      key: "creativeDesign",
      image: "service-image/276f27cf-d295-4ec1-97fb-719b76576184.jpg",
      gradient: "from-pink-500 via-red-500 to-orange-500",
      size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
    },
    {
      key: "mediaProduction",
      image: "service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
      gradient: "from-purple-600 via-indigo-600 to-blue-600",
      size: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20",
    },
    {
      key: "paidAdvertising",
      image: "service-image/72db65bc-bf7f-496b-94be-b4dd72a70b68.jpg",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-28 lg:h-28", // الكوكب الأكبر
    },
    {
      key: "additionalServices",
      image: "service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      size: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-19 lg:h-19",
    },
  ];

  // ⭐ نصف قطر متجاوب
  const circularRadius = isMobile ? 15 : isTablet ? 20 : 25;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      id="services"
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/nasa-hubble-space.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* ⭐ Header محسن للجميع الأحجام */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight ${
              isRTL ? "font-cairo" : "font-sora"
            }`}
          >
            {t("ourServices")}
          </h2>

          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed ${
              isRTL ? "font-cairo" : "font-inter"
            }`}
          >
            {t("servicesSubtitle")}
          </p>

          <motion.a
            href="https://wa.me/971504616041"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-accent-start to-accent-end text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold shadow-2xl transition-all duration-300 hover:shadow-3xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("exploreOurServices")}
          </motion.a>
        </motion.div>

        {/* ⭐ Solar System Universe - responsive */}
        <div className={`relative mx-auto overflow-visible ${
          isMobile 
            ? 'h-[300px] sm:h-[350px] mb-16 sm:mb-20' 
            : isTablet
            ? 'h-[450px] sm:h-[500px] mb-12'
            : 'h-[600px] lg:h-[650px]'
        } ${
          isMobile ? 'max-w-sm' : isTablet ? 'max-w-4xl' : 'max-w-7xl'
        }`}>
          
          {/* Orbital Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5"
            style={{
              width: `${circularRadius * 2}%`,
              height: `${circularRadius * 2}%`,
              border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: "50%",
            }}
          />

          {/* Service Planets */}
          {services.map((service, index) => {
            const position = getCircularPosition(
              index,
              services.length,
              circularRadius
            );

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 1 + index * 0.2,
                  type: "spring",
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                onMouseEnter={(e) => handlePlanetHover(service.key, e)}
                onClick={(e) => handlePlanetHover(service.key, e)} // إضافة onClick للموبايل
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }} // تأثير للمس
                  className="relative group"
                >
                  {/* Planet */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      y: [0, -4, 0], // تقليل الحركة على الموبايل
                    }}
                    transition={{
                      rotate: {
                        duration: 20 + index * 3,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      y: {
                        duration: 4 + index * 0.5,
                        repeat: Infinity,
                      },
                    }}
                    className={`${service.size} rounded-full shadow-lg sm:shadow-xl lg:shadow-2xl relative z-10 border border-white/20 sm:border-2 overflow-hidden transition-all duration-300 hover:border-white/40`}
                  >
                    <img
                      src={service.image}
                      alt={t(`services.${service.key}.title`)}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    {/* Fallback gradient */}
                                        <div
                      className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl`}
                      style={{ display: "none" }}
                    >
                      🚀
                    </div>
                  </motion.div>

                  {/* ⭐ Service Name Label - محسن للجميع الأحجام */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredService === service.key ? 0 : 1,
                      y: hoveredService === service.key ? 10 : 0,
                      scale: hoveredService === service.key ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none ${
                      isMobile 
                        ? '-bottom-8 sm:-bottom-10' 
                        : isTablet 
                        ? '-bottom-12' 
                        : '-bottom-16'
                    }`}
                  >
                    <div className={`bg-navy-dark/95 backdrop-blur-sm rounded-full border border-white/10 shadow-lg ${
                      isMobile 
                        ? 'px-2 py-1 sm:px-3 sm:py-1.5' 
                        : 'px-4 py-2'
                    }`}>
                      <p
                        className={`text-white font-semibold whitespace-nowrap ${
                          isMobile 
                            ? 'text-xs sm:text-sm' 
                            : isTablet 
                            ? 'text-sm' 
                            : 'text-sm lg:text-base'
                        } ${
                          isRTL ? "font-cairo" : "font-sora"
                        }`}
                      >
                        {t(`services.${service.key}.title`)}
                      </p>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-navy-dark/95 border-l border-t border-white/10 rotate-45" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ⭐ Single Info Card - محسن للجميع الأحجام */}
      {isClient && (
        <AnimatePresence>
          {hoveredService && (cardPosition.visible || cardPersistent) && (
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`fixed z-[9999] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-border/30 ${
                isMobile 
                  ? 'p-4 sm:p-5' 
                  : 'p-6'
              }`}
              style={{
                left: `${cardPosition.x}px`,
                top: `${cardPosition.y}px`,
                width: `${CARD_CONFIG.width}px`,
                maxHeight: `${CARD_CONFIG.height}px`,
                backgroundImage: 'url("/nasa-hubble-space.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                overflow: 'hidden',
                pointerEvents: 'auto'
              }}
            >
              {/* Card Background Overlay */}
              <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
              
              {/* Close Button */}
              <button
                onClick={handleCardDismiss}
                className={`absolute z-20 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 ${
                  isMobile 
                    ? 'top-2 right-2 w-6 h-6' 
                    : 'top-3 right-3 w-8 h-8'
                }`}
                title={isRTL ? "إغلاق" : "Close"}
              >
                <svg 
                  width={isMobile ? "12" : "16"} 
                  height={isMobile ? "12" : "16"} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative z-10">
                {/* Service Header */}
                <div className={`flex items-start gap-3 ${
                  isMobile ? 'mb-3' : 'mb-4'
                }`}>
                  <div className={`rounded-lg overflow-hidden relative flex-shrink-0 ${
                    isMobile ? 'w-10 h-10' : 'w-12 h-12'
                  }`}>
                    <img
                      src={services.find(s => s.key === hoveredService)?.image}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${services.find(s => s.key === hoveredService)?.gradient} rounded-lg flex items-center justify-center ${
                        isMobile ? 'text-lg' : 'text-xl'
                      }`}
                      style={{ display: "none" }}
                    >
                      🚀
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-white leading-tight ${
                        isMobile 
                          ? 'text-base mb-1' 
                          : 'text-lg mb-1'
                      } ${
                        isRTL ? "font-cairo text-right" : "font-sora"
                      }`}
                    >
                      {hoveredService && t(`services.${hoveredService}.title`)}
                    </h3>
                    <p
                      className={`text-accent-start font-medium ${
                        isMobile ? 'text-xs' : 'text-sm'
                      } ${
                        isRTL ? "text-right" : ""
                      }`}
                    >
                      {hoveredService && t(`services.${hoveredService}.subtitle`)}
                    </p>
                  </div>
                </div>

                {/* Service Description */}
                <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 ${
                  isMobile 
                    ? 'max-h-24 mb-3' 
                    : 'max-h-32 mb-4'
                }`}>
                  <p
                    className={`text-white leading-relaxed ${
                      isMobile ? 'text-xs' : 'text-sm'
                    } ${
                      isRTL ? "font-cairo text-right" : "font-inter"
                    }`}
                  >
                    {hoveredService && t(`services.${hoveredService}.description`)}
                  </p>
                </div>

                {/* Action Button */}
                <div className={`border-t border-white/10 ${
                  isMobile ? 'pt-3' : 'pt-4'
                }`}>
                  <motion.a
                    href="https://wa.me/971504616041"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-accent-start hover:text-accent-end transition-colors font-medium cursor-pointer ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}
                    whileHover={{ x: isRTL ? -3 : 3 }}
                  >
                    {isRTL ? "اكتشف المزيد" : "Learn More"}
                    {isRTL ? (
                      <FaArrowLeft className={isMobile ? "text-xs" : "text-xs"} />
                    ) : (
                      <FaArrowRight className={isMobile ? "text-xs" : "text-xs"} />
                    )}
                  </motion.a>
                </div>
              </div>

              {/* Help Text */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 ${
                isMobile ? 'bottom-1' : 'bottom-2'
              }`}>
                <p className={`text-white/50 text-center ${
                  isMobile ? 'text-xs' : 'text-xs'
                }`}>
                  {isRTL ? "انقر خارج الكارد للإغلاق" : "Click outside to close"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ⭐ Floating Contact Buttons - Desktop محسن */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 hidden lg:block"
      >
        <motion.a
          href="https://wa.me/971504616041"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-accent-start to-accent-end rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,122,0,0.3)",
              "0 0 30px rgba(255,122,0,0.6)",
              "0 0 20px rgba(255,122,0,0.3)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
            },
          }}
        >
          <span className="text-xl md:text-2xl">💬</span>
          <motion.div
            animate={{
              scale: [1, 1.5, 2],
              opacity: [1, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 border-2 border-white rounded-full"
          />
        </motion.a>
      </motion.div>

      {/* ⭐ Floating Contact Button - Mobile & Tablet محسن */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 lg:hidden"
      >
        <motion.a
          href="https://wa.me/971504616041"
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gradient-to-r from-accent-start to-accent-end text-white rounded-full flex items-center gap-2 font-medium shadow-2xl cursor-pointer ${
            isMobile 
              ? 'px-4 py-2 text-sm' 
              : 'px-6 py-3 text-base'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span className={isMobile ? "text-lg" : "text-xl"}>💬</span>
          {isRTL ? "تواصل معنا" : "Contact Us"}
        </motion.a>
      </motion.div>

      {/* ⭐ مساحة إضافية للموبايل */}
      <div className={`lg:hidden ${
        isMobile ? 'h-16 sm:h-20' : 'h-12'
      }`} aria-hidden="true" />

      {/* ⭐ Scroll indicator للهواتف الصغيرة */}
      {isMobile && viewportSize.width < 360 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
            <p className="text-white text-xs">
              {isRTL ? "مرر للأسفل" : "Scroll down"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}