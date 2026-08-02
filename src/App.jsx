
import React, { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);

  useEffect(() => {
    /* =========== CUSTOM CURSOR =========== */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let cx = 0, cy = 0, rx = 0, ry = 0;

    const handleMouseMove = e => {
      cx = e.clientX; cy = e.clientY;
      if (cursor) {
        cursor.style.left = cx + 'px'; 
        cursor.style.top = cy + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    let animFrame;
    function animRing() {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      if (ring) {
        ring.style.left = rx + 'px'; 
        ring.style.top = ry + 'px';
      }
      animFrame = requestAnimationFrame(animRing);
    }
    animRing();

    const interactables = document.querySelectorAll('a,button,.proj-card,.skill-card,.ach-card');
    const onEnter = () => {
      if(cursor) { cursor.style.width = '16px'; cursor.style.height = '16px'; }
      if(ring) { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'rgba(0,229,200,0.7)'; }
    };
    const onLeave = () => {
      if(cursor) { cursor.style.width = '10px'; cursor.style.height = '10px'; }
      if(ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(0,229,200,0.5)'; }
    };

    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    /* =========== SCROLL REVEAL =========== */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));

    /* =========== SKILL BARS ANIMATION =========== */
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.sk-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
          });
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

    /* =========== NAVBAR SCROLL =========== */
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.style.background = window.scrollY > 50 ? 'rgba(2,8,16,0.95)' : 'rgba(2,8,16,0.75)';
      }
    };
    window.addEventListener('scroll', handleScroll);

    /* =========== HERO TYPEWRITER =========== */
    const roles = [
      'Automation & Robotics Engineer',
      'Physical AI Developer',
      'ROS 2 Systems Engineer',
      'ML / Embedded Engineer'
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const roleEl = document.querySelector('.hero-role');
    let typeTimeout;
    function typeRole() {
      if (!roleEl) return;
      const current = '> ' + roles[roleIdx] + ' · ';
      if (!deleting) {
        charIdx++;
        roleEl.innerHTML = current.slice(0, charIdx);
        if (charIdx >= current.length) { deleting = true; typeTimeout = setTimeout(typeRole, 2000); return; }
      } else {
        charIdx--;
        roleEl.innerHTML = current.slice(0, charIdx);
        if (charIdx <= 2) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
      }
      typeTimeout = setTimeout(typeRole, deleting ? 40 : 80);
    }
    typeTimeout = setTimeout(typeRole, 1500);

    /* =========== CANVAS BACKGROUND =========== */
    const canvas = document.getElementById('bg-canvas');
    let ctx;
    let particles = [];
    let W, H;
    let drawFrame;
    if (canvas) {
      ctx = canvas.getContext('2d');
      const resize = () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '0,229,200' : '168,85,247',
          alpha: Math.random() * 0.5 + 0.1
        });
      }

      function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p, i) => {
          const dx = cx - p.x, dy = cy - p.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
            p.vx -= dx / dist * 0.05;
            p.vy -= dy / dist * 0.05;
          }
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.98; p.vy *= 0.98;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha + ')';
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx2 = p.x - q.x, dy2 = p.y - q.y;
            const d = Math.sqrt(dx2*dx2 + dy2*dy2);
            if (d < 100) {
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(0,229,200,' + (0.06 * (1 - d/100)) + ')';
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        });
        drawFrame = requestAnimationFrame(drawParticles);
      }
      drawParticles();
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
      if (drawFrame) cancelAnimationFrame(drawFrame);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(typeTimeout);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      

{/*  Custom cursor  */}
<div id="cursor"></div>
<div id="cursor-ring"></div>
<div className="noise"></div>

{/*  Canvas background  */}
<canvas id="bg-canvas"></canvas>

{/*  ===== NAV =====  */}
<nav id="navbar">
  <div className="nav-logo">SM<span>.</span></div>
  <div className="nav-links">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#achievements">Awards</a>
    <a href="#contact">Contact</a>
    
