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
// event data
const serviceDetailsData = {
  en: {
    title: "Media Services",
    subtitle:
      "We plan and execute media solutions that extend your brand’s reach through high-impact visuals, outdoor presence, and immersive shootings.",
    ctaButton: "Request a free quotation",
    services: [
      {
        title: "Outdoor Branding",
        description:
          "Location analysis, design, material production, installation/project management, compliance permits, maintenance.",
        icon: "/media/outdoor-branding.png",
      },
      {
        title: "Shootings",
        description:
          "Creative brief, shot list, team (photographer, videographer, assistants, stylist), raw + final deliverables (images, video cuts, edits), usage rights.",
        icon: "/media/shootings.png",
      },
      {
        title: "Additional Ideas",
        description:
          "For 'Shootings,' break it further into sub-types: product shoots, fashion/editorial, lifestyle, corporate, advertisement campaign shoots. Show behind-the-scenes images or 'making of' reels to emphasize your professionalism. Use a 'portfolio slider/gallery' for outdoor media installations you’ve done.",
        icon: "/media/additional-ideas.png",
      },
      {
        title: "Media Buying & Planning",
        description:
          "Budget allocation across channels (digital & traditional), negotiating ad space rates, and timing campaigns to maximize reach within budget.",
        icon: "/media/media-buying.png",
      },
      {
        title: "Photography",
        description: "",
        icon: "/media/servicess.png",
      },
    ],
  },
  ar: {
    title: "خدمات الإعلام",
    subtitle:
      "نخطط وننفذ حلول إعلامية تُوسّع نطاق وصول علامتك التجارية من خلال صور قوية التأثير، وجود خارجي مميز، وجلسات تصوير غامرة.",
    ctaButton: "اطلب عرض أسعار مجاني",
    services: [
      {
        title: "العلامة الخارجية",
        description:
          "تحليل الموقع، التصميم، إنتاج المواد، إدارة التثبيت/المشروع، تصاريح الامتثال، الصيانة.",
        icon: "/media/outdoor-branding.png",
      },
      {
        title: "جلسات التصوير",
        description:
          "موجز إبداعي، قائمة اللقطات، الفريق (مصوّر، مصوّر فيديو، مساعدين، منسّق أزياء)، المواد الأولية + النهائية (صور، مقاطع فيديو، تعديلات)، حقوق الاستخدام.",
        icon: "/media/shootings.png",
      },
      {
        title: "أفكار إضافية",
        description:
          "بالنسبة لـ 'جلسات التصوير'، قسمها أكثر إلى أنواع فرعية: تصوير المنتجات، الأزياء/المجلات، أسلوب الحياة، الشركات، تصوير حملات إعلانية. عرض صور كواليس أو مقاطع 'وراء الكواليس' لتوضيح مهنيتك. استخدام 'عارض/معرض صور' لمشاريع الوسائط الخارجية التي قمت بها.",
        icon: "/media/additional-ideas.png",
      },
      {
        title: "شراء وتخطيط الوسائط",
        description:
          "تخصيص الميزانية عبر القنوات (رقمية وتقليدية)، التفاوض على أسعار المساحات الإعلانية، وتوقيت الحملات لتحقيق أقصى وصول ضمن الميزانية.",
        icon: "/media/media-buying.png",
      },
      {
        title: "التصوير الفوتوغرافي",
        description: "",
        icon: "/media/servicess.png",
      },
    ],
  },
};

// Hero slider images
const sliderImages = [
  "/media/location.png",
  "/media/photo-session.png",
  "/media/photographyteam.png",
  "/media/street.png",
  "/media/team.png",
  "/media/watch.png",
];
// Enhanced Starfield Background with patterns
const EnhancedBackground = () => (
  <>
    {/* Grid Pattern */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(#ff883e 1px, transparent 1px),
          linear-gradient(90deg, #ff883e 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  </>
);
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
  }, [isOpen, onClose]);

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
            alt="Events Image"
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
export default function EventServices() {
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

  // Get radius based on screen size
  const getRadius = () => {
    if (windowSize.width < 640) return 180;
    if (windowSize.width < 1024) return 230;
    return 280;
  };

  // Positions for orbiting services - evenly distributed
  const servicePositions = [
    { angle: -105, radius: getRadius() + 130 }, // top
    { angle: -70, radius: getRadius() + 60 }, // top right
    { angle: 20, radius: getRadius() - 120 }, // bottom right
    { angle: 180, radius: getRadius() - 60 }, // bottom left
    { angle: 100, radius: getRadius() - 50 }, // top left
  ];

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
              className={`text-4xl md:text-4xl font-bold text-[#FF8B3F] mb-6 mt-10   ${
                isRTL ? "font-cairo" : "font-sora"
              }`}
            >
              {content.title}
            </h1>
            <p
              className={`text-lg md:text-xl text-[#c4c4c4] max-w-2xl mx-auto  ${
                isRTL ? "font-cairo" : "font-inter"
              }`}
            >
              {content.subtitle}
            </p>
          </motion.div>

          {/* Planet with Orbiting Services */}
          <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center py-10 mt-52">
            {/* Orbit Rings - Behind everything */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div
                className="absolute w-[550px] h-[550px] md:w-[650px] md:h-[650px] rounded-full border border-[#ff883e]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full border border-[#ff883e]/10"
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
                className="w-72 h-72 md:w-80 md:h-80 relative"
              >
                <img
                  src="/service-image/fb7003d5-cb62-4701-85e9-791124d930da.jpg"
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
                const { angle, radius } = servicePositions[index];
                const radians = (angle * Math.PI) / 180;

                // Calculate position from center of container
                const centerX = 50; // Container center in percentage
                const centerY = 50;

                // Convert radius to percentage of container width/height
                const radiusPercentX = (radius / 350) * 50; // 350 is approximate half container width
                const radiusPercentY = (radius / 350) * 50;

                // Calculate final position in percentage
                const x = centerX + Math.cos(radians) * radiusPercentX;
                const y = centerY + Math.sin(radians) * radiusPercentY;

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
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden bg-transparent backdrop-blur-md  border-[#ff883e]/20 transition-all duration-300 group-hover:border-[#ff883e]/40">
                          <img
                            src={service.icon}
                            alt={service.title}
                            className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
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
                          {service.shortDesc}
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
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}

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

          {/* الصف الأول - 2 كاردات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {content.services.slice(0, 2).map((service, index) => (
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

          {/* الصف الثاني - 2 كاردات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mt-8">
            {content.services.slice(2, 4).map((service, index) => (
              <motion.div
                key={index + 2}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
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
        @supports (backdrop-filter: blur(10px)) or
          (-webkit-backdrop-filter: blur(10px)) {
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
