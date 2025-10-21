import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
            metalness={0.7}
            roughness={0.23}
            emissive="#347bb5"
            emissiveIntensity={0.16}
          />
        </Sphere>
      )}
      {geometry === 'box' && (
        <Box {...shapeProps} args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial
            color="#a1a1aa"
            metalness={0.5}
            roughness={0.18}
            emissive="#555"
            emissiveIntensity={0.12}
          />
        </Box>
      )}
      {geometry === 'torus' && (
        <Torus {...shapeProps} args={[1, 0.4, 16, 32]}>
          <meshStandardMaterial
            color="#13bb82"
            metalness={0.43}
            roughness={0.31}
            emissive="#0a6349"
            emissiveIntensity={0.1}
          />
        </Torus>
      )}
    </>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.44} />
      <directionalLight position={[10, 10, 5]} intensity={1.1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#3b82f6" />

      <FloatingShape position={[-3, 0, 0]} geometry="sphere" />
      <FloatingShape position={[3, 0, 0]} geometry="box" />
      <FloatingShape position={[0, 2, -2]} geometry="torus" />

      <SafeOrbitControls />
    </>
  );
};

function SafeOrbitControls() {
  const { camera } = useThree();
  const [auto, setAuto] = React.useState(true);
  const timer = React.useRef<number | undefined>(undefined);
  if (!camera) return null;

  const onStart = () => {
    setAuto(false);
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = undefined;
    }
  };
  const onEnd = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAuto(true), 2000);
  };

  React.useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={true}
      autoRotate={auto}
      autoRotateSpeed={0.5}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      makeDefault
      onStart={onStart}
      onEnd={onEnd}
    />
  );
}

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
