import { useEffect, useRef } from "react";

/**
 * ParticleField — A beautiful golden particle background rendered on canvas.
 *
 * @param {number}  particleCount  Number of particles (default 50)
 * @param {string}  color          Base color in hex (default "#D4AF37")
 * @param {number}  speed          Movement speed multiplier (default 0.5)
 * @param {boolean} showConnections Draw lines between nearby particles (default false)
 */
export default function ParticleField({
  particleCount = 50,
  color = "#D4AF37",
  speed = 0.5,
  showConnections = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    // Parse hex color to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 212, g: 175, b: 55 };
    };

    const rgb = hexToRgb(color);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticle = (randomY = false) => ({
      x: Math.random() * window.innerWidth,
      y: randomY
        ? Math.random() * window.innerHeight
        : window.innerHeight + Math.random() * 50,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.15,
      speedY: (Math.random() * 0.4 + 0.15) * speed,
      speedX: (Math.random() - 0.5) * 0.3 * speed,
      swayAmplitude: Math.random() * 0.8 + 0.2,
      swaySpeed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
    });

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(true));
      }
    };

    const drawParticle = (p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      // Glow effect
      ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity * 0.6})`;
      ctx.shadowBlur = p.size * 6;
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
      ctx.fill();

      // Reset shadow for performance
      ctx.shadowBlur = 0;
    };

    const drawConnections = () => {
      const connectionDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineOpacity =
              (1 - dist / connectionDistance) *
              0.15 *
              Math.min(particles[i].opacity, particles[j].opacity);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      time += 1;

      particles.forEach((p) => {
        // Update position with sway
        p.y -= p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.phase) * p.swayAmplitude * 0.3;

        // Reset particle if it goes off screen
        if (p.y < -10) {
          Object.assign(p, createParticle(false));
        }

        drawParticle(p);
      });

      if (showConnections) {
        drawConnections();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [particleCount, color, speed, showConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