<div style={{ position: 'relative', display: 'inline-block' }}>
  <button className="nav-resume" onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)} style={{ cursor: 'pointer', background: 'transparent' }}>Resume ↗</button>
  {isResumeDropdownOpen && (
    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: 'var(--bg1)', border: '1px solid var(--cyan)', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px', zIndex: 100 }}>
      <a href="/Shivam_Maurya_AIML.pdf" download className="btn-ghost" style={{ fontSize: '11px', padding: '8px', textAlign: 'center', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }} onClick={() => setIsResumeDropdownOpen(false)}>AI / ML Resume</a>
      <a href="/Shivam_Maurya_Robotics_Engineer.pdf" download className="btn-ghost" style={{ fontSize: '11px', padding: '8px', textAlign: 'center', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }} onClick={() => setIsResumeDropdownOpen(false)}>Robotics Resume</a>
    </div>
  )}
</div>

  </div>
  <div className="hamburger" id="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
    <span></span><span></span><span></span>
  </div>
</nav>

{/*  ===== HERO =====  */}
<section id="hero">
  <div className="hero-glow-blob" style={{"width":"500px","height":"500px","background":"var(--cyan)","top":"-100px","right":"15%","opacity":"0.07"}}></div>
  <div className="hero-glow-blob" style={{"width":"400px","height":"400px","background":"var(--pur)","bottom":"10%","left":"-5%","opacity":"0.06"}}></div>
  <div className="hero-grid">
    <div className="hero-content">
      <div className="hero-badge">Available for Roles, Internships &amp; Collaboration</div>
      <div className="hero-name">Shivam Maurya</div>
      <div className="hero-role">&gt; Robotics Software Engineer · AI/ML Systems Developer</div>
      <p className="hero-sub">I build intelligent, full-stack systems — from autonomous ROS 2 navigation pipelines to agentic AI decision engines and on-device inference models.</p>
      <div className="hero-btns">
        <a href="#projects" className="btn-primary">View My Work</a>
        <a href="#contact" className="btn-ghost">Contact Me</a>
      </div>
      <div className="hero-stats">
        <div>
          <div className="hero-stat-num">30+ FPS</div>
          <div className="hero-stat-lbl">On-Device AI</div>
        </div>
        <div>
          <div className="hero-stat-num">15+</div>
          <div className="hero-stat-lbl">ROS 2 PRs Merged</div>
        </div>
        <div>
          <div className="hero-stat-num">100+</div>
          <div className="hero-stat-lbl">Cell Members Led</div>
        </div>
      </div>
    </div>
    <div className="hero-photo-wrap">
      <div className="hero-photo-ring2"></div>
      <div className="hero-photo-ring"></div>
      <div className="hero-photo-inner">
        <img className="hero-photo-img" src="/profile.jpg" alt="Shivam Maurya"/>
      </div>
    </div>
  </div>
</section>


