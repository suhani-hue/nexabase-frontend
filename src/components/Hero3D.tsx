import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.2;
      ring2Ref.current.rotation.y = t * 0.35;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.25;
      ring3Ref.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <group position={[2.5, 0, 0]}>
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
          distort={0.35}
          speed={2}
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.4, 0.008, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.3} />
      </mesh>

      {/* Floating nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <FloatingNode key={i} index={i} />
      ))}
    </group>
  );
}

function FloatingNode({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 6) * Math.PI * 2;
  const radius = 2.2;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = Math.cos(angle + t * 0.3) * radius;
      ref.current.position.y = Math.sin(angle + t * 0.3) * radius * 0.4;
      ref.current.position.z = Math.sin(angle + t * 0.3) * radius * 0.6;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.y = t * 0.3;
    }
  });

  const colors = ['#a855f7', '#ec4899', '#c084fc', '#f472b6', '#9333ea', '#db2777'];

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.12, 0.12, 0.12]} />
      <meshBasicMaterial color={colors[index]} transparent opacity={0.8} />
    </mesh>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#a855f7" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={1.5} />
      <pointLight position={[0, 10, 0]} color="#ffffff" intensity={0.5} />
      <AnimatedSphere />
      <Particles />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}