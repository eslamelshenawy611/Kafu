'use client'

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { FaGoogle, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function TestimonialsSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: isRTL ? 'ياسين عواد' : 'Yaseen Awad',
      gender: 'male',
      rating: 5,
      reviewEn: "Wonderful courses, luxurious place, and excellent treatment, my experience with Mr. Saeed Services are available, and a staff...",
      reviewAr: "دورات رائعة، مكان فاخر، ومعاملة ممتازة، تجربتي مع السيد سعيد الخدمات متوفرة، وطاقم عمل..."
    },
    {
      id: 2,
      name: isRTL ? 'د. سهام كرنة' : 'Ph Siham Kfarneh',
      gender: 'female',
      rating: 5,
      reviewEn: "I advise anyone who wants to develop their skills in digital marketing, whether a beginner or a professional in the fiel...",
      reviewAr: "أنصح أي شخص يريد تطوير مهاراته في التسويق الرقمي، سواء كان مبتدئًا أو محترفًا في المجال..."
    },
    {
      id: 3,
      name: isRTL ? 'أحمد كيلاني' : 'Ahmed Kilani',
      gender: 'male',
      rating: 5,
      reviewEn: "Attention to the smallest details.. The staff's is classy and quick in response.. I highly recommend dealing with them",
      reviewAr: "اهتمام بأدق التفاصيل.. طاقم العمل راقي وسريع في الاستجابة.. أنصح بشدة بالتعامل معهم"
    },
    {
      id: 4,
      name: isRTL ? 'دانا ترك' : 'Dana Turk',
      gender: 'female',
      rating: 5,
      reviewEn: "To the Management of Kafu I would like to express my sincere gratitude for the outstanding services you have provided. My...",
      reviewAr: "لإدارة وكالة Kafu أود أن أعبر عن امتناني الصادق للخدمات المتميزة التي قدمتموها. تجربتي..."
    },
    {
      id: 5,
      name: isRTL ? 'مريم الأحمد' : 'Maryam Al-Ahmad',
      gender: 'female',
      rating: 5,
      reviewEn: "Exceptional service and professional team. The results exceeded my expectations and the support was outstanding...",
      reviewAr: "خدمة استثنائية وفريق محترف. النتائج فاقت توقعاتي والدعم كان متميزًا..."
    },
    {
      id: 6,
      name: isRTL ? 'عمر السالم' : 'Omar Al-Salem',
      gender: 'male',
      rating: 5,
      reviewEn: "Working with this agency was a game-changer for our business. Highly professional and results-driven approach...",
      reviewAr: "العمل مع هذه الوكالة غيّر قواعد اللعبة لأعمالنا. نهج مهني للغاية ويركز على النتائج..."
    },
    {
      id: 7,
      name: isRTL ? 'فاطمة الزهراء' : 'Fatima Al-Zahra',
      gender: 'female',
      rating: 5,
      reviewEn: "Outstanding creativity and attention to detail. The team delivered beyond our expectations with perfect timing...",
      reviewAr: "إبداع متميز واهتمام بالتفاصيل. الفريق حقق ما فاق توقعاتنا بتوقيت مثالي..."
    },
    {
      id: 8,
      name: isRTL ? 'خالد المنصور' : 'Khalid Al-Mansour',
      gender: 'male',
      rating: 5,
      reviewEn: "Professional service from start to finish. Great communication and exceptional results. Highly recommended!",
      reviewAr: "خدمة مهنية من البداية للنهاية. تواصل رائع ونتائج استثنائية. أنصح بشدة!"
    },
    // إضافة 8 تقييمات جديدة
    {
      id: 9,
      name: isRTL ? 'سارة محمود' : 'Sarah Mahmoud',
      gender: 'female',
      rating: 5,
      reviewEn: "Amazing experience with the team. They understand the market very well and provided excellent strategies for our brand...",
      reviewAr: "تجربة رائعة مع الفريق. يفهمون السوق جيداً وقدموا استراتيجيات ممتازة لعلامتنا التجارية..."
    },
    {
      id: 10,
      name: isRTL ? 'محمد الأسدي' : 'Mohammed Al-Asadi',
      gender: 'male',
      rating: 5,
      reviewEn: "The best agency I've worked with. Their creative approach and dedication to quality is unmatched...",
      reviewAr: "أفضل وكالة تعاملت معها. نهجهم الإبداعي وتفانيهم في الجودة لا يضاهى..."
    },
    {
      id: 11,
      name: isRTL ? 'نور الهدى' : 'Nour Al-Huda',
      gender: 'female',
      rating: 5,
      reviewEn: "Incredible results in a short time. The team is professional, responsive, and truly understands digital marketing...",
      reviewAr: "نتائج لا تصدق في وقت قصير. الفريق محترف ومستجيب ويفهم حقاً التسويق الرقمي..."
    },
    {
      id: 12,
      name: isRTL ? 'أسامة الحكيم' : 'Osama Al-Hakeem',
      gender: 'male',
      rating: 5,
      reviewEn: "Top-notch service and outstanding support. They helped us achieve our marketing goals beyond expectations...",
      reviewAr: "خدمة من الدرجة الأولى ودعم متميز. ساعدونا في تحقيق أهدافنا التسويقية بما يفوق التوقعات..."
    },
    {
      id: 13,
      name: isRTL ? 'ليلى القاسمي' : 'Layla Al-Qasimi',
      gender: 'female',
      rating: 5,
      reviewEn: "Fantastic team with innovative solutions. They transformed our brand presence and increased our engagement significantly...",
      reviewAr: "فريق رائع بحلول مبتكرة. حولوا حضور علامتنا التجارية وزادوا من تفاعلنا بشكل كبير..."
    },
    {
      id: 14,
      name: isRTL ? 'زياد العلي' : 'Ziad Al-Ali',
      gender: 'male',
      rating: 5,
      reviewEn: "Excellent collaboration and remarkable results. Their strategic approach helped us reach new markets successfully...",
      reviewAr: "تعاون ممتاز ونتائج رائعة. نهجهم الاستراتيجي ساعدنا في الوصول لأسواق جديدة بنجاح..."
    },
    {
      id: 15,
      name: isRTL ? 'رانيا الشامي' : 'Rania Al-Shami',
      gender: 'female',
      rating: 5,
      reviewEn: "Professional expertise and creative vision. They delivered exactly what we needed to elevate our brand...",
      reviewAr: "خبرة مهنية ورؤية إبداعية. قدموا بالضبط ما احتجناه لرفع مستوى علامتنا التجارية..."
    },
    {
      id: 16,
      name: isRTL ? 'طارق الفارس' : 'Tarek Al-Fares',
      gender: 'male',
      rating: 5,
      reviewEn: "Outstanding quality and timely delivery. Working with this agency was one of our best business decisions...",
      reviewAr: "جودة متميزة وتسليم في الوقت المحدد. العمل مع هذه الوكالة كان من أفضل قراراتنا التجارية..."
    }
  ];

  // حركة تلقائية للسلايدر
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= testimonials.length - 4 ? 0 : prevIndex + 1
      );
    }, 10000); // يتحرك كل 10 ثواني

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, testimonials.length - 4) : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex * 4);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm transition-colors duration-300 ${
          index < rating ? 'text-yellow-400' : 'text-orange-200/50'
        }`}
      />
    ));
  };

  const totalSlides = Math.ceil(testimonials.length / 4);
  const currentSlide = Math.floor(currentIndex / 4);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden min-h-screen"
    >
      {/* Main Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/Test_BG.png")',
        }}
      >
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-30 z-10">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: Math.random() > 0.5 ? '#ff883e' : '#3b82f6'
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-10">
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-orange-400/15 to-pink-400/15 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/3 w-2 h-20 bg-gradient-to-b from-yellow-400/20 to-orange-400/20 rounded-full blur-sm"
        />
      </div>

      {/* Content Container */}
      <div className="container-custom relative z-20">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          {/* Title with Enhanced Design */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full opacity-80 shadow-lg"
                style={{ backgroundColor: '#ff883e' }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -right-6 -top-2 w-8 h-8 bg-blue-500 rounded-full opacity-60"
              />
              <h2 className={`text-h2 lg:text-h2-lg font-bold text-white relative z-10 tracking-wide ${isRTL ? 'font-roboto' : 'font-inter'}`}>
                {isRTL ? 'آراء العملاء' : 'TESTIMONIALS'}
              </h2>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration : 1, delay: 0.6 }}
            className={`text-body font-medium lg:text-body-lg max-w-4xl mx-auto text-white leading-relaxed ${isRTL ? 'font-roboto' : 'font-inter'}`}
          >
            {isRTL 
              ? 'استمع لآراء عملائنا وشركائنا المقدرين حول تجاربهم في العمل مع وكالة Kafu. كلماتهم تلهمنا لمواصلة تقديم التميز والابتكار في كل مشروع.'
              : 'Hear from our valued clients and partners about their experiences working with Kafu Agency. Their words inspire us to continue delivering excellence and innovation in every project.'
            }
          </motion.p>

          {/* Enhanced Decorative Elements */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gray-300 rounded-full"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="w-3 h-3 bg-[#ff883e] rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gray-300 rounded-full"
            />
          </div>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          
          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-between items-center mb-12">
            <motion.button
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              onClick={prevTestimonial}
              className="group relative p-5 rounded-full bg-white/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-600 hover:text-[#ff883e] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
              disabled={currentIndex === 0}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff883e]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isRTL ? (
                <FaChevronRight className="text-xl group-hover:scale-125 transition-transform relative z-10" />
              ) : (
                <FaChevronLeft className="text-xl group-hover:scale-125 transition-transform relative z-10" />
              )}
            </motion.button>

            {/* Slide Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className={`text-center ${isRTL ? 'font-roboto' : 'font-inter'}`}
            >
              <span className="text-2xl font-bold text-[#ff883e]">
                {currentSlide + 1}
              </span>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-lg text-gray-600">
                {totalSlides}
              </span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              onClick={nextTestimonial}
              className="group relative p-5 rounded-full bg-white/95 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-600 hover:text-[#ff883e] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
              disabled={currentIndex >= testimonials.length - 4}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff883e]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isRTL ? (
                <FaChevronLeft className="text-xl group-hover:scale-125 transition-transform relative z-10" />
              ) : (
                <FaChevronRight className="text-xl group-hover:scale-125 transition-transform relative z-10" />
              )}
            </motion.button>
          </div>

          {/* Testimonials Grid - تصميم جديد يحاكي الصورة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 4).map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${currentIndex}`}
                initial={{ 
                  opacity: 0, 
                  y: 60, 
                  scale: 0.9,
                  rotateY: -15
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotateY: 0
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15 + 1.2,
                  ease: "easeOut"
                }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-96"
              >
                {/* خلفية متدرجة بنفس لون #FF883E */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, #ff883e 0%, #e67529 35%, #cc6419 70%, #b55a15 100%)`
                  }}
                ></div>
                
                {/* طبقة شفافية للتأثير */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* الأشكال الدائرية الزخرفية مثل الصورة */}
                <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#ff883e]/30 blur-2xl"></div>
                <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-[#e67529]/20 blur-3xl"></div>
                <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-[#ff883e]/10 blur-xl"></div>

                {/* محتوى الكارد */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  
                  {/* النص في الأعلى */}
                  <div className="flex-1 flex items-start">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1.5 }}
                      className="text-center"
                    >
                      {/* علامة الاقتباس */}
                      <div className="mb-4 opacity-30">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" className="text-white/60 mx-auto">
                          <path d="M10 0C4.48 0 0 4.48 0 10v20c0 5.52 4.48 10 10 10h5V25H5V10c0-2.76 2.24-5 5-5h5V0h-5zm20 0c-5.52 0-10 4.48-10 10v20c0 5.52 4.48 10 10 10h5V25h-10V10c0-2.76 2.24-5 5-5h5V0h-5z"/>
                        </svg>
                      </div>

                      {/* نص التقييم */}
                      <p className={`text-white text-base leading-relaxed font-medium italic line-clamp-6 ${isRTL ? 'font-roboto text-right' : 'font-inter text-left'}`}>
                        {isRTL ? testimonial.reviewAr : testimonial.reviewEn}
                      </p>
                    </motion.div>
                  </div>

                  {/* معلومات العميل في الأسفل */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1.7 }}
                    className="flex items-center space-x-4 mt-6"
                  >
                    {/* صورة العميل */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-white/30 shadow-lg">
                        <img
                          src={testimonial.gender === 'female' ? '/Femal-avtar.png' : '/male-avatr.png'}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // في حالة عدم وجود الصورة، نستخدم خلفية متدرجة مع الحرف الأول
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 hidden items-center justify-center"
                          style={{ display: 'none' }}
                        >
                          <span className="text-white font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      {/* نقطة الحالة */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
                        <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>
                      </div>
                    </div>
                    
                    {/* اسم العميل والتقييم */}
                    <div className="flex-1">
                      <h4 className={`font-bold text-white text-lg mb-2 ${isRTL ? 'font-roboto' : 'font-inter'}`}>
                        {testimonial.name}
                      </h4>
                      
                      {/* النجوم */}
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      {/* شارة التحقق */}
                      <div className="flex items-center text-xs text-orange-200">
                        <FaGoogle className="mr-1" />
                        <span>{isRTL ? 'عميل محقق' : 'Verified Review'}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* تأثير الهوفر */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff883e]/0 to-[#e67529]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* حواف مضيئة عند الهوفر */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#ff883e]/30 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Pagination Dots */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex justify-center items-center mt-16 space-x-3"
          >
            {[...Array(totalSlides)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-12 h-4' 
                    : 'w-4 h-4 hover:w-6'
                }`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-[#ff883e] shadow-lg shadow-[#ff883e]/30' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
                {currentSlide === index && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute inset-0 rounded-full border-2 border-[#ff883e]/50"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2 }}
            className="mt-8"
          >
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#ff883e] to-blue-500 rounded-full shadow-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // className={`px-8 py-4 bg-gradient-to-r from-[#ff883e] to-[#e6772a] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${isRTL ? 'font-roboto' : 'font-inter'}`}
          >
        
          </motion.button>
          
          <p className={`mt-4 text-white ${isRTL ? 'font-roboto' : 'font-inter'}`}>
            {isRTL ? 'انضم إلى قائمة عملائنا الراضين' : 'Join our list of satisfied clients'}
          </p>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 V120 H0 V60 Z"
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2 ="100%" y2="0%">
              <stop offset="0%" stopColor="#ff883e" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ff883e" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}