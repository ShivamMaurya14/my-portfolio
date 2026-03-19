// ============================================================
// Shivam Maurya — Portfolio  (single-file React component)
// Stack: React + Tailwind (via CDN) + Framer Motion + Three.js
// Paste into CodeSandbox / Vercel or run with Vite
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import * as THREE from "three";

// ── Palette tokens ──────────────────────────────────────────────
const C = {
  bg:       "#020408",
  bgCard:   "rgba(8,16,28,0.72)",
  border:   "rgba(0,255,200,0.12)",
  borderHi: "rgba(0,255,200,0.45)",
  cyan:     "#00ffc8",
  cyanDim:  "#00cc9e",
  purple:   "#a855f7",
  purpleDim:"#7c3aed",
  amber:    "#fbbf24",
  text:     "#e2e8f0",
  textMuted:"#64748b",
  textDim:  "#94a3b8",
};

// ── Global styles injected once ──────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${C.bg};
    color: ${C.text};
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: ${C.cyan}; border-radius: 2px; }

  /* Custom cursor */
  .cursor-dot {
    width: 8px; height: 8px;
    background: ${C.cyan};
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%,-50%);
    transition: transform 0.05s;
  }
  .cursor-ring {
    width: 36px; height: 36px;
    border: 1.5px solid ${C.cyan}88;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%,-50%);
    transition: all 0.12s ease;
  }

  .glow-cyan  { text-shadow: 0 0 20px ${C.cyan}88; }
  .glow-box   { box-shadow: 0 0 30px ${C.cyan}22, inset 0 0 30px ${C.cyan}06; }
  .glow-hover:hover { box-shadow: 0 0 50px ${C.cyan}33, 0 8px 32px rgba(0,0,0,0.6); }

  .glass {
    background: ${C.bgCard};
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);
    border: 1px solid ${C.border};
  }

  .grid-noise {
    background-image:
      linear-gradient(rgba(0,255,200,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,200,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .tag {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid ${C.border};
    background: rgba(0,255,200,0.06);
    color: ${C.cyan};
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .tag-purple {
    border-color: rgba(168,85,247,0.3);
    background: rgba(168,85,247,0.08);
    color: ${C.purple};
  }

  .tag-amber {
    border-color: rgba(251,191,36,0.3);
    background: rgba(251,191,36,0.08);
    color: ${C.amber};
  }

  section { padding: 100px 0; }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    color: ${C.cyan};
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    line-height: 1.1;
    color: #fff;
  }

  input, textarea {
    background: rgba(0,255,200,0.04);
    border: 1px solid ${C.border};
    border-radius: 10px;
    color: ${C.text};
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    padding: 12px 16px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus, textarea:focus { border-color: ${C.cyan}; }
  input::placeholder, textarea::placeholder { color: ${C.textMuted}; }
`;

// ══════════════════════════════════════════════════════════════
// 1. THREE.JS PARTICLE FIELD
// ══════════════════════════════════════════════════════════════
function ParticleField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 28;

    // ─ Particles ─
    const COUNT = 3200;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);

    const cCyan   = new THREE.Color(C.cyan);
    const cPurple = new THREE.Color(C.purple);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      speeds[i] = 0.002 + Math.random() * 0.006;
      const t = Math.random();
      const c = t < 0.6 ? cCyan.clone().lerp(cPurple, t / 0.6) : cPurple;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ─ Mouse parallax ─
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.003;

      const pos = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i];
        if (pos[i * 3 + 1] > 30) pos[i * 3 + 1] = -30;
      }
      geo.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.0006;
      particles.rotation.x = mouse.y * 0.06;
      particles.rotation.z = mouse.x * 0.04;

      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const W = el.clientWidth, H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute", inset: 0,
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}

// ══════════════════════════════════════════════════════════════
// 2. CUSTOM CURSOR
// ══════════════════════════════════════════════════════════════
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current)  { dotRef.current.style.left  = e.clientX + "px"; dotRef.current.style.top  = e.clientY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// 3. NAVBAR
// ══════════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About","Skills","Projects","Contact"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        background: scrolled ? "rgba(2,4,8,0.85)" : "transparent",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} style={{ cursor: "pointer" }}>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem",
          color: C.cyan, letterSpacing: "-0.02em",
        }}>
          SM<span style={{ color: "#fff" }}>.</span>
        </span>
      </motion.div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}
           className="desktop-nav">
        {links.map(l => (
          <motion.a
            key={l} href={`#${l.toLowerCase()}`}
            whileHover={{ color: C.cyan, y: -1 }}
            style={{ color: C.textDim, textDecoration: "none", fontSize: "0.9rem",
                     fontWeight: 500, transition: "color 0.2s", cursor: "pointer" }}
          >{l}</motion.a>
        ))}
        <motion.a
          href="/Shivam_Maurya_Resume.docx" download
          whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${C.cyan}55` }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "transparent",
            border: `1px solid ${C.cyan}`,
            color: C.cyan,
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.04em",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >Resume ↓</motion.a>
      </div>
    </motion.nav>
  );
}

// ══════════════════════════════════════════════════════════════
// 4. HERO
// ══════════════════════════════════════════════════════════════
function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[idx];
    let timeout;
    if (!del && text.length < w.length) {
      timeout = setTimeout(() => setText(w.slice(0, text.length + 1)), 70);
    } else if (!del && text.length === w.length) {
      timeout = setTimeout(() => setDel(true), 1800);
    } else if (del && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (del && text.length === 0) {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [text, del, idx, words]);

  return (
    <span style={{ color: C.cyan, fontFamily: "'DM Mono', monospace" }}>
      {text}<span style={{ animation: "blink 1s step-end infinite",
        borderRight: `2px solid ${C.cyan}`, marginLeft: 2 }} />
    </span>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y     = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const words = [
    "Automation & Robotics Engineer",
    "AI/ML Developer",
    "Embedded Systems Builder",
    "Agentic AI Enthusiast",
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }
  };

  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Grid bg */}
      <div className="grid-noise" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C.cyan}18 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* 3D Particles */}
      <ParticleField />

      {/* Content */}
      <motion.div
        style={{ y, opacity, position: "relative", zIndex: 10,
                 maxWidth: 900, margin: "0 auto", padding: "0 2rem", paddingTop: "80px" }}
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="section-label" style={{ marginBottom: 20 }}>
            // hello world
          </motion.p>

          <motion.h1 variants={item} style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
            fontWeight: 800, lineHeight: 1.08,
            color: "#fff", marginBottom: 16,
          }}>
            Hi, I'm{" "}
            <span style={{
              background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Shivam Maurya.</span>
          </motion.h1>

          <motion.div variants={item} style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 500, marginBottom: 20, minHeight: 40,
          }}>
            <TypeWriter words={words} />
          </motion.div>

          <motion.p variants={item} style={{
            fontSize: "1.05rem", color: C.textDim,
            maxWidth: 560, lineHeight: 1.75, marginBottom: 40,
          }}>
            Building intelligent systems — from teleoperated robotics and embedded
            sensor networks to AI-powered decision engines and voice-driven healthcare.
          </motion.p>

          <motion.div variants={item} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, boxShadow: `0 0 32px ${C.cyan}66` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.cyan, color: "#000",
                border: "none", borderRadius: 10,
                padding: "13px 32px", fontSize: "0.95rem", fontWeight: 700,
                textDecoration: "none", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
              }}
            >View My Work →</motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, borderColor: C.cyan,
                            boxShadow: `0 0 24px ${C.cyan}33` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: 10, color: C.text,
                padding: "13px 32px", fontSize: "0.95rem", fontWeight: 600,
                textDecoration: "none", cursor: "pointer",
                transition: "all 0.25s",
              }}
            >Contact Me</motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} style={{
            display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap",
          }}>
            {[
              { n: "40+", l: "Embedded Projects" },
              { n: "7",   l: "AI/ML Systems" },
              { n: "3",   l: "Hackathons" },
              { n: "2nd", l: "Year @ AIT" },
            ].map(s => (
              <div key={s.l}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.8rem", fontWeight: 800,
                  color: C.cyan, lineHeight: 1,
                }}>{s.n}</div>
                <div style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 10,
        }}
      >
        <span style={{ fontSize: "0.7rem", color: C.textMuted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${C.cyan}, transparent)` }} />
      </motion.div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// 5. REVEAL WRAPPER
