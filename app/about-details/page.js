'use client'

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaEye, FaBullseye, FaStar, FaCheckCircle } from 'react-icons/fa';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      title: isRTL ? 'العلامة التجارية والهوية' : 'Branding & Identity',
      description: isRTL ? 'صنع هويات علامات تجارية فريدة تلقى صدى' : 'Crafting unique brand identities that resonate.',
    },
    {
      title: isRTL ? 'إدارة وسائل التواصل الاجتماعي' : 'Social Media Management',
      description: isRTL ? 'إشراك الجمهور بمحتوى جذاب' : 'Engaging audiences with compelling content.',
    },
    {
      title: isRTL ? 'التسويق الرقمي' : 'Digital Marketing',
      description: isRTL ? 'حملات SEO، PPC، ومدفوعة بالبيانات للنمو' : 'SEO, PPC, and data-driven campaigns for growth.',
      
    },
    {
      title: isRTL ? 'الإنتاج الإبداعي' : 'Creative Production',
      description: isRTL ? 'مرئيات وفيديوهات وإعلانات عالية الجودة' : 'High-quality visuals, videos, and advertisements.',
      
    },
    {
      title: isRTL ? 'تطوير الويب والتطبيقات' : 'Web & App Development',
      description: isRTL ? 'تصميم تجارب رقمية مبتكرة' : 'Designing innovative digital experiences.',
      i
    }
  ];

  const whyChooseUs = [
    {
      text: isRTL ? 'خبرة في صناعة حلول تسويقية مخصصة' : 'Expertise in crafting tailored marketing solutions.',
    },
    {
      text: isRTL ? 'فريق من المحترفين المبدعين والاستراتيجيين' : 'A team of creative and strategic professionals.',
    },
    {
      text: isRTL ? 'سجل حافل من النجاح عبر الصناعات' : 'Proven track record of success across industries.',
    },
    {
      text: isRTL ? 'التزام بتحقيق نتائج قابلة للقياس' : 'Commitment to delivering measurable results.',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative min-h-[50vh] flex items-center justify-center"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="container-custom text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-6xl lg:text-8xl font-bold text-white ${isRTL ? 'font-cairo' : 'font-sora'}`}
            >
              {t('aboutUs')}
            </motion.h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl">
            
            {/* Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'من نحن' : 'Who We Are'}
              </h2>
              <p className={`text-lg text-gray-600 leading-relaxed mb-4 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {isRTL ? 
                  'وكالة kafu هي وكالة إعلان ووسائط رائدة مقرها في  دبي  ، مسجلة رسمياً '
                  :
                  'Kafu Agency is a leading advertising and media agency based in Jordan, officially registered as'
                }{' '}
                {/* <em style={{ color: '#ff883e', fontWeight: 'bold' }}>
                  {isRTL ? 'حول العالم للإعلان والإعلام' : 'Around the World For Advertising and Media'}
                </em>.{' '} */}
                {isRTL ?
                  'نحن متخصصون في استراتيجيات التسويق المبتكرة، والعلامات التجارية الإبداعية، والحلول الرقمية المتطورة التي تساعد الشركات على الازدهار في عالم اليوم سريع الخطى.'
                  :
                  'We specialize in innovative marketing strategies, creative branding, and cutting-edge digital solutions that help businesses thrive in today\'s fast-paced world.'
                }
              </p>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <p className={`text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {isRTL ?
                  'تحويل العلامات التجارية من خلال سرد قوي، وتسويق استراتيجي، وحملات مدفوعة بالبيانات تترك أثراً دائماً.'
                  :
                  'To transform brands through powerful storytelling, strategic marketing, and data-driven campaigns that leave a lasting impact.'
                }
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'رؤيتنا' : 'Our Vision'}
              </h2>
              <p className={`text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {isRTL ?
                  'أن نكون الوكالة المفضلة للشركات التي تسعى للحصول على حلول تسويقية فريدة ومدفوعة بالنتائج في الأردن وخارجها.'
                  :
                  'To be the go-to agency for businesses seeking unique and result-driven marketing solutions in Jordan and beyond.'
                }
              </p>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'ما نقدمه' : 'What We Do'}
              </h2>
              <p className={`text-lg text-gray-600 mb-8 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {isRTL ?
                  'نقدم مجموعة شاملة من خدمات الإعلان والإعلام، تشمل:'
                  :
                  'We offer a comprehensive suite of advertising and media services, including:'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="text-3xl flex-shrink-0">
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold text-gray-800 mb-2 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-gray-600 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Choose Kafu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-8 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'لماذا تختار وكالة Kafu؟' : 'Why Choose Kafu?'}
              </h2>

              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="text-2xl text-green-600">
                      <FaCheckCircle />
                    </div>
                    <p className={`text-lg text-gray-700 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Our Clients */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'عملاؤنا' : 'Our Clients'}
              </h2>
              <p className={`text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
                {isRTL ?
                  'لقد شاركنا مع أهم العلامات التجارية عبر مختلف الصناعات، مساعدتهم في تحقيق أهدافهم التسويقية باستراتيجيات مبتكرة وحملات مؤثرة.'
                  :
                  'We have partnered with top brands across various industries, helping them achieve their marketing goals with innovative strategies and impactful campaigns.'
                }
              </p>
            </motion.div>

            {/* Get in Touch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-center  rounded-2xl p-12 border border-gray-200"
            >
              <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isRTL ? 'font-cairo' : 'font-sora'}`}>
                {isRTL ? 'تواصل معنا' : 'Get in Touch'}
              </h2>
              <p className={`text-lg text-gray-600 mb-8 max-w-2xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ?
                  'هل أنت مستعد لأخذ علامتك التجارية إلى المستوى التالي؟ تواصل معنا اليوم لمناقشة كيف يمكننا مساعدة عملك على النمو.'
                  :
                  'Ready to take your brand to the next level? Contact us today to discuss how we can help grow your business.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/971504616041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff883e] to-purple-500 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  
                  {isRTL ? 'تواصل معنا' : 'Contact Us'}
                </motion.a>

                {/* <motion.a
                  href="/#service"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#ff883e] rounded-full text-[#ff883e] font-semibold transition-all duration-300 hover:bg-[#ff883e] hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isRTL ? 'خدماتنا' : 'Our Services'}
                </motion.a> */}
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}