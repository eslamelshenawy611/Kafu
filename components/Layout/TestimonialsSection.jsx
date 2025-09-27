"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TestimonialsSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
  {
    id: 3,
    name: isRTL ? "أحمد كيلاني" : "Ahmed Kilani",
    gender: "male",
    rating: 5,
    reviewEn:
      "Attention to the smallest details. The staff is classy and quick to respond. I highly recommend dealing with them.",
    reviewAr:
      "اهتمام بأدق التفاصيل. طاقم العمل راقي وسريع الاستجابة. أنصح بشدة بالتعامل معهم.",
  },
  {
    id: 4,
    name: isRTL ? "دانا ترك" : "Dana Turk",
    gender: "female",
    rating: 5,
    reviewEn:
      "To the Management of Kafu, I would like to express my sincere gratitude for the outstanding services you have provided. My experience was exceptional and highly satisfying.",
    reviewAr:
      "لإدارة وكالة Kafu، أود أن أعبر عن امتناني الصادق للخدمات المتميزة التي قدمتموها. كانت تجربتي استثنائية ومرضية للغاية.",
  },
  {
    id: 5,
    name: isRTL ? "مريم الأحمد" : "Maryam Al-Ahmad",
    gender: "female",
    rating: 5,
    reviewEn:
      "Exceptional service and a professional team. The results exceeded my expectations, and the support was outstanding throughout the process.",
    reviewAr:
      "خدمة استثنائية وفريق محترف. النتائج فاقت توقعاتي، وكان الدعم متميزاً طوال العملية.",
  },
  {
    id: 6,
    name: isRTL ? "عمر السالم" : "Omar Al-Salem",
    gender: "male",
    rating: 5,
    reviewEn:
      "Working with this agency was a game-changer for our business. They have a highly professional and results-driven approach.",
    reviewAr:
      "العمل مع هذه الوكالة غيّر قواعد اللعبة لأعمالنا. لديهم نهج مهني للغاية يركز على النتائج.",
  },
  {
    id: 7,
    name: isRTL ? "فاطمة الزهراء" : "Fatima Al-Zahra",
    gender: "female",
    rating: 5,
    reviewEn:
      "Outstanding creativity and attention to detail. The team delivered beyond our expectations with perfect timing.",
    reviewAr:
      "إبداع متميز واهتمام بالتفاصيل. الفريق حقق ما فاق توقعاتنا بتوقيت مثالي.",
  },
  {
    id: 8,
    name: isRTL ? "خالد المنصور" : "Khalid Al-Mansour",
    gender: "male",
    rating: 5,
    reviewEn:
      "Professional service from start to finish. Great communication and exceptional results. Highly recommended!",
    reviewAr:
      "خدمة مهنية من البداية للنهاية. تواصل رائع ونتائج استثنائية. أنصح بشدة!",
  },
  {
    id: 9,
    name: isRTL ? "سارة محمود" : "Sarah Mahmoud",
    gender: "female",
    rating: 5,
    reviewEn:
      "Amazing experience with the team. They understand the market very well and provided excellent strategies for our brand growth.",
    reviewAr:
      "تجربة رائعة مع الفريق. يفهمون السوق جيداً وقدموا استراتيجيات ممتازة لنمو علامتنا التجارية.",
  },
  {
    id: 10,
    name: isRTL ? "محمد الأسدي" : "Mohammed Al-Asadi",
    gender: "male",
    rating: 5,
    reviewEn:
      "The best agency I've worked with. Their creative approach and dedication to quality are unmatched.",
    reviewAr:
      "أفضل وكالة تعاملت معها. نهجهم الإبداعي وتفانيهم في الجودة لا يضاهى.",
  },
  {
    id: 11,
    name: isRTL ? "نور الهدى" : "Nour Al-Huda",
    gender: "female",
    rating: 5,
    reviewEn:
      "Incredible results in a short time. The team is professional, responsive, and truly understands digital marketing.",
    reviewAr:
      "نتائج لا تصدق في وقت قصير. الفريق محترف، سريع الاستجابة، ويفهم حقاً التسويق الرقمي.",
  },
  {
    id: 12,
    name: isRTL ? "أسامة الحكيم" : "Osama Al-Hakeem",
    gender: "male",
    rating: 5,
    reviewEn:
      "Top-notch service and outstanding support. They helped us achieve our marketing goals beyond expectations.",
    reviewAr:
      "خدمة من الدرجة الأولى ودعم متميز. ساعدونا في تحقيق أهدافنا التسويقية بما يفوق التوقعات.",
  },
  {
    id: 13,
    name: isRTL ? "ليلى القاسمي" : "Layla Al-Qasimi",
    gender: "female",
    rating: 5,
    reviewEn:
      "Fantastic team with innovative solutions. They transformed our brand presence and significantly increased our engagement.",
    reviewAr:
      "فريق رائع بحلول مبتكرة. حولوا حضور علامتنا التجارية وزادوا من تفاعلنا بشكل كبير.",
  },
  {
    id: 14,
    name: isRTL ? "زياد العلي" : "Ziad Al-Ali",
    gender: "male",
    rating: 5,
    reviewEn:
      "Excellent collaboration and remarkable results. Their strategic approach helped us reach new markets successfully.",
    reviewAr:
      "تعاون ممتاز ونتائج رائعة. نهجهم الاستراتيجي ساعدنا في الوصول لأسواق جديدة بنجاح.",
  },
  {
    id: 15,
    name: isRTL ? "رانيا الشامي" : "Rania Al-Shami",
    gender: "female",
    rating: 5,
    reviewEn:
      "Professional expertise and creative vision. They delivered exactly what we needed to elevate our brand.",
    reviewAr:
      "خبرة مهنية ورؤية إبداعية. قدموا بالضبط ما احتجناه لرفع مستوى علامتنا التجارية.",
  },
  {
    id: 16,
    name: isRTL ? "طارق الفارس" : "Tarek Al-Fares",
    gender: "male",
    rating: 5,
    reviewEn:
      "Outstanding quality and timely delivery. Working with this agency was one of our best business decisions.",
    reviewAr:
      "جودة متميزة وتسليم في الوقت المحدد. العمل مع هذه الوكالة كان من أفضل قراراتنا التجارية.",
  },
];


  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${
          index < rating ? "text-[#FFC107]" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F0F0F0]" // أضف relative و background color هنا
    >
      {/* Shape Divider */}
      <div className="custom-shape-divider-top">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="container-custom relative py-20 ">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            TESTIMONIALS
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Profile Image - Positioned above the card */}
                  <div className="flex justify-center mb-[-50px] relative z-10">
                    <div className="w-[100px] h-[100px] rounded-full border-4 border-[#FFC107] overflow-hidden bg-white shadow-lg">
                      <img
                        src={
                          testimonial.gender === "female"
                            ? "/Femal-avtar.png"
                            : "/male-avatr.png"
                        }
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Testimonial Card */}
                  <div className="bg-[#32353E] rounded-2xl p-8 pt-16 relative shadow-xl">
                    {/* Quote marks */}
                    <div className="absolute left-6 top-16 text-[#FFC107] text-4xl opacity-50">
                      "
                    </div>
                    <div className="absolute right-6 bottom-6 text-[#FFC107] text-4xl opacity-50">
                      "
                    </div>

                    {/* Review Text */}
                    <p className="text-white text-sm leading-relaxed mb-6 px-4">
                      {isRTL ? testimonial.reviewAr : testimonial.reviewEn}
                    </p>

                    {/* Name and Title */}
                    <div className="text-center">
                      <h4 className="text-white font-semibold text-lg mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        {testimonial.title}
                      </p>

                      {/* Stars */}
                      <div className="flex justify-center gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-12 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300 group"
            >
              {isRTL ? (
                <FaChevronRight className="text-gray-700 group-hover:text-[#FFC107] transition-colors" />
              ) : (
                <FaChevronLeft className="text-gray-700 group-hover:text-[#FFC107] transition-colors" />
              )}
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * 2)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / 2) === index
                        ? "w-8 bg-[#FFC107]"
                        : "bg-gray-400"
                    }`}
                  />
                )
              )}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300 group"
            >
              {isRTL ? (
                <FaChevronLeft className="text-gray-700 group-hover:text-[#FFC107] transition-colors" />
              ) : (
                <FaChevronRight className="text-gray-700 group-hover:text-[#FFC107] transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Custom styles for testimonials section */
        .testimonials-section {
          position: relative;
          overflow: hidden;
        }

        /* Smooth card hover effect */
        .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        /* Profile image hover effect */
        .profile-image {
          transition: transform 0.3s ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
        }

        /* Quote marks style */
        .quote-mark {
          font-family: Georgia, serif;
          line-height: 1;
        }

        /* Navigation button styles */
        .nav-button {
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          transform: scale(1.1);
        }

        /* Dot indicator animation */
        .dot-indicator {
          transition: all 0.3s ease;
        }

        .dot-indicator.active {
          transform: scale(1.2);
        }

        /* Text selection color */
        ::selection {
          background-color: #ffc107;
          color: #32353e;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .testimonial-card {
            margin-bottom: 2rem;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Card entrance animation */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-enter {
          animation: slideInUp 0.6s ease-out;
        }

        /* Star rating animation */
        .star-rating {
          display: inline-flex;
          gap: 0.25rem;
        }

        .star-rating svg {
          transition: transform 0.2s ease;
        }

        .star-rating svg:hover {
          transform: scale(1.2);
        }

        /* Profile border gradient */
        .profile-border {
          background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
          padding: 3px;
          border-radius: 50%;
        }

        /* Card shadow effect */
        .card-shadow {
          box-shadow: 0 4px 20px rgba(50, 53, 62, 0.1);
        }

        .card-shadow:hover {
          box-shadow: 0 8px 30px rgba(50, 53, 62, 0.15);
        }

        /* Smooth transitions for all interactive elements */
        button,
        a {
          transition: all 0.3s ease;
        }

        /* Focus styles for accessibility */
        button:focus,
        a:focus {
          outline: 2px solid #ffc107;
          outline-offset: 2px;
        }

        /* Print styles */
        @media print {
          .testimonials-section {
            background: white !important;
          }

          .testimonial-card {
            page-break-inside: avoid;
          }
        }
        .custom-shape-divider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .custom-shape-divider-top {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 50px;
        }

        .custom-shape-divider-top .shape-fill {
          fill: #E5DDD5;
        }
      `}</style>
    </section>
  );
}
