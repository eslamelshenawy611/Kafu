// components/Layout/Portfolio.jsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn, ZoomOut, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const PortfolioMasonryResponsive = ({ language = 'en' }) => {
  // Translation object
  const translations = {
    en: {
      title: "Our Portfolio",
      subtitle: "Discover our latest projects and creative solutions",
      close: "Close",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute"
    },
    ar: {
      title: "أعمالنا",
      subtitle: "اكتشف أحدث مشاريعنا والحلول الإبداعية",
      close: "إغلاق",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      play: "تشغيل",
      pause: "إيقاف",
      mute: "كتم الصوت",
      unmute: "تشغيل الصوت"
    }
  };

  const portfolioItems = [
    { 
      id: 0, 
      src: '/portfilio-assets/video-1.mp4',
      type: 'video',
      thumbnail: '/portfilio-assets/thumbnail.png'
    },
    { 
      id: 1, 
      src: '/portfilio-assets/portfolio-16.jpg',
      type: 'image'
    },
    { 
      id: 2, 
      src: '/portfilio-assets/portfolio-1.jpg',
      type: 'image'
    },
    { 
      id: 3, 
      src: '/portfilio-assets/portfolio-2.jpg',
      type: 'image'
    },
    { 
      id: 4, 
      src: '/portfilio-assets/portfolio-3.jpg',
      type: 'image'
    },
    { 
      id: 5, 
      src: '/portfilio-assets/portfolio-4.jpg',
      type: 'image'
    },
    { 
      id: 6, 
      src: '/portfilio-assets/portfolio-5.jpg',
      type: 'image'
    },
    { 
      id: 7, 
      src: '/portfilio-assets/portfolio-6.jpg',
      type: 'image'
    },
    { 
      id: 8, 
      src: '/portfilio-assets/portfolio-7.jpg',
      type: 'image'
    },
    { 
      id: 9, 
      src: '/portfilio-assets/portfolio-8.jpg',
      type: 'image'
    },
    { 
      id: 10, 
      src: '/portfilio-assets/portfolio-9.jpg',
      type: 'image'
    },
    { 
      id: 11, 
      src: '/portfilio-assets/portfolio-10.jpg',
      type: 'image'
    },
    { 
      id: 12, 
      src: '/portfilio-assets/portfolio-11.jpg',
      type: 'image'
    }
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = translations[language];
  const isRTL = language === 'ar';

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Modal Component with Zoom functionality and Video support
  const MediaModal = ({ item, onClose }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [videoRef, setVideoRef] = useState(null);

    if (!item) return null;

    const isVideo = item.type === 'video';

    const handleBackdropClick = (e) => {
      // إغلاق النافذة عند النقر في أي مكان على الخلفية
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleMediaClick = (e) => {
      e.stopPropagation();
      if (isVideo) {
        // تشغيل أو إيقاف الفيديو
        togglePlayPause();
      } else {
        // تكبير أو تصغير الصورة عند النقر عليها
        if (scale >= 3) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } else {
          setScale(prev => prev + 0.5);
        }
      }
    };

    const togglePlayPause = () => {
      if (videoRef) {
        if (isPlaying) {
          videoRef.pause();
        } else {
          videoRef.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleMute = () => {
      if (videoRef) {
        videoRef.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const handleZoomIn = () => {
      if (!isVideo) {
        setScale(prev => Math.min(prev + 0.5, 4));
      }
    };

    const handleZoomOut = () => {
      if (!isVideo) {
        if (scale <= 1) {
          setPosition({ x: 0, y: 0 });
        }
        setScale(prev => Math.max(prev - 0.5, 0.5));
      }
    };

    const handleMouseDown = (e) => {
      if (scale > 1 && !isVideo) {
        setIsDragging(true);
        setLastPosition({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging && scale > 1 && !isVideo) {
        setPosition({
          x: e.clientX - lastPosition.x,
          y: e.clientY - lastPosition.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const resetZoom = () => {
      if (!isVideo) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 cursor-pointer"
        onClick={handleBackdropClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          {isVideo ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
                title={isPlaying ? t.pause : t.play}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
                title={isMuted ? t.unmute : t.mute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
                title={t.zoomIn}
              >
                <ZoomIn size={20} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
                title={t.zoomOut}
              >
                <ZoomOut size={20} />
              </button>
            </>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
            title={t.close}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Container للوسائط */}
        <div 
          className="relative flex items-center justify-center w-full h-full overflow-hidden"
          onClick={handleBackdropClick}
        >
          {/* Media Container */}
          <div 
            className={`relative transition-transform duration-300 ${
              isVideo 
                ? 'cursor-pointer' 
                : scale > 1 
                  ? 'cursor-grab' 
                  : 'cursor-zoom-in'
            } ${isDragging ? 'cursor-grabbing' : ''}`}
            style={!isVideo ? {
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: 'center center'
            } : {}}
            onClick={handleMediaClick}
            onMouseDown={handleMouseDown}
          >
            {isVideo ? (
              <video
                ref={setVideoRef}
                src={item.src}
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl select-none"
                controls
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <Image
                src={item.src}
                alt="Portfolio Image"
                width={1200}
                height={800}
                className="object-contain max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl select-none"
                draggable={false}
              />
            )}
          </div>
          
          {/* Instructions */}
          {!isVideo && scale === 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm">
                {language === 'ar' ? 'انقر على الصورة للتكبير' : 'Click on image to zoom'}
              </p>
            </div>
          )}

          {isVideo && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm">
                {language === 'ar' ? 'انقر على الفيديو للتشغيل/الإيقاف' : 'Click on video to play/pause'}
              </p>
            </div>
          )}
          
          {/* Reset Zoom Button */}
          {!isVideo && scale > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200"
              >
                {language === 'ar' ? 'إعادة تعيين' : 'Reset Zoom'}
              </button>
              <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm">
                  {language === 'ar' ? 'اسحب لتحريك الصورة' : 'Drag to move image'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Video Thumbnail Component
  const VideoThumbnail = ({ item }) => (
    <div className="relative aspect-square">
      <Image
        src={item.thumbnail}
        alt="Video Thumbnail"
        fill
        className="object-cover"
        priority
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
        <div className="bg-white bg-opacity-80 rounded-full p-4 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg">
          <Play size={24} className="text-gray-800 ml-1" />
        </div>
      </div>
      {/* Video indicator badge */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        {language === 'ar' ? 'فيديو' : 'VIDEO'}
      </div>
    </div>
  );

  return (
    <section className={`relative w-full py-20 px-4 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio-bg.png"
          alt="Portfolio Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-center'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              onClick={() => handleItemClick(item)}
            >
              {item.type === 'video' ? (
                <VideoThumbnail item={item} />
              ) : (
                <div className="relative aspect-square">
                  <Image
                    src={item.src}
                    alt="Portfolio Image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <MediaModal item={selectedItem} onClose={closeModal} />}
    </section>
  );
};

export default PortfolioMasonryResponsive;