<section id="about">
  <div className="about-grid reveal">
    <div>
      <div className="sec-tag">About Me</div>
      <h2 className="sec-title">Bridging<br /><span style={{"color":"var(--cyan)"}}>Robots</span> &amp; AI</h2>
      <div className="about-card" style={{"marginTop":"28px"}}>
        <div className="about-text">
          <p>I'm a <strong>pre-final year B.E. Automation &amp; Robotics Engineering</strong> student at <strong>Army Institute of Technology, Pune</strong>, serving as Joint Secretary of the <strong>Centre of Excellence for AI &amp; Robotics</strong>.</p>
          <p>My work lives at the intersection of physical systems and intelligence — I build robots that perceive, navigate, and act using <strong>ROS 2, Nav2, MoveIt 2</strong>, and on-device deep learning. I'm passionate about pushing AI out of the cloud and onto the edge.</p>
          <p>Beyond robotics, I design agentic AI systems with <strong>LangGraph + LLMs</strong>, and independently tutor AI/ML, ROS 2, and embedded systems to 100+ peers.</p>
        </div>
        <div className="info-chips">
          <span className="chip">Pune, India</span>
          <span className="chip">AIT · 2024–2028</span>
          <span className="chip">Joint Sec · CoE AI &amp; Robotics</span>
          <span className="chip">GSoC 2026 Applicant</span>
        </div>
      </div>
    </div>
    <div>
      <div className="sec-tag" style={{"marginTop":"56px"}}>Experience</div>
      <div style={{"marginTop":"20px"}} className="timeline">
        <div className="tl-item reveal reveal-delay-1">
          <div className="tl-dot-wrap"><div className="tl-dot"></div><div className="tl-line"></div></div>
          <div className="tl-content">
            <div className="tl-year">JUN 2025 · PRESENT</div>
            <div className="tl-title">Robotics &amp; AI Software Developer</div>
            <div className="tl-desc">Developed autonomous ROS 2 navigation stacks (Nav2, SLAM Toolbox, EKF) and MoveIt 2 motion pipelines for collision-aware picking. Deployed YOLO perception nodes achieving 30+ FPS inference on edge devices.</div>
          </div>
        </div>
        <div className="tl-item reveal reveal-delay-2">
          <div className="tl-dot-wrap"><div className="tl-dot"></div><div className="tl-line"></div></div>
          <div className="tl-content">
            <div className="tl-year">JUN 2025 · PRESENT</div>
            <div className="tl-title">Open-Source Contributor · ROS 2 Ecosystem</div>
            <div className="tl-desc">Shipped 15+ PRs to navigation2, ros2_control, and ros2_controllers. Fixed CI/build issues, enhanced real-time-safe documentation, and investigated initialization-strictness regressions.</div>
          </div>
        </div>
        <div className="tl-item reveal reveal-delay-3">
          <div className="tl-dot-wrap"><div className="tl-dot"></div></div>
          <div className="tl-content">
            <div className="tl-year">JUN 2024 · PRESENT</div>
            <div className="tl-title">Software Lead · Centre of Excellence for AI &amp; Robotics</div>
            <div className="tl-desc">Co-lead a 100+ member cell. Represented AIT at ABU Robocon. Organized workshops and deployed 4+ end-to-end ML pipelines for student research teams.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ===== SKILLS =====  */}
