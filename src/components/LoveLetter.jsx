import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/NavigationContext';

/* ───────────────── Floating Hearts ───────────────── */
const FloatingHearts = () => {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 12 + Math.random() * 20,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{
            left: h.left,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            opacity: 0,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, h.opacity, h.opacity, 0],
            x: [0, Math.sin(h.id) * 40],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          💛
        </motion.span>
      ))}
    </div>
  );
};

/* ──────────────── Sparkle Particles ──────────────── */
const Sparkles = () => {
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: -30 + Math.random() * 60,
    y: -30 + Math.random() * 60,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 2,
  }));

  return (
    <>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: '#D4AF37',
            left: `calc(50% + ${s.x}px)`,
            top: `calc(50% + ${s.y}px)`,
            boxShadow: '0 0 6px #D4AF37',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
};

/* ───────────── Golden Particle Burst ───────────── */
const GoldenBurst = () => {
  const particles = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 80 + Math.random() * 180;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: 3 + Math.random() * 6,
      duration: 1.5 + Math.random() * 1.5,
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: '#D4AF37',
            boxShadow: '0 0 8px rgba(212,175,55,0.8)',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: p.duration, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
const LoveLetter = () => {
  const { navigate } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const letterRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    // After flap opens, show letter sliding out
    setTimeout(() => setShowLetter(true), 700);
  };

  // Show finale after letter is visible and user scrolls / waits
  useEffect(() => {
    if (showLetter) {
      const timer = setTimeout(() => {
        setShowFinale(true);
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 2000);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showLetter]);

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Warm overlay when opened */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(139,23,41,0.12) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Floating hearts when opened */}
      {isOpen && <FloatingHearts />}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-16"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#D4AF37',
            textShadow: '0 0 30px rgba(212,175,55,0.3)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          One Last Thing Before You Go...
        </motion.h2>

        {/* Envelope + Letter section */}
        <AnimatePresence mode="wait">
          {!showLetter ? (
            <motion.div
              key="envelope-section"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              {/* Envelope */}
              <motion.div
                className="relative mb-10"
                style={{ width: '260px', height: '180px' }}
                animate={
                  !isOpen
                    ? { y: [0, -8, 0] }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Sparkles around envelope */}
                {!isOpen && <Sparkles />}

                {/* Envelope body */}
                <div
                  className="absolute bottom-0 w-full rounded-lg"
                  style={{
                    height: '140px',
                    background:
                      'linear-gradient(145deg, #8B1729 0%, #6a1020 100%)',
                    border: '2px solid rgba(212,175,55,0.5)',
                    boxShadow:
                      '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(139,23,41,0.3)',
                    borderRadius: '8px',
                  }}
                >
                  {/* Envelope inner lines (decorative) */}
                  <div
                    className="absolute inset-4 rounded"
                    style={{
                      border: '1px solid rgba(212,175,55,0.15)',
                    }}
                  />
                </div>

                {/* Envelope flap */}
                <div
                  className="absolute top-[40px] left-0 w-full"
                  style={{
                    transformOrigin: 'top center',
                    perspective: '800px',
                    zIndex: isOpen ? 0 : 2,
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '130px solid transparent',
                      borderRight: '130px solid transparent',
                      borderTop: '80px solid #7a1424',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      transformOrigin: 'top center',
                      transform: isOpen
                        ? 'rotateX(180deg)'
                        : 'rotateX(0deg)',
                      transition: 'transform 0.7s ease-in-out',
                    }}
                  />
                </div>

                {/* Heart seal */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
                  style={{
                    top: '38px',
                    width: '36px',
                    height: '36px',
                    background:
                      'radial-gradient(circle, #D4AF37 0%, #b8942e 100%)',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px rgba(212,175,55,0.5)',
                    opacity: isOpen ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: '16px', marginTop: '-1px' }}>
                    ❤️
                  </span>
                </div>

                {/* Letter peeking out when opening */}
                {isOpen && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 rounded"
                    style={{
                      width: '220px',
                      height: '160px',
                      background:
                        'linear-gradient(to bottom, #FFF2D8, #f5e6c8)',
                      bottom: '20px',
                      zIndex: 1,
                      boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
                    }}
                    initial={{ y: 0 }}
                    animate={{ y: -120 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  >
                    <div className="p-3 opacity-40">
                      <div
                        className="h-2 rounded mb-2"
                        style={{
                          background: 'rgba(16,11,22,0.2)',
                          width: '60%',
                        }}
                      />
                      <div
                        className="h-1.5 rounded mb-1.5"
                        style={{
                          background: 'rgba(16,11,22,0.12)',
                          width: '90%',
                        }}
                      />
                      <div
                        className="h-1.5 rounded mb-1.5"
                        style={{
                          background: 'rgba(16,11,22,0.12)',
                          width: '80%',
                        }}
                      />
                      <div
                        className="h-1.5 rounded"
                        style={{
                          background: 'rgba(16,11,22,0.12)',
                          width: '70%',
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Open button */}
              {!isOpen && (
                <motion.button
                  className="px-8 py-4 rounded-full text-lg font-semibold cursor-pointer relative overflow-hidden"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background:
                      'linear-gradient(135deg, #D4AF37 0%, #b8942e 50%, #D4AF37 100%)',
                    color: '#100B16',
                    border: 'none',
                    boxShadow:
                      '0 0 30px rgba(212,175,55,0.3), 0 4px 15px rgba(0,0,0,0.3)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212,175,55,0.3), 0 4px 15px rgba(0,0,0,0.3)',
                      '0 0 40px rgba(212,175,55,0.5), 0 4px 15px rgba(0,0,0,0.3)',
                      '0 0 20px rgba(212,175,55,0.3), 0 4px 15px rgba(0,0,0,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpen}
                >
                  OPEN MY HEART 💌
                </motion.button>
              )}
            </motion.div>
          ) : (
            /* ──────────────── The Letter ──────────────── */
            <motion.div
              key="letter-section"
              ref={letterRef}
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div
                className="relative rounded-xl p-5 sm:p-12"
                style={{
                  background:
                    'linear-gradient(145deg, #FFF2D8 0%, #f5e6c8 30%, #efe0c0 100%)',
                  transform: 'rotate(-0.5deg)',
                  border: '2px sm:border-3 solid rgba(212,175,55,0.6)',
                  boxShadow:
                    '0 15px 40px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.15)',
                }}
              >
                {/* Paper texture overlay */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Decorative corner borders */}
                <div
                  className="absolute top-4 left-4 w-12 h-12"
                  style={{
                    borderTop: '2px solid rgba(212,175,55,0.4)',
                    borderLeft: '2px solid rgba(212,175,55,0.4)',
                  }}
                />
                <div
                  className="absolute top-4 right-4 w-12 h-12"
                  style={{
                    borderTop: '2px solid rgba(212,175,55,0.4)',
                    borderRight: '2px solid rgba(212,175,55,0.4)',
                  }}
                />
                <div
                  className="absolute bottom-4 left-4 w-12 h-12"
                  style={{
                    borderBottom: '2px solid rgba(212,175,55,0.4)',
                    borderLeft: '2px solid rgba(212,175,55,0.4)',
                  }}
                />
                <div
                  className="absolute bottom-4 right-4 w-12 h-12"
                  style={{
                    borderBottom: '2px solid rgba(212,175,55,0.4)',
                    borderRight: '2px solid rgba(212,175,55,0.4)',
                  }}
                />

                {/* Letter content */}
                <div className="relative z-10">
                  {[
                    'My Love,',
                    '',
                    'This Diwali, I don\'t need thousands of lights to make my world beautiful.',
                    '',
                    'Your smile is enough.',
                    '',
                    'I created this little world because I wanted to give you something different, something that makes you smile.',
                    '',
                    'Maybe we cannot celebrate every moment together, but I hope this little experience makes you feel close to me.',
                    '',
                    'Thank you for being part of my life.',
                    '',
                    'I don\'t know how many Diwalis we will celebrate together, but I hope there will be countless more.',
                    '',
                    'Happy Diwali, My Lakshmi. ❤️🪔',
                  ].map((line, i) => (
                    <motion.p
                      key={i}
                      className={`${line === 'My Love,' ? 'text-2xl sm:text-3xl font-bold mb-6' : line === '' ? 'mb-3' : 'text-base sm:text-lg mb-2'} ${line === 'Your smile is enough.' ? 'font-semibold text-lg sm:text-xl' : ''} ${line.startsWith('Happy Diwali') ? 'font-semibold text-lg sm:text-xl mt-4' : ''}`}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color:
                          line === 'My Love,' || line === 'Your smile is enough.' || line.startsWith('Happy Diwali')
                            ? '#8B1729'
                            : '#2a1a0e',
                        lineHeight: 1.9,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + i * 0.12,
                      }}
                    >
                      {line || '\u00A0'}
                    </motion.p>
                  ))}

                  {/* Sign-off */}
                  <motion.div
                    className="mt-8 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                  >
                    <p
                      className="text-base sm:text-lg italic"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#2a1a0e',
                      }}
                    >
                      With endless love,
                    </p>
                    <p
                      className="text-xl sm:text-2xl font-bold mt-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#8B1729',
                      }}
                    >
                      Yours Forever.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──────────── Grand Finale ──────────── */}
        <AnimatePresence>
          {showFinale && (
            <motion.div
              className="mt-24 mb-16 text-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {showBurst && <GoldenBurst />}
              <h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug max-w-4xl mx-auto"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#D4AF37',
                  textShadow:
                    '0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)',
                  lineHeight: 1.5,
                }}
              >
                THE WORLD IS FULL OF LIGHTS,
                <br />
                BUT YOU ARE MY FAVOURITE ONE. ❤️
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Return Home button */}
        {showFinale && (
          <motion.div
            className="text-center mt-8 pb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button
              className="px-6 py-3 rounded-full text-sm cursor-pointer transition-all duration-300"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.2)';
                e.currentTarget.style.boxShadow =
                  '0 0 20px rgba(212,175,55,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => navigate('hero')}
            >
              Return Home 🏠
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LoveLetter;
