import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  attribute float aScale;
  attribute float aRandom;
  
  varying float vAlpha;
  varying float vColorMix;
  
  // Simple noise
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + 113.0 * p.z;
    return mix(mix(mix(hash(n), hash(n + 1.0), f.x),
                   mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
               mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                   mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
  }
  
  void main() {
    vec3 pos = position;
    
    // Breathing animation
    float breathe = sin(uTime * 0.5 + pos.z * 0.5 + aRandom * 6.28) * 0.15;
    pos += normal * breathe;
    
    // Mouse displacement
    vec2 mouseDisp = uMouse * 2.0;
    float mouseDist = length(pos.xy - mouseDisp * 3.0);
    float mouseInfluence = smoothstep(4.0, 0.0, mouseDist) * 0.8;
    pos.xy += normalize(pos.xy - mouseDisp * 3.0 + 0.001) * mouseInfluence;
    
    // Scroll dispersion
    pos *= 1.0 + uScroll * 1.5;
    
    // Noise displacement
    float n = noise(pos * 0.3 + uTime * 0.2);
    pos += vec3(n - 0.5) * 0.3;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size based on distance
    float size = aScale * (200.0 / -mvPosition.z);
    size = clamp(size, 0.5, 8.0);
    
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
    
    // Varyings
    float depth = smoothstep(-15.0, 0.0, mvPosition.z);
    vAlpha = depth * (0.3 + aRandom * 0.7) * (1.0 - uScroll);
    vColorMix = (pos.y + 5.0) / 10.0;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  
  varying float vAlpha;
  varying float vColorMix;
  
  void main() {
    // Circular particle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.15, dist);
    
    if (alpha < 0.01) discard;
    
    // Color: cyan to magenta based on vertical position
    vec3 cyan = vec3(0.0, 0.96, 1.0);
    vec3 magenta = vec3(1.0, 0.0, 1.0);
    vec3 color = mix(cyan, magenta, clamp(vColorMix, 0.0, 1.0));
    
    // Subtle flicker
    float flicker = 0.85 + 0.15 * sin(uTime * 3.0 + vColorMix * 20.0);
    
    gl_FragColor = vec4(color, alpha * vAlpha * flicker);
  }
`;

export default function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();

  const COUNT = 5000;

  const { positions, normals, scales, randoms } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const normals = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const randoms = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // Sphere distribution with variation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 7;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Normals pointing outward
      const len = Math.sqrt(
        positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2
      );
      normals[i * 3] = positions[i * 3] / len;
      normals[i * 3 + 1] = positions[i * 3 + 1] / len;
      normals[i * 3 + 2] = positions[i * 3 + 2] / len;

      scales[i] = 0.5 + Math.random() * 2.0;
      randoms[i] = Math.random();
    }

    return { positions, normals, scales, randoms };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);

    // Scroll progress
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    materialRef.current.uniforms.uScroll.value = Math.min(scrollY / vh, 1);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-normal" array={normals} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" array={scales} count={COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aRandom" array={randoms} count={COUNT} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