// ══════════════════════════════════════════════════════════════
function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// 6. ABOUT
// ══════════════════════════════════════════════════════════════
function About() {
  const highlights = [
    { icon: "🎓", title: "AIT Pune", sub: "BE Automation & Robotics · 2024–2028" },
    { icon: "🤖", title: "Joint Secretary", sub: "Centre of Excellence for AI & Robotics" },
    { icon: "📡", title: "IoT & Embedded", sub: "40+ real-world Arduino/ESP32 projects" },
    { icon: "🧠", title: "AI/ML Developer", sub: "Healthcare, Finance & Industrial AI systems" },
  ];

  return (
    <section id="about">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <p className="section-label">// about me</p>
          <h2 className="section-title" style={{ marginBottom: 60 }}>
            Who I Am
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Text */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ color: C.textDim, lineHeight: 1.85, fontSize: "1.02rem" }}>
                I'm a <span style={{ color: C.cyan, fontWeight: 600 }}>2nd-year Automation & Robotics Engineering</span> student
                at Army Institute of Technology, Pune — building at the intersection of embedded hardware,
                intelligent software, and autonomous systems.
              </p>
              <p style={{ color: C.textDim, lineHeight: 1.85, fontSize: "1.02rem" }}>
                My work spans 40+ embedded projects using <span style={{ color: C.cyan }}>Arduino & ESP32</span>,
                AI/ML systems for healthcare diagnostics and financial decisioning, and full-stack
                voice AI platforms built with <span style={{ color: C.purple }}>LangGraph, Gemini, and Sarvam AI</span>.
              </p>
              <p style={{ color: C.textDim, lineHeight: 1.85, fontSize: "1.02rem" }}>
                Currently serving as <span style={{ color: C.amber }}>Joint Secretary of the CoE for AI & Robotics</span> at AIT,
                running workshops and mentoring peers — and teaching AI/ML & robotics as an independent tutor.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                {["Computer Vision","ROS 2","Agentic AI","IoT Protocols","Transfer Learning","LLMs"].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: C.cyanDim,
                                boxShadow: `0 0 30px ${C.cyan}22` }}
                  className="glass glow-hover"
                  style={{
                    borderRadius: 16, padding: "22px 18px",
                    display: "flex", flexDirection: "column", gap: 8,
                    transition: "all 0.25s",
                  }}
                >
                  <span style={{ fontSize: "1.6rem" }}>{h.icon}</span>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{h.title}</div>
                  <div style={{ fontSize: "0.8rem", color: C.textMuted, lineHeight: 1.4 }}>{h.sub}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// 7. SKILLS (Bento grid)
