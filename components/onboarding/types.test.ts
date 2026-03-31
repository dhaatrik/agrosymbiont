import { describe, it, expect } from 'vitest';
import { TOTAL_STEPS, slideVariants, soilColors, PARTICLE_DATA } from './types';

describe('Onboarding Types and Constants', () => {
  describe('TOTAL_STEPS', () => {
    it('should be 6', () => {
      expect(TOTAL_STEPS).toBe(6);
    });
  });

  describe('slideVariants', () => {
    it('should define enter, center, and exit variants', () => {
      expect(slideVariants).toHaveProperty('enter');
      expect(slideVariants).toHaveProperty('center');
      expect(slideVariants).toHaveProperty('exit');
    });

    it('should have correct enter properties', () => {
      expect(slideVariants.enter).toEqual({ opacity: 0, x: 60 });
    });

    it('should have correct center properties', () => {
      expect(slideVariants.center).toEqual({ opacity: 1, x: 0 });
    });

    it('should have correct exit properties', () => {
      expect(slideVariants.exit).toEqual({ opacity: 0, x: -60 });
    });
  });

  describe('soilColors', () => {
    it('should have predefined soil types', () => {
      const types = ['alluvial', 'red', 'black', 'sandy', 'clay', 'unknown'];
      types.forEach(type => {
        expect(soilColors).toHaveProperty(type);
        expect(typeof soilColors[type]).toBe('string');
      });
    });

    it('should contain specific Tailwind classes for styling', () => {
      expect(soilColors.alluvial).toContain('bg-amber-100');
      expect(soilColors.red).toContain('bg-red-100');
    });
  });

  describe('PARTICLE_DATA', () => {
    it('should generate exactly 8 particles', () => {
      expect(PARTICLE_DATA).toHaveLength(8);
    });

    it('should contain objects with color, x, and y properties', () => {
      PARTICLE_DATA.forEach(particle => {
        expect(particle).toHaveProperty('color');
        expect(particle).toHaveProperty('x');
        expect(particle).toHaveProperty('y');
        expect(typeof particle.color).toBe('string');
        expect(typeof particle.x).toBe('number');
        expect(typeof particle.y).toBe('number');
      });
    });

    it('should calculate positions in a circle of radius 70', () => {
      PARTICLE_DATA.forEach(particle => {
        // x^2 + y^2 = r^2
        const radiusSquared = Math.pow(particle.x, 2) + Math.pow(particle.y, 2);
        // Allowing a small floating point tolerance
        expect(radiusSquared).toBeCloseTo(Math.pow(70, 2), 4);
      });
    });

    it('should cycle through the defined colors', () => {
      // The colors array used in the file is:
      // ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-orange-400', 'bg-pink-400', 'bg-purple-400', 'bg-red-400', 'bg-teal-400']
      const expectedColors = [
        'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-orange-400',
        'bg-pink-400', 'bg-purple-400', 'bg-red-400', 'bg-teal-400'
      ];

      PARTICLE_DATA.forEach((particle, index) => {
        expect(particle.color).toBe(expectedColors[index % expectedColors.length]);
      });
    });
  });
});
