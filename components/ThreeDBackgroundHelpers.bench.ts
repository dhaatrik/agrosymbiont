import { bench, describe } from 'vitest';
import { createSphereParticles, updateAndProjectSphereParticles, ProjectedParticle } from './ThreeDBackgroundHelpers';

describe('updateAndProjectSphereParticles', () => {
  const count = 1500;
  const sphereParticles = createSphereParticles(count, ['#ff0000', '#00ff00', '#0000ff']);
  const projectedParticles: ProjectedParticle[] = [];

  bench('updateAndProjectSphereParticles', () => {
    updateAndProjectSphereParticles(
      sphereParticles,
      projectedParticles,
      Date.now() / 1000,
      100,
      0.1,
      0.2,
      0,
      1920,
      1080
    );
  });
});