<section id="skills">
  <div className="skills-wrapper">
    <div className="reveal">
      <div className="sec-tag">Technical Skills</div>
      <h2 className="sec-title">My <span style={{"color":"var(--cyan)"}}>Stack</span></h2>
    </div>
    <div className="skills-bento">

      {/*  Robotics · wide  */}
      <div className="skill-card wide sk-c reveal reveal-delay-1">
        <div className="sk-icon">🤖</div>
        <div className="sk-cat">Robotics &amp; Autonomous Systems</div>
        <div className="sk-title">ROS 2 Full Stack</div>
        <div className="sk-tags">
          <span className="sk-tag">ROS 2 Humble</span>
          <span className="sk-tag">Nav2</span>
          <span className="sk-tag">MoveIt 2</span>
          <span className="sk-tag">SLAM Toolbox</span>
          <span className="sk-tag">Gazebo</span>
          <span className="sk-tag">RViz2</span>
          <span className="sk-tag">URDF/XACRO</span>
          <span className="sk-tag">tf2</span>
          <span className="sk-tag">ros2_control</span>
          <span className="sk-tag">Nav2 BT</span>
          <span className="sk-tag">OMPL</span>
          <span className="sk-tag">DWB Planner</span>
          <span className="sk-tag">micro-ROS</span>
        </div>
      </div>

      {/*  Languages  */}
      <div className="skill-card sk-c reveal reveal-delay-2">
        <div className="sk-icon">💻</div>
        <div className="sk-cat">Languages</div>
        <div className="sk-title">Core Languages</div>
        <div className="sk-bar-wrap">
          <div className="sk-bar-row">
            <div className="sk-bar-label">C++ (primary)</div>
            <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="90" style={{"width":"0%"}}></div></div>
            <div className="sk-bar-pct">90</div>
          </div>
          <div className="sk-bar-row">
            <div className="sk-bar-label">Python</div>
            <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="92" style={{"width":"0%"}}></div></div>
            <div className="sk-bar-pct">92</div>
          </div>
          <div className="sk-bar-row">
            <div className="sk-bar-label">Bash</div>
            <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="70" style={{"width":"0%"}}></div></div>
            <div className="sk-bar-pct">70</div>
          </div>
          <div className="sk-bar-row">
            <div className="sk-bar-label">SQL</div>
            <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="65" style={{"width":"0%"}}></div></div>
            <div className="sk-bar-pct">65</div>
          </div>
        </div>
      </div>

      {/*  AI / ML  */}
      <div className="skill-card sk-p reveal reveal-delay-1">
        <div className="sk-icon">🧠</div>
        <div className="sk-cat">AI &amp; Deep Learning</div>
        <div className="sk-title">ML / DL Stack</div>
        <div className="sk-tags">
          <span className="sk-tag">TensorFlow</span>
          <span className="sk-tag">Keras</span>
          <span className="sk-tag">PyTorch</span>
          <span className="sk-tag">Scikit-Learn</span>
          <span className="sk-tag">XGBoost</span>
          <span className="sk-tag">ONNX Runtime</span>
          <span className="sk-tag">CNN</span>
          <span className="sk-tag">Xception TL</span>
          <span className="sk-tag">YOLO</span>
          <span className="sk-tag">Pandas</span>
          <span className="sk-tag">NumPy</span>
        </div>
      </div>

      {/*  Perception  */}
      <div className="skill-card sk-c reveal reveal-delay-2">
        <div className="sk-icon">👁️</div>
        <div className="sk-cat">Robot Perception</div>
        <div className="sk-title">Sensors &amp; Vision</div>
        <div className="sk-tags">
          <span className="sk-tag">OpenCV</span>
          <span className="sk-tag">LiDAR</span>
          <span className="sk-tag">Depth Camera</span>
          <span className="sk-tag">Point Cloud (PCL)</span>
          <span className="sk-tag">Sensor Fusion</span>
          <span className="sk-tag">Camera Calibration</span>
          <span className="sk-tag">Real-Time Inference</span>
        </div>
      </div>

      {/*  Agentic AI · wide  */}
      <div className="skill-card wide sk-p reveal reveal-delay-3">
        <div className="sk-icon">⚡</div>
        <div className="sk-cat">Agentic AI &amp; LLMs</div>
        <div className="sk-title">LLM Orchestration</div>
        <div className="sk-tags">
          <span className="sk-tag">LangGraph</span>
          <span className="sk-tag">LangChain</span>
          <span className="sk-tag">Gemini 2.5 Pro</span>
          <span className="sk-tag">ReAct Agents</span>
          <span className="sk-tag">RAG Pipelines</span>
          <span className="sk-tag">Pinecone</span>
          <span className="sk-tag">FastAPI</span>
          <span className="sk-tag">Streamlit</span>
        </div>
      </div>

      {/*  Embedded  */}
      <div className="skill-card sk-a reveal reveal-delay-1">
        <div className="sk-icon">📡</div>
        <div className="sk-cat">Embedded &amp; IoT</div>
        <div className="sk-title">Hardware Stack</div>
        <div className="sk-tags">
          <span className="sk-tag">Arduino</span>
          <span className="sk-tag">ESP32</span>
          <span className="sk-tag">ESP8266</span>
          <span className="sk-tag">SIM800L GSM</span>
          <span className="sk-tag">UART/I2C/SPI</span>
          <span className="sk-tag">Motor Drivers</span>
          <span className="sk-tag">MQTT</span>
          <span className="sk-tag">Firebase</span>
        </div>
      </div>

      {/*  Tools  */}
      <div className="skill-card sk-a reveal reveal-delay-2">
        <div className="sk-icon">🛠️</div>
        <div className="sk-cat">Tools &amp; DevOps</div>
        <div className="sk-title">Dev Environment</div>
        <div className="sk-tags">
          <span className="sk-tag">Git / GitHub</span>
          <span className="sk-tag">Docker</span>
          <span className="sk-tag">CMake / colcon</span>
          <span className="sk-tag">Linux (Ubuntu)</span>
          <span className="sk-tag">VS Code</span>
          <span className="sk-tag">Jupyter</span>
          <span className="sk-tag">Google Colab</span>
        </div>
      </div>

    </div>
  </div>
</section>

