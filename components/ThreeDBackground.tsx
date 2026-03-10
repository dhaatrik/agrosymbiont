
import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Handle high-DPI displays for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // --- Sphere Particles Configuration ---
    const isMobile = window.innerWidth < 768;
    const sphereParticleCount = isMobile ? 250 : 500; 
    // Adjust radius based on screen size
    const getRadius = () => Math.min(window.innerWidth, window.innerHeight) / 3;
    let baseRadius = getRadius();
    
    const colors = ['#2A52BE', '#CC5500', '#FFDB58', '#ffffff'];

    // Initialize sphere particles
    const sphereParticles = Array.from({ length: sphereParticleCount }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      return {
        theta,
        phi,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04,
      };
    });

    // --- Ambient Dust Particles Configuration ---
    const dustCount = isMobile ? 50 : 100;
    const dustParticles = Array.from({ length: dustCount }, () => ({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * 1000,
        size: Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
    }));

    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotationX = 0;
    let dragRotationY = 0;
    let targetDragRotationX = 0;
    let targetDragRotationY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetDragRotationY += deltaX * 0.01;
        targetDragRotationX += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        mouseX = (e.clientX - width / 2) * 0.0005;
        mouseY = (e.clientY - height / 2) * 0.0005;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };
    
    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        baseRadius = getRadius();
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };

    let scrollY = 0;
    const handleScroll = () => {
        scrollY = window.scrollY;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let rotationX = 0;
    let rotationY = 0;
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;
      
      // Smooth rotation easing based on mouse position
      rotationY += (mouseX - rotationY) * 0.05;
      rotationX += (mouseY - rotationX) * 0.05;

      dragRotationX += (targetDragRotationX - dragRotationX) * 0.1;
      dragRotationY += (targetDragRotationY - dragRotationY) * 0.1;
      
      const constantSpin = time * 0.05;
      const finalRotationY = constantSpin + rotationY + dragRotationY;
      const finalRotationX = rotationX + dragRotationX;
      
      const breathingRadius = Math.sin(time * 0.5) * 15; // Sphere breathes in and out

      // --- Render Ambient Dust ---
      dustParticles.forEach(p => {
          // Move dust
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap dust around screen
          const limitX = width * 0.75;
          const limitY = height * 0.75;
          if (p.x > limitX) p.x = -limitX;
          if (p.x < -limitX) p.x = limitX;
          if (p.y > limitY) p.y = -limitY;
          if (p.y < -limitY) p.y = limitY;

          // Parallax effect for dust
          const parallaxX = p.x - (mouseX * 2000 * (Math.abs(p.z)/1000));
          const parallaxY = p.y - (mouseY * 2000 * (Math.abs(p.z)/1000)) - (scrollY * 0.3 * (Math.abs(p.z)/1000));

          // 3D projection for dust
          const scale = 800 / (800 + p.z);
          const x2d = parallaxX * scale + width / 2;
          const y2d = parallaxY * scale + height / 2;

          if (scale > 0) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
            ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
            ctx.fill();
          }
      });

      // --- Render Connected Sphere ---
      const projectedParticles: any[] = [];

      sphereParticles.forEach((p) => {
        // Individual particle oscillation (organic feel)
        const individualPulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 5;
        const currentRadius = baseRadius + breathingRadius + individualPulse;

        // Spherical to Cartesian
        let x = currentRadius * Math.sin(p.phi) * Math.cos(p.theta);
        let y = currentRadius * Math.sin(p.phi) * Math.sin(p.theta);
        let z = currentRadius * Math.cos(p.phi);

        // Rotate around Y axis (spin + mouse influence)
        let x1 = x * Math.cos(finalRotationY) - z * Math.sin(finalRotationY);
        let z1 = x * Math.sin(finalRotationY) + z * Math.cos(finalRotationY);
        
        // Rotate around X axis (mouse influence)
        let y1 = y * Math.cos(finalRotationX) - z1 * Math.sin(finalRotationX);
        let z2 = y * Math.sin(finalRotationX) + z1 * Math.cos(finalRotationX);

        // Perspective projection with scroll parallax
        const scale = 800 / (800 + z2); 
        const scrollParallaxY = scrollY * 0.15 * scale;
        const x2d = x1 * scale + width / 2;
        const y2d = y1 * scale + height / 2 - scrollParallaxY;

        projectedParticles.push({ x: x2d, y: y2d, scale, z: z2, color: p.color });
      });

      // Sort for depth handling (painters algorithm)
      projectedParticles.sort((a, b) => b.z - a.z);

      // Draw connections between close particles
      ctx.lineWidth = 0.5;
      const connectionStep = isMobile ? 8 : 5;
      const connectionWindow = isMobile ? 10 : 20;

      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        
        // Optimization: Only check every Nth particle for connections to reduce draw calls
        if (i % connectionStep !== 0) continue;

        // Check a subset of other particles
        // Note: Since particles are sorted by Z, neighbors in array aren't necessarily neighbors in 3D space, 
        // but iterating a small window or randomizing creates a cool effect without O(N^2) cost.
        // For better visual accuracy with performance, we just check against a limited number of subsequent particles.
        for (let j = i + 1; j < Math.min(i + connectionWindow, projectedParticles.length); j++) {
           const p2 = projectedParticles[j];
           const dx = p1.x - p2.x;
           const dy = p1.y - p2.y;
           
           // Fast distance check
           if (Math.abs(dx) > 80 || Math.abs(dy) > 80) continue;

           const dist = Math.sqrt(dx*dx + dy*dy);
           
           if (dist < 80) {
             ctx.beginPath();
             // Dynamic opacity based on distance
             ctx.strokeStyle = `rgba(42, 82, 190, ${0.12 * (1 - dist / 80)})`;
             ctx.moveTo(p1.x, p1.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
           }
        }
      }

      // Draw Particles
      projectedParticles.forEach((p) => {
        // Fade out particles further back
        const alpha = (p.z + baseRadius * 2) / (4 * baseRadius); 
        const finalAlpha = Math.max(0.15, Math.min(1, alpha + 0.2));
        
        // Core dot
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = finalAlpha;
        ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer glow for larger/closer particles
        if (p.scale > 1) {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = finalAlpha * 0.15;
            ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeDBackground;
