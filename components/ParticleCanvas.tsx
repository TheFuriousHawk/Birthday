import React, { useRef, useEffect } from 'react';
import { WINTER_PARTICLES, SPRING_PARTICLES } from '../constants';

interface ParticleCanvasProps {
  transitionProgress: number; // 0 = Winter, 1 = Spring
  triggerExplosion?: boolean;
}

type ParticleType = 'snow' | 'petal' | 'confetti';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: ParticleType;
  angle: number;
  spinSpeed: number;
  rotationAxis: number; // For 3D spin effect
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  timeOffset: number;

  constructor(canvasWidth: number, canvasHeight: number, type: ParticleType, isExplosion: boolean = false) {
    this.type = type;
    this.timeOffset = Math.random() * 100;
    this.rotationAxis = Math.random();

    if (type === 'snow') {
      this.x = Math.random() * canvasWidth;
      this.y = isExplosion ? Math.random() * canvasHeight : -20;
      this.size = Math.random() * (WINTER_PARTICLES.sizeMax - WINTER_PARTICLES.sizeMin) + WINTER_PARTICLES.sizeMin;
      this.vy = Math.random() * (WINTER_PARTICLES.speedMax - WINTER_PARTICLES.speedMin) + WINTER_PARTICLES.speedMin;
      this.vx = (Math.random() - 0.5) * WINTER_PARTICLES.wind;
      // Increased opacity for brighter, whiter snow (0.5 to 1.0)
      this.opacity = Math.random() * 0.5 + 0.5;
      this.color = `rgba(255, 255, 255, ${this.opacity})`;
      this.angle = 0;
      this.spinSpeed = 0;
      this.swayAmplitude = Math.random() * 20;
      this.swayFrequency = Math.random() * 0.01 + 0.005;

    } else if (type === 'petal') {
      this.x = Math.random() * canvasWidth;
      this.y = isExplosion ? Math.random() * canvasHeight : -20;
      this.size = Math.random() * (SPRING_PARTICLES.sizeMax - SPRING_PARTICLES.sizeMin) + SPRING_PARTICLES.sizeMin;
      this.vy = Math.random() * (SPRING_PARTICLES.speedMax - SPRING_PARTICLES.speedMin) + SPRING_PARTICLES.speedMin;
      this.vx = (Math.random() - 0.5) * SPRING_PARTICLES.wind; 
      
      const colors = ['#C71585', '#DB0073', '#800080', '#FF1493', '#D50032', '#9932CC', '#FFB7C5'];
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      this.color = baseColor;
      this.opacity = Math.random() * 0.3 + 0.7;
      
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.05; 
      this.swayAmplitude = Math.random() * 50 + 20;
      this.swayFrequency = Math.random() * 0.02 + 0.01;

    } else { // confetti
      this.x = canvasWidth / 2;
      this.y = canvasHeight * 0.85; // Start from button area
      this.size = Math.random() * 8 + 6;
      // Explosive velocity
      this.vx = (Math.random() - 0.5) * 30; 
      this.vy = -(Math.random() * 25 + 10);
      
      const colors = ['#FFD700', '#FF6347', '#00BFFF', '#32CD32', '#FF69B4', '#9400D3'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 1;
      
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.4; // Fast spin
      this.swayAmplitude = 0;
      this.swayFrequency = 0;
    }
  }

  update(width: number, height: number, time: number) {
    if (this.type === 'confetti') {
      this.vy += 0.5; // Gravity
      this.vx *= 0.96; // Air resistance
      this.y += this.vy;
      this.x += this.vx;
      this.angle += this.spinSpeed;
    } else {
      // Gentle sine wave drift for snow and petals
      this.y += this.vy;
      this.x += Math.sin(time * this.swayFrequency + this.timeOffset) * (this.swayAmplitude * 0.05) + this.vx;
      this.angle += this.spinSpeed;
    }

    // Wrap horizontally for non-confetti
    if (this.type !== 'confetti') {
      if (this.x > width + 50) this.x = -50;
      else if (this.x < -50) this.x = width + 50;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    
    if (this.type === 'snow') {
      ctx.globalAlpha = this.opacity;
      
      // Add Glow Effect for Snow
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      // Brighter Gradient (Solid white core)
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

    } else if (this.type === 'petal') {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      // 3D flip effect
      ctx.scale(Math.cos(this.angle * this.rotationAxis), 1);
      
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      
      // Petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size, -this.size / 2, this.size, this.size / 2, 0, this.size);
      ctx.bezierCurveTo(-this.size, this.size / 2, -this.size, -this.size / 2, 0, 0);
      ctx.fill();

    } else { // confetti
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(Math.cos(this.angle), Math.sin(this.angle * 0.5)); // Tumbling effect
      
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size/2, -this.size/4, this.size, this.size/2);
    }
    
    ctx.restore();
  }

  isOffScreen(height: number) {
    return this.y > height + 50;
  }
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ transitionProgress, triggerExplosion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  // Initialize particles once on mount with winter setting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Clear existing to avoid dupes on strict mode re-renders if handled carelessly, 
    // but here we just want initial population if empty
    if (particlesRef.current.length === 0) {
      const initialCount = WINTER_PARTICLES.count;
      for (let i = 0; i < initialCount; i++) {
          const p = new Particle(canvas.width, canvas.height, 'snow', true); 
          particlesRef.current.push(p);
      }
    }
  }, []);

  // Handle explosion (Confetti)
  useEffect(() => {
    if (triggerExplosion && canvasRef.current) {
      const canvas = canvasRef.current;
      for (let i = 0; i < 150; i++) {
        // Confetti constructor handles position and velocity
        particlesRef.current.push(new Particle(canvas.width, canvas.height, 'confetti'));
      }
    }
  }, [triggerExplosion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      if (mediaQuery.matches) return;
      frameCountRef.current++;
      
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      // Calculate separate targets to ensure visual continuity
      const snowTarget = Math.floor(WINTER_PARTICLES.count * (1 - transitionProgress));
      const petalTarget = Math.floor(SPRING_PARTICLES.count * transitionProgress);

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Filter off-screen particles
      particlesRef.current = particlesRef.current.filter(p => !p.isOffScreen(height));

      // Update and Draw
      particlesRef.current.forEach(p => {
        p.update(width, height, frameCountRef.current);
        p.draw(ctx);
      });

      // Refill Snow
      const currentSnow = particlesRef.current.filter(p => p.type === 'snow').length;
      if (currentSnow < snowTarget) {
        if (Math.random() < 0.2) { 
           particlesRef.current.push(new Particle(width, height, 'snow'));
        }
      }

      // Refill Petals
      const currentPetals = particlesRef.current.filter(p => p.type === 'petal').length;
      if (currentPetals < petalTarget) {
        if (Math.random() < 0.2) { 
           particlesRef.current.push(new Particle(width, height, 'petal'));
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [transitionProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default ParticleCanvas;