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
  
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const planetRefs = useRef({});
  const resizeTimeoutRef = useRef(null);
  const [cardPersistent, setCardPersistent] = useState(false);
  
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Constants for card dimensions
  const CARD_CONFIG = {
    width: 320,
    height: 450,
    padding: 20,
  };

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    const updateViewportSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setViewportSize({ width, height });
        setIsMobile(width < 1024); // lg breakpoint
      }
    };
    
    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  // Calculate optimal card position
  const calculateCardPosition = useCallback((planetElement) => {
    if (!isClient || !planetElement || typeof window === 'undefined') {
      console.log('Early return from calculateCardPosition');
      return;
    }

    try {
      const planetRect = planetElement.getBoundingClientRect();
      const planetCenterX = planetRect.left + planetRect.width / 2;
      const planetCenterY = planetRect.top + planetRect.height / 2;
      
      console.log('Planet rect:', planetRect);
      console.log('Viewport size:', viewportSize);
      
      const positions = [
        {
          x: planetRect.right + 20,
          y: planetCenterY - CARD_CONFIG.height / 2,
          name: 'right'
        },
        {
          x: planetRect.left - CARD_CONFIG.width - 20,
          y: planetCenterY - CARD_CONFIG.height / 2,
          name: 'left'
        },
        {
          x: planetCenterX - CARD_CONFIG.width / 2,
          y: planetRect.bottom + 20,
          name: 'bottom'
        },
        {
          x: planetCenterX - CARD_CONFIG.width / 2,
          y: planetRect.top - CARD_CONFIG.height - 20,
          name: 'top'
        },
      ];

      let bestPosition = positions[0];
      
      for (const pos of positions) {
        const fitsHorizontally = pos.x >= CARD_CONFIG.padding && 
                                pos.x + CARD_CONFIG.width <= viewportSize.width - CARD_CONFIG.padding;
        const fitsVertically = pos.y >= CARD_CONFIG.padding && 
                              pos.y + CARD_CONFIG.height <= viewportSize.height - CARD_CONFIG.padding;

        console.log(`Testing position ${pos.name}:`, { 
          x: pos.x, 
          y: pos.y, 
          fitsHorizontally, 
          fitsVertically 
        });

        if (fitsHorizontally && fitsVertically) {
          bestPosition = pos;
          console.log(`Selected position: ${pos.name}`);
          break;
        }
      }

      const clampedX = Math.max(
        CARD_CONFIG.padding,
        Math.min(bestPosition.x, viewportSize.width - CARD_CONFIG.width - CARD_CONFIG.padding)
      );
      
      const clampedY = Math.max(
        CARD_CONFIG.padding,
        Math.min(bestPosition.y, viewportSize.height - CARD_CONFIG.height - CARD_CONFIG.padding)
      );

      console.log('Final position:', { x: clampedX, y: clampedY });

      setCardPosition({
        x: clampedX,
        y: clampedY,
        visible: true
      });

    } catch (error) {
      console.error('Error calculating card position:', error);
    }
  }, [isClient, viewportSize.width, viewportSize.height]);

  const handlePlanetHover = useCallback((serviceKey, event) => {
    console.log('Planet hovered:', serviceKey);
    setHoveredService(serviceKey);
    setCardPersistent(true);
    
    const planetElement = event.currentTarget;
    planetRefs.current[serviceKey] = planetElement;
    
    setTimeout(() => calculateCardPosition(planetElement), 10);
  }, [calculateCardPosition]);

  const handleCardDismiss = useCallback(() => {
    console.log('Card dismissed');
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

  // ⭐ دالة محسنة لحساب المواضع مع مراعاة الهواتف المحمولة
  const getCircularPosition = (index, total, radius) => {
    // تعديل الزوايا لضمان توزيع أفضل على الهواتف المحمولة
    if (isMobile) {
      // على الموبايل: توزيع أكثر تباعداً مع تجنب الحواف
      const adjustedAngles = [
        -45,  // أعلى يمين
        45,   // أسفل يمين  
        135,  // أسفل يسار
        225,  // أعلى يسار
        0     // أعلى وسط
      ];
      const angle = adjustedAngles[index] || (index * 360) / total - 90;
      const radian = (angle * Math.PI) / 180;
      
      // تقليل نصف القطر على الموبايل لتجنب قطع النصوص
      const mobileRadius = Math.min(radius * 0.8, 18);
      const x = 50 + mobileRadius * Math.cos(radian);
      const y = 50 + mobileRadius * Math.sin(radian);
      
      return { x, y, angle: angle + 90 };
    } else {
      // على الديسكتوب: التوزيع العادي
      const angle = (index * 360) / total - 90;
      const radian = (angle * Math.PI) / 180;
      const x = 50 + radius * Math.cos(radian);
      const y = 50 + radius * Math.sin(radian);
      return { x, y, angle: angle + 90 };
    }
  };

  const services = [
    {
      key: "socialMedia",
      image: "service-image/e6f464b6-71c5-4eda-9816-2428319b08bf.jpg",
      gradient: "from-blue-500 via-purple-600 to-pink-500",
      size: "w-16 h-16 lg:w-24 lg:h-24", // تصغير حجم الكواكب على الموبايل
    },
    {
      key: "creativeDesign",
      image: "service-image/276f27cf-d295-4ec1-97fb-719b76576184.jpg",
      gradient: "from-pink-500 via-red-500 to-orange-500",
      size: "w-16 h-16 lg:w-24 lg:h-24",
    },
    {
      key: "mediaProduction",
      image: "service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
      gradient: "from-purple-600 via-indigo-600 to-blue-600",
      size: "w-14 h-14 lg:w-20 lg:h-20",
    },
    {
      key: "paidAdvertising",
      image: "service-image/72db65bc-bf7f-496b-94be-b4dd72a70b68.jpg",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      size: "w-18 h-18 lg:w-28 lg:h-28", // الكوكب الأكبر
    },
    {
      key: "additionalServices",
      image: "service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      size: "w-14 h-14 lg:w-19 lg:h-19",
    },
  ];

  // ⭐ تعديل أنصاف الأقطار مع مراعاة الموبايل
  const circularRadius = isMobile ? 18 : 25; // نصف قطر أصغر على الموبايل

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden section-padding"
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

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-16" // تقليل المسافة على الموبايل
        >
          <h2
            className={`text-h2 lg:text-h2-lg font-bold mb-4 lg:mb-6 text-white ${
              isRTL ? "font-cairo" : "font-sora"
            }`}
          >
            {t("ourServices")}
          </h2>

          <p
            className={`text-body lg:text-body-lg text-white/80 max-w-3xl mx-auto mb-6 lg:mb-8 px-4 ${
              isRTL ? "font-cairo" : "font-inter"
            }`}
          >
            {t("servicesSubtitle")}
          </p>

          <motion.a
            href="https://wa.me/971504616041"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-3 text-button-lg shadow-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("exploreOurServices")}
          </motion.a>
        </motion.div>

        {/* ⭐ Solar System Universe - محسن للموبايل */}
        <div className={`relative mx-auto max-w-7xl overflow-visible ${
          isMobile 
            ? 'h-[400px] mb-20' // ارتفاع أقل على الموبايل مع مسافة إضافية للنصوص
            : 'h-[650px]'
        }`}>
          {/* Orbital Ring Visualization */}
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
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.3 },
                  }}
                  className="relative group"
                >
                  {/* Planet */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      y: [0, -8, 0],
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
                    className={`${service.size} rounded-full shadow-2xl relative z-10 border-2 border-white/20 overflow-hidden transition-all duration-300 hover:border-white/40`}
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
                  </motion.div>

                  {/* ⭐ Service Name Label - محسن للموبايل */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredService === service.key ? 0 : 1,
                      y: hoveredService === service.key ? 10 : 0,
                      scale: hoveredService === service.key ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none ${
                      isMobile ? '-bottom-12' : '-bottom-16' // مسافة أقل على الموبايل
                    }`}
                  >
                    <div className={`bg-navy-dark/95 backdrop-blur-sm rounded-full border border-white/10 shadow-lg ${
                      isMobile ? 'px-2 py-1' : 'px-4 py-2' // padding أصغر على الموبايل
                    }`}>
                      <p
                        className={`text-white font-semibold whitespace-nowrap ${
                          isMobile ? 'text-xs' : 'text-sm' // نص أصغر على الموبايل
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

      {/* Single Info Card - باقي الكود كما هو */}
      {isClient && (
        <AnimatePresence>
          {hoveredService && (cardPosition.visible || cardPersistent) && (
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed z-[9999] w-80 backdrop-blur-xl rounded-card p-6 shadow-2xl border border-gray-border/30"
              style={{
                left: `${cardPosition.x}px`,
                top: `${cardPosition.y}px`,
                backgroundImage: 'url("/nasa-hubble-space.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                maxHeight: '400px',
                overflow: 'hidden',
                pointerEvents: 'auto'
              }}
            >
              {/* Card Background Overlay */}
              <div className="absolute inset-0 bg-navy-dark/95 backdrop-blur-xl rounded-card" />
              
              {/* Close Button */}
              <button
                onClick={handleCardDismiss}
                className="absolute top-3 right-3 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 z-20"
                title={isRTL ? "إغلاق" : "Close"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative z-10">
                {/* Service Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
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
                      className={`absolute inset-0 bg-gradient-to-br ${services.find(s => s.key === hoveredService)?.gradient} rounded-lg flex items-center justify-center text-xl`}
                      style={{ display: "none" }}
                    >
                      🚀
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold text-white mb-1 leading-tight ${
                        isRTL ? "font-cairo text-right" : "font-sora"
                      }`}
                    >
                      {hoveredService && t(`services.${hoveredService}.title`)}
                    </h3>
                    <p
                      className={`text-sm text-accent-start font-medium ${
                        isRTL ? "text-right" : ""
                      }`}
                    >
                      {hoveredService && t(`services.${hoveredService}.subtitle`)}
                    </p>
                  </div>
                </div>

                {/* Service Description */}
                <div className="max-h-32 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-white/20">
                  <p
                    className={`text-sm text-white leading-relaxed ${
                      isRTL ? "font-cairo text-right" : "font-inter"
                    }`}
                  >
                    {hoveredService && t(`services.${hoveredService}.description`)}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-white/10">
                  <motion.a
                    href="https://wa.me/971504616041"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent-start hover:text-accent-end transition-colors font-medium cursor-pointer"
                    whileHover={{ x: isRTL ? -5 : 5 }}
                  >
                    {isRTL ? "اكتشف المزيد" : "Learn More"}
                    {isRTL ? (
                      <FaArrowLeft className="text-xs" />
                    ) : (
                      <FaArrowRight className="text-xs" />
                    )}
                  </motion.a>
                </div>
              </div>

              {/* Help Text */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <p className="text-xs text-white/50 text-center">
                  {isRTL ? "انقر خارج الكارد للإغلاق" : "Click outside to close"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Floating Contact Buttons - Desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-8 right-8 z-40 lg:block hidden"
      >
        <motion.a
          href="https://wa.me/971504616041"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-accent-gradient rounded-full flex items-center justify-center text-white text-xl shadow-2xl relative overflow-hidden cursor-pointer"
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
          <span className="text-2xl">💬</span>
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

      {/* ⭐ Floating Contact Button - Mobile - محسن */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 lg:hidden"
      >
        <motion.a
          href="https://wa.me/971504616041"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-gradient text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium shadow-2xl cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0], // تأثير floating خفيف
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span>💬</span>
          {isRTL ? "تواصل معنا" : "Contact Us"}
        </motion.a>
      </motion.div>

      {/* ⭐ إضافة مساحة إضافية في الأسفل على الموبايل لتجنب قطع النصوص */}
      {isMobile && (
        <div className="h-20 lg:hidden" aria-hidden="true" />
      )}
    </section>
  );
}