{/*  ===== PROJECTS =====  */}
<section id="projects">
  <div className="projects-wrapper">
    <div className="reveal">
      <div className="sec-tag">Featured Work</div>
      <h2 className="sec-title">Projects</h2>
      <p className="sec-sub">From autonomous robots navigating GPS-denied spaces to agentic AI systems making clinical decisions.</p>
    </div>
    <div className="proj-bento">

      {/*  1. AGV Nav2  */}
      <div className="proj-card feat reveal reveal-delay-1">
        <div className="proj-top">
          <div className="proj-icon ic-c">🚗</div>
          <span className="proj-badge bd-c">Robotics · Navigation</span>
        </div>
        <div className="proj-title">Autonomous Ground Vehicle · Nav2 Stack</div><a href="https://github.com/ShivamMaurya14" target="_blank" className="proj-link" title="GitHub">↗</a>
        <div className="proj-desc">Deployed a full Nav2 navigation stack (global/local costmaps, DWB local planner, recovery Behavior Trees) on a differential-drive robot, with SLAM Toolbox for real-time 2D LiDAR mapping and a robot_localization EKF for GPS-denied localization.</div>
        <div style={{display:"flex", gap:"32px", margin:"12px 0"}}>
          <div><div className="proj-stat">ROS 2</div><div className="proj-stat-lbl">Humble</div></div>
          <div><div className="proj-stat">EKF</div><div className="proj-stat-lbl">Sensor Fusion</div></div>
          <div><div className="proj-stat">LiDAR</div><div className="proj-stat-lbl">SLAM Toolbox</div></div>
        </div>
        <div className="proj-stack">
          <span className="proj-tech">ROS 2</span><span className="proj-tech">Nav2</span><span className="proj-tech">C++</span><span className="proj-tech">Python</span><span className="proj-tech">robot_localization</span>
        </div>
      </div>

      {/*  2. Robotic Arm  */}
      <div className="proj-card reveal reveal-delay-2">
        <div className="proj-top">
          <div className="proj-icon ic-p">🦾</div>
          <span className="proj-badge bd-p">Robotics · Manipulation</span>
        </div>
        <div className="proj-title">6-DOF Robotic Arm</div>
        <div className="proj-desc">MoveIt 2 pipeline (OMPL RRT*) for collision-aware trajectory planning, with CNN-based grasp-pose estimation from depth-camera input driving approach → grasp → lift → place execution via ros2_control.</div>
        <div className="proj-stack">
          <span className="proj-tech">ROS 2</span><span className="proj-tech">MoveIt 2</span><span className="proj-tech">ros2_control</span><span className="proj-tech">OMPL</span>
        </div>
      </div>

      {/*  3. Credi-Mitra  */}
      <div className="proj-card reveal reveal-delay-3">
        <div className="proj-top">
          <div className="proj-icon ic-a">💳</div>
          <span className="proj-badge bd-a">Agentic AI</span>
        </div>
        <div className="proj-title">Credi-Mitra</div>
        <div className="proj-desc">Built a multi-agent, LangGraph-orchestrated pipeline autonomously evaluating loan applications with 97% accuracy, minimizing manual underwriting steps. Runner-up, Hackathon 2026.</div>
        <div className="proj-stack">
          <span className="proj-tech">LangGraph</span><span className="proj-tech">LangChain</span><span className="proj-tech">XGBoost</span><span className="proj-tech">Streamlit</span>
        </div>
      </div>

      {/*  4. Perception Node  */}
      <div className="proj-card reveal reveal-delay-1">
        <div className="proj-top">
          <div className="proj-icon ic-c">👁️</div>
          <span className="proj-badge bd-c">Robotics · Vision</span>
        </div>
        <div className="proj-title">Real-Time Perception Pipeline</div>
        <div className="proj-desc">Built a modular ROS 2 perception node with hot-swappable YOLO/CNN backends exported to ONNX for 30+ FPS CPU-only inference. Validated live in ABU Robocon.</div>
        <div className="proj-stack">
          <span className="proj-tech">ROS 2</span><span className="proj-tech">YOLO</span><span className="proj-tech">ONNX</span><span className="proj-tech">TensorFlow</span>
        </div>
      </div>

      {/*  5. MedSynapse  */}
      <div className="proj-card reveal reveal-delay-2">
        <div className="proj-top">
          <div className="proj-icon ic-p">🩺</div>
          <span className="proj-badge bd-p">AI/ML</span>
        </div>
        <div className="proj-title">MedSynapse</div>
        <div className="proj-desc">Trained an Xception transfer-learning model for 4-class brain MRI tumor classification, achieving production-grade diagnostic accuracy. Exported to ONNX.</div>
        <div className="proj-stack">
          <span className="proj-tech">TensorFlow</span><span className="proj-tech">Xception</span><span className="proj-tech">Keras</span><span className="proj-tech">Streamlit</span>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ===== ACHIEVEMENTS ===== */}
