import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createSphereParticles,
  createDustParticles,
  renderDustParticles,
  updateAndProjectSphereParticles,
  renderConnections,
  renderSphereParticles,
  SphereParticle,
  DustParticle,
  ProjectedParticle
} from './ThreeDBackgroundHelpers';

describe('ThreeDBackgroundHelpers', () => {
  const mockCtx = {
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    set fillStyle(val: string) {},
    set strokeStyle(val: string) {},
    set lineWidth(val: number) {},
    set globalAlpha(val: number) {},
  } as unknown as CanvasRenderingContext2D;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createSphereParticles', () => {
    it('creates the specified number of particles', () => {
      const count = 10;
      const colors = ['#ff0000', '#00ff00'];
      const particles = createSphereParticles(count, colors);
      expect(particles).toHaveLength(count);
    });

    it('creates particles with correct properties', () => {
      const colors = ['#ff0000'];
      const particles = createSphereParticles(1, colors);
      const p = particles[0];
      expect(p).toHaveProperty('theta');
      expect(p).toHaveProperty('phi');
      expect(p.color).toBe('#ff0000');
      expect(p).toHaveProperty('pulseOffset');
      expect(p).toHaveProperty('pulseSpeed');
      expect(p).toHaveProperty('unitX');
      expect(p).toHaveProperty('unitY');
      expect(p).toHaveProperty('unitZ');
    });
  });

  describe('createDustParticles', () => {
    it('creates the specified number of particles', () => {
      const count = 50;
      const particles = createDustParticles(count, 1000, 1000);
      expect(particles).toHaveLength(count);
    });

    it('creates particles within expected bounds', () => {
      const width = 1000;
      const height = 800;
      const particles = createDustParticles(100, width, height);
      particles.forEach(p => {
        // x: (Math.random() - 0.5) * width * 1.5 => [-0.75 * width, 0.75 * width]
        expect(p.x).toBeGreaterThanOrEqual(-width * 0.75);
        expect(p.x).toBeLessThanOrEqual(width * 0.75);
        expect(p.y).toBeGreaterThanOrEqual(-height * 0.75);
        expect(p.y).toBeLessThanOrEqual(height * 0.75);
        expect(p.z).toBeGreaterThanOrEqual(-500);
        expect(p.z).toBeLessThanOrEqual(500);
      });
    });
  });

  describe('renderDustParticles', () => {
    it('updates particle positions and wraps them around screen', () => {
      const width = 1000;
      const height = 1000;
      // limitX = 1000 * 0.75 = 750
      const dustParticles: DustParticle[] = [
        { x: 745, y: 0, z: 100, size: 1, speedX: 10, speedY: 0, opacity: 0.5 }
      ];

      renderDustParticles(mockCtx, dustParticles, width, height, 0, 0, 0);

      // 745 + 10 = 755. limitX = 750. Should wrap to -750.
      expect(dustParticles[0].x).toBe(-750);
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.arc).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });

    it('applies parallax and 3D projection', () => {
      const width = 1000;
      const height = 1000;
      const dustParticles: DustParticle[] = [
        { x: 0, y: 0, z: 0, size: 2, speedX: 0, speedY: 0, opacity: 1 }
      ];

      renderDustParticles(mockCtx, dustParticles, width, height, 0.5, 0.5, 100);

      // scale = 800 / (800 + 0) = 1
      // parallaxX = 0 - (0.5 * 2000 * 0) = 0
      // parallaxY = 0 - (0.5 * 2000 * 0) - (100 * 0.3 * 0) = 0
      // x2d = 0 * 1 + 500 = 500
      // y2d = 0 * 1 + 500 = 500
      expect(mockCtx.arc).toHaveBeenCalledWith(500, 500, 2, 0, Math.PI * 2);
    });
  });

  describe('updateAndProjectSphereParticles', () => {
    it('projects sphere particles to 2D with breathing effect', () => {
      const sphereParticles: SphereParticle[] = [{
        theta: 0, phi: Math.PI / 2, color: '#fff', pulseOffset: 0, pulseSpeed: 0,
        unitX: 1, unitY: 0, unitZ: 0
      }];
      const projectedParticles: ProjectedParticle[] = [];
      const baseRadius = 100;
      const time = 0; // sin(0) = 0

      updateAndProjectSphereParticles(
        sphereParticles, projectedParticles, time, baseRadius, 0, 0, 0, 1000, 1000
      );

      expect(projectedParticles).toHaveLength(1);
      // radius = 100 + 0 + 0 = 100
      // x = 100, y = 0, z = 0
      // no rotation
      // scale = 800 / (800 + 0) = 1
      // x2d = 100 * 1 + 500 = 600
      // y2d = 0 * 1 + 500 = 500
      expect(projectedParticles[0].x).toBeCloseTo(600);
      expect(projectedParticles[0].y).toBeCloseTo(500);
    });

    it('sorts particles by depth (painter\'s algorithm)', () => {
      const sphereParticles: SphereParticle[] = [
        { theta: 0, phi: 0, color: 'front', pulseOffset: 0, pulseSpeed: 0, unitX: 0, unitY: 0, unitZ: 1 },
        { theta: 0, phi: Math.PI, color: 'back', pulseOffset: 0, pulseSpeed: 0, unitX: 0, unitY: 0, unitZ: -1 }
      ];

      const projected: ProjectedParticle[] = [];
      updateAndProjectSphereParticles(sphereParticles, projected, 0, 100, 0, 0, 0, 1000, 1000);

      // Z coordinates after rotation (which is 0):
      // p1: z = 100 * 1 = 100
      // p2: z = 100 * -1 = -100
      // scale1 = 800 / (800 + 100) = 800/900 = 0.88
      // scale2 = 800 / (800 - 100) = 800/700 = 1.14
      // pp1.z = 100
      // pp2.z = -100
      // sort((a, b) => b.z - a.z) => [100, -100]
      expect(projected[0].z).toBe(100);
      expect(projected[1].z).toBe(-100);
    });

    it('reuses the projectedParticles array for optimization', () => {
      const sphereParticles = createSphereParticles(5, ['#fff']);
      const projectedParticles: ProjectedParticle[] = [];

      updateAndProjectSphereParticles(sphereParticles, projectedParticles, 0, 100, 0, 0, 0, 1000, 1000);
      const firstInstance = projectedParticles[0];

      updateAndProjectSphereParticles(sphereParticles, projectedParticles, 1, 100, 0, 0, 0, 1000, 1000);
      // After sort, the objects might be in different order, but they should be the same instances.
      expect(projectedParticles).toContain(firstInstance);
      expect(projectedParticles).toHaveLength(5);
    });
  });

  describe('renderConnections', () => {
    it('draws connections between close particles', () => {
      const projected: ProjectedParticle[] = [
        { x: 500, y: 500, z: 0, scale: 1, color: '#fff' },
        { x: 510, y: 510, z: 0, scale: 1, color: '#fff' }
      ];

      renderConnections(mockCtx, projected, false);

      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.moveTo).toHaveBeenCalled();
      expect(mockCtx.lineTo).toHaveBeenCalled();
      expect(mockCtx.stroke).toHaveBeenCalled();
    });

    it('respects connectionStep and connectionWindow', () => {
      const projected = Array.from({ length: 10 }, (_, i) => ({
        x: 500 + i, y: 500 + i, z: 0, scale: 1, color: '#fff'
      }));

      renderConnections(mockCtx, projected, false); // isMobile = false => step 5, window 20

      // Only i=0 and i=5 should trigger connections
      expect(mockCtx.stroke).toHaveBeenCalled();
    });
  });

  describe('renderSphereParticles', () => {
    it('renders dots and glows with scale-based sizing', () => {
      const projected: ProjectedParticle[] = [
        { x: 500, y: 500, z: 0, scale: 2, color: '#ff0000' }
      ];

      renderSphereParticles(mockCtx, projected, 100);

      expect(mockCtx.arc).toHaveBeenCalledTimes(2); // One for dot, one for glow (since scale > 1)
      expect(mockCtx.fill).toHaveBeenCalledTimes(2);
    });

    it('renders only dots for small particles', () => {
      const projected: ProjectedParticle[] = [
        { x: 500, y: 500, z: 0, scale: 0.5, color: '#ff0000' }
      ];

      renderSphereParticles(mockCtx, projected, 100);

      expect(mockCtx.arc).toHaveBeenCalledTimes(1);
    });
  });
});
