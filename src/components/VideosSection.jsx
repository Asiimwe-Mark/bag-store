import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight, X, Video } from 'lucide-react';
import { fetchVideos, getVideoThumbnail } from '../data/products';
import VideoPlayer from './VideoPlayer';

const VideoCard = ({ video, index, onClick }) => {
  const thumbnail = video.thumbnailUrl || getVideoThumbnail(video.videoUrl);

  return (
    <div
      className="fade-up min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] snap-center flex-shrink-0 cursor-pointer group"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-matte-900 shadow-lg">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-matte-800 to-matte-900">
            <Video className="w-12 h-12 text-matte-600" />
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-red play-btn-pulse">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 text-matte-900 group-hover:text-white ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {video.title && (
        <p className="mt-3 text-sm sm:text-base font-medium text-matte-900 truncate px-1">
          {video.title}
        </p>
      )}
    </div>
  );
};

const VideoSkeleton = () => (
  <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] flex-shrink-0">
    <div className="aspect-video rounded-xl sm:rounded-2xl bg-beige-100 animate-pulse" />
    <div className="mt-3 h-4 w-3/4 bg-beige-100 rounded animate-pulse" />
  </div>
);

const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  // Lazy load: only fetch when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    fetchVideos().then(data => {
      setVideos(data);
      setLoading(false);
    });
  }, [isVisible]);

  // Check scroll position for arrow visibility
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, videos]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(':first-child')?.offsetWidth || 320;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
  };

  const openModal = (video) => {
    setModalVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalVideo(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (!modalVideo) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalVideo]);

  // Don't render anything if no videos and not loading
  if (!loading && videos.length === 0) return null;

  return (
    <>
      <section ref={sectionRef} id="videos" className="py-16 sm:py-20 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
              Watch & Shop
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title section-heading-underline">
              Our Videos
            </h2>
          </div>

          <div className="relative">
            {/* Left arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-beige-50 transition-colors -ml-2 sm:-ml-5"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-matte-900" />
              </button>
            )}

            {/* Right arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-beige-50 transition-colors -mr-2 sm:-mr-5"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-matte-900" />
              </button>
            )}

            {/* Carousel */}
            <div
              ref={scrollRef}
              className="video-carousel flex gap-4 sm:gap-6 overflow-x-auto pb-4 px-1"
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <VideoSkeleton key={i} />)
                : videos.map((video, i) => (
                    <VideoCard key={video.id} video={video} index={i} onClick={openModal} />
                  ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={modalVideo.title || 'Video player'}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-4xl z-10">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <VideoPlayer
              videoUrl={modalVideo.videoUrl}
              videoType={modalVideo.videoType}
              title={modalVideo.title}
              poster={modalVideo.thumbnailUrl || getVideoThumbnail(modalVideo.videoUrl)}
            />
            {modalVideo.title && (
              <p className="text-white text-center mt-4 text-sm sm:text-base font-medium">
                {modalVideo.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideosSection;