<section id="achievements">
  <div className="ach-wrapper">
    <div className="reveal">
      <div className="sec-tag">Recognition</div>
      <h2 className="sec-title">Achievements</h2>
    </div>
    <div className="ach-grid">
      <div className="ach-card reveal reveal-delay-1">
        <div className="ach-medal">🥇</div>
        <div className="ach-title">CODECURE Hackathon 2025 (Track B)</div>
        <div className="ach-desc">Top submission at IIT BHU. AMR prediction system achieving 99.27% accuracy with WHO/CLSI-aligned clinical decision framework.</div>
      </div>
      <div className="ach-card reveal reveal-delay-2">
        <div className="ach-medal">🏆</div>
        <div className="ach-title">IIIT Pune "Thinking Machines" 2025</div>
        <div className="ach-desc">MedSynapse multi-disease AI platform selected for the Diagnostic Tools track. Live-deployed with 4 integrated ML/DL models.</div>
      </div>
      <div className="ach-card reveal reveal-delay-3">
        <div className="ach-medal">🤖</div>
        <div className="ach-title">ABU Robocon 2025/26</div>
        <div className="ach-desc">Led software architecture and real-time CNN-based vision deployment for the AIT competition robot.</div>
      </div>
      <div className="ach-card reveal reveal-delay-1">
        <div className="ach-medal">🥈</div>
        <div className="ach-title">Hackathon 2026 Runner-Up</div>
        <div className="ach-desc">Credi-Mitra agentic AI credit appraisal system — 97% XGBoost accuracy, deployed live on Streamlit Cloud.</div>
      </div>
      <div className="ach-card reveal reveal-delay-2">
        <div className="ach-medal">🌐</div>
        <div className="ach-title">Open-Source Contributor</div>
        <div className="ach-desc">15+ merged PRs across core ROS 2 repositories including navigation2, ros2_control, and ros2_controllers.</div>
      </div>
      <div className="ach-card reveal reveal-delay-3">
        <div className="ach-medal">🎓</div>
        <div className="ach-title">Software Lead</div>
        <div className="ach-desc">Leading AIT's AI &amp; Robotics research cell with 100+ members. Organising workshops, hackathons, and technical sprints.</div>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div className="contact-wrapper">
    <div className="reveal">
      <div className="sec-tag" style={{"justifyContent":"center"}}>Get In Touch</div>
      <div className="contact-card">
        <div className="contact-big">Let's Build Something<br /><span style={{"color":"var(--cyan)"}}>Intelligent.</span></div>
        <p className="contact-sub">Open to internships, research collaborations, open-source contributions, and robotics/AI projects. I respond fast.</p>

        {/*  Contact Form  */}
        <form id="contact-form" onsubmit="sendEmail(event)" style={{"marginTop":"32px","display":"flex","flexDirection":"column","gap":"14px","textAlign":"left"}}>
          <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px"}}>
            <div>
              <label style={{"fontFamily":"var(--mono)","fontSize":"11px","letterSpacing":"0.1em","color":"var(--mid)","display":"block","marginBottom":"6px","textTransform":"uppercase"}}>Name</label>
              <input id="cf-name" type="text" placeholder="Your name" required
                style={{"width":"100%","background":"rgba(255,255,255,0.04)","border":"1px solid var(--bdr)","borderRadius":"8px","padding":"12px 16px","color":"var(--text)","fontFamily":"var(--syne)","fontSize":"14px","outline":"none","transition":"border-color 0.2s"}}
                onfocus="this.style.borderColor='rgba(0,229,200,0.4)'" onblur="this.style.borderColor='var(--bdr)'"/>
            </div>
            <div>
              <label style={{"fontFamily":"var(--mono)","fontSize":"11px","letterSpacing":"0.1em","color":"var(--mid)","display":"block","marginBottom":"6px","textTransform":"uppercase"}}>Email</label>
              <input id="cf-email" type="email" placeholder="your@email.com" required
                style={{"width":"100%","background":"rgba(255,255,255,0.04)","border":"1px solid var(--bdr)","borderRadius":"8px","padding":"12px 16px","color":"var(--text)","fontFamily":"var(--syne)","fontSize":"14px","outline":"none","transition":"border-color 0.2s"}}
                onfocus="this.style.borderColor='rgba(0,229,200,0.4)'" onblur="this.style.borderColor='var(--bdr)'"/>
            </div>
          </div>
          <div>
            <label style={{"fontFamily":"var(--mono)","fontSize":"11px","letterSpacing":"0.1em","color":"var(--mid)","display":"block","marginBottom":"6px","textTransform":"uppercase"}}>Message</label>
            <textarea id="cf-msg" rows="4" placeholder="Tell me about your project, collaboration idea, or just say hi..." required
              style={{"width":"100%","background":"rgba(255,255,255,0.04)","border":"1px solid var(--bdr)","borderRadius":"8px","padding":"12px 16px","color":"var(--text)","fontFamily":"var(--syne)","fontSize":"14px","outline":"none","transition":"border-color 0.2s","resize":"vertical","minHeight":"110px"}}
              onfocus="this.style.borderColor='rgba(0,229,200,0.4)'" onblur="this.style.borderColor='var(--bdr)'"></textarea>
          </div>
          <button type="submit"
            style={{"padding":"14px 32px","background":"var(--cyan)","color":"#020810","fontWeight":"700","fontSize":"14px","border":"none","borderRadius":"8px","cursor":"pointer","fontFamily":"var(--syne)","letterSpacing":"0.04em","transition":"box-shadow 0.25s,transform 0.2s","alignSelf":"flex-start"}}
            onmouseover="this.style.boxShadow='0 0 30px rgba(0,229,200,0.5)';this.style.transform='translateY(-2px)'"
            onmouseout="this.style.boxShadow='none';this.style.transform='none'">
            Send Message →
          </button>
        </form>

        <div className="contact-links" style={{"marginTop":"28px","paddingTop":"28px","borderTop":"1px solid var(--bdr)"}}>
          <a href="mailto:shivammaurya14032005@gmail.com" className="contact-link-btn email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Email Me
          </a>
          <a href="https://github.com/ShivamMaurya14" target="_blank" className="contact-link-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub ↗
          </a>
          <a href="https://linkedin.com/in/shivammaurya14" target="_blank" className="contact-link-btn pur">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn ↗
          </a>
          
