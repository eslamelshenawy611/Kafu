"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";

const PortfolioGallery = ({ language = "en" }) => {
  const translations = {
    en: {
      title: "Our Work",
      close: "Close",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      clickToView: "Click to view",
      video: "VIDEO",
      viewDetails: "View Details",
    },
    ar: {
      title: "معرض أعمالنا ",
     
      close: "إغلاق",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      play: "تشغيل",
      pause: "إيقاف",
      mute: "كتم الصوت",
      unmute: "تشغيل الصوت",
      clickToView: "انقر للعرض",
      video: "فيديو",
      viewDetails: "عرض التفاصيل",
    },
  };

  const portfolioItems = [
    {
      id: 0,
      src: "/portfilio-assets/video-1.mp4",
      type: "video",
      thumbnail: "/portfilio-assets/thumbnail.png",
    },
    { id: 1, src: "/portfilio-assets/portfolio-16.jpg", type: "image" },
    { id: 2, src: "/portfilio-assets/portfolio-1.jpg", type: "image" },
    { id: 3, src: "/portfilio-assets/portfolio-2.jpg", type: "image" },
    { id: 4, src: "/portfilio-assets/portfolio-3.jpg", type: "image" },
    { id: 5, src: "/portfilio-assets/portfolio-4.jpg", type: "image" },
    { id: 6, src: "/portfilio-assets/portfolio-7.jpg", type: "image" },
    { id: 7, src: "/portfilio-assets/portfolio-8.jpg", type: "image" },
    { id: 8, src: "/portfilio-assets/portfolio-9.jpg", type: "image" },
    { id: 9, src: "/portfilio-assets/portfolio-10.jpg", type: "image" },
    { id: 10, src: "/portfilio-assets/portfolio-11.jpg", type: "image" },
    { id: 11, src: "/portfilio-assets/portfolio-12.jpg", type: "image" },
    { id: 12, src: "/portfilio-assets/portfolio-13.jpg", type: "image" },
    { id: 13, src: "/portfilio-assets/portfolio-14.jpg", type: "image" },
    { id: 14, src: "/portfilio-assets/portfolio-15.jpg", type: "image" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const navigateToItem = (direction) => {
    const currentIndex = portfolioItems.findIndex(
      (item) => item.id === selectedItem.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex === portfolioItems.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1;
    }

    setSelectedItem(portfolioItems[newIndex]);
  };

  const MediaModal = ({ item, onClose }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoElementRef = useRef(null);

    if (!item) return null;

    const isVideo = item.type === "video";

    useEffect(() => {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
      setIsPlaying(false);
      setIsMuted(true);
    }, [item]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        } else if (e.key === "ArrowLeft") {
          navigateToItem("prev");
        } else if (e.key === "ArrowRight") {
          navigateToItem("next");
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose, item]);

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleMediaClick = (e) => {
      e.stopPropagation();
      if (isVideo) {
        togglePlayPause();
      }
    };

    const togglePlayPause = () => {
      if (videoElementRef.current) {
        if (isPlaying) {
          videoElementRef.current.pause();
        } else {
          videoElementRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleMute = () => {
      if (videoElementRef.current) {
        videoElementRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const handleZoomIn = (e) => {
      e.stopPropagation();
      if (!isVideo) {
        setScale((prev) => Math.min(prev + 0.5, 4));
      }
    };

    const handleZoomOut = (e) => {
      e.stopPropagation();
      if (!isVideo) {
        if (scale <= 1.5) {
          setPosition({ x: 0, y: 0 });
        }
        setScale((prev) => Math.max(prev - 0.5, 1));
      }
    };

    const handleMouseDown = (e) => {
      if (scale > 1 && !isVideo) {
        e.preventDefault();
        setIsDragging(true);
        setLastPosition({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging && scale > 1 && !isVideo) {
        setPosition({
          x: e.clientX - lastPosition.x,
          y: e.clientY - lastPosition.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateToItem("prev");
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20 z-30"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateToItem("next");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20 z-30"
        >
          <ChevronRight size={24} />
        </button>

        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          {isVideo ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleZoomIn}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
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
            className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Media Container */}
        <div
          className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden"
          onClick={handleBackdropClick}
        >
          <div
            className={`relative transition-transform duration-300 ${
              isVideo
                ? "cursor-pointer"
                : scale > 1
                ? "cursor-grab"
                : "cursor-zoom-in"
            } ${isDragging ? "cursor-grabbing" : ""}`}
            style={
              !isVideo
                ? {
                    transform: `scale(${scale}) translate(${
                      position.x / scale
                    }px, ${position.y / scale}px)`,
                  }
                : {}
            }
            onClick={handleMediaClick}
            onMouseDown={handleMouseDown}
          >
            {isVideo ? (
              <video
                ref={videoElementRef}
                src={item.src}
                className="max-w-[85vw] max-h-[75vh] rounded-lg shadow-2xl select-none"
                controls
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                autoPlay
              />
            ) : (
              <Image
                src={item.src}
                alt=""
                width={1600}
                height={900}
                className="object-cover max-w-[85vw] max-h-[75vh] rounded-lg shadow-2xl select-none"
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`relative w-full min-h-screen py-16 px-4 overflow-hidden bg-black ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      

      {/* Main Gradient Background - */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
      radial-gradient(ellipse at 30% 80%, #ff883e 0%,  transparent 55%), 
      radial-gradient(ellipse at 70% 30%, #ff883e 0%, #000000 2%, transparent 60%),
      radial-gradient(ellipse at 50% 10%, #c45f20 0%, #000000 40%, transparent 70%),
      radial-gradient(ellipse at 90% 60%, #fef8f4 0%, transparent 25%)
    `,
          backgroundSize: "120% 120%",
          // backgroundColor: "#000000", 
        }}
      />

      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(212, 81, 19, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.2) 0%, transparent 40%),
                       radial-gradient(circle at 50% 80%, rgba(255, 136, 62, 0.3) 0%, transparent 40%)
          `,
          animation: "gradientShift 20s ease-in-out infinite",
        }}
      />

      {/* Gallery Wall Background Pattern - نمط شبكي خفيف */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #ffffff,
            #ffffff 1px,
            transparent 1px,
            transparent 80px
          ),
          repeating-linear-gradient(
            0deg,
            #ffffff,
            #ffffff 1px,
            transparent 1px,
            transparent 80px
          )`,
        }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background:
                i % 3 === 0 ? "#ff883e" : i % 3 === 1 ? "#4ade80" : "#ffc9a9",
              opacity: Math.random() * 0.5 + 0.3,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 20 + 20}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10 pt-16">
        <h1
          className="text-3xl md:text-7xl font-bold mb-4 tracking-wider text-white"
          
        >
          {t.title}
        </h1>
        <div
          className="w-24 h-1 mx-auto mb-6"
          style={{
            background:
              "linear-gradient(90deg, #ff883e 0%, #d45113 50%, #4ade80 100%)",
          }}
        />
      </div>

      {/* Gallery Wall */}
      <div className="relative max-w-7xl mx-auto">
        {/* Spotlight effect */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full filter blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 81, 19, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Frame with Dark Theme */}
              <div
                className="relative bg-gray-900/50 backdrop-blur-sm p-4 rounded-sm transition-all duration-500 transform group-hover:scale-105 border border-gray-800/50"
                style={{
                  background:
                    hoveredItem === item.id
                      ? "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(40,40,40,0.8) 100%)"
                      : "rgba(20,20,20,0.5)",
                  boxShadow:
                    hoveredItem === item.id
                      ? "0 20px 40px rgba(255, 136, 62, 0.2), inset 0 0 0 2px transparent"
                      : "0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.05)",
                  border:
                    hoveredItem === item.id
                      ? "2px solid transparent"
                      : "2px solid transparent",
                  backgroundImage:
                    hoveredItem === item.id
                      ? "linear-gradient(rgba(20,20,20,0.8), rgba(20,20,20,0.8)), linear-gradient(135deg, #ff883e 0%, #d45113 50%, #4ade80 100%)"
                      : "none",
                  backgroundOrigin:
                    hoveredItem === item.id ? "border-box" : "padding-box",
                  backgroundClip:
                    hoveredItem === item.id
                      ? "padding-box, border-box"
                      : "padding-box",
                }}
              >
                {/* Mat with Dark Gradient */}
                <div
                  className="p-6 rounded-sm shadow-inner"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,81,19,0.1) 0%, rgba(255,136,62,0.1) 50%, rgba(74,222,128,0.05) 100%)",
                  }}
                >
                  {/* Image Container */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer bg-black"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.type === "video" ? (
                      <>
                        <Image
                          src={item.thumbnail}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div
                            className="rounded-full p-4 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, #ff883e 0%, #d45113 100%)",
                            }}
                          >
                            <Play size={24} className="text-white ml-1" />
                          </div>
                        </div>
                        <div
                          className="absolute top-2 right-2 text-white px-2 py-1 rounded text-xs font-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(212,81,19,0.8) 0%, rgba(255,136,62,0.8) 100%)",
                          }}
                        >
                          {t.video}
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <div
                            className="rounded-full p-3 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, #4ade80 0%, #ff883e 100%)",
                            }}
                          >
                            <Expand size={20} className="text-white" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Frame decorative corner accents with gradient */}
                <div
                  className="absolute top-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    borderLeft: "2px solid #d45113",
                    borderTop: "2px solid #d45113",
                  }}
                />
                <div
                  className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    borderRight: "2px solid #ff883e",
                    borderTop: "2px solid #ff883e",
                  }}
                />
                <div
                  className="absolute bottom-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    borderLeft: "2px solid #4ade80",
                    borderBottom: "2px solid #4ade80",
                  }}
                />
                <div
                  className="absolute bottom-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    borderRight: "2px solid #4ade80",
                    borderBottom: "2px solid #4ade80",
                  }}
                />
              </div>

              {/* Wall Shadow with Gradient */}
              <div
                className="absolute inset-x-4 bottom-0 h-full transform translate-y-2 -z-10 transition-all duration-500"
                style={{
                  background:
                    hoveredItem === item.id
                      ? "linear-gradient(to bottom, transparent 0%, rgba(212, 81, 19, 0.15) 100%)"
                      : "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
                  transform:
                    hoveredItem === item.id
                      ? "translateY(6px) scaleY(1.02)"
                      : "translateY(2px)",
                  opacity: hoveredItem === item.id ? 0.4 : 0.2,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Shadow for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 8%, transparent 100%)",
        }}
      />
    

      {/* Modal */}
      {isModalOpen && <MediaModal item={selectedItem} onClose={closeModal} />}

      <style jsx global>{`
        /* Gradient Animation */
        @keyframes gradientShift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(-20px, 30px) scale(1.1);
            opacity: 0.4;
          }
          50% {
            transform: translate(20px, -20px) scale(0.95);
            opacity: 0.25;
          }
          75% {
            transform: translate(-30px, -10px) scale(1.05);
            opacity: 0.35;
          }
        }

        /* Floating Animation */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(10px);
          }
          66% {
            transform: translateY(20px) translateX(-10px);
          }
        }

        /* Custom scrollbar with gradient */
        .gallery-section::-webkit-scrollbar {
          width: 12px;
        }

        .gallery-section::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        .gallery-section::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            #d45113 0%,
            #ff883e 50%,
            #4ade80 100%
          );
          border-radius: 6px;
        }

        .gallery-section::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            #b84110 0%,
            #ff6b35 50%,
            #3ecc7a 100%
          );
        }

        /* Smooth transitions */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Loading animation */
        @keyframes imageLoad {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-load {
          animation: imageLoad 0.6s ease-out;
        }

        /* Enhanced section transitions */
        section {
          position: relative;
        }

        section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #d45113 20%,
            #ff883e 50%,
            #d45113 80%,
            transparent 100%
          );
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
};

export default PortfolioGallery;
