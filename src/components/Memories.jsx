import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, ZoomIn } from 'lucide-react';

const photos = [
  {
    id: 1,
    image: '/photos/photo1.jpg',
    caption: 'The day it all began ❤️',
    gradient: 'linear-gradient(135deg, #e8837c 0%, #d4618e 50%, #c25b78 100%)',
    aspect: 'portrait',
  },
  {
    id: 2,
    image: '/photos/photo2.jpg',
    caption: 'Your beautiful smile',
    gradient: 'linear-gradient(135deg, #f6b97f 0%, #e8837c 50%, #d46a7e 100%)',
    aspect: 'landscape',
  },
  {
    id: 3,
    image: '/photos/photo3.jpg',
    caption: 'Our favourite place',
    gradient: 'linear-gradient(135deg, #d4af37 0%, #c4872e 50%, #a85d3a 100%)',
    aspect: 'portrait',
  },
  {
    id: 4,
    image: '/photos/photo4.jpg',
    caption: 'That perfect evening',
    gradient: 'linear-gradient(135deg, #ff9a76 0%, #f76c6c 50%, #d4618e 100%)',
    aspect: 'landscape',
  },
  {
    id: 5,
    image: '/photos/photo5.jpg',
    caption: 'Laughing together',
    gradient: 'linear-gradient(135deg, #ffd98a 0%, #f6b97f 50%, #e8837c 100%)',
    aspect: 'landscape',
  },
  {
    id: 6,
    image: '/photos/photo6.jpg',
    caption: 'A moment to remember',
    gradient: 'linear-gradient(135deg, #c25b78 0%, #8b1729 50%, #450d19 100%)',
    aspect: 'portrait',
  },
  {
    id: 7,
    image: '/photos/photo7.jpg',
    caption: 'Just us, being us',
    gradient: 'linear-gradient(135deg, #f0a68c 0%, #d4885e 50%, #c4723a 100%)',
    aspect: 'portrait',
  },
  {
    id: 8,
    image: '/photos/photo8.jpg',
    caption: 'Forever in my heart',
    gradient: 'linear-gradient(135deg, #d4af37 0%, #e8c96a 50%, #ffd98a 100%)',
    aspect: 'landscape',
  },
];

const Memories = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const openLightbox = useCallback((photo) => {
    setSelectedPhoto(photo);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(139,23,41,0.2) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.12) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#450D19]/40 px-4 py-1.5 text-xs font-medium text-[#FFD98A] backdrop-blur-md mb-4 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Our Cherished Moments</span>
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD98A] via-[#FFF2D8] to-[#D4AF37]"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(212,175,55,0.3)',
            }}
          >
            Little Moments, Infinite Memories
          </h2>
          <p
            className="mt-3 text-sm sm:text-base text-[#FFF2D8]/75 max-w-lg mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Every smile, every glance, every celebration is etched forever in my heart.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-sm text-[#D4AF37]">✦ 📸 ✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
        </motion.div>

        {/* Masonry-style Grid — 1 column on mobile, 2 columns on tablet, 3 on desktop */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {photos.map((photo, index) => {
            const isFailed = failedImages[photo.id];
            const hasImage = photo.image && !isFailed;

            return (
              <motion.div
                key={photo.id}
                className="cursor-pointer group break-inside-avoid"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
                onClick={() => openLightbox(photo)}
              >
                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 border border-[#D4AF37]/30 bg-[#100B16]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] group-hover:border-[#D4AF37] group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]"
                >
                  {/* Photo or Gradient placeholder */}
                  <div
                    className="w-full relative overflow-hidden"
                    style={{
                      aspectRatio: photo.aspect === 'portrait' ? '3/4' : '4/3',
                      background: photo.gradient,
                    }}
                  >
                    {hasImage ? (
                      <img
                        src={photo.image}
                        alt={photo.caption}
                        loading="lazy"
                        onError={() => handleImageError(photo.id)}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <Sparkles className="h-8 w-8 text-amber-200/80 mb-2 animate-pulse" />
                        <span className="text-white/80 font-playfair text-base">Photo {photo.id}</span>
                        <span className="text-white/50 text-xs mt-1">Replace in public/photos/</span>
                      </div>
                    )}

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100B16] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Zoom icon badge */}
                    <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-4 w-4" />
                    </div>

                    {/* Caption on image */}
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#FFD98A] font-medium mb-1">
                        <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
                        <span>Chapter {photo.id}</span>
                      </div>
                      <p className="font-playfair text-base sm:text-lg font-semibold text-[#FFF2D8] drop-shadow-md">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final caption */}
        <motion.p
          className="text-center mt-14 sm:mt-16 text-base sm:text-xl lg:text-2xl max-w-2xl mx-auto px-4 font-playfair text-[#D4AF37] italic leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          "Every picture has a story, and my favourite stories are the ones with you."
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-black/60 border border-[#D4AF37]/50 text-[#FFD98A] cursor-pointer hover:bg-white/10 hover:border-[#D4AF37] transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Lightbox Card */}
            <motion.div
              className="relative rounded-2xl overflow-hidden max-w-2xl w-full border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.35)] bg-[#100B16]"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full flex items-center justify-center bg-black overflow-hidden"
                style={{
                  maxHeight: '75vh',
                }}
              >
                {selectedPhoto.image && !failedImages[selectedPhoto.id] ? (
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.caption}
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />
                ) : (
                  <div
                    className="w-full py-24 flex flex-col items-center justify-center"
                    style={{ background: selectedPhoto.gradient }}
                  >
                    <Sparkles className="h-12 w-12 text-amber-200 mb-3" />
                    <span className="font-playfair text-xl text-white font-bold">Photo {selectedPhoto.id}</span>
                  </div>
                )}
              </div>

              {/* Caption bar */}
              <div className="p-4 sm:p-5 text-center bg-gradient-to-r from-[#100B16] via-[#450D19] to-[#100B16] border-t border-[#D4AF37]/30 flex flex-col items-center justify-center gap-1">
                <p className="font-playfair text-lg sm:text-xl text-[#FFF2D8] font-semibold">
                  {selectedPhoto.caption}
                </p>
                <span className="text-xs text-[#FFD98A]/80 font-poppins">
                  Diwali with my love • Forever memory
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Memories;