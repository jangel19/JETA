import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, geometry }: { position: [number, number, number]; geometry: 'sphere' | 'box' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3;
  });

  const shapeProps = {
    ref: meshRef,
    position,
    castShadow: true,
  };

  return (
    <>
      {geometry === 'sphere' && (
        <Sphere {...shapeProps} args={[1, 32, 32]}>
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.8}
            roughness={0.2}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </Sphere>
      )}
      {geometry === 'box' && (
        <Box {...shapeProps} args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </Box>
      )}
      {geometry === 'torus' && (
        <Torus {...shapeProps} args={[1, 0.4, 16, 32]}>
          <meshStandardMaterial
            color="#10b981"
            metalness={0.8}
            roughness={0.2}
            emissive="#10b981"
            emissiveIntensity={0.2}
          />
        </Torus>
      )}
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#3b82f6" />

      <FloatingShape position={[-3, 0, 0]} geometry="sphere" />
      <FloatingShape position={[3, 0, 0]} geometry="box" />
      <FloatingShape position={[0, 2, -2]} geometry="torus" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="bg-transparent"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3D;