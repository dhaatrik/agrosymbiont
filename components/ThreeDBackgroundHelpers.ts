export interface ProjectedParticle {
  x: number;
  y: number;
  z: number;
  scale: number;
  color: string;
}

export interface SphereParticle {
  theta: number;
  phi: number;
  color: string;
  pulseOffset: number;
  pulseSpeed: number;
  unitX: number;
  unitY: number;
  unitZ: number;
}

export interface DustParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const createSphereParticles = (count: number, colors: string[]): SphereParticle[] => {
  return Array.from({ length: count }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    return {
      theta,
      phi,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.04,
      unitX: Math.sin(phi) * Math.cos(theta),
      unitY: Math.sin(phi) * Math.sin(theta),
      unitZ: Math.cos(phi),
    };
  });
};

export const createDustParticles = (count: number, width: number, height: number): DustParticle[] => {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * width * 1.5,
    y: (Math.random() - 0.5) * height * 1.5,
    z: (Math.random() - 0.5) * 1000,
    size: Math.random() * 1.5,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.4 + 0.1,
  }));
};

export const renderDustParticles = (
  ctx: CanvasRenderingContext2D,
  dustParticles: DustParticle[],
  width: number,
  height: number,
  mouseX: number,
  mouseY: number,
  scrollY: number
) => {
  for (let i = 0; i < dustParticles.length; i++) {
    const p = dustParticles[i];
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
  }
};

export const updateAndProjectSphereParticles = (
  sphereParticles: SphereParticle[],
  projectedParticles: ProjectedParticle[],
  time: number,
  baseRadius: number,
  finalRotationX: number,
  finalRotationY: number,
  scrollY: number,
  width: number,
  height: number
) => {
  const breathingRadius = Math.sin(time * 0.5) * 15; // Sphere breathes in and out

  const cosFinalRotationY = Math.cos(finalRotationY);
  const sinFinalRotationY = Math.sin(finalRotationY);
  const cosFinalRotationX = Math.cos(finalRotationX);
  const sinFinalRotationX = Math.sin(finalRotationX);

  // Optimization: Reuse pre-allocated array and update object properties in place
  // instead of re-creating hundreds of objects per frame to reduce GC pressure.
  if (projectedParticles.length !== sphereParticles.length) {
    projectedParticles.length = sphereParticles.length;
    for (let i = 0; i < sphereParticles.length; i++) {
      projectedParticles[i] = { x: 0, y: 0, z: 0, scale: 0, color: sphereParticles[i].color };
    }
  }

  for (let i = 0; i < sphereParticles.length; i++) {
    const p = sphereParticles[i];
    // Individual particle oscillation (organic feel)
    const individualPulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 5;
    const currentRadius = baseRadius + breathingRadius + individualPulse;

    // Spherical to Cartesian (optimized with precalculated unit vectors)
    let x = currentRadius * p.unitX;
    let y = currentRadius * p.unitY;
    let z = currentRadius * p.unitZ;

    // Rotate around Y axis (spin + mouse influence)
    let x1 = x * cosFinalRotationY - z * sinFinalRotationY;
    let z1 = x * sinFinalRotationY + z * cosFinalRotationY;

    // Rotate around X axis (mouse influence)
    let y1 = y * cosFinalRotationX - z1 * sinFinalRotationX;
    let z2 = y * sinFinalRotationX + z1 * cosFinalRotationX;

    // Perspective projection with scroll parallax
    const scale = 800 / (800 + z2);
    const scrollParallaxY = scrollY * 0.15 * scale;
    const x2d = x1 * scale + width / 2;
    const y2d = y1 * scale + height / 2 - scrollParallaxY;

    const pp = projectedParticles[i];
    pp.x = x2d;
    pp.y = y2d;
    pp.scale = scale;
    pp.z = z2;
    pp.color = p.color;
  }

  // Sort for depth handling (painters algorithm)
  projectedParticles.sort((a, b) => b.z - a.z);
};

export const renderConnections = (
  ctx: CanvasRenderingContext2D,
  projectedParticles: ProjectedParticle[],
  isMobile: boolean
) => {
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
};

export const renderSphereParticles = (
  ctx: CanvasRenderingContext2D,
  projectedParticles: ProjectedParticle[],
  baseRadius: number
) => {
  // Performance optimization: Standard for loops outperform Array.prototype.forEach
  // in high-frequency 60fps render loops by avoiding closure/function call overhead.
  for (let i = 0; i < projectedParticles.length; i++) {
    const p = projectedParticles[i];
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
  }
};
