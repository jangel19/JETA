import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  Line,
  Tube,
  OrbitControls,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";

interface BlockConfig {
  type: string;
  position: [number, number, number];
  stack: number;
  delay: number;
}

const blockConfigs: BlockConfig[] = [
  { type: "Residential", position: [-3.2, 0.8, -0.8], stack: 4, delay: 0 },
  { type: "Commercial", position: [3.2, 1.2, 0.4], stack: 5, delay: 0.35 },
  { type: "Mixed-use", position: [0.2, 1.4, -3.2], stack: 6, delay: 0.6 },
  { type: "ADU", position: [-2.4, 0.65, 2.6], stack: 3, delay: 0.15 },
];

const palettes = {
  dark: {
    background: "#050b1c",
    fog: "#0f1a33",
    grid: "#0b1428",
    ambient: 0.32,
    dir: "#94a3ff",
    accent: ["#60a5fa", "#a855f7", "#34d399", "#f97316"],
    line: ["#60a5fa", "#a855f7", "#34d399", "#fbbf24"],
    particle: "#dce8ff",
    halo: "#4338ca",
    env: "night" as const,
  },
  light: {
    background: "#eef4ff",
    fog: "#dce7ff",
    grid: "#d7e5ff",
    ambient: 0.55,
    dir: "#4f46e5",
    accent: ["#2563eb", "#7c3aed", "#0f766e", "#ea580c"],
    line: ["#2563eb", "#7c3aed", "#0f766e", "#ea580c"],
    particle: "#1d4ed8",
    halo: "#5b21b6",
    env: "sunset" as const,
  },
};

type Palette = (typeof palettes)[keyof typeof palettes];

function PropertyBlock({ block, palette }: { block: BlockConfig; palette: Palette }) {
  const groupRef = useRef<THREE.Group>(null);
  const segmentHeights = useMemo(() => Array.from({ length: block.stack }), [block.stack]);
  const segmentColors = useMemo(() => {
    return segmentHeights.map((_, idx) => {
      const base = new THREE.Color(palette.accent[idx % palette.accent.length]);
      base.offsetHSL(0, 0, (block.stack - idx) * 0.015);
      return base.getStyle();
    });
  }, [palette.accent, block.stack, segmentHeights]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() + block.delay;
    groupRef.current.position.y = block.position[1] + Math.sin(t * 1.1) * 0.35;
    groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.28;
  });

  return (
    <group ref={groupRef} position={[block.position[0], 0, block.position[2]]}>
      {segmentHeights.map((_, idx) => (
        <mesh key={idx} position={[0, idx * 0.65 + 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2 - idx * 0.05, 0.6, 1.2 - idx * 0.05]} />
          <meshPhysicalMaterial
            color={segmentColors[idx]}
            roughness={0.3}
            metalness={0.22}
            clearcoat={0.35}
            clearcoatRoughness={0.4}
          />
        </mesh>
      ))}
      <Html center distanceFactor={18} position={[0, block.stack * 0.65 + 0.4, 0]}>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/80 text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-100">
          {block.type}
        </span>
      </Html>
    </group>
  );
}

function AIBrain({ palette }: { palette: Palette }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    const t = clock.getElapsedTime();
    sphereRef.current.rotation.y = t * 0.6;
    (sphereRef.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity =
      0.85 + Math.sin(t * 2) * 0.2;
  });

  return (
    <group>
      <mesh ref={sphereRef} position={[0, 1.4, 0]} castShadow>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color={palette.accent[0]}
          emissive={palette.accent[0]}
          metalness={0.45}
          roughness={0.08}
          transmission={0.18}
          thickness={0.45}
          clearcoat={0.75}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <Float floatIntensity={0.5} rotationIntensity={0.7}>
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshBasicMaterial color={palette.halo} wireframe opacity={0.16} transparent />
        </mesh>
      </Float>
    </group>
  );
}

function ConnectionLines({ blocks, palette }: { blocks: BlockConfig[]; palette: Palette }) {
  return (
    <group>
      {blocks.map((block, idx) => (
        <Line
          key={block.type}
          points={[block.position, [0, 1.4, 0]]}
          color={palette.line[idx % palette.line.length]}
          lineWidth={2.4}
          dashed
          dashSize={0.6}
          gapSize={0.35}
        />
      ))}
    </group>
  );
}

function DataParticles({ palette }: { palette: Palette }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 800; i += 1) {
      const r = 8 * Math.random() + 2.8;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 4 - 1.5;
      pts.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.06;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color={palette.particle} size={0.05} sizeAttenuation depthWrite={false} opacity={0.65} />
    </Points>
  );
}

