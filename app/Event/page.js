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
    title: "Event Planning & Management",
    subtitle:
      "From concept to execution, we bring your vision to life. Whether it’s a brand launch, gala, product unveiling, or experiential event — we manage every detail.",
    ctaButton: "Request a free quotation",
    services: [
      {
        title: "360° Event Management",
        description:
          "Event timeline & plan, vendor coordination, guest management, staffing, on-site direction, contingency plans, post-event report.",
        icon: "/events/management.png",
      },
      {
        title: "Event Production",
        description:
          "Production concept, technical specs, crew, equipment rental, rehearsal, technical direction, day-of execution.",
        icon: "/events/production.png",
      },
      {
        title: "Venue Selection",
        description:
          "Venue shortlist, site visits, proposal comparisons, contract negotiation, logistics integration with the rest of the event.",
        icon: "/events/venue.png",
      },
      {
        title: "Additional Ideas",
        description:
          "Show past events gallery (images, video reels), client journey infographic, event packages (small / medium / large), or add-ons like VIP lounge, photo booths, immersive zones.",
        icon: "/events/ideas.png",
      }, 
      {
        title: "Event Branding",
        description:
          "",
        icon: "/events/event-planner.png",
      },
    ],
  },
  ar: {
    title: "تخطيط وإدارة الفعاليات",
    subtitle:
      "من الفكرة إلى التنفيذ، نحول رؤيتك إلى حقيقة. سواء كان إطلاق علامة تجارية، حفل غالا، كشف منتج، أو فعالية تفاعلية — ندير كل التفاصيل بدقة.",
    ctaButton: "اطلب عرض أسعار مجاني",
    services: [
      {
        title: "إدارة الفعاليات 360°",
        description:
          "خطة وجدول الفعالية، تنسيق الموردين، إدارة الضيوف، تنظيم الطاقم، التوجيه في الموقع، خطط الطوارئ، والتقرير الختامي بعد الحدث.",
        icon: "/events/management.png",
      },
      {
        title: "إنتاج الفعاليات",
        description:
          "تصميم فكرة الإنتاج، المواصفات التقنية، الطاقم، استئجار المعدات، البروفات، التوجيه الفني، والتنفيذ يوم الفعالية.",
        icon: "/events/production.png",
      },
      {
        title: "اختيار المكان",
        description:
          "اختيار قائمة مختصرة من الأماكن، الزيارات الميدانية، مقارنة العروض، التفاوض على العقود، ودمج اللوجستيات مع باقي تفاصيل الفعالية.",
        icon: "/events/venue.png",
      },
      {
        title: "أفكار إضافية",
        description:
          "عرض معرض للفعاليات السابقة (صور وفيديوهات)، رحلة العميل عبر إنفوجرافيك، باقات فعاليات (صغيرة / متوسطة / كبيرة)، أو إضافات مثل صالة VIP، فوتوبوث، ومناطق تفاعلية.",
        icon: "/events/ideas.png",
      },
       {
        title: "الهوية البصرية ",
        description:
          "",
        icon: "/events/event-planner.png",
      },
    ],
  },
};
// Hero slider images
const sliderImages = [
  "/events/evemange.png",
  "/events/excution.png",
  "/events/gallary.png",
  "/events/manage.png",
  "/events/party.png",
  "/events/selection.png",
];
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
        onClick={onClose}
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

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300 z-10"
          >
            <FaTimes className="text-xl" />
          </button>

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const content = serviceDetailsData[language];
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true });

  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // تحديد مواضع الأيقونات بشكل منظم
  const getServicePosition = (index) => {
    const positions = [
      { angle: 0, radius: 35, textAlign: "bottom" },    // يمين - النص على اليسار
      { angle: 72, radius: 35, textAlign: "bottom" }, // أعلى يمين - النص أسفل
      { angle: 144, radius: 45, textAlign: "bottom" }, // أعلى يسار - النص أسفل
      { angle: 216, radius: 50, textAlign: "top" },   // أسفل يسار - النص أعلى
      { angle: 288, radius: 45, textAlign: "top" },   // أسفل يمين - النص أعلى
    ];
    
    return positions[index] || positions[0];
  };

  const handleImageError = (e, fallbackSrc = "") => {
    if (e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
    }
  };

  return (
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
      <section ref={heroRef} className="relative overflow-hidden pt-32">
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

          {/* Planet with Orbiting Services */}
          <div className="relative w-full max-w-[800px] mx-auto aspect-square flex items-center justify-center mt-20 md:mt-32">
            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <motion.div
                className="absolute w-[90%] h-[90%] rounded-full border border-[#ff883e]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[80%] h-[80%] rounded-full border border-[#ff883e]/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Central Planet */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.5, type: "spring" }}
              className="relative z-10 w-[30%] h-[30%] md:w-[35%] md:h-[35%] lg:w-[40%] lg:h-[40%]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
              >
                <img
                  src="/service-image/276f27cf-d295-4ec1-97fb-719b76576184.jpg"
                  alt="Digital Marketing Planet"
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff883e]/40 to-transparent" />
                            </motion.div>
                          </motion.div>
              
                          {/* Orbiting Service Icons Container */}
                          <div className="absolute inset-0 w-full h-full">
                            {content.services.map((service, index) => {
                              const position = getServicePosition(index);
                              const radians = (position.angle * Math.PI) / 180;
                              const radius = position.radius;
                              const centerX = 50;
                              const centerY = 50;
                              const x = centerX + Math.cos(radians) * radius;
                              const y = centerY + Math.sin(radians) * radius;
              
                              // حساب موضع النص بناءً على موضع الأيقونة
                              const getTextPosition = () => {
                                switch (position.textAlign) {
                                  case "left":
                                    return {
                                      left: "auto",
                                      right: "110%",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      textAlign: "right",
                                    };
                                  case "right":
                                    return {
                                      left: "110%",
                                      right: "auto",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      textAlign: "left",
                                    };
                                  case "top":
                                    return {
                                      left: "50%",
                                      bottom: "110%",
                                      top: "auto",
                                      transform: "translateX(-50%)",
                                      textAlign: "center",
                                    };
                                  case "bottom":
                                    return {
                                      left: "50%",
                                      top: "110%",
                                      bottom: "auto",
                                      transform: "translateX(-50%)",
                                      textAlign: "center",
                                    };
                                  default:
                                    return {
                                      left: "50%",
                                      top: "110%",
                                      transform: "translateX(-50%)",
                                      textAlign: "center",
                                    };
                                }
                              };
              
                              const textStyle = getTextPosition();
              
                              return (
                                <motion.div
                                  key={index}
                                  className="absolute pointer-events-auto"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                                  transition={{
                                    opacity: { duration: 0.5, delay: 0.5 + index * 0.15 },
                                    scale: { duration: 0.5, delay: 0.5 + index * 0.15 },
                                  }}
                                  style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: "translate(-50%, -50%)",
                                  }}
                                >
                                  <div className="relative flex flex-col items-center gap-3 group cursor-pointer">
                                    {/* Icon Container */}
                                    <div className="relative">
                                      <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden bg-black/60 backdrop-blur-md  transition-all duration-300 group-hover:border-[#ff883e] group-hover:bg-black/80 group-hover:scale-110">
                                        <img
                                          src={service.icon}
                                          alt={service.title}
                                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain relative z-10"
                                          onError={(e) =>
                                            handleImageError(e, "/default-service-icon.jpg")
                                          }
                                          loading="lazy"
                                        />
                                      </div>
                                      
                                      {/* Text positioned based on icon location */}
                                      <div 
                                        className="absolute whitespace-nowrap z-20"
                                        style={{
                                          ...textStyle,
                                          minWidth: "150px",
                                          maxWidth: "200px",
                                        }}
                                      >
                                        <span
                                          className={`text-xs sm:text-sm md:text-base text-[#ff883e] font-semibold drop-shadow-lg bg-black/70 px-2 py-1 rounded-lg inline-block ${
                                            isRTL ? "font-cairo" : "font-roboto"
                                          }`}
                                          style={{ textAlign: textStyle.textAlign }}
                                        >
                                          {service.title}
                                        </span>
                                      </div>
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
                          className="text-center my-8"
                        >
                          <motion.a
                            href="https://wa.me/971504616041"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#ff883e] hover:bg-[#ff883e] text-white px-8 py-4 mt-22 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {content.ctaButton}
                            {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
                          </motion.a>
                        </motion.div>
                      </div>
                    </section>
              
                    {/* Image Grid Section */}
                    <section className="py-16 relative overflow-hidden">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative max-w-6xl mx-auto px-4 md:px-8 z-10"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sliderImages.map((image, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                              onClick={() => openModal(image)}
                            >
                              <img
                                src={image}
                                alt={`Service ${index + 1}`}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.src = "";
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                                <FaSearchPlus className="text-white text-4xl drop-shadow-lg" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </section>
              
                    <ImageModal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      imageSrc={modalImageSrc}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8  max-w-5xl mx-auto ">
                          {content.services.slice(0, 2).map((service, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 50 }}
                              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              className="bg-[#1a1a1a]/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#ff883e]/20 group"
                            >
                              <div className="h-full">
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
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-2  max-w-5xl mx-auto">
                          {content.services.slice(2, 4).map((service, index) => (
                            <motion.div
                              key={index + 3}
                              initial={{ opacity: 0, y: 50 }}
                              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                              className="bg-[#1a1a1a]/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#ff883e]/20 group"
                            >
                              <div className="h-full">
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
                              </div>
                            </motion.div>
                          ))}
                        </div>
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
              
                      /* Icon positioning adjustments for mobile */
                      @media (max-width: 768px) {
                        .service-orbit {
                          transform: scale(0.8);
                        }
                        
                        /* تعديل موضع النص على الموبايل */
                        .service-text {
                          position: absolute;
                          white-space: normal;
                          width: 120px;
                          text-align: center;
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
              
                      /* Prevent text overlap */
                      .service-item {
                        isolation: isolate;
                      }
              
                      .service-text-wrapper {
                        position: absolute;
                        z-index: 30;
                        pointer-events: none;
                      }
              
                      /* Orbit path visualization (optional - for debugging) */
                      .orbit-path {
                        position: absolute;
                        inset: 0;
                        border: 1px dashed rgba(255, 136, 62, 0.1);
                        border-radius: 50%;
                        pointer-events: none;
                      }
              
                      /* Enhanced icon hover states */
                      .service-icon-container {
                        position: relative;
                        z-index: 20;
                      }
              
                      .service-icon-container::before {
                        content: '';
                        position: absolute;
                        inset: -4px;
                        background: linear-gradient(45deg, #ff883e, #ff7a28);
                        border-radius: 20px;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        z-index: -1;
                      }
              
                      .service-icon-container:hover::before {
                        opacity: 0.3;
                      }
              
                      /* Responsive text positioning */
                      @media (max-width: 1024px) {
                        .orbit-text-left {
                          right: calc(100% + 10px) !important;
                        }
                        
                        .orbit-text-right {
                          left: calc(100% + 10px) !important;
                        }
                        
                        .orbit-text-top {
                          bottom: calc(100% + 10px) !important;
                        }
                        
                        .orbit-text-bottom {
                          top: calc(100% + 10px) !important;
                        }
                      }
              
                      /* Ensure text readability */
                      .service-label {
                        background: rgba(0, 0, 0, 0.8);
                        padding: 4px 12px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                        backdrop-filter: blur(8px);
                      }
              
                      /* Prevent icon and text overlap on smaller screens */
                      @media (max-width: 640px) {
                        .service-label {
                          font-size: 0.75rem;
                          padding: 2px 8px;
                        }
                        
                        .orbit-container {
                          min-height: 500px;
                        }
                      }
              
                      /* Z-index hierarchy */
                      .orbit-container {
                        position: relative;
                        z-index: 1;
                      }
              
                      .planet-center {
                        position: relative;
                        z-index: 10;
                      }
              
                      .service-item {
                        position: relative;
                        z-index: 20;
                      }
              
                      .service-text {
                        position: relative;
                        z-index: 30;
                      }
              
                      /* Improved touch targets for mobile */
                      @media (hover: none) and (pointer: coarse) {
                        .service-icon-container {
                          min-width: 48px;
                          min-height: 48px;
                        }
                      }
              
                      /* Animation staggering for icons */
                      .service-item:nth-child(1) {
                        animation-delay: 0.1s;
                      }
                      
                      .service-item:nth-child(2) {
                        animation-delay: 0.2s;
                      }
                      
                      .service-item:nth-child(3) {
                        animation-delay: 0.3s;
                      }
                      
                      .service-item:nth-child(4) {
                        animation-delay: 0.4s;
                      }
                      
                      .service-item:nth-child(5) {
                        animation-delay: 0.5s;
                      }
              
                      /* Fade in animation */
                      @keyframes fadeInScale {
                        from {
                          opacity: 0;
                          transform: scale(0.8);
                        }
                        to {
                          opacity: 1;
                          transform: scale(1);
                        }
                      }
              
                      .fade-in-scale {
                        animation: fadeInScale 0.6s ease-out forwards;
                      }
                    `}</style>
                  </div>
                );
              }