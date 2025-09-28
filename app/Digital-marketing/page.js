"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
FaArrowRight,
FaArrowLeft,
FaChevronLeft,
FaChevronRight,
FaTimes,
FaSearchPlus,
FaSearchMinus,
} from "react-icons/fa";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
// Service details data
const serviceDetailsData = {
en: {
title: "Digital Marketing",
subtitle: "We turn your digital presence into measurable success through creative strategies and results.", // أضف هذا
ctaButton: "Request a free quotation",
services: [
{
title: "Paid Ads",
shortDesc: "We plan and manage impactful ad campaigns",
description:
"We plan and run paid ad campaigns (Facebook Ads, Instagram Ads, TikTok Ads, etc.) — including targeting, creative design, A/B testing, budget optimization, and performance tracking.",
icon: "/markting/Paid.png",
},
{
title: "Analytics & Measurable Reporting",
shortDesc: "Turn data into clear business insights",
description:
"We implement conversion tracking (pixels, GA4), define KPIs (CPA, CAC, LTV), and deliver clear reports with actionable recommendations to enhance performance.",
icon: "/markting/analysis.png",
},
{
title: "Social Media Management",
shortDesc: "Build engagement with consistent management",
description:
"We create content calendars, publish posts, deliver engagement reports, track growth analytics, and provide recommendations for continuous improvements.",
icon: "/markting/sociall.png",
},
{
title: "Photography & Videography",
shortDesc: "Capture attention with high-quality visuals",
description:
"High-quality photos and videos that enhance brand perception, attract attention, and increase shares and engagement across digital platforms.",
icon: "/markting/Photography.png",
},
{
title: "Social Media Designs",
shortDesc: "Create strong visual brand identity",
description:
"We provide a library of design templates, custom graphics per campaign, and visual guidelines that ensure consistency across all platforms.",
icon: "/markting/Social.png",
},
],
},
ar: {
title: "التسويق الرقمي",
subtitle: "نحول تواجدك الرقمي إلى نجاح قابل للقياس من خلال استراتيجيات إبداعية ونتائج ملموسة.", // أضف هذا
ctaButton: "اطلب عرض أسعار مجاني",
services: [
{
title: "الإعلانات المدفوعة",
shortDesc: "نخطط وندير حملات إعلانية مؤثرة",
description:
"نقوم بالتخطيط وتنفيذ حملات الإعلانات المدفوعة (فيسبوك، إنستجرام، تيك توك، إلخ) — تشمل الاستهداف، التصميم الإبداعي، اختبار A/B، تحسين الميزانية، وتتبع الأداء.",
icon: "/markting/Paid.png",
},
{
title: "التحليلات والتقارير القابلة للقياس",
shortDesc: "حوّل البيانات إلى رؤى واضحة",
description:
"نقوم بتنفيذ تتبع التحويل (البكسلات، GA4)، وتحديد مؤشرات الأداء الرئيسية (CPA، CAC، LTV)، وتقديم تقارير واضحة مع توصيات عملية لتحسين النتائج.",
icon: "/markting/analysis.png",
},
{
title: "إدارة وسائل التواصل الاجتماعي",
shortDesc: "بناء تفاعل من خلال إدارة مستمرة",
description:
"نقوم بإعداد تقويم محتوى، ونشر المنشورات، وتقديم تقارير التفاعل، وتحليل النمو، مع توصيات مستمرة للتحسين.",
icon: "/markting/sociall.png",
},
{
title: "التصوير الفوتوغرافي والفيديو",
shortDesc: "جذب الانتباه بمرئيات عالية الجودة",
description:
"صور ومقاطع فيديو عالية الجودة تعزز إدراك العلامة التجارية، وتجذب الانتباه، وتزيد من المشاركة والمشاركة عبر المنصات الرقمية.",
icon: "/markting/Photography.png",
},
{
title: "تصميمات السوشيال ميديا",
shortDesc: "إنشاء هوية بصرية قوية للعلامة",
description:
"نوفر مكتبة من قوالب التصميم، ورسومات مخصصة لكل حملة، وإرشادات بصرية تضمن الاتساق عبر جميع المنصات.",
icon: "/markting/Social.png",
},
],
},
};
// Hero slider images
const sliderImages = [
"/service-details/ad.jpg",
"/service-details/add.jpg",
"/service-details/Analsys.jpg",
"/service-details/photo service.jpg",
"/service-details/trend-service.jpg",
"/service-details/platform.jpg",
];
// Enhanced Starfield Background with patterns
const EnhancedBackground = () => (
<>
{/* Grid Pattern */}
<div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#ff883e 1px, transparent 1px), linear-gradient(90deg, #ff883e 1px, transparent 1px)` , backgroundSize: "50px 50px", }} /> </> ); 

// Image Modal Component
const ImageModal = ({ isOpen, onClose, imageSrc }) => {
const [scale, setScale] = useState(1);
const handleZoomIn = () => {
setScale((prev) => Math.min(prev + 0.2, 3));
};
const handleZoomOut = () => {
setScale((prev) => Math.max(prev - 0.2, 0.5));
};
useEffect(() => {
setScale(1); // Reset scale when modal opens
}, [isOpen]);

// === FIX: Corrected Syntax Error here ===
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "+") handleZoomIn();
    if (e.key === "-") handleZoomOut();
  };

  if (isOpen) {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "unset";
  };
}, [isOpen, onClose]); // <--- تم إصلاح خطأ البناء هنا

