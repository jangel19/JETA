import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "Learn the Pipeline",
    subtitle:
      "JETA is a trained algorithm for real estate investors. It turns your basic inputs into a transparent verdict: BUY, MAYBE, or PASS.",
    color: "#6366f1",
    objects: [
      { type: "sphere", color: "#3b82f6", position: [-2, 0.5, 0] },
      { type: "cube", color: "#8b5cf6", position: [2, -0.7, 0] },
      { type: "sphere", color: "#10b981", position: [0, 2, 0] },
    ],
  },
  {
    title: "KPIs — Metrics That Matter",
    subtitle:
      "15–30 sec to decision • 5–10× deals screened/wk • rehab ranges • ARV discipline",
    color: "#10b981",
    objects: [
      { type: "cube", color: "#f59e0b", position: [-2, 0, 1] },
      { type: "sphere", color: "#6366f1", position: [2, 1, -1] },
      { type: "sphere", color: "#8b5cf6", position: [0, -2, 0] },
    ],
  },
  {
    title: "How the Pipeline Works",
    subtitle:
      "Inputs • Comparable Analysis • Assumptions • Verdict & Metrics",
    color: "#f59e0b",
    objects: [
      { type: "sphere", color: "#3b82f6", position: [-2, 2, -0.5] },
      { type: "cube", color: "#10b981", position: [2, -2, 0.5] },
      { type: "cube", color: "#8b5cf6", position: [0, 0, 2] },
    ],
  },
  {
    title: "ARV, Rehab, Flip & Rental",
    subtitle:
      "Robust valuation • Editable rehab ranges • Profit & ROI • Cash Flow & NOI",
    color: "#8b5cf6",
    objects: [
      { type: "cube", color: "#6366f1", position: [-2, -2, 0] },
      { type: "sphere", color: "#10b981", position: [2, 2, -1] },
      { type: "cube", color: "#f59e0b", position: [0, 1.5, 0] },
    ],
  },
  {
    title: "Trust, Consistency, Shareability",
    subtitle:
      "Speed without sloppiness • Consistency beats emotion • Share-ready outputs",
    color: "#3b82f6",
    objects: [
      { type: "sphere", color: "#f59e0b", position: [0, 2, 2] },
      { type: "cube", color: "#6366f1", position: [-2, -1, 0] },
      { type: "sphere", color: "#8b5cf6", position: [2, -2, 0] },
    ],
  },
  {
    title: "Social Proof + CTA",
    subtitle:
      "User satisfaction • < 60 sec inputs • 2–3× iteration rate • Try JETA — 3 free reports",
    color: "#10b981",
    objects: [
      { type: "cube", color: "#3b82f6", position: [2, 0.5, 0] },
      { type: "sphere", color: "#8b5cf6", position: [-2, 0.5, 0] },
      { type: "sphere", color: "#f59e0b", position: [0, -2.2, -0.4] },
    ],
  },
];

function AnimatedScene({ sectionIndex }: { sectionIndex: number }) {
  const lights = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (lights.current) {
      lights.current.rotation.y = Math.sin(clock.getElapsedTime() / 3) * 0.2;
      lights.current.rotation.x = Math.cos(clock.getElapsedTime() / 2) * 0.2;
    }
  });

  return (
    <>
      <Environment preset="night" background />
      <fog attach="fog" args={["#11172b", 12, 30]} />
      <ambientLight intensity={0.3} color={SECTIONS[sectionIndex].color} />
      <group ref={lights}>
        <pointLight position={[6, 8, 8]} intensity={1.4} color="#FAF9F6" />
        <pointLight position={[-6, -8, -8]} intensity={0.85} color={SECTIONS[sectionIndex].color} />
        <spotLight position={[4, -8, 2]} color="#fff" intensity={0.7} angle={0.5} />
      </group>
      {SECTIONS[sectionIndex].objects.map((obj, i) => (
        <Float key={i} floatIntensity={0.8 + i * 0.08} rotationIntensity={0.25 + i * 0.03} speed={0.9 + i * 0.06}>
          <mesh position={obj.position} castShadow receiveShadow scale={1.2 + (i % 3) * 0.13}>
            {obj.type === "sphere" ? <sphereGeometry args={[0.8, 36, 18]} /> : <boxGeometry args={[1, 1, 1]} />}
            <meshPhysicalMaterial
              color={obj.color}
              clearcoat={0.4}
              metalness={0.6}
              roughness={0.32}
              transmission={0.15}
              ior={1.4}
              thickness={0.25}
              reflectivity={0.75}
              envMapIntensity={0.93}
              emissive={SECTIONS[sectionIndex].color}
              emissiveIntensity={0.17 + i * 0.07}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HowItWorksScene() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const scrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (!scrollDiv.current) return;
      const scrollTop = window.scrollY - scrollDiv.current.offsetTop;
      const vh = window.innerHeight;
      const idx = Math.min(SECTIONS.length - 1, Math.max(0, Math.floor(scrollTop / vh)));
      setSectionIdx(idx);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section ref={scrollDiv} className="relative w-full h-[600vh] overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }} style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
          <AnimatedScene sectionIndex={sectionIdx} />
          <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.07} autoRotate autoRotateSpeed={0.27} />
        </Canvas>
      </div>
      <div className="relative z-10">
        {SECTIONS.map((section, idx) => (
          <div
            key={section.title}
            className={`h-screen flex items-center justify-center transition duration-500`}
            style={{ opacity: sectionIdx === idx ? 1 : 0, pointerEvents: sectionIdx === idx ? "auto" : "none" }}
          >
            <div className="text-center max-w-2xl mx-auto bg-black/20 backdrop-blur-lg shadow-xl rounded-xl p-7 border border-slate-800">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent" style={{ color: section.color }}>
                {section.title}
              </h2>
              <p className="mb-6 text-lg text-slate-300">{section.subtitle}</p>
              {idx === SECTIONS.length - 1 && (
                <Link to="/analyze" className="inline-block font-semibold text-xl mt-8 px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white shadow hover:scale-105 transition">
                  Try JETA — 3 free reports
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

