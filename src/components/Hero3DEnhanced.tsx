import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// AI Brain Network - Central sphere with orbiting nodes
const AIBrainNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  
  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5;
      nodePositions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 0.5) * 1.5,
        z: Math.sin(angle) * radius,
      });
    }
    return nodePositions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
    
    nodesRef.current.forEach((node, i) => {
      if (node) {
        node.position.y += Math.sin(time + i) * 0.001;
      }
    });
  });

  return (
    <group ref={groupRef} position={[-4, 0, 0]}>
      {/* Central sphere */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.1}
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Orbiting nodes */}
      {nodes.map((pos, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
          args={[0.3, 16, 16]}
        >
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
      
      {/* Connection lines */}
      {nodes.map((pos, i) => (
        <Line
          key={`line-${i}`}
          points={[[0, 0, 0], [pos.x, pos.y, pos.z]]}
          color="#3b82f6"
          lineWidth={2}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
};

// Data Crystal - Prismatic icosahedron
const DataCrystal = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.4;
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#10b981"
        metalness={0.9}
        roughness={0.1}
        emissive="#10b981"
        emissiveIntensity={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Security Shield - Hexagonal shield
const SecurityShield = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.3;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
      0.3 + Math.sin(time * 2) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[4, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.2, 6]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.9}
        roughness={0.2}
        emissive="#3b82f6"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Speed Rings - Orbital rings
const SpeedRings = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 1.5;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 1.2;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.9;
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.08, 16, 50]} />
        <meshStandardMaterial
          color="#10b981"
          metalness={0.9}
          roughness={0.1}
          emissive="#10b981"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.06, 16, 50]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.9}
          roughness={0.1}
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ring3Ref} rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.07, 16, 50]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.9}
          roughness={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#10b981" />

      <AIBrainNetwork />
      <DataCrystal />
      <SecurityShield />
      <SpeedRings />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const Hero3DEnhanced = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 50 }}
        className="bg-transparent"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3DEnhanced;
