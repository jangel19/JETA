import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, Line } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

// Scene 1: Welcome - Expanding Sphere Network
type Palette = {
  blue: string;
  purple: string;
  green: string;
  orange: string;
  fog: string;
  dir: string;
  pointA: string;
  pointB: string;
};

function WelcomeScene({ opacity, palette }: { opacity: number; palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const colors = [palette.blue, palette.purple, palette.green];
  const items = useMemo(() => Array.from({ length: 20 }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={group}>
      {items.map((_, i) => {
        const r = 2 + (i % 4) * 0.6;
        const a = (i / items.length) * Math.PI * 2;
        return (
          <Float key={i} floatIntensity={1} rotationIntensity={0.5} speed={1}>
            <mesh position={[Math.cos(a) * r, Math.sin(i) * 0.5, Math.sin(a) * r]}>
              <sphereGeometry args={[0.15 + (i % 3) * 0.05, 16, 16]} />
              <meshPhysicalMaterial
                color={colors[i % colors.length]}
                roughness={0.2}
                metalness={0.8}
                emissive={colors[i % colors.length]}
                emissiveIntensity={0.3}
                transparent
                opacity={opacity}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// Scene 2: AI Analysis - Neural Network
function AIScene({ opacity, palette }: { opacity: number; palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => Array.from({ length: 8 }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.3;
    const pulse = 1 + Math.sin(t * 2) * 0.1;
    group.current.scale.setScalar(pulse);
  });

  return (
    <group ref={group}>
      {/* Central AI Brain */}
      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshPhysicalMaterial
          color={palette.purple}
          roughness={0.1}
          metalness={0.9}
          emissive={palette.purple}
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Orbiting Data Nodes */}
      {nodes.map((_, i) => {
        const angle = (i / nodes.length) * Math.PI * 2;
        const radius = 2.5;
        return (
          <Float key={i} floatIntensity={1.5} speed={2}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle * 0.5) * 1, Math.sin(angle) * radius]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshPhysicalMaterial
                color={palette.blue}
                roughness={0.2}
                metalness={0.7}
                emissive={palette.blue}
                emissiveIntensity={0.4}
                transparent
                opacity={opacity}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// Scene 3: Speed - Racing Rings
function SpeedScene({ opacity, palette }: { opacity: number; palette: Palette }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = 2;
    
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.5 * speed;
      ring1.current.position.x = Math.sin(t * 0.5) * 0.5;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.7 * speed;
      ring2.current.position.y = Math.cos(t * 0.5) * 0.5;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.9 * speed;
      ring3.current.position.z = Math.sin(t * 0.7) * 0.5;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshPhysicalMaterial 
          color={palette.green} 
          emissive={palette.green} 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.5, 0.1, 16, 100]} />
        <meshPhysicalMaterial 
          color={palette.blue} 
          emissive={palette.blue} 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshPhysicalMaterial 
          color={palette.orange} 
          emissive={palette.orange} 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>
    </>
  );
}

// Scene 4: CTA - Converging Geometry
function CTAScene({ opacity, palette }: { opacity: number; palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(() => Array.from({ length: 12 }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.4;
    group.current.rotation.x = t * 0.2;
  });

  return (
    <group ref={group}>
      {shapes.map((_, i) => {
        const angle = (i / shapes.length) * Math.PI * 2;
        const radius = 3;
        const geometries = [
          <boxGeometry args={[0.4, 0.4, 0.4]} />,
          <sphereGeometry args={[0.25, 16, 16]} />,
          <octahedronGeometry args={[0.3]} />
        ];
        return (
          <Float key={i} floatIntensity={2} speed={1.5}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius, Math.cos(angle * 2) * 1]}>
              {geometries[i % 3]}
              <meshPhysicalMaterial
                color={[palette.blue, palette.purple, palette.green][i % 3]}
                roughness={0.2}
                metalness={0.8}
                emissive={[palette.blue, palette.purple, palette.green][i % 3]}
                emissiveIntensity={0.4}
                transparent
                opacity={opacity}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function HomeIntroScene() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const palette: Palette = resolvedTheme === "light"
    ? { blue: "#2563eb", purple: "#7c3aed", green: "#0ea5a8", orange: "#ea580c", fog: "#e6ebff", dir: "#4f46e5", pointA: "#7c3aed", pointB: "#2563eb" }
    : { blue: "#3b82f6", purple: "#8b5cf6", green: "#10b981", orange: "#f59e0b", fog: "#0b1220", dir: "#c7d2fe", pointA: "#8b5cf6", pointB: "#3b82f6" };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled through this section (0 to 1)
      const scrolled = -rect.top / (sectionHeight - windowHeight);
      const percent = Math.max(0, Math.min(1, scrolled));
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate which scene is active and their opacities
  const scene1Opacity = Math.max(0, Math.min(1, 1 - (scrollPercent - 0) * 4));
  const scene2Opacity = Math.max(0, Math.min(1, scrollPercent < 0.25 ? scrollPercent * 4 : 1 - (scrollPercent - 0.25) * 4));
  const scene3Opacity = Math.max(0, Math.min(1, scrollPercent < 0.5 ? (scrollPercent - 0.25) * 4 : 1 - (scrollPercent - 0.5) * 4));
  const scene4Opacity = Math.max(0, Math.min(1, (scrollPercent - 0.75) * 4));

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[400vh] overflow-hidden"
      style={{ background: resolvedTheme === "light" ? "linear-gradient(to bottom, #eef2ff 0%, #ffffff 100%)" : "linear-gradient(to bottom, #020617 0%, #1e293b 100%)" }}
    >
      {/* Canvas covers only the section */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ width: "100%", height: "100%", pointerEvents: "none", position: "absolute", left: 0, top: 0 }}
        >
          <color attach="background" args={[palette.fog]} />
          <fog attach="fog" args={[palette.fog, 10, 30]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color={palette.dir} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={palette.pointA} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color={palette.pointB} />
          <Environment preset="city" environmentIntensity={0.8} />
          {/* All scenes render simultaneously with opacity control */}
          <WelcomeScene opacity={scene1Opacity} palette={palette} />
          <AIScene opacity={scene2Opacity} palette={palette} />
          <SpeedScene opacity={scene3Opacity} palette={palette} />
          <CTAScene opacity={scene4Opacity} palette={palette} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.05}
            autoRotate={false}
          />
        </Canvas>
      </div>
      {/* Scrollable Content - All 4 sections */}
      <div className="relative z-10">
        {/* 1. Welcome */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl px-6 space-y-6">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl">
              Welcome to JETA
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-slate-800 dark:text-white/90 font-light max-w-3xl mx-auto">
              We help small developers and investors <span className="font-semibold text-blue-600 dark:text-blue-300">underwrite deals in seconds</span> with crystal-clear math and AI-powered insights.
            </p>
            <div className="inline-block px-6 py-2 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-md border border-slate-900/10 dark:border-white/20 text-slate-700 dark:text-white/80 text-sm">
              🏗️ Built for Real Estate Developers & Investors
            </div>
          </div>
        </div>
        {/* 2. AI Analysis */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl px-6 space-y-8">
            {/* ...section content... */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 dark:border-purple-400/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                🧠 AI-Powered Intelligence
              </div>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                AI-Powered Buildability Analysis
              </h3>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Our engine analyzes <span className="text-blue-600 dark:text-blue-300 font-semibold">zoning laws</span>, <span className="text-purple-600 dark:text-purple-300 font-semibold">comparable sales</span>, and <span className="text-green-600 dark:text-green-300 font-semibold">market risk</span> in real time.
              </p>
            </div>
            {/* ...decision cards... */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="p-6 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/10 border border-emerald-600/30 dark:border-emerald-400/30 backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">BUY</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Strong ROI potential</div>
              </div>
              <div className="p-6 rounded-2xl bg-amber-600/10 dark:bg-yellow-500/10 border border-amber-600/30 dark:border-yellow-400/30 backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-amber-700 dark:text-yellow-300 mb-2">MAYBE</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Needs deeper analysis</div>
              </div>
              <div className="p-6 rounded-2xl bg-rose-600/10 dark:bg-red-500/10 border border-rose-600/30 dark:border-red-400/30 backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-rose-700 dark:text-red-300 mb-2">PASS</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Risk outweighs reward</div>
              </div>
            </div>
          </div>
        </div>
        {/* ...Speed... */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl px-6 space-y-8">
            {/* ...section content... */}
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-600 text-sm font-bold mb-4">
                ⚡ Lightning Fast
              </div>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Fewer Clicks, Faster Answers
              </h3>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Spend time <span className="text-emerald-300 font-semibold">building</span>, not spreadsheeting. JETA gives you <span className="text-blue-300 font-semibold">speed</span>, <span className="text-purple-300 font-semibold">clarity</span>, and <span className="text-green-300 font-semibold">confidence</span>.
              </p>
            </div>
            {/* ...stats... */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm text-center hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">15-30s</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Per deal analysis</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm text-center hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">10×</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">More deals screened</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm text-center hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2">3</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Free reports/month</div>
              </div>
            </div>
          </div>
        </div>
        {/* 4. CTA */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl px-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Ready to Analyze Your Next Property?
              </h3>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Start making faster, smarter investment decisions today—no credit card required.
              </p>
            </div>
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 px-10 py-5 text-xl md:text-2xl font-bold text-white shadow-[0_20px_60px_-15px_rgba(99,102,241,0.6)] hover:shadow-[0_30px_80px_-15px_rgba(99,102,241,0.9)] hover:scale-110 transition-all duration-300"
            >
              <span>Analyze Free</span>
              <span className="text-sm font-normal opacity-90">→ 3 reports/month</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
              No credit card • Cancel anytime • Join 10,000+ developers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
