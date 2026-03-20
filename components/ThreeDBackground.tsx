import React, { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll, MotionValue } from 'framer-motion';
import {
  ProjectedParticle,
  createSphereParticles,
  createDustParticles,
  renderDustParticles,
  updateAndProjectSphereParticles,
  renderConnections,
  renderSphereParticles,
  SphereParticle,
  DustParticle
} from './ThreeDBackgroundHelpers';

class ThreeDRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scrollY: MotionValue<number>;

  private width: number = 0;
  private height: number = 0;
  private isMobile: boolean = false;
  private baseRadius: number = 0;
  private dpr: number = 1;

  private sphereParticles: SphereParticle[] = [];
  private dustParticles: DustParticle[] = [];
  private projectedParticles: ProjectedParticle[] = [];

  private mouseX: number = 0;
  private mouseY: number = 0;
  private isDragging: boolean = false;
  private previousMousePosition = { x: 0, y: 0 };
  private dragRotationX: number = 0;
  private dragRotationY: number = 0;
  private targetDragRotationX: number = 0;
  private targetDragRotationY: number = 0;

  private rotationX: number = 0;
  private rotationY: number = 0;
  private time: number = 0;
  private animationFrameId: number = 0;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scrollY: MotionValue<number>) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scrollY = scrollY;
    
    this.init();
    this.bindEvents();
    this.animate();
  }

  private getRadius = () => Math.min(window.innerWidth, window.innerHeight) / 3;

  private init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;
    this.baseRadius = this.getRadius();
    this.dpr = window.devicePixelRatio || 1;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    const sphereParticleCount = this.isMobile ? 250 : 500;
    const colors = ['#2A52BE', '#CC5500', '#FFDB58', '#ffffff'];
    this.sphereParticles = createSphereParticles(sphereParticleCount, colors);

    const dustCount = this.isMobile ? 50 : 100;
    this.dustParticles = createDustParticles(dustCount, this.width, this.height);
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (this.isDragging) {
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;
      this.targetDragRotationY += deltaX * 0.01;
      this.targetDragRotationX += deltaY * 0.01;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    } else {
      this.mouseX = (e.clientX - this.width / 2) * 0.0005;
      this.mouseY = (e.clientY - this.height / 2) * 0.0005;
    }
  };

  private handleMouseUp = () => {
    this.isDragging = false;
  };

  private handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;
    this.baseRadius = this.getRadius();
    
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    // We need to re-apply the scale on resize because changing canvas width/height resets the context transform
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  };

  private bindEvents() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mouseleave', this.handleMouseUp);
    window.addEventListener('resize', this.handleResize);
  }

  public destroy() {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mouseleave', this.handleMouseUp);
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationFrameId);
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.time += 0.01;

    const currentScrollY = this.scrollY.get();

    this.rotationY += (this.mouseX - this.rotationY) * 0.05;
    this.rotationX += (this.mouseY - this.rotationX) * 0.05;

    this.dragRotationX += (this.targetDragRotationX - this.dragRotationX) * 0.1;
    this.dragRotationY += (this.targetDragRotationY - this.dragRotationY) * 0.1;

    const constantSpin = this.time * 0.05;
    const finalRotationY = constantSpin + this.rotationY + this.dragRotationY;
    const finalRotationX = this.rotationX + this.dragRotationX;

    renderDustParticles(this.ctx, this.dustParticles, this.width, this.height, this.mouseX, this.mouseY, currentScrollY);

    updateAndProjectSphereParticles(
      this.sphereParticles,
      this.projectedParticles,
      this.time,
      this.baseRadius,
      finalRotationX,
      finalRotationY,
      currentScrollY,
      this.width,
      this.height
    );

    renderConnections(this.ctx, this.projectedParticles, this.isMobile);
    renderSphereParticles(this.ctx, this.projectedParticles, this.baseRadius);

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}

const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ThreeDRenderer | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    rendererRef.current = new ThreeDRenderer(canvas, ctx, scrollY);

    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
    };
  }, [shouldReduceMotion, scrollY]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeDBackground;
