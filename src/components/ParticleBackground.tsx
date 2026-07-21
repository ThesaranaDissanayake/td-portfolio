// src/components/ParticleBackground.tsx

"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { useThemeMode } from "@/theme/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  originalOpacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useThemeMode();
  const animationRef = useRef<number | undefined>(undefined);

  const createParticles = useCallback(
    (canvas: HTMLCanvasElement, mode: string) => {
      const particleConfig = {
        count: 40,
        colors:
          mode === "dark"
            ? ["#ffffff", "#e0e0e0", "#bdbdbd", "#e30000"]
            : ["#212121", "#424242", "#757575", "#b71c1c"],
        minSize: 1,
        maxSize: 2.5,
        minSpeed: 0.05,
        maxSpeed: 0.35,
      };

      const particles: Particle[] = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size:
            Math.random() * (particleConfig.maxSize - particleConfig.minSize) +
            particleConfig.minSize,
          speedX:
            (Math.random() - 0.5) *
              (particleConfig.maxSpeed - particleConfig.minSpeed) +
            particleConfig.minSpeed,
          speedY:
            (Math.random() - 0.5) *
              (particleConfig.maxSpeed - particleConfig.minSpeed) +
            particleConfig.minSpeed,
          originalOpacity: Math.random() * 0.4 + 0.1,
          opacity: Math.random() * 0.4 + 0.1,
          color:
            particleConfig.colors[
              Math.floor(Math.random() * particleConfig.colors.length)
            ],
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    },
    [],
  );

  const drawConnections = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
      maxDistance: number,
    ) => {
      ctx.strokeStyle =
        mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    },
    [mode],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particles = createParticles(canvas, mode);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update twinkling effect
        particle.twinklePhase += particle.twinkleSpeed;
        particle.opacity =
          particle.originalOpacity + Math.sin(particle.twinklePhase) * 0.2;

        // Draw particle with enhanced glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4,
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.3, `${particle.color}60`);
        gradient.addColorStop(0.7, `${particle.color}20`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw core particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Draw connections between nearby particles
      drawConnections(ctx, particles, 150);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, createParticles, drawConnections]);

  if (mode === "light") {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleBackground;
