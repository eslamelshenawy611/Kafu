"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
// Component for the animated starfield background
const StarfieldBackground = () => (
  <div className="absolute inset-0 opacity-50 pointer-events-none z-0">
    {[...Array(200)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[2px] bg-white rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0.5, 1, 0],
          scale: [0, 1, 0.5, 1, 0],
        }}
        transition={{
          duration: Math.random() * 4 + 2,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

// --- التعديل رقم 1: إخراج البيانات الثابتة خارج الكومبوننت ---
const servicesData = [
  {
    key: "socialMedia",
    image: "/service-image/e6f464b6-71c5-4eda-9816-2428319b08bf.jpg",
    gradient: "from-blue-500 via-purple-600 to-pink-500",
     href:"Digital-marketing"
  },
  {
    key: "creativeDesign",
    image: "/service-image/276f27cf-d295-4ec1-97fb-719b76576184.jpg",
    gradient: "from-pink-500 via-red-500 to-orange-500",
     href:"Event"

  },
  {
    key: "mediaProduction",
    image: "/service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg",
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    href:"media"
  },
  {
    key: "paidAdvertising",
    image: "/service-image/72db65bc-bf7f-496b-94be-b4dd72a70b68.jpg",
    gradient: "from-green-500 via-teal-500 to-blue-500",
    href:"influencer"
  },
];

export default function ServicesSection() {
  const { t, isRTL } = useLanguage();
  const [imageErrors, setImageErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sectionRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    const updateViewportSize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width < 1024);
      }
    };

    updateViewportSize();

    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updateViewportSize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  const ServiceCard = ({ service, index }) => {
    const router = useRouter(); // أضف هذا السطر

    return (
      <motion.div
        key={service.key}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.5 + index * 0.1,
          type: "spring",
        }}
        className="flex flex-col items-center gap-4"
      >
        {/* Planet */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer"
        >
          <motion.div
            animate={{
              x: [0, 7, 0, -7, 0],
              y: [-7, 0, 7, 0, -7],
            }}
            transition={{
              duration: 5 + index * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`${service.size} rounded-full shadow-2xl relative overflow-hidden transition-all duration-300`}
            style={{
              boxShadow:
                "0 20px 50px rgba(255,149,0,0.2), 0 10px 30px rgba(255,149,0,0.1)",
            }}
          >
            {!imageErrors[service.key] ? (
              <img
                src={service.image}
                alt={t(`services.${service.key}.title`)}
                className="w-full h-full object-cover rounded-full"
                onError={() =>
                  setImageErrors((prev) => ({ ...prev, [service.key]: true }))
                }
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center text-2xl`}
              />
            )}
                {/* Glowing Halo */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 rounded-full blur-xl`}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `inset 0 0 30px rgba(255,149,0,0.3), 0 0 60px rgba(255,149,0,0.2)`,
              }}
            />
          </div>
          {/* Rotating Ring */}
          <div
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 orbit-ring"
            style={{
              background:
                "linear-gradient(45deg, #ff883e 0%, #ff883e 33%, #c4c4c4 66%, #fef8f4 100%)",
              transform: "scale(1.3)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Service Card */}
      
      
      {/* Service Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8 + index * 0.1 }}
          className={`
            bg-white/5 backdrop-blur-md rounded-xl border border-white/10
            ${isMobile ? "p-3" : isTablet ? "p-4" : "p-5"}
            w-full max-w-[280px]
            hover:bg-white/10 transition-all duration-300
            shadow-xl hover:shadow-2xl hover:border-white/20
            flex flex-col h-full min-h-[300px]
            relative overflow-hidden
          `}
          style={{
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,149,0,0.05)",
          }}
        >
          <h3
            className={`font-bold text-white text-center mb-2 relative z-10 ${
              isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg"
            } ${isRTL ? "font-cairo" : "font-roboto"}`}
          >
            {t(`services.${service.key}.title`)}
          </h3>
          <p
            className={`text-white text-center leading-relaxed flex-grow relative z-10
              ${isMobile ? "text-xs" : "text-sm"}
              ${isRTL ? "font-cairo" : "font-inter"}
              whitespace-pre-line`}
          >
            {t(`services.${service.key}.description`)}
          </p>
          {/* --- التعديل الرئيسي هنا: استخدام motion.button مع onClick --- */}
          <motion.button
            onClick={() => router.push(service.href)}
            className={`
              mt-4 inline-flex items-center justify-center gap-2
              text-white bg-[#FF883E] hover:bg-[#FF7A28]
              rounded-full w-full transition-all duration-300
              relative z-10
              ${isMobile ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm"}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRTL ? "اكتشف المزيد" : "Learn More"}
            {isRTL ? (
              <FaArrowLeft className={isMobile ? "text-xs" : "text-sm"} />
            ) : (
              <FaArrowRight className={isMobile ? "text-xs" : "text-sm"} />
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden services-section"
        id="services"
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #000000 15%, #ff883e 50%, #000000 70%, #ff883e 98%, transparent 100%)",
        }}
      >
        <StarfieldBackground />

        {/* --- إزالة الستايل الخاص بالخلفية من هنا --- */}
        <div className="container-fluid sm:px-6 md:px-8 lg:px-12 relative z-10 overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12 md:mb-16 pt-16"
            >
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight ${
                  isRTL ? "font-cairo" : "font-sora"
                }`}
                style={{
                  textShadow:
                    "0 0 30px rgba(255,149,0,0.3), 0 0 60px rgba(255,149,0,0.1)",
                }}
              >
                {t("servicesTitle")}
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
                className="inline-flex items-center gap-2 sm:gap-3 bg-[#FF883E] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold shadow-2xl transition-all duration-300 hover:shadow-3xl text-white hover:bg-[#FF7A28]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow:
                    "0 10px 40px rgba(255,136,62,0.3), 0 20px 80px rgba(255,136,62,0.1)",
                }}
              >
                {t("exploreOurServices")}
              </motion.a>
            </motion.div>

            <div className="max-w-6xl mx-auto pb-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {servicesData.map((service, index) => {
                  // --- تحديد الحجم الديناميكي هنا ---
                  const sizeClass = isMobile
                    ? "w-24 h-24"
                    : isTablet
                    ? "w-28 h-28"
                    : "w-32 h-32";
                  return (
                    <ServiceCard
                      key={service.key}
                      service={{ ...service, size: sizeClass }}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

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
            className="w-12 h-12 md:w-14 md:h-14 bg-[#FF883E] rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              boxShadow: "0 10px 40px rgba(255,136,62,0.4)",
            }}
          >
            <span className="text-xl md:text-2xl">💬</span>
          </motion.a>
        </motion.div>

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
            className={`bg-[#FF883E] text-white rounded-full flex items-center gap-2 font-medium shadow-2xl cursor-pointer hover:bg-[#FF7A28] ${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: "0 10px 40px rgba(255,136,62,0.4)",
            }}
          >
            <span className={isMobile ? "text-lg" : "text-xl"}>💬</span>
            {isRTL ? "تواصل معنا" : "Contact Us"}
          </motion.a>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(255,136,62,1) 0%, rgba(255,136,62,0.9) 10%, rgba(255,136,62,0.6) 25%, rgba(255,136,62,0.3) 45%, rgba(255,136,62,0.1) 70%, rgba(255,136,62,0.02) 90%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-16 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.02) 90%, transparent 100%)",
          }}
        />
      </section>
    </>
  );

}