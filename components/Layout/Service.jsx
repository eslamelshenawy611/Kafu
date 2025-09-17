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
  
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const planetRefs = useRef({});
  const resizeTimeoutRef = useRef(null);
  const [cardPersistent, setCardPersistent] = useState(false);
  
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Constants for card dimensions
  const CARD_CONFIG = {
    width: 320,  // w-80 = 320px
    height: 450, // increased estimated height
    padding: 20, // padding from viewport edges
  };

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    const updateViewportSize = () => {
      if (typeof window !== 'undefined') {
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
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
      // Get planet position relative to viewport
      const planetRect = planetElement.getBoundingClientRect();
      
      // Planet center coordinates
      const planetCenterX = planetRect.left + planetRect.width / 2;
      const planetCenterY = planetRect.top + planetRect.height / 2;
      
      console.log('Planet rect:', planetRect);
      console.log('Viewport size:', viewportSize);
      
      // Preferred positions (priority order)
      const positions = [
        // Right of planet
        {
          x: planetRect.right + 20,
          y: planetCenterY - CARD_CONFIG.height / 2,
          name: 'right'
        },
        // Left of planet
        {
          x: planetRect.left - CARD_CONFIG.width - 20,
          y: planetCenterY - CARD_CONFIG.height / 2,
          name: 'left'
        },
        // Below planet
        {
          x: planetCenterX - CARD_CONFIG.width / 2,
          y: planetRect.bottom + 20,
          name: 'bottom'
        },
        // Above planet
        {
          x: planetCenterX - CARD_CONFIG.width / 2,
          y: planetRect.top - CARD_CONFIG.height - 20,
          name: 'top'
        },
      ];

      // Find best position that fits in viewport
      let bestPosition = positions[0]; // Default to right
      
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

      // Clamp position to viewport bounds regardless
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

  // Handle planet hover
   // Handle planet hover - تعديل الدالة الموجودة
  const handlePlanetHover = useCallback((serviceKey, event) => {
    console.log('Planet hovered:', serviceKey);
    setHoveredService(serviceKey);
    setCardPersistent(true); // ⭐ جعل الكارد ثابتاً
    
    const planetElement = event.currentTarget;
    planetRefs.current[serviceKey] = planetElement;
    
    // Calculate position immediately
    setTimeout(() => calculateCardPosition(planetElement), 10);
  }, [calculateCardPosition]);

  // إلغاء دالة handlePlanetLeave القديمة واستبدالها بدالة جديدة
  const handleCardDismiss = useCallback(() => {
    console.log('Card dismissed');
    setHoveredService(null);
    setCardPersistent(false);
    setCardPosition(prev => ({ ...prev, visible: false }));
  }, []);

  // ⭐ إضافة event listener للنقر خارج الكارد
  useEffect(() => {
    if (!isClient || !cardPersistent) return;

    const handleClickOutside = (event) => {
      // التحقق من عدم النقر على الكارد نفسه أو الكواكب
      const isCardClick = cardRef.current && cardRef.current.contains(event.target);
      const isPlanetClick = Object.values(planetRefs.current).some(
        planetRef => planetRef && planetRef.contains(event.target)
      );

      if (!isCardClick && !isPlanetClick) {
        handleCardDismiss();
      }
    };

    // إضافة listener بعد تأخير صغير لتجنب الإغلاق الفوري
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isClient, cardPersistent, handleCardDismiss]);
  // Function to calculate circular positions
  const getCircularPosition = (index, total, radius) => {
    const angle = (index * 360) / total - 90;
    const radian = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(radian);
    const y = 50 + radius * Math.sin(radian);
    return { x, y, angle: angle + 90 };
  };

  const services = [
    {
      key: "socialMedia",
      image: "service-image/e6f464b6-71c5-4eda-9816-2428319b08bf.jpg",
      gradient: "from-blue-500 via-purple-600 to-pink-500",
      size: "w-20 h-20 lg:w-24 lg:h-24",
    },
    {
      key: "creativeDesign",
      image: "service-image/276f27cf-d295-4ec1-97fb-719b76576184.jpg",
      gradient: "from-pink-500 via-red-500 to-orange-500",
      size: "w-20 h-20 lg:w-24 lg:h-24",
    },
    {
      key: "mediaProduction",
      image: "service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
      gradient: "from-purple-600 via-indigo-600 to-blue-600",
      size: "w-16 h-16 lg:w-20 lg:h-20",
    },
    {
      key: "paidAdvertising",
      image: "service-image/72db65bc-bf7f-496b-94be-b4dd72a70b68.jpg",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      size: "w-22 h-22 lg:w-28 lg:h-28",
    },
    {
      key: "additionalServices",
      image: "service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      size: "w-16 h-16 lg:w-19 lg:h-19",
    },
  ];

  const circularRadius = 25;
  const mobileRadius = 20;

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
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className={`text-h2 lg:text-h2-lg font-bold mb-6 text-white ${
              isRTL ? "font-cairo" : "font-sora"
            }`}
          >
            {t("ourServices")}
          </h2>

          <p
            className={`text-body lg:text-body-lg text-white/80 max-w-3xl mx-auto mb-8 ${
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

        {/* Solar System Universe */}
        <div className="relative h-[500px] lg:h-[650px] mx-auto max-w-7xl overflow-visible">
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
      onMouseEnter={(e) => handlePlanetHover(service.key, e)} // ⭐ إبقاء hover فقط
      // ⭐ إزالة onMouseLeave
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
                    {/* 
                    
                     */}
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full z-10" /> */}
                  </motion.div>

                  {/* Service Name Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredService === service.key ? 0 : 1,
                      y: hoveredService === service.key ? 10 : 0,
                      scale: hoveredService === service.key ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none"
                  >
                    <div className="bg-navy-dark/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg">
                      <p
                        className={`text-white text-sm font-semibold whitespace-nowrap ${
                          isRTL ? "font-cairo" : "font-sora"
                        }`}
                      >
                        {t(`services.${service.key}.title`)}
                      </p>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-navy-dark/90 border-l border-t border-white/10 rotate-45" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Single Info Card with Dynamic Positioning - Fixed to body */}
     {/* Single Info Card with Dynamic Positioning */}
{isClient && (
  <AnimatePresence>
    {hoveredService && (cardPosition.visible || cardPersistent) && ( // ⭐ تعديل الشرط
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
          pointerEvents: 'auto' // ⭐ تغيير لـ auto لتمكين التفاعل
        }}
      >
        {/* Card Background Overlay */}
        {/* <div className="absolute inset-0 bg-navy-dark/95 backdrop-blur-xl rounded-card" /> */}
        
        {/* ⭐ إضافة زر الإغلاق */}
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
          {/* باقي محتوى الكارد كما هو... */}
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

        {/* ⭐ إضافة نص تعليمي */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <p className="text-xs text-white/50 text-center">
            {isRTL ? "انقر خارج الكارد للإغلاق" : "Click outside to close"}
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)}
      {/* Floating Contact Buttons */}
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
        >
          <span>💬</span>
          {isRTL ? "تواصل معنا" : "Contact Us"}
        </motion.a>
      </motion.div>

      {/* Debug info - Remove in production */}
    
    </section>
  );
}