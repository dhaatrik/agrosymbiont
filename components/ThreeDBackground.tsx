
import React, { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll } from 'framer-motion';
import {
  ProjectedParticle,
  createSphereParticles,
  createDustParticles,
  renderDustParticles,
  updateAndProjectSphereParticles,
  renderConnections,
  renderSphereParticles
} from './ThreeDBackgroundHelpers';

const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

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
    const sphereParticles = createSphereParticles(sphereParticleCount, colors);

    // --- Ambient Dust Particles Configuration ---
    const dustCount = isMobile ? 50 : 100;
    const dustParticles = createDustParticles(dustCount, width, height);

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


    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    window.addEventListener('resize', handleResize);

    let rotationX = 0;
    let rotationY = 0;
    let time = 0;
    let animationFrameId: number;

    const projectedParticles: ProjectedParticle[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;
      
      const currentScrollY = scrollY.get();

      // Smooth rotation easing based on mouse position
      rotationY += (mouseX - rotationY) * 0.05;
      rotationX += (mouseY - rotationX) * 0.05;

      dragRotationX += (targetDragRotationX - dragRotationX) * 0.1;
      dragRotationY += (targetDragRotationY - dragRotationY) * 0.1;
      
      const constantSpin = time * 0.05;
      const finalRotationY = constantSpin + rotationY + dragRotationY;
      const finalRotationX = rotationX + dragRotationX;
      
      // --- Render Ambient Dust ---
      renderDustParticles(ctx, dustParticles, width, height, mouseX, mouseY, currentScrollY);

      // --- Render Connected Sphere ---
      updateAndProjectSphereParticles(
        sphereParticles,
        projectedParticles,
        time,
        baseRadius,
        finalRotationX,
        finalRotationY,
        currentScrollY,
        width,
        height
      );

      // Draw connections between close particles
      renderConnections(ctx, projectedParticles, isMobile);

      // Draw Particles
      renderSphereParticles(ctx, projectedParticles, baseRadius);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeDBackground;
