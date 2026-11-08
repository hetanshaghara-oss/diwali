import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  'Your beautiful smile that lights up every room.',
  'Your caring heart that always thinks of others.',
  'Your little silly moments that make me love you more.',
  'The way you make me laugh even on my worst days.',
  'Your beautiful personality that inspires everyone.',
  'Your kindness that makes the world better.',
  'Your unwavering support through everything.',
  'Your presence that makes everything feel like home.',
  'Our unforgettable memories that I treasure forever.',
  "Simply because you're YOU — and that's more than enough. ❤️",
];

const cardTimings = [0.55, 0.6, 0.65, 0.5, 0.7, 0.58, 0.62, 0.68, 0.56, 0.64];

const FlipCard = ({ number, reason, timing, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onFlip();
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: number * 0.08 }}
      onClick={handleFlip}
    >
      <div
        className="relative w-full transition-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          transition: `transform ${timing}s ease`,
          aspectRatio: '4/5',
          minHeight: '180px',
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl p-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background:
              'linear-gradient(145deg, rgba(69,13,25,0.6) 0%, rgba(16,11,22,0.8) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(212,175,55,0.45)',
            boxShadow:
              '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.1)',
          }}
        >
          <span
            className="text-5xl sm:text-6xl font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4AF37',
              textShadow: '0 0 20px rgba(212,175,55,0.3)',
            }}
          >
            {number}
          </span>
          <span
            className="text-xs sm:text-sm text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: 'rgba(255,242,216,0.5)',
            }}
          >
            Tap to Discover
          </span>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl p-4 sm:p-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background:
              'linear-gradient(145deg, #450d19 0%, #100B16 100%)',
            border: '1.5px solid rgba(212,175,55,0.7)',
            boxShadow:
              '0 4px 30px rgba(212,175,55,0.15), 0 8px 32px rgba(0,0,0,0.5), inset 0 0 30px rgba(212,175,55,0.05)',
          }}
        >
          <span className="text-xl sm:text-2xl mb-1.5 sm:mb-3">❤️</span>
          <p
            className="text-xs sm:text-sm text-center leading-snug sm:leading-relaxed px-1"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: '#FFF2D8',
            }}
          >
            {reason}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Reasons = () => {
  const [flippedCount, setFlippedCount] = useState(0);
  const allFlipped = flippedCount >= 10;

  const handleFlip = () => {
    setFlippedCount((prev) => prev + 1);
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(139,23,41,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4AF37',
              textShadow: '0 0 30px rgba(212,175,55,0.3)',
            }}
          >
            Ten Reasons Why You Are Special ❤️
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: '#FFF2D8',
              opacity: 0.8,
            }}
          >
            Tap each card to discover
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {reasons.map((reason, index) => (
            <FlipCard
              key={index}
              number={index + 1}
              reason={reason}
              timing={cardTimings[index]}
              onFlip={handleFlip}
            />
          ))}
        </div>

        {/* Celebration message */}
        <AnimatePresence>
          {allFlipped && (
            <motion.div
              className="mt-14 text-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div
                className="inline-block px-8 py-6 rounded-2xl"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(69,13,25,0.5) 0%, rgba(16,11,22,0.7) 100%)',
                  border: '1.5px solid rgba(212,175,55,0.5)',
                  boxShadow:
                    '0 0 40px rgba(212,175,55,0.15), 0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <p
                  className="text-xl sm:text-2xl lg:text-3xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#D4AF37',
                    textShadow: '0 0 20px rgba(212,175,55,0.3)',
                    lineHeight: 1.6,
                  }}
                >
                  You are all of this and so much more.
                  <br />
                  I'm the luckiest person. ❤️
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Reasons;
