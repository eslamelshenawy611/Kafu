"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function ValuesSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const values = [
    {
      key: "excellence",
      title: isRTL ? "التميز" : "Excellence",
      description: isRTL
        ? "نسعى لتقديم نتائج تتجاوز التوقعات."
        : "We strive to deliver outcomes that exceed expectations.",
      rotation: "-rotate-6",
    },
    {
      key: "transparency",
      title: isRTL ? "الشفافية" : "Transparency",
      description: isRTL
        ? "نؤمن بأن الثقة تُبنى على الوضوح، لذا نتعامل بصدق في كل مرحلة."
        : "We believe trust is built on clarity, so we act with honesty at every stage.",
      rotation: "rotate-6",
    },
    {
      key: "flexibility",
      title: isRTL ? "المرونة" : "Flexibility",
      description: isRTL
        ? "نتكيف بسرعة وفعالية مع تغيرات السوق واحتياجات العملاء."
        : "We adapt quickly and effectively to market changes and client needs.",
      rotation: "-rotate-6",
    },
    {
      key: "commitment",
      title: isRTL ? "الالتزام" : "Commitment",
      description: isRTL
        ? "نحن ملتزمون بالمواعيد النهائية والجودة وتحقيق الأهداف لضمان رضا العملاء."
        : "We are dedicated to deadlines, quality, and achieving objectives to ensure client satisfaction.",
      rotation: "rotate-6",
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden values-section "
      >
        
        <div
          className="container-fluid  sm:px-6 md:px-8 lg:px-12 relative z-10 "
          style={{
       background: `
  linear-gradient(135deg, rgba(232, 124, 57, 0.3) 0%, transparent 50%, rgba(196, 196, 196, 0.2) 100%),
  linear-gradient(45deg, transparent 30%, rgba(232, 124, 57, 0.15) 50%, transparent 70%),
  linear-gradient(-45deg, transparent 30%, rgba(196, 196, 196, 0.15) 50%, transparent 70%),
  radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.8) 100%),
  #000000
`,
            boxShadow: "inset 0 10px 15px -10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 "
          >
            <h2
              className={`text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 py-12 text-white m-0
                
                
                 ${
                isRTL ? "font-cairo" : "font-sora"
              }`}
              style={{
                textShadow:
                  "0 0 30px rgba(255,149,0,0.3), 0 0 60px rgba(255,149,0,0.1)",
              }}
            >
              {isRTL ? "قيمنا الأساسية" : "Our Values"}
            </h2>

            <motion.a
              href="https://wa.me/971504616041"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF883E] px-6 py-3 rounded-full text-white font-semibold hover:bg-[#FF7A28] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow:
                  "0 10px 40px rgba(255,136,62,0.3), 0 20px 80px rgba(255,136,62,0.1)",
              }}
            >
              {isRTL ? "المزيد من التفاصيل" : "MORE DETAIL"}
              {isRTL ? (
                <FaArrowLeft className="text-sm" />
              ) : (
                <FaArrowRight className="text-sm" />
              )}
            </motion.a>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pb-44 pt-10">
            {values.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="relative"
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl relative z-10 h-full border border-white/20 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    boxShadow:
                      "0 10px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,149,0,0.05)",
                  }}
                >
                  <h3
                    className={`text-2xl font-bold mb-4 text-white ${
                      isRTL ? "font-cairo" : "font-sora"
                    }`}
                  >
                    {value.title}
                  </h3>

                  <p
                    className={`text-white/80 leading-relaxed ${
                      isRTL ? "font-cairo" : "font-inter"
                    }`}
                  >
                    {value.description}
                  </p>
                </motion.div>

                <div
                  className={`absolute inset-0 bg-[#FF883E] rounded-2xl transform ${value.rotation} opacity-20`}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background decorations */}
        {/* <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-[#FF883E] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.1, 0.15]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
       
      />  */}
            <div
        className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.02) 90%, transparent 100%)",
          // boxShadow: "0 -10px 30px rgba(0,0,0,0.8)",
        }}
      />
                        <div
        className="absolute top-0 left-0 right-0 h-16 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,136,62,1) 0%, rgba(255,136,62,0.9) 10%, rgba(255,136,62,0.6) 25%, rgba(255,136,62,0.3) 45%, rgba(255,136,62,0.1) 70%, rgba(255,136,62,0.02) 90%, transparent 100%)",
          // boxShadow: "0 -10px 30px rgba(0,0,0,0.8)",
        }}
      />
        <style jsx>
          {`
            .custom-shape-divider-top-1758594737 {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              overflow: hidden;
              line-height: 0;
            }

            .custom-shape-divider-top-1758594737 svg {
              position: relative;
              display: block;
              width: calc(127% + 1.3px);
              height: 100px;
              transform: rotateY(180deg);
            }

            .custom-shape-divider-top-1758594737 .shape-fill {
              fill: #ef8536;
            }
          `}
        </style>
      </section>
    </>
  );
}