// ══════════════════════════════════════════════════════════════
const SKILLS = [
  {
    cat: "Languages",
    icon: "{ }",
    color: C.cyan,
    items: ["Python","C++ (Arduino/Embedded)","Bash","SQL"],
    span: "col-span-1",
  },
  {
    cat: "AI / ML Frameworks",
    icon: "🧠",
    color: C.purple,
    items: ["TensorFlow · Keras","Scikit-Learn · XGBoost","CNN · Transfer Learning","Pandas · NumPy"],
    span: "col-span-1",
  },
  {
    cat: "Agentic AI & LLMs",
    icon: "⚡",
    color: C.cyan,
    items: ["LangGraph · LangChain","Gemini · Llama 3.3 (Groq)","Pinecone · RAG Pipelines","Sarvam AI STT/TTS","Tavily · LlamaParse","ReAct Agents · HITL"],
    span: "col-span-2",
    wide: true,
  },
  {
    cat: "Embedded & IoT",
    icon: "📡",
    color: C.amber,
    items: ["Arduino · ESP32 · ESP8266","SIM800L GSM · AT Commands","MQTT · Firebase · Blynk","UART / I2C / SPI","Deep Sleep · EEPROM"],
    span: "col-span-2",
    wide: true,
  },
  {
    cat: "Sensors & Hardware",
    icon: "🔌",
    color: C.purple,
    items: ["DHT11/22 · MQ-135/2/7","PIR · HC-SR04 · Flame","ACS712 · Neo-6M GPS","RTC DS3231 · OLED/LCD"],
    span: "col-span-1",
  },
  {
    cat: "Web / Backend",
    icon: "🌐",
    color: C.cyan,
    items: ["FastAPI · Streamlit","REST APIs · Uvicorn","HTML5 · CSS3 · JS"],
    span: "col-span-1",
  },
];

