"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  radius: number;
};

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationId = 0;
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(34, 211, 238, 0.6)";
        context.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(34, 211, 238, ${
              (1 - distance / 120) * 0.15
            })`;
            context.lineWidth = 1;
            context.stroke();
          }
        }

        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(mouseX, mouseY);
            context.strokeStyle = `rgba(34, 211, 238, ${
              (1 - distance / 160) * 0.35
            })`;
            context.lineWidth = 1.2;
            context.stroke();
          }
        }
      });

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

    resizeCanvas();
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
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(rgba(3,7,18,0.86),rgba(3,7,18,0.95)),url('/background.jpg'))] bg-cover bg-center bg-fixed" />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 h-full w-full opacity-50"
      />
    </>
  );
}