function SwarmParticles({ palette }: { palette: Palette }) {
  const swarmRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => palette.accent.map((c) => new THREE.Color(c)), [palette.accent]);

  useFrame(({ clock }) => {
    if (!swarmRef.current) return;
    const t = clock.getElapsedTime();
    const count = swarmRef.current.count;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + t * 0.45;
      const radius = 4.6 + Math.sin(t * 0.6 + i) * 1.15;
      const y = Math.sin(t * 0.7 + i) * 1.2 + 1.25;
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const scale = 0.22 + (Math.sin(t + i) + 1) * 0.07;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(t * 0.6 + i, t * 0.4 + i * 0.3, 0);
      dummy.updateMatrix();
      swarmRef.current.setMatrixAt(i, dummy.matrix);
      swarmRef.current.setColorAt(i, colors[i % colors.length]);
    }
    swarmRef.current.instanceMatrix.needsUpdate = true;
    if (swarmRef.current.instanceColor) swarmRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={swarmRef} args={[undefined as any, undefined as any, 80]} castShadow>
      <boxGeometry args={[0.35, 0.35, 0.35]} />
      <meshStandardMaterial roughness={0.25} metalness={0.45} />
    </instancedMesh>
  );
}

function DataRibbons({ palette }: { palette: Palette }) {
  const curves = useMemo(() => {
    const arr: THREE.CatmullRomCurve3[] = [];
    for (let i = 0; i < 6; i += 1) {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j < 5; j += 1) {
        const angle = (j / 4) * Math.PI * 2 + i * 0.5;
        const radius = 2.4 + j * 0.85;
        const y = 0.5 + j * 0.45;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      }
      arr.push(new THREE.CatmullRomCurve3(pts));
    }
    return arr;
  }, []);

  return (
    <group>
      {curves.map((curve, idx) => (
        <Tube key={idx} args={[curve, 60, 0.08, 6, false]} position={[0, 0.15, 0]}>
          <meshStandardMaterial
            color={palette.line[idx % palette.line.length]}
            emissive={palette.line[idx % palette.line.length]}
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.2}
          />
        </Tube>
      ))}
    </group>
  );
}

function OrbitHalo({ palette }: { palette: Palette }) {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const radius = 7.5;
    const segments = 140;
    for (let i = 0; i <= segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      const y = Math.sin(angle * 4) * 0.45;
      pts.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Line points={points} color={palette.halo} lineWidth={1.2} opacity={0.35} transparent />
    </group>
  );
}

function TilePlatform({ palette }: { palette: Palette }) {
  const tiles = useMemo(() => Array.from({ length: 36 }), []);
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      {tiles.map((_, idx) => {
        const angle = (idx / tiles.length) * Math.PI * 2;
        const radius = 6.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh key={idx} position={[x, y, 0]} rotation={[Math.PI / 2, 0, angle]} receiveShadow>
            <boxGeometry args={[1.2, 1.2, 0.12]} />
            <meshStandardMaterial color={palette.grid} roughness={0.85} metalness={0.12} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene({ palette }: { palette: Palette }) {
  const blocks = blockConfigs;
  const worldRef = useRef<THREE.Group>(null);
  const parallax = useScrollParallax(-0.0009);

  useFrame(() => {
    if (!worldRef.current) return;
    parallax.value.current = THREE.MathUtils.lerp(parallax.value.current, parallax.target.current, 0.05);
    worldRef.current.position.y = parallax.value.current;
    worldRef.current.rotation.y = THREE.MathUtils.lerp(worldRef.current.rotation.y, parallax.value.current * 0.28, 0.02);
  });

  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.fog, 18, 55]} />

      <ambientLight intensity={palette.ambient} />
      <directionalLight
        position={[8, 10, 6]}
        intensity={1.4}
        color={palette.dir}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight position={[-6, 9, -4]} angle={0.4} intensity={0.8} color={palette.accent[0]} />

      <group ref={worldRef} position={[0, -0.4, 0]}>
        <TilePlatform palette={palette} />
        <AIBrain palette={palette} />
        <OrbitHalo palette={palette} />
        <SwarmParticles palette={palette} />
        {blocks.map((block) => (
          <PropertyBlock key={block.type} block={block} palette={palette} />
        ))}
        <ConnectionLines blocks={blocks} palette={palette} />
        <DataRibbons palette={palette} />
      </group>

      <DataParticles palette={palette} />

      <Environment preset={palette.env} environmentIntensity={palette.env === "night" ? 0.8 : 0.6} background={false} />

      <IdleOrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 5}
        minDistance={7}
        maxDistance={18}
        autoRotateSpeed={0.22}
        idleDelay={2200}
        makeDefault
      />
    </>
  );
}

function IdleOrbitControls({ idleDelay = 2000, ...props }: any) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimer = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    setAutoRotate(false);
    if (idleTimer.current) {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const handleEnd = useCallback(() => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setAutoRotate(true), idleDelay);
  }, [idleDelay]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.addEventListener("start", handleStart);
    controls.addEventListener("end", handleEnd);
    return () => {
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end", handleEnd);
    };
  }, [handleStart, handleEnd]);

  useEffect(() => () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
  }, []);

  if (!camera) return null;

  return <OrbitControls ref={controlsRef} autoRotate={autoRotate} target={[0, 1, 0]} {...props} />;
}

interface Hero3DEnhancedProps {
  className?: string;
}

export default function Hero3DEnhanced({ className }: Hero3DEnhancedProps) {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "light" ? palettes.light : palettes.dark;

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0", className)}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [9, 5.5, 11], fov: 42 }} className="bg-transparent">
        <Scene palette={palette} />
      </Canvas>
    </div>
  );
}
