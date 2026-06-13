"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  radius: number;
};

type BinaryStream = {
  x: number;
  y: number;
  speed: number;
  fontSize: number;
  length: number;
  opacity: number;
};

const WORDS = ["AI", "DEV", "API", "NEXT", "SQL", "NODE", "JSON", "ROOT"];

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let mouseX: number | null = null;
    let mouseY: number | null = null;
    let frame = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const isMobile = window.innerWidth < 768;

    const particles: Particle[] = Array.from(
      { length: isMobile ? 45 : 80 },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
      })
    );

    const streams: BinaryStream[] = Array.from(
      { length: isMobile ? 22 : 38 },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.35 + Math.random() * 1.2,
        fontSize: isMobile ? 10 + Math.random() * 4 : 10 + Math.random() * 7,
        length: 8 + Math.floor(Math.random() * 14),
        opacity: isMobile ? 0.08 + Math.random() * 0.18 : 0.12 + Math.random() * 0.28,
      })
    );

    const drawBackgroundGlow = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.55,
        canvas.height * 0.35,
        0,
        canvas.width * 0.55,
        canvas.height * 0.35,
        canvas.width
      );

      gradient.addColorStop(0, "rgba(34, 211, 238, 0.08)");
      gradient.addColorStop(0.45, "rgba(15, 23, 42, 0.08)");
      gradient.addColorStop(1, "rgba(2, 6, 23, 0.45)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawScanLines = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.028)";
      ctx.lineWidth = 1;

      for (let y = (frame * 0.35) % 42; y < canvas.height; y += 42) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBinaryStreams = () => {
      streams.forEach((stream) => {
        stream.y += stream.speed;

        if (stream.y > canvas.height + 180) {
          stream.y = -180;
          stream.x = Math.random() * canvas.width;
        }

        const nearMouse =
          mouseX !== null &&
          mouseY !== null &&
          Math.hypot(stream.x - mouseX, stream.y - mouseY) < 170;

        ctx.save();
        ctx.font = `800 ${stream.fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(34, 211, 238, 0.65)";
        ctx.shadowBlur = nearMouse ? 12 : 6;

        for (let i = 0; i < stream.length; i++) {
          const y = stream.y + i * (stream.fontSize + 5);
          const fade = 1 - i / stream.length;
          const digit = Math.random() > 0.5 ? "1" : "0";

          const alpha =
            i === 0
              ? stream.opacity + 0.25
              : stream.opacity * fade * (nearMouse ? 1.5 : 1);

          ctx.fillStyle =
            i === 0
              ? `rgba(165, 243, 252, ${Math.min(alpha, 0.7)})`
              : `rgba(34, 211, 238, ${Math.min(alpha, 0.42)})`;

          ctx.fillText(digit, stream.x, y);
        }

        ctx.restore();
      });
    };

    const drawParticles = () => {
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.45)";
        ctx.shadowColor = "rgba(34, 211, 238, 0.65)";
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distance / 120) * 0.13})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouseX !== null && mouseY !== null) {
          const distance = Math.hypot(particle.x - mouseX, particle.y - mouseY);

          if (distance < 170) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distance / 170) * 0.3})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      });
    };

    const drawFloatingWords = () => {
      ctx.save();
      ctx.font = "700 10px monospace";
      ctx.textAlign = "center";

      WORDS.forEach((word, i) => {
        const x = (i * 173 + frame * 0.15) % canvas.width;
        const y = 90 + ((i * 97) % Math.max(canvas.height - 180, 200));

        ctx.fillStyle = "rgba(125, 211, 252, 0.1)";
        ctx.shadowColor = "rgba(34, 211, 238, 0.28)";
        ctx.shadowBlur = 5;
        ctx.fillText(word, x, y);
      });

      ctx.restore();
    };

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBackgroundGlow();
      drawScanLines();
      drawBinaryStreams();
      drawParticles();
      drawFloatingWords();

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseOut = () => {
      mouseX = null;
      mouseY = null;
    };

    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(3,7,18,0.48),rgba(3,7,18,0.82)),url('/background.jpg')] bg-cover bg-center md:bg-fixed md:bg-[linear-gradient(rgba(3,7,18,0.72),rgba(3,7,18,0.94)),url('/background.jpg')]" />

      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_35%,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.08),transparent_38%)] md:bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(37,99,235,0.16),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.12),transparent_36%)]" />

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-55 md:opacity-90"
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-slate-950/0 via-slate-950/20 to-slate-950/90 md:from-slate-950/5 md:via-slate-950/35 md:to-slate-950" />
    </>
  );
}