<div style={{ position: 'relative', display: 'inline-block' }}>
  <button onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)} className="contact-link-btn" style={{ borderColor: 'rgba(0,229,200,0.3)', background: 'var(--cg2)', color: 'var(--cyan)', cursor: 'pointer' }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
    Download Resumes
  </button>
  {isResumeDropdownOpen && (
    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '12px', background: 'var(--bg1)', border: '1px solid var(--cyan)', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px', zIndex: 100 }}>
      <a href="/Shivam_Maurya_AIML.pdf" download className="btn-ghost" style={{ fontSize: '11px', padding: '8px', textAlign: 'center', display: 'block' }} onClick={() => setIsResumeDropdownOpen(false)}>AI / ML Resume</a>
      <a href="/Shivam_Maurya_Robotics_Engineer.pdf" download className="btn-ghost" style={{ fontSize: '11px', padding: '8px', textAlign: 'center', display: 'block' }} onClick={() => setIsResumeDropdownOpen(false)}>Robotics Resume</a>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  </div>
</section>

{/*  ===== FOOTER =====  */}
<footer>
  <div className="footer-terminal">
    <div className="footer-dot"></div>
    <span style={{"fontFamily":"var(--mono)","fontSize":"12px","color":"var(--dim)"}}>shivam@ait-pune:~$ <span style={{"color":"var(--cyan)"}}>./build_future.sh</span></span>
  </div>
  <span>© 2026 Shivam Maurya · Built with passion &amp; coffee ☕</span>
</footer>



    </>
  );
}