if (!isOpen) return null;
return (
<AnimatePresence>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
onClick={onClose} // تعديل: إغلاق المودال عند الضغط في أي مكان
>
<div className="relative w-full h-full flex items-center justify-center p-4">
  {/* Zoom Controls */}
  <div className="absolute top-4 left-4 flex gap-2 z-10">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleZoomIn();
      }}
      className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300"
    >
      <FaSearchPlus className="text-xl" />
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleZoomOut();
      }}
      className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300"
    >
      <FaSearchMinus className="text-xl" />
    </button>
  </div>
  {/* Image */}
  <motion.img
    src={imageSrc}
    alt="Service Image"
    className="max-w-[90vw] max-h-[90vh] object-contain cursor-move"
    style={{
      transform: `scale(${scale})`,
      transition: "transform 0.3s ease",
    }}
    onClick={(e) => e.stopPropagation()}
    drag
    dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
  />
</div>
</motion.div>
</AnimatePresence>
);
};
export default function DigitalMarketingService() {
const { language, isRTL } = useLanguage();
const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalImageSrc, setModalImageSrc] = useState(""); // تعديل: لتخزين مصدر الصورة المختارة
const content = serviceDetailsData[language];
const heroRef = useRef(null);
const servicesRef = useRef(null);
const heroInView = useInView(heroRef, { once: true });
const servicesInView = useInView(servicesRef, { once: true });
// Window size effect
useEffect(() => {
const handleResize = () => {
setWindowSize({ width: window.innerWidth, height: window.innerHeight });
};
handleResize();
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);
// تعديل: دالة فتح المودال مع الصورة المحددة
const openModal = (imageSrc) => {
setModalImageSrc(imageSrc);
setIsModalOpen(true);
};
const closeModal = () => {
setIsModalOpen(false);
};

// =========================================================================
// منطقة حسابات الاستجابة للكوكب
// =========================================================================

// Get radius based on screen size using a fraction of viewport width (vw)
const getRadius = () => {
  // استخدام نسبة من عرض الشاشة لضمان التجاوب
  if (windowSize.width < 640) return 0.25 * windowSize.width; // 25vw
  if (windowSize.width < 1024) return 0.2 * windowSize.width; // 20vw
  return 0.15 * windowSize.width; // 15vw
};

// بيانات مواضع الخدمات (الزاوية وعامل التباعد النسبي عن المركز)
const servicePositionsData = [
  { angle: -105, offsetFactor: 1.5 }, // top
  { angle: -50, offsetFactor: 1.2 }, // top right
  { angle: 5, offsetFactor: 0.8 }, // mid-right
  { angle: 160, offsetFactor: 0.9 }, // mid-left
  { angle: 100, offsetFactor: 0.85 }, // top left
];

// تحديد حجم الكوكب المركزي بناءً على عرض الشاشة (vw)
const getPlanetSize = () => {
  if (windowSize.width < 640) return 60; // 60vw
  if (windowSize.width < 1024) return 40; // 40vw
  return 20; // 20vw
};

const planetSizeVW = getPlanetSize();

// =========================================================================
// نهاية منطقة حسابات الاستجابة للكوكب
// =========================================================================


// Handle image errors
const handleImageError = (e, fallbackSrc = "") => {
  if (e.target.src !== fallbackSrc) {
    e.target.src = fallbackSrc;
  }
};

return (
  // تعديل: نقل الخلفية لتكون في العنصر الرئيسي للصفحة
  <div
    className="min-h-screen bg-black overflow-hidden relative"
    style={{
      background:
        "radial-gradient(ellipse at center, rgba(255,136,62,0.15) 0%, #0a0a0a 50%, )",
    }}
  >
    <EnhancedBackground />

    <Header />

    {/* Hero Section with Planet and Orbiting Services */}
    <section
      ref={heroRef}
      className="relative min-h-[90vh] overflow-hidden pt-32 "
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl md:text-6xl font-bold text-[#FF8B3F] mb-6 mt-10 ${
              isRTL ? "font-cairo" : "font-sora"
            }`}
          >
            {content.title}
          </h1>
          <p
            className={`text-lg md:text-xl text-[#c4c4c4] max-w-2xl mx-auto ${
              isRTL ? "font-cairo" : "font-inter"
            }`}
          >
            {content.subtitle}
          </p>
        </motion.div>

        {/* Planet with Orbiting Services - Responsive Container */}
        <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center py-10 mt-32">
          {/* Orbit Rings - Behind everything */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* استخدام أحجام متجاوبة للحلقات */}
            <motion.div
              style={{
                width: `${planetSizeVW + 30}vw`,
                height: `${planetSizeVW + 30}vw`,
                maxWidth: "750px", // max size limit
                maxHeight: "750px", // max size limit
              }}
              className="absolute rounded-full border border-[#ff883e]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                width: `${planetSizeVW + 10}vw`,
                height: `${planetSizeVW + 10}vw`,
                maxWidth: "650px", // max size limit
                maxHeight: "650px", // max size limit
              }}
              className="absolute rounded-full border border-[#ff883e]/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Central Planet */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={heroInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.5, type: "spring" }}
            className="relative z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              style={{
                width: `${planetSizeVW}vw`, // Responsive width
                height: `${planetSizeVW}vw`, // Responsive height (ensures perfect circle)
                maxWidth: "320px", // Maximum size for large screens
                maxHeight: "320px",
              }}
              className="relative"
            >
              <img
                src="/service-image/e6f464b6-71c5-4eda-9816-2428319b08bf.jpg"
                alt="Digital Marketing Planet"
                className="w-full h-full rounded-full object-cover shadow-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff883e]/40 to-transparent" />
              <div className="absolute inset-0 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Orbiting Service Icons Container */}
          <div className="absolute inset-0">
            {content.services.map((service, index) => {
              const { angle, offsetFactor } = servicePositionsData[index];
              const baseRadius = getRadius();
              const finalRadius = baseRadius * offsetFactor;
              const radians = (angle * Math.PI) / 180;

              // حساب المركز بالنسبة المئوية
              const centerX = 50; // Container center in percentage
              const centerY = 50;

              // تحويل نصف القطر النهائي (الذي هو بالبكسل/vw) إلى نسبة مئوية
              // باستخدام عرض الشاشة كمرجع.
              const radiusPercentage = (finalRadius / windowSize.width) * 100 * 2; // مضاعفة النسبة للتناسب مع مركز 50%

              // حساب الموضع النهائي بالنسبة المئوية
              const x = centerX + Math.cos(radians) * radiusPercentage;
              const y = centerY + Math.sin(radians) * radiusPercentage;


              return (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    opacity: { duration: 0.5, delay: 0.5 + index * 0.1 },
                    scale: { duration: 0.5, delay: 0.5 + index * 0.1 },
                  }}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="relative">
                      {/* حجم أيقونة الخدمة أصبح متجاوبًا */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden bg-transparent backdrop-blur-md  border-[#ff883e]/20 transition-all duration-300 group-hover:border-[#ff883e]/40">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                          onError={(e) =>
                            handleImageError(e, "/default-service-icon.jpg")
                          }
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* النص */}
                    <div className="text-center max-w-[150px]">
                      <span
                        className={`text-sm md:text-base text-[#ff883e] font-bold block mb-1 ${
                          isRTL ? "font-cairo" : "font-roboto"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span
                        className={`text-xs text-white/80 ${
                          isRTL ? "font-cairo" : "font-inter"
                        }`}
                      >
                        {/* {service.shortDesc} */}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ready to Get Started CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8"
        >
          <motion.a
            href="https://wa.me/971504616041"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#ff883e] hover:bg-[#ff883e] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.ctaButton}
            {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
          </motion.a>
        </motion.div>
      </div>
    </section>

    {/* تعديل: استبدال قسم السلايدر بقسم Grid للصور */}
    <section className="py-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-6xl mx-auto px-4 md:px-8 z-10"
      >
        {/* تعديل: Grid layout للصور بدلاً من السلايدر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliderImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
              onClick={() => openModal(image)} // تعديل: فتح المودال عند الضغط على الصورة
            >
              <img
                src={image}
                alt={`Service ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
              {/* تعديل: إضافة أيقونة التكبير عند hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaSearchPlus className="text-white text-4xl drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* تعديل: استخدام المودال الجديد بدون أزرار التنقل */}
    <ImageModal
      isOpen={isModalOpen}
      onClose={closeModal}
      imageSrc={modalImageSrc}
      currentIndex={0}
      totalImages={1}
      onNext={() => {}} // لا حاجة للتنقل
      onPrev={() => {}} // لا حاجة للتنقل
    />

    {/* Services Details Section */}
    <section ref={servicesRef} className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          className={`text-3xl md:text-4xl font-bold text-center mb-12 text-white ${
            isRTL ? "font-cairo" : "font-sora"
          }`}
        >
          {isRTL ? "ماذا نفعل ؟" : "What we do ?"}
        </motion.h2>
        {/* الصف الأول - 3 كاردات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {content.services.slice(0, 3).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1a1a1a]/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#ff883e]/20 group"
            >
              <motion.div className="h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8 object-contain"
                      onError={(e) => handleImageError(e)}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white flex-1 ${
                      isRTL ? "font-cairo" : "font-roboto"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>
                <p
                  className={`text-white/70 leading-relaxed ${
                    isRTL ? "font-cairo" : "font-inter"
                  }`}
                >
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        {/* الصف الثاني - 2 كاردات مع gap أكبر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 max-w-5xl mx-auto">
          {content.services.slice(3, 5).map((service, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              className="bg-[#1a1a1a]/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#ff883e]/20 group"
            >
              <motion.div className="h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8 object-contain"
                      onError={(e) => handleImageError(e)}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white flex-1 ${
                      isRTL ? "font-cairo" : "font-roboto"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>
                <p
                  className={`text-white/70 leading-relaxed ${
                    isRTL ? "font-cairo" : "font-inter"
                  }`}
                >
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-12 rounded-3xl shadow-2xl border border-[#ff883e]/20">
            <h3
              className={`text-2xl md:text-3xl font-bold text-white mb-4 ${
                isRTL ? "font-cairo" : "font-sora"
              }`}
            >
              {isRTL
                ? "دعنا نحول رؤيتك إلى واقع"
                : "Let's Transform Your Vision into Reality"}
            </h3>
            <p
              className={`text-white/90 mb-8 max-w-2xl mx-auto ${
                isRTL ? "font-cairo" : "font-inter"
              }`}
            >
              {isRTL
                ? "فريقنا من الخبراء جاهز لمساعدتك في تحقيق أهدافك التسويقية الرقمية"
                : "Our team of experts is ready to help you achieve your digital marketing goals"}
            </p>
            <motion.a
              href="https://wa.me/971504616041"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#ff883e] hover:bg-[#ff6a2e] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRTL ? "تواصل معنا الآن" : "Contact Us Now"}
              {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Decorative Elements */}
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff883e] rounded-full blur-[150px] opacity-10" />
    </div>

    <Footer />

    {/* Add custom styles for glassmorphism effect and other animations */}
    <style jsx>{`
      @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
        .glass-morphism {
          background: rgba(26, 26, 26, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 136, 62, 0.2);
        }
      }
      @supports not (backdrop-filter: blur(10px)) {
        .glass-morphism {
          background: rgba(26, 26, 26, 0.8);
          border: 1px solid rgba(255, 136, 62, 0.3);
        }
      }
      /* Animation for floating effect */
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      .floating {
        animation: float 3s ease-in-out infinite;
      }
      /* Gradient text effect */
      .gradient-text {
        background: linear-gradient(45deg, #ff883e, #ff7a28);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #1a1a1a;
      }
      ::-webkit-scrollbar-thumb {
        background: #ff883e;
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #ff7a28;
      }
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .service-orbit {
          transform: scale(0.8);
        }
      }
      @media (max-width: 640px) {
        .service-orbit {
          transform: scale(0.65);
        }
      }
      /* Modal animations */
      .modal-content {
        animation: modalSlideIn 0.3s ease-out;
      }
      @keyframes modalSlideIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      /* Image hover effects */
      .image-hover {
        transition: all 0.3s ease;
      }
      .image-hover:hover {
        transform: scale(1.05);
      }
      /* Grid image hover effect - تعديل: تأثيرات hover للصور في الجريد */
      .grid-image-container {
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      .grid-image-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .grid-image-container:hover::before {
        opacity: 1;
      }
      /* Prevent image drag */
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }
      /* Modal overlay blur */
      .modal-overlay {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
      /* Zoom controls */
      .zoom-controls {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 60;
      }
      /* Image container for modal */
      .modal-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      /* Modal image styles */
      .modal-image {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      .modal-image:active {
        cursor: grabbing;
      }
      /* Touch device optimizations */
      @media (hover: none) and (pointer: coarse) {
        .modal-image {
          touch-action: pinch-zoom;
        }
      }
      /* Orbit animation */
      @keyframes orbit {
        from {
          transform: rotate(0deg) translateX(200px) rotate(0deg);
        }
        to {
          transform: rotate(360deg) translateX(200px) rotate(-360deg);
        }
      }
      .pulse-effect {
        animation: pulse 2s infinite;
      }
      /* Glass morphism for Safari */
      @supports (-webkit-backdrop-filter: blur(10px)) {
        .glass-card {
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }
      }
      /* Enhanced focus states for accessibility */
      button:focus-visible,
      a:focus-visible {
        outline: 2px solid #ff883e;
        outline-offset: 2px;
      }
      /* Smooth transitions for all interactive elements */
      button,
      a,
      .interactive {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      /* Loading skeleton animation */
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
      .skeleton {
        background: linear-gradient(
          90deg,
          #1a1a1a 0px,
          #2a2a2a 40px,
          #1a1a1a 80px
        );
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }
      /* تعديل: أنماط إضافية للصور في الجريد */
      .image-grid-item {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        transition: all 0.3s ease;
      }
      .image-grid-item:hover {
        transform: translateY(-5px);
      }
      .image-grid-item .zoom-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .image-grid-item:hover .zoom-icon {
        opacity: 1;
      }
      /* تعديل: Planet positioning adjustment */
      .planet-container {
        margin-top: 400px; /* نزول الكوكب 400 بكسل */
      }
      /* تعديل: Background gradient for entire page */
      .page-background {
        position: fixed;
        inset: 0;
        background: radial-gradient(
          ellipse at center,
          rgba(255, 136, 62, 0.15) 0%,
          #0a0a0a 50%,
          #000000 100%
        );
        z-index: -1;
      }
      /* Responsive grid adjustments */
      @media (max-width: 768px) {
        .image-grid {
          grid-template-columns: 1fr;
        }
      }
      @media (min-width: 769px) and (max-width: 1024px) {
        .image-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      /* Modal click-to-close area */
      .modal-backdrop {
        cursor: pointer;
      }
      .modal-content-wrapper {
        cursor: default;
      }
      /* Image zoom animation in modal */
      @keyframes zoomIn {
        from {
          transform: scale(0.5);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      .modal-image-zoom {
        animation: zoomIn 0.3s ease-out;
      }
    `}</style>
  </div>
);
}