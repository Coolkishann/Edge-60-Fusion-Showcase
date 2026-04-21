/**
 * Particle shape generators — dense-cloud approach.
 * Gaussian center concentration creates natural glow from sheer density.
 */

/** Gaussian random (Box-Muller) */
function gaussianRandom(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Dense cloud — gaussian center, sparse edges.
 * Vertical oval shape similar to the nfinitepaper aesthetic.
 */
export function generateScatterPositions(
  count: number,
  spread: number = 5
): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = gaussianRandom() * spread * 0.45;
    positions[i * 3 + 1] = gaussianRandom() * spread * 0.55;
    positions[i * 3 + 2] = gaussianRandom() * spread * 0.3;
  }
  return positions;
}

/** Cube surface positions with slight surface noise */
export function generateCubePositions(
  count: number,
  size: number = 2.4
): Float32Array {
  const positions = new Float32Array(count * 3);
  const half = size / 2;

  for (let i = 0; i < count; i++) {
    const face = i % 6;
    const u = (Math.random() - 0.5) * size;
    const v = (Math.random() - 0.5) * size;
    const n = gaussianRandom() * 0.02;

    switch (face) {
      case 0:
        positions[i * 3] = half + n;
        positions[i * 3 + 1] = u;
        positions[i * 3 + 2] = v;
        break;
      case 1:
        positions[i * 3] = -half + n;
        positions[i * 3 + 1] = u;
        positions[i * 3 + 2] = v;
        break;
      case 2:
        positions[i * 3] = u;
        positions[i * 3 + 1] = half + n;
        positions[i * 3 + 2] = v;
        break;
      case 3:
        positions[i * 3] = u;
        positions[i * 3 + 1] = -half + n;
        positions[i * 3 + 2] = v;
        break;
      case 4:
        positions[i * 3] = u;
        positions[i * 3 + 1] = v;
        positions[i * 3 + 2] = half + n;
        break;
      case 5:
        positions[i * 3] = u;
        positions[i * 3 + 1] = v;
        positions[i * 3 + 2] = -half + n;
        break;
    }
  }
  return positions;
}

/** Square Pyramid positions */
export function generatePyramidPositions(
  count: number,
  size: number = 2.6
): Float32Array {
  const positions = new Float32Array(count * 3);
  const s = size / 2;
  
  // Base corners
  const v0 = [-s, -s, -s];
  const v1 = [ s, -s, -s];
  const v2 = [ s, -s,  s];
  const v3 = [-s, -s,  s];
  // Apex
  const v4 = [ 0,  s,  0]; 

  const triangles = [
    [v0, v1, v4], // front
    [v1, v2, v4], // right
    [v2, v3, v4], // back
    [v3, v0, v4], // left
    [v0, v1, v2], // base 1
    [v0, v2, v3], // base 2
  ];

  for (let i = 0; i < count; i++) {
    const tIdx = Math.floor(Math.random() * triangles.length);
    const tri = triangles[tIdx];
    
    let r1 = Math.random();
    let r2 = Math.random();
    if (r1 + r2 > 1) {
      r1 = 1 - r1;
      r2 = 1 - r2;
    }
    const r3 = 1 - r1 - r2;

    const n = gaussianRandom() * 0.02;

    positions[i * 3]     = tri[0][0] * r1 + tri[1][0] * r2 + tri[2][0] * r3 + n;
    positions[i * 3 + 1] = tri[0][1] * r1 + tri[1][1] * r2 + tri[2][1] * r3 + n;
    positions[i * 3 + 2] = tri[0][2] * r1 + tri[1][2] * r2 + tri[2][2] * r3 + n;
  }
  return positions;
}

/** Fluid Ribbon / Double Helix positions */
export function generateRibbonPositions(
  count: number,
  radius: number = 2.5
): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // 3 twists for the ribbon
    const t = (i / count) * Math.PI * 6; 
    
    // Width vector random along the ribbon cross-section
    const widthOffset = (Math.random() - 0.5) * 1.8;
    
    // Core curve (Figure 8 variation)
    const x = Math.sin(t) * radius;
    const y = Math.cos(t * 1.5) * (radius * 0.8);
    const z = Math.cos(t) * radius;

    const n = gaussianRandom() * 0.03;
    
    const dx = Math.cos(t);
    const dz = -Math.sin(t);
    
    // perpendicular to core curve
    const px = dz;
    const pz = -dx;
    
    const twist = t * 2.5;
    const wx = px * Math.cos(twist) * widthOffset;
    const wy = Math.sin(twist) * widthOffset;
    const wz = pz * Math.cos(twist) * widthOffset;

    positions[i * 3]     = x + wx + n;
    positions[i * 3 + 1] = y + wy + n;
    positions[i * 3 + 2] = z + wz + n;
  }
  return positions;
}

/** Fibonacci sphere with slight surface noise */
export function generateSpherePositions(
  count: number,
  radius: number = 2.2
): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const nr = radius + gaussianRandom() * 0.04;

    positions[i * 3] = Math.cos(theta) * radiusAtY * nr;
    positions[i * 3 + 1] = y * nr;
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * nr;
  }
  return positions;
}

/** Tiny dot sizes — most particles are very small */
export function generateSizes(
  count: number,
  baseSize: number = 0.7
): Float32Array {
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // Power distribution: mostly small, few larger
    const r = Math.random();
    sizes[i] = baseSize * (0.3 + r * r * 1.2);
  }
  return sizes;
}

/** Low opacity range — density creates brightness */
export function generateOpacities(count: number): Float32Array {
  const opacities = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    opacities[i] = 0.15 + Math.random() * 0.45;
  }
  return opacities;
}

/** Pure white with very subtle temperature variation */
export function generateColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const b = 0.75 + Math.random() * 0.25;
    const warmth = (Math.random() - 0.5) * 0.03;
    colors[i * 3] = b + warmth;
    colors[i * 3 + 1] = b;
    colors[i * 3 + 2] = b - warmth;
  }
  return colors;
}