function SkillCard({ skill, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const colMap = { C: C.cyan, P: C.purple, A: C.amber };
  const tagClass = skill.color === C.purple ? "tag tag-purple"
                 : skill.color === C.amber  ? "tag tag-amber"
                 : "tag";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -3, boxShadow: `0 0 40px ${skill.color}22` }}
      className="glass"
      style={{
        borderRadius: 18, padding: 24,
        gridColumn: skill.wide ? "span 2" : "span 1",
        transition: "all 0.25s",
        border: `1px solid ${skill.color}22`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: "1.2rem", fontFamily: "'DM Mono', monospace",
                       color: skill.color }}>{skill.icon}</span>
        <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff" }}>{skill.cat}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skill.items.map(it => (
          <span key={it} className={tagClass}>{it}</span>
        ))}
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ background: "rgba(0,255,200,0.012)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <p className="section-label">// technical skills</p>
          <h2 className="section-title" style={{ marginBottom: 48 }}>What I Work With</h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}>
          {SKILLS.map((s, i) => (
            <SkillCard key={s.cat} skill={s} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// 8. PROJECTS (Bento grid)
// ══════════════════════════════════════════════════════════════
const PROJECTS = [
  {
    name: "CREDI-MITRA",
    sub: "Autonomous AI Credit Appraisal Agent",
    desc: "5-phase agentic system using LangGraph ReAct pattern. Dual-brain design separates LLM orchestration (Llama 3.3) from deep financial analysis (Gemini 2.5 Pro). XGBoost 97% accuracy + RAG + HITL.",
    tags: ["LangGraph","Gemini 2.5 Pro","Pinecone RAG","XGBoost","Streamlit"],
    accent: C.cyan,
    size: "large",
    badge: "Hackathon 2026",
    emoji: "💳",
  },
  {
    name: "MedSarthi",
    sub: "Multilingual Voice Health Assistant",
    desc: "Real-time voice pipeline: browser mic → Sarvam STT → Gemini LLM → TTS. Supports Hindi, English & Indic languages. 4 on-device ML diagnostic models.",
    tags: ["FastAPI","Gemini API","Sarvam AI","TensorFlow","Xception"],
    accent: C.purple,
    size: "large",
    badge: "Full-Stack AI",
    emoji: "🏥",
  },
  {
    name: "MedSynapse",
    sub: "Multi-Disease Prediction Platform",
    desc: "4 diagnostic modules: Diabetes (98% acc), Heart Disease, Chest X-Ray CNN, Brain MRI Tumor (Xception, 4-class). Live Streamlit deployment.",
    tags: ["Scikit-Learn","Keras","Xception","Streamlit"],
    accent: C.purple,
    size: "medium",
    badge: "IIIT Pune Competition",
    emoji: "🩺",
    link: "https://dps-medisynapse.streamlit.app",
  },
  {
    name: "AMR Prediction",
    sub: "Antimicrobial Resistance · 99.27% Acc",
    desc: "Predicts IMIPENEM resistance from 4 cheaper antibiotics. 7 classifiers evaluated. Clinical treatment decision framework aligned with WHO/CLSI standards.",
    tags: ["Random Forest","XGBoost","Stratified K-Fold","Pandas"],
    accent: C.amber,
    size: "medium",
    badge: "CODECURE Hackathon",
    emoji: "🔬",
  },
  {
    name: "NanoTracker-24/7",
    sub: "Ultra-Low-Power Asset Tracker",
    desc: "99% deep-sleep duty cycle on ESP8266. GPS-free LBS cell-tower triangulation. OTA SMS config, dual telemetry, watchdog fail-safe.",
    tags: ["ESP8266","SIM800L","AT Commands","LBS","EEPROM"],
    accent: C.cyan,
    size: "medium",
    badge: "Embedded Hardware",
    emoji: "📡",
  },
  {
    name: "Predictive Maintenance",
    sub: "Industrial AI Dashboard",
    desc: "Random Forest >98% accuracy on AI4I 2020 sensor data. Dual-mode Streamlit: Manual Diagnostics + Fleet Monitoring (9+ machines).",
    tags: ["Random Forest","Feature Eng.","Streamlit","Scikit-Learn"],
    accent: C.amber,
    size: "medium",
    badge: "Live Deployed",
    emoji: "🏭",
    link: "https://predictive-maintenance-system-sm14.streamlit.app",
  },
  {
    name: "Robocon CNN",
    sub: "Box Real/Fake Classifier",
    desc: "3-block custom CNN for binary classification in ABU Robocon. Arena-captured training data for camera/lighting invariance. Confidence score output for robot autonomy.",
    tags: ["TensorFlow","Keras","CNN","Jupyter"],
    accent: C.purple,
    size: "small",
    badge: "ABU Robocon",
    emoji: "📦",
  },
  {
    name: "Arduino/ESP32 Suite",
    sub: "40+ Embedded Projects",
    desc: "Sensors · Home Automation · IoT · Robotics · Agriculture. Full spectrum from LDR street lights to LoRa mesh, Telegram bots, and solar trackers.",
    tags: ["Arduino","ESP32","MQTT","Firebase","Blynk"],
    accent: C.cyan,
    size: "small",
    badge: "Year 1 Foundation",
    emoji: "⚡",
  },
];

function ProjectCard({ proj, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const tagClass = proj.accent === C.purple ? "tag tag-purple"
                 : proj.accent === C.amber  ? "tag tag-amber"
                 : "tag";

  const gridCol = proj.size === "large"  ? "span 2"
                : proj.size === "medium" ? "span 1"
                : "span 1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      className="glass"
      style={{
        gridColumn: gridCol,
        borderRadius: 20, padding: 28,
        position: "relative", overflow: "hidden",
        cursor: "pointer",
        border: `1px solid ${hovered ? proj.accent + "55" : C.border}`,
        boxShadow: hovered ? `0 0 50px ${proj.accent}1a` : "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Glow orb */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              background: `radial-gradient(circle, ${proj.accent}22, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Badge */}
      <span className={tagClass} style={{ marginBottom: 16, display: "inline-block" }}>
        {proj.badge}
      </span>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <span style={{ fontSize: "1.8rem" }}>{proj.emoji}</span>
        <div>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800,
                       fontSize: "1.1rem", color: "#fff", marginBottom: 2 }}>
            {proj.name}
          </h3>
          <p style={{ fontSize: "0.78rem", color: proj.accent, fontWeight: 600 }}>
            {proj.sub}
          </p>
        </div>
      </div>

      <p style={{ color: C.textMuted, fontSize: "0.87rem", lineHeight: 1.7,
                  marginBottom: 16, marginTop: 8 }}>
        {proj.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {proj.tags.map(t => <span key={t} className={tagClass}>{t}</span>)}
      </div>

      {proj.link && (
        <motion.a
          href={proj.link} target="_blank" rel="noreferrer"
          whileHover={{ color: proj.accent }}
          style={{
            display: "inline-block", marginTop: 14,
            fontSize: "0.8rem", color: C.textMuted,
            fontFamily: "'DM Mono', monospace",
            textDecoration: "none", transition: "color 0.2s",
          }}
        >Live Demo →</motion.a>
      )}
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <p className="section-label">// selected projects</p>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            What I've Built
          </h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} proj={p} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// 9. CONTACT
// ══════════════════════════════════════════════════════════════
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire to your preferred service (EmailJS, Formspree, etc.)
    setSent(true);
  };

  const socials = [
    {
      label: "GitHub",
      handle: "@ShivamMaurya14",
      url: "https://github.com/ShivamMaurya14",
      icon: "⌨",
      color: C.cyan,
    },
    {
      label: "LinkedIn",
      handle: "shivammaurya14",
      url: "https://linkedin.com/in/shivammaurya14",
      icon: "💼",
      color: C.purple,
    },
    {
      label: "Email",
      handle: "shivammaurya14032005@gmail.com",
      url: "mailto:shivammaurya14032005@gmail.com",
      icon: "✉",
      color: C.amber,
    },
  ];

  return (
    <section id="contact" style={{ paddingBottom: 120 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
        <Reveal>
          <p className="section-label">// get in touch</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Let's Work Together</h2>
          <p style={{ color: C.textMuted, marginBottom: 52, fontSize: "1.02rem" }}>
            Open to collaborations, research projects, internships, and interesting conversations.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Form */}
          <Reveal delay={0.1}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass"
              style={{ borderRadius: 20, padding: 32,
                       display: "flex", flexDirection: "column", gap: 16 }}
            >
              <input
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
              <input
                type="email" placeholder="Email Address"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
              <textarea
                placeholder="Your message..."
                rows={5}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                required
              />
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: C.cyan, fontWeight: 600, fontSize: "0.9rem",
                             textAlign: "center", padding: "12px 0" }}
                  >
                    ✓ Message sent! I'll get back to you soon.
                  </motion.div>
                ) : (
                  <motion.button
                    key="btn"
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: `0 0 28px ${C.cyan}44` }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: C.cyan, color: "#000",
                      border: "none", borderRadius: 10,
                      padding: "13px", fontSize: "0.95rem", fontWeight: 700,
                      cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                    }}
                  >Send Message</motion.button>
                )}
              </AnimatePresence>
            </motion.form>
          </Reveal>

          {/* Social links */}
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url} target="_blank" rel="noreferrer"
                  whileHover={{ x: 6, borderColor: s.color + "88",
                                boxShadow: `0 0 28px ${s.color}22` }}
                  className="glass"
                  style={{
                    borderRadius: 14, padding: "18px 22px",
                    textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 16,
                    transition: "all 0.22s",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.92rem" }}>{s.label}</div>
                    <div style={{ color: s.color, fontSize: "0.78rem",
                                  fontFamily: "'DM Mono', monospace" }}>{s.handle}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: C.textMuted, fontSize: "1rem" }}>→</span>
                </motion.a>
              ))}

              {/* Location / availability */}
              <div className="glass" style={{
                borderRadius: 14, padding: "18px 22px", marginTop: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%",
                                 background: "#22c55e",
                                 boxShadow: "0 0 8px #22c55e",
                                 display: "inline-block" }} />
                  <span style={{ color: "#22c55e", fontSize: "0.82rem", fontWeight: 600 }}>
                    Available for Opportunities
                  </span>
                </div>
                <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.5 }}>
                  📍 Pune, India · Open to remote collaborations worldwide
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// 10. FOOTER
// ══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: "28px 2rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 12,
      maxWidth: 1100, margin: "0 auto",
    }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800,
                     fontSize: "1.1rem", color: C.cyan }}>
        SM<span style={{ color: "#fff" }}>.</span>
      </span>
      <span style={{ fontSize: "0.8rem", color: C.textMuted,
                     fontFamily: "'DM Mono', monospace" }}>
        © 2025 Shivam Maurya · Built with React + Framer Motion + Three.js
      </span>
      <span style={{ fontSize: "0.8rem", color: C.textMuted }}>
        shivammaurya14032005@gmail.com
      </span>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════
// 11. ROOT APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  // Inject global CSS once
  useEffect(() => {
    const id = "sm-global-style";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS + `
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          section { padding: 70px 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <CustomCursor />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
}
