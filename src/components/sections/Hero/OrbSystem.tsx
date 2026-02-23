import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbProps {
  color: string;
  emissiveColor: string;
  radius: number;
  speed: number;
  amplitude: THREE.Vector3;
  phase: number;
  lightIntensity: number;
}

function Orb({ color, emissiveColor, radius, speed, amplitude, phase, lightIntensity }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    const x = Math.sin(t * speed + phase) * amplitude.x + mouse.x * 0.5;
    const y = Math.cos(t * speed * 0.7 + phase) * amplitude.y + mouse.y * 0.3;
    const z = Math.sin(t * speed * 0.5 + phase * 2) * amplitude.z;

    meshRef.current.position.set(x, y, z);
    if (lightRef.current) {
      lightRef.current.position.copy(meshRef.current.position);
    }

    // Pulse scale
    const scale = 1 + Math.sin(t * 2 + phase) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={2}
          toneMapped={false}
          transparent
          opacity={0.8}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        color={color}
        intensity={lightIntensity}
        distance={8}
        decay={2}
      />
    </group>
  );
}

export default function OrbSystem() {
  return (
    <group>
      <Orb
        color="#00f5ff"
        emissiveColor="#00f5ff"
        radius={0.5}
        speed={0.3}
        amplitude={new THREE.Vector3(2.5, 1.5, 1)}
        phase={0}
        lightIntensity={3}
      />
      <Orb
        color="#ff00ff"
        emissiveColor="#ff00ff"
        radius={0.35}
        speed={0.25}
        amplitude={new THREE.Vector3(3, 2, 1.5)}
        phase={2}
        lightIntensity={2}
      />
      <Orb
        color="#c026d3"
        emissiveColor="#c026d3"
        radius={0.25}
        speed={0.4}
        amplitude={new THREE.Vector3(2, 1, 1)}
        phase={4}
        lightIntensity={1.5}
      />
    </group>
  );
}
