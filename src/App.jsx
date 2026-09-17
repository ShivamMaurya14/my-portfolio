import React, { useState, useEffect } from 'react';
import './index.css';

const PROJECTS = [
  {
    id: 'multiarm',
    cat: 'robotics',
    icon: '🦾',
    badge: 'Robotics · Manipulation',
    title: 'MultiArm Pick-and-Place Workcell',
    subtitle: '3× UR10e + Robotiq 2F-140 · ROS 2 Jazzy & MoveIt 2',
    points: [
      'Engineered a 3× UR10e + 2F-140 workcell executing autonomous sequential workpiece relays (Station A → B → C → D).',
      'Configured isolated /robot{1..3} MoveIt 2 namespaces with unified workcell state publisher to eliminate multi-RSP TF collisions.',
      'Authored custom PickPlace.action server with S-curve Cartesian trajectory generation; runs identically in RViz, Isaac Sim & Gazebo Harmonic.',
      'Calibrated precise Robotiq 2F-140 mimic joint kinematics (0.400 rad for 60 mm cube) with custom Cartesian interpolator.',
      'Engineered robust task manager explicitly handling single-arm MoveIt namespaces, TF ownership, and relay handoffs.'
    ],
    stats: [
      { val: '3× UR10e', lbl: 'Workcell' },
      { val: '0.40 rad', lbl: 'Grasp Calib' },
      { val: 'Jazzy', lbl: 'ROS 2 Stack' }
    ],
    stack: ['ROS 2 Jazzy', 'MoveIt 2', 'Isaac Sim', 'Gazebo Harmonic', 'OMPL', 'C++ / Python'],
    repo: 'https://github.com/ShivamMaurya14/MultiArm-Pick-and-Place',
    live: null,
    feat: true
  },
  {
    id: 'realfake',
    cat: 'perception',
    icon: '👁️',
    badge: 'Perception · High-Throughput CV',
    title: 'RealFake Robocon Perception Node',
    subtitle: '257 FPS (3.89 ms) CPU Inference · ONNX Runtime',
    points: [
      'Engineered production ROS 2 perception node powering real-time arena manipulation for ABU Robocon.',
      'Achieved 257 FPS (3.89 ms latency) on CPU via ONNX Runtime with hot-swappable YOLOv8 & CNN backends.',
      'Autonomous decision engine mapping classifications into discrete /pick_cmd actions with live Flask HUD.',
      'Decision engine safely maps real vs fake objects into actionable commands (PICK_REAL, REJECT_FAKE, ALIGN_CENTER).',
      'Includes comprehensive pytest validation suite and runs efficiently without requiring GPU hardware.'
    ],
    stats: [
      { val: '257 FPS', lbl: 'CPU Inference' },
      { val: '3.89 ms', lbl: 'Latency' },
      { val: 'ONNX', lbl: 'Runtime Engine' }
    ],
    stack: ['ROS 2', 'ONNX Runtime', 'YOLOv8', 'OpenCV', 'Python', 'Pytest'],
    repo: 'https://github.com/ShivamMaurya14/RealFake-Classifier-Robocon',
    live: null,
    feat: true
  },
  {
    id: 'credi-mitra',
    cat: 'agentic',
    icon: '💳',
    badge: 'Agentic AI · FinTech',
    title: 'Credi-Mitra Autonomous Credit Appraisal',
    subtitle: '5-Phase LangGraph Engine · LlamaParse & HITL Governance',
    points: [
      'National Hackathon 2026 Runner-Up: autonomous 5-phase corporate loan appraisal and CAM generation system.',
      'Orchestrated multi-page financial PDF parsing via LlamaParse, live web due-diligence via Tavily, and XGBoost scoring.',
      'Enforced strict Human-in-the-Loop (HITL) review gates between extraction, risk evaluation, and loan sanctioning.',
      'Engineered an end-to-end autonomous pipeline generating comprehensive Credit Appraisal Memos (CAM) for corporate underwriting.',
      'Integrated RAG architecture to cross-reference multi-page PDF financials against live legal and web due-diligence data.'
    ],
    stats: [
      { val: 'Runner-Up', lbl: 'Hackathon 2026' },
      { val: '5 Phases', lbl: 'LangGraph FSM' },
      { val: 'HITL', lbl: 'Approval Gates' }
    ],
    stack: ['LangGraph', 'LlamaParse', 'Tavily Search', 'XGBoost', 'Pinecone', 'FastAPI'],
    repo: 'https://github.com/ShivamMaurya14/Credi-Mitra',
    live: null,
    feat: true
  },
  {
    id: 'med-sarthi',
    cat: 'agentic',
    icon: '🎙️',
    badge: 'Agentic AI · Indic Voice Healthcare',
    title: 'Med-Sarthi Indic Voice Clinical Triage',
    subtitle: 'Sarvam AI (STT/TTS) + Gemini 2.5 · Multilingual OPD Intake',
    points: [
      'Multilingual conversational voice clinical triage assistant supporting Hindi, Tamil, and English for hospital OPDs.',
      'Voice-to-voice loop: Sarvam Speech-to-Text → Gemini conversational clinical intake reasoning → Sarvam Text-to-Speech.',
      'Deterministic medical guardrails: non-prescriptive intake, red-flag emergency detection, and structured doctor summaries.',
      'Deployed on Railway with WebSocket streaming for ultra-low latency real-time patient interactions.',
      'Designed prompt boundaries to ensure the AI strictly gathers symptoms without issuing premature medical diagnoses.'
    ],
    stats: [
      { val: '3 Languages', lbl: 'Hindi/Tamil/Eng' },
      { val: 'Voice-to-Voice', lbl: 'Sarvam + Gemini' },
      { val: 'Live Demo', lbl: 'Railway Deployed' }
    ],
    stack: ['Sarvam AI', 'Google Gemini', 'FastAPI', 'WebSockets', 'Railway'],
    repo: 'https://github.com/ShivamMaurya14/Med-Sarthi',
    live: 'https://medsarthi-production.up.railway.app',
    feat: true
  },
  {
    id: 'motor-interface',
    cat: 'robotics',
    icon: '⚡',
    badge: 'Robotics · Hardware Interface',
    title: 'ros2_control Motor Interface',
    subtitle: 'Dual-Mode STM32 Actuation · >1 kHz Binary UART & Micro-ROS',
    points: [
      'Modular ros2_control SystemInterface hardware plugin providing low-latency velocity and position control on STM32.',
      'Mode A transmits 16-byte binary frames with CRC8 checksum over UART DMA targeting >1 kHz control loops.',
      'Mode B runs native XRCE-DDS Micro-ROS over serial; includes mock hardware fallback for zero-board simulation.'
    ],
    stats: [
      { val: '>1 kHz', lbl: 'Target Rate' },
      { val: 'CRC8', lbl: 'Checksum' },
      { val: 'Dual-Mode', lbl: 'UART / Micro-ROS' }
    ],
    stack: ['ros2_control', 'C++17', 'Micro-ROS', 'STM32', 'UART DMA', 'FreeRTOS'],
    repo: 'https://github.com/ShivamMaurya14/Motor_interface',
    live: null,
    feat: false
  },
  {
    id: 'rosnav',
    cat: 'robotics',
    icon: '🚗',
    badge: 'Robotics · Navigation',
    title: 'rosnav Autonomous Navigation Stack',
    subtitle: 'Decoupled Nav2 Architecture · Differential Drive Autonomy',
    points: [
      'Production-ready Nav2 navigation stack engineered to avoid monolithic bringup failures on differential-drive robots.',
      'Independent lifecycle management for Map Server, AMCL, NavFn global planner, and DWB local controller.',
      'Integrates rolling local costmaps, 360° 2D LiDAR SLAM, and custom recovery Behavior Trees for GPS-denied spaces.'
    ],
    stats: [
      { val: 'Nav2', lbl: 'Lifecycle Stack' },
      { val: '2D LiDAR', lbl: 'SLAM Toolbox' },
      { val: 'DWB', lbl: 'Local Controller' }
    ],
    stack: ['ROS 2 Humble', 'Nav2', 'Gazebo', 'SLAM Toolbox', 'AMCL', 'BehaviorTree.CPP'],
    repo: 'https://github.com/ShivamMaurya14/rosnav',
    live: null,
    feat: false
  },
  {
    id: 'robocon-cear',
    cat: 'robotics',
    icon: '🏆',
    badge: 'Robotics · Systems & Kinematics',
    title: 'ABU Robocon 2026 Robot Engineering',
    subtitle: 'Team CEAR Stage-I Design Packet · AIR < 20',
    points: [
      'Stage-I mechanical and autonomous engineering design packet for Team CEAR at ABU Robocon 2026.',
      'Complete SolidWorks & Fusion 360 CAD for R1 & R2 competition robots, planetary drive base, and vertical lifting.',
      'Rigorous actuator torque sizing, dynamic acceleration calculations, center-of-mass balance, and arena playbook.'
    ],
    stats: [
      { val: 'AIR < 20', lbl: 'Robocon 2026' },
      { val: 'CAD + Calcs', lbl: 'SolidWorks' },
      { val: '2 Robots', lbl: 'R1 & R2 Fleet' }
    ],
    stack: ['Fusion 360', 'SolidWorks', 'ROS 2', 'Kinematics', 'Actuator Sizing'],
    repo: 'https://github.com/ShivamMaurya14/Robocon-Team-CEAR',
    live: null,
    feat: false
  },
  {
    id: 'road-defect',
    cat: 'perception',
    icon: '🛣️',
    badge: 'Perception · Multi-Modal Inspection',
    title: 'Road Defect & Crack Segmentation',
    subtitle: 'Dual-Stage YOLOv8 + U-Net · Live GPS Dashcam Telemetry',
    points: [
      'Multi-modal infrastructure inspection combining YOLOv8 for pothole detection + U-Net for pavement crack segmentation.',
      'Synchronizes live NMEA GPS sentences, embedding coordinates, vehicle speed, and defect severity into burned MP4 output.',
      'Interactive web dashboard with Leaflet GIS mapping and municipal survey report generation.'
    ],
    stats: [
      { val: 'Dual-Stage', lbl: 'YOLOv8 + U-Net' },
      { val: 'GPS Sync', lbl: 'NMEA Telemetry' },
      { val: 'Leaflet', lbl: 'GIS Web Export' }
    ],
    stack: ['YOLOv8', 'U-Net', 'PyTorch', 'Flask', 'OpenCV', 'Leaflet.js'],
    repo: 'https://github.com/ShivamMaurya14/Road-Defect-Detector',
    live: null,
    feat: false
  },
  {
    id: 'pcb-fault',
    cat: 'perception',
    icon: '🔍',
    badge: 'Perception · Industrial QC',
    title: 'PCB Fault Detector & AOI System',
    subtitle: 'Automated Optical Inspection · YOLOv8 & Barcode Traceability',
    points: [
      'Automated optical inspection (AOI) pipeline detecting missing components, solder bridges, and misalignments.',
      'Real-time defect localization from industrial webcams paired with QR/barcode scanning for PCB serial traceability.',
      'FastAPI microservice backend providing automated CSV audit logging and annotated defect snapshot capture.'
    ],
    stats: [
      { val: 'Real-Time', lbl: 'AOI Inspection' },
      { val: 'QR / Barcode', lbl: 'Traceability' },
      { val: 'FastAPI', lbl: 'REST & Webhook' }
    ],
    stack: ['YOLOv8', 'OpenCV', 'FastAPI', 'PyZbar', 'Python'],
    repo: 'https://github.com/ShivamMaurya14/PCB-Fault-Detector',
    live: null,
    feat: false
  },
  {
    id: 'medsynapse',
    cat: 'agentic',
    icon: '🩺',
    badge: 'Clinical AI · Diagnostic Suite',
    title: 'MedSynapse Integrated Clinical Workbench',
    subtitle: 'Xception Deep Learning · IIIT Pune Finalist',
    points: [
      'Selected for IIIT Pune Thinking Machines 2025: unified multi-disease diagnostic clinical platform.',
      'Trained an Xception transfer-learning model for 4-class brain MRI tumor classification exported to ONNX.',
      'Integrates OCR intake for 13+ lab biomarkers alongside pneumonia CXR detection and cardiac/diabetes ensembles.'
    ],
    stats: [
      { val: 'Finalist', lbl: 'IIIT Pune 2025' },
      { val: '4-Class MRI', lbl: 'Xception ONNX' },
      { val: '13+ Biomarkers', lbl: 'OCR Intake' }
    ],
    stack: ['TensorFlow', 'Xception', 'ONNX', 'FastAPI', 'React', 'Tesseract OCR'],
    repo: 'https://github.com/ShivamMaurya14/MedSynapse',
    live: null,
    feat: false
  },
  {
    id: 'credit-risk',
    cat: 'ml',
    icon: '📊',
    badge: 'Applied ML · Predictive Risk',
    title: 'CreditRisk Default Predictor',
    subtitle: 'Cost-Sensitive Model on 307k Loans · 91.5% Recall, AUC 0.887',
    points: [
      'Production-grade default prediction engine trained on 307,511 Home Credit loan records.',
      'Asymmetric cost-sensitive optimization at 0.40 threshold, achieving 91.5% default recall and 0.887 ROC-AUC.',
      '125 engineered features with serialized RobustScaler pipelines, FastAPI microservices, and SHAP explainability.'
    ],
    stats: [
      { val: '91.5%', lbl: 'Default Recall' },
      { val: '0.887', lbl: 'ROC-AUC' },
      { val: '307k', lbl: 'Loan Records' }
    ],
    stack: ['Scikit-Learn', 'Random Forest', 'FastAPI', 'SHAP', 'RobustScaler', 'Docker'],
    repo: 'https://github.com/ShivamMaurya14/CreditRisk_Predictor',
    live: null,
    feat: false
  },
  {
    id: 'amr-predictor',
    cat: 'ml',
    icon: '🔬',
    badge: 'Applied ML · Bioinformatics',
    title: 'Antibiotic Resistance Predictor (AMR)',
    subtitle: 'Top Submission IIT BHU CODECURE 2025 · Macro-F1 0.80',
    points: [
      'Top Submission, CODECURE Hackathon 2025 (IIT BHU): clinical machine learning framework predicting IMIPENEM resistance.',
      'Formulated in compliance with WHO and CLSI guidelines using standard, low-cost AST panel biomarkers.',
      'Evaluated under severe class imbalance, achieving macro-F1 0.80 with Random Forest, XGBoost, and SMOTE.'
    ],
    stats: [
      { val: 'Top Submission', lbl: 'IIT BHU 2025' },
      { val: '0.80', lbl: 'Macro-F1' },
      { val: 'WHO / CLSI', lbl: 'Guideline Compliant' }
    ],
    stack: ['Scikit-Learn', 'XGBoost', 'SMOTE', 'Pandas', 'Clinical AST Data'],
    repo: 'https://github.com/ShivamMaurya14/Antibiotic-Resistance-Predictor',
    live: null,
    feat: false
  },
  {
    id: 'iiot-anomaly',
    cat: 'ml',
    icon: '🏭',
    badge: 'Edge IoT & ML · Predictive Maintenance',
    title: 'Industrial IoT Anomaly Digital Twin',
    subtitle: 'ESP32 Telemetry · 5 Failure Modes · Streamlit Live',
    points: [
      'Predictive maintenance (PdM) digital twin trained on the AI4I industrial machine dataset.',
      'Ingests real-time ESP32 edge sensor telemetry over REST, classifying into 5 distinct machine failure modes.',
      'Interactive Streamlit web dashboard with MTBF countdowns, automated downtime warnings, and telemetry trends.'
    ],
    stats: [
      { val: '5 Failure Modes', lbl: 'Multi-Class PdM' },
      { val: 'ESP32 Edge', lbl: 'Live Ingestion' },
      { val: 'Live Demo', lbl: 'Streamlit Cloud' }
    ],
    stack: ['ESP32', 'Random Forest', 'FastAPI', 'Streamlit', 'Plotly', 'Pandas'],
    repo: 'https://github.com/ShivamMaurya14/Industrial-IoT-Anomaly-Detector',
    live: 'https://pms-shivam-maurya.streamlit.app',
    feat: false
  },
  {
    id: 'nanotracker',
    cat: 'ml',
    icon: '📡',
    badge: 'Embedded & Hardware · Asset Tracking',
    title: 'NanoTracker Cellular Asset Monitor',
    subtitle: 'ESP8266 + SIM800L GSM · 99% Deep-Sleep Duty Cycle',
    points: [
      'Ultra-low-power cellular telemetry hardware operating reliably without GPS receiver power draw.',
      'Triangulates GSM Location-Based Services (LBS) cell tower IDs (LAC/CID) via AT commands on a 99% deep-sleep duty cycle.',
      'Dual SMS operating modes: continuous low-latency TRACK mode and power-optimized SAVE mode with EEPROM recovery.'
    ],
    stats: [
      { val: '99%', lbl: 'Deep-Sleep Cycle' },
      { val: 'GSM LBS', lbl: 'Cell Triangulation' },
      { val: 'Zero GPS', lbl: 'Low-Power Node' }
    ],
    stack: ['ESP8266', 'SIM800L GSM', 'C/C++', 'AT Commands', 'EEPROM', 'Hardware'],
    repo: 'https://github.com/ShivamMaurya14/NanoTracker',
    live: null,
    feat: false
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects', count: 14 },
  { id: 'robotics', label: 'Robotics & Controls', count: 4 },
  { id: 'perception', label: 'Perception & Vision', count: 3 },
  { id: 'agentic', label: 'Agentic AI & Healthcare', count: 3 },
  { id: 'ml', label: 'Applied ML & IoT', count: 4 }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

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

    /* =========== SCROLL REVEAL (Section Level) =========== */
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
        if (window.scrollY > 50) {
          navbar.style.background = 'rgba(2,8,16,0.9)';
          navbar.style.borderBottom = '1px solid rgba(0,229,200,0.2)';
        } else {
          navbar.style.background = 'rgba(2,8,16,0.75)';
          navbar.style.borderBottom = '1px solid var(--bdr)';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    const roles = [
      'Robotics Engineer',
      'AI / ML Engineer',
      'Autonomous Systems Engineer',
      'Computer Vision & Perception Engineer',
      'ROS 2 & Controls Engineer'
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

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === activeFilter);

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
      <div className="noise"></div>

      {/* Canvas background */}
      <canvas id="bg-canvas"></canvas>

      {/* ===== NAV ===== */}
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
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: 'var(--bg1)', border: '1px solid var(--cyan)', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '170px', zIndex: 100 }}>
                <a href="/Shivam_Maurya_AIML.pdf" download className="btn-ghost" style={{ fontSize: '13.2px', padding: '9px 12px', textAlign: 'center', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }} onClick={() => setIsResumeDropdownOpen(false)}>AI / ML Resume</a>
                <a href="/Shivam_Maurya_Robotics_Engineer.pdf" download className="btn-ghost" style={{ fontSize: '13.2px', padding: '9px 12px', textAlign: 'center', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }} onClick={() => setIsResumeDropdownOpen(false)}>Robotics Resume</a>
              </div>
            )}
          </div>
        </div>
        <div className="hamburger" id="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero">
        <div className="hero-glow-blob" style={{ width: "500px", height: "500px", background: "var(--cyan)", top: "-100px", right: "15%", opacity: "0.07" }}></div>
        <div className="hero-glow-blob" style={{ width: "400px", height: "400px", background: "var(--pur)", bottom: "10%", left: "-5%", opacity: "0.06" }}></div>
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">Available for Roles, Internships &amp; Collaboration</div>
            <h1 className="hero-name">Shivam Maurya</h1>
            <div className="hero-role" style={{ minHeight: '35px' }}>&gt; Robotics Engineer · </div>
            <p className="hero-sub" style={{ fontSize: '18px' }}>
              Pursuing B.E. Automation &amp; Robotics at AIT Pune ('28) · Physical AI Intern at Nextup Robotics · Software Lead at CEAR. I build full-stack autonomous systems — from <code>ros2_control</code> hardware interfaces up through Nav2, MoveIt 2, and high-throughput edge perception.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">Explore All 14 Projects</a>
              <a href="#contact" className="btn-ghost">Get In Touch</a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">15+</div>
                <div className="hero-stat-lbl">ROS 2 PRs Merged</div>
              </div>
              <div>
                <div className="hero-stat-num">14</div>
                <div className="hero-stat-lbl">Shipped Projects</div>
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
              <img
                src="/hero.jpg"
                alt="Shivam Maurya"
                className="hero-photo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/profile.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about">
        <div className="about-wrapper" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal">
            <div className="sec-tag">Identity &amp; Background</div>
            <h2 className="sec-title">About <span style={{ color: "var(--cyan)" }}>Me</span></h2>
          </div>
          <div className="about-grid reveal reveal-delay-1">

            {/* Left Card: Core Narrative & Engineering Pillars */}
            <div className="about-card">
              <div className="about-text">
                <p>
                  I am a <strong>Robotics Software &amp; Applied AI Engineer</strong> based in Pune, India, currently pursuing my B.E. in Automation &amp; Robotics Engineering at the <strong>Army Institute of Technology (AIT), Pune (2024–2028)</strong>.
                </p>
                <p>
                  My engineering philosophy focuses on building verified, deterministic autonomous systems from bare-metal hardware interfaces up to distributed cloud decision engines:
                </p>
              </div>

              <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--cyan)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>🦾 Autonomous Manipulation &amp; Digital Twins</div>
                  <div style={{ fontSize: '14.9px', color: 'var(--mid)', lineHeight: 1.65 }}>Architected a 3× UR10e + Robotiq 2F-140 workcell in ROS 2 Jazzy, MoveIt 2, and NVIDIA Isaac Sim with namespaced motion planners and custom S-curve pick-and-place action relay (A→B→C→D).</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>🚗 Mobile Autonomy &amp; Lifecycle Nav2</div>
                  <div style={{ fontSize: '14.9px', color: 'var(--mid)', lineHeight: 1.65 }}>Engineered decoupled Nav2 architectures with explicit lifecycle control, SLAM Toolbox 2D LiDAR mapping, AMCL, and custom recovery Behavior Trees.</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>👁️ High-Throughput Edge Perception</div>
                  <div style={{ fontSize: '14.9px', color: 'var(--mid)', lineHeight: 1.65 }}>Engineered vision pipelines executing at <strong style={{color: 'var(--cyan)'}}>257 FPS (3.89 ms)</strong> on CPU using ONNX Runtime for ABU Robocon arena manipulation.</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>⚡ Low-Level Motor Control &amp; Hardware Interfaces</div>
                  <div style={{ fontSize: '14.9px', color: 'var(--mid)', lineHeight: 1.65 }}>Authored <code>ros2_control</code> <code>SystemInterface</code> plugins with binary CRC8 UART (&gt;1 kHz target) and Micro-ROS modes on STM32.</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '5px' }}>🧠 Agentic AI &amp; Applied Machine Learning</div>
                  <div style={{ fontSize: '14.9px', color: 'var(--mid)', lineHeight: 1.65 }}>Built 5-phase LangGraph credit appraisal engines with HITL gates, multilingual Indic clinical voice triage, and CLSI-aligned AMR predictors.</div>
                </div>
              </div>

              <div className="info-chips">
                <span className="chip">Lead @ CEAR (100+ Members)</span>
                <span className="chip">15+ Merged ROS 2 PRs</span>
                <span className="chip">ABU Robocon AIR &lt; 20</span>
                <span className="chip">National Hackathon Runner-Up</span>
              </div>
            </div>

            {/* Right Card: Leadership & Timeline */}
            <div className="about-card">
              <div style={{ fontSize: '16px', fontFamily: 'var(--mono)', letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '22px' }}>
                // Career &amp; Leadership Milestones
              </div>

              <div className="timeline">
                <div className="tl-item">
                  <div className="tl-dot-wrap">
                    <div className="tl-dot"></div>
                    <div className="tl-line"></div>
                  </div>
                  <div className="tl-content">
                    <div className="tl-year">RECENT · PRESENT</div>
                    <div className="tl-title">Physical AI Intern</div>
                    <div style={{ fontSize: '14.3px', color: 'var(--cyan)', marginBottom: '5px' }}>Nextup Robotics</div>
                    <div className="tl-desc">Implementing NVIDIA Cosmos foundational world models for physical AI and robotics. Engineering state-of-the-art Vision-Language-Action (VLA) pipelines for embodied intelligence and scalable autonomy.</div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot-wrap">
                    <div className="tl-dot"></div>
                    <div className="tl-line"></div>
                  </div>
                  <div className="tl-content">
                    <div className="tl-year">JUN 2024 · PRESENT</div>
                    <div className="tl-title">Software Lead · Centre of Excellence for AI &amp; Robotics</div>
                    <div style={{ fontSize: '14.3px', color: 'var(--cyan)', marginBottom: '5px' }}>Army Institute of Technology (AIT), Pune</div>
                    <div className="tl-desc">Lead 100+ student researchers across competitive robotics, autonomous navigation sprints, and applied AI. Engineered vision and kinematics packets for ABU Robocon 2026 (All India Rank &lt; 20).</div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot-wrap">
                    <div className="tl-dot"></div>
                    <div className="tl-line"></div>
                  </div>
                  <div className="tl-content">
                    <div className="tl-year">2024 · PRESENT</div>
                    <div className="tl-title">Core Open-Source Contributor · ROS 2 Ecosystem</div>
                    <div style={{ fontSize: '14.3px', color: 'var(--cyan)', marginBottom: '5px' }}>navigation2 · ros2_control · ros2_controllers · moveit2</div>
                    <div className="tl-desc">15+ merged pull requests addressing controller lifecycle management, hardware interface configurations, and navigation behavior trees in core open-source repositories.</div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot-wrap">
                    <div className="tl-dot"></div>
                    <div className="tl-line"></div>
                  </div>
                  <div className="tl-content">
                    <div className="tl-year">2024 · 2028 (EXPECTED)</div>
                    <div className="tl-title">B.E. in Automation &amp; Robotics Engineering</div>
                    <div style={{ fontSize: '14.3px', color: 'var(--cyan)', marginBottom: '5px' }}>Army Institute of Technology (AIT), Pune</div>
                    <div className="tl-desc">Comprehensive engineering coursework in Robot Kinematics, Dynamics, Control Systems, Real-Time Systems, Embedded Systems, and Deep Learning.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills">
        <div className="skills-wrapper">
          <div className="reveal">
            <div className="sec-tag">Technical Proficiency</div>
            <h2 className="sec-title">Skills &amp; <span style={{ color: "var(--cyan)" }}>Tooling</span></h2>
            <p className="sec-sub">Systematically structured technical stack across autonomous robotics, perception, agentic AI, and embedded hardware.</p>
          </div>
          <div className="skills-bento">

            {/* 1. Robotics & Simulation (Wide, span 2) */}
            <div className="skill-card wide sk-c reveal reveal-delay-1">
              <div className="sk-icon">🤖</div>
              <div className="sk-cat">Core Autonomy · Manipulation · Digital Twins</div>
              <div className="sk-title">Robotics &amp; Simulation (ROS 2 Stack)</div>
              <div style={{ fontSize: '14.9px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Full-stack ROS 2 architecture from hardware interfaces and simulation bridges to multi-arm motion planning and autonomous mobile navigation.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'var(--bdr2)', color: 'var(--cyan)' }}>ROS 2 Jazzy</span>
                <span className="sk-tag" style={{ borderColor: 'var(--bdr2)', color: 'var(--cyan)' }}>ROS 2 Humble</span>
                <span className="sk-tag">Nav2 Lifecycle</span>
                <span className="sk-tag">MoveIt 2</span>
                <span className="sk-tag">NVIDIA Isaac Sim</span>
                <span className="sk-tag">Gazebo Harmonic</span>
                <span className="sk-tag">ros2_control</span>
                <span className="sk-tag">Micro-ROS</span>
                <span className="sk-tag">SLAM Toolbox</span>
                <span className="sk-tag">AMCL</span>
                <span className="sk-tag">DWB Controller</span>
                <span className="sk-tag">URDF / Xacro</span>
                <span className="sk-tag">TF2 Transforms</span>
                <span className="sk-tag">OMPL (RRTConnect / RRT*)</span>
                <span className="sk-tag">BehaviorTree.CPP</span>
              </div>
            </div>

            {/* 2. Perception & Edge Vision (Span 1) */}
            <div className="skill-card sk-c reveal reveal-delay-2">
              <div className="sk-icon">👁️</div>
              <div className="sk-cat">Real-Time Vision &amp; Sensors</div>
              <div className="sk-title">Perception &amp; Edge Vision</div>
              <div style={{ fontSize: '14.9px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Sub-4ms CPU inference, object detection, and multi-modal spatial perception.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'var(--bdr2)', color: 'var(--cyan)' }}>ONNX Runtime (257 FPS)</span>
                <span className="sk-tag">YOLOv8 / v11</span>
                <span className="sk-tag">OpenCV</span>
                <span className="sk-tag">U-Net Segmentation</span>
                <span className="sk-tag">Xception DL</span>
                <span className="sk-tag">2D / 3D LiDAR</span>
                <span className="sk-tag">Sensor Fusion (EKF)</span>
                <span className="sk-tag">Point Cloud (PCL)</span>
              </div>
            </div>

            {/* 3. Agentic AI & Applied ML (Wide, span 2) */}
            <div className="skill-card wide sk-p reveal reveal-delay-1">
              <div className="sk-icon">🧠</div>
              <div className="sk-cat">Multi-Agent FSMs · Clinical Voice · Predictive Modeling</div>
              <div className="sk-title">Agentic AI &amp; Applied Machine Learning</div>
              <div style={{ fontSize: '14.9px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Production multi-agent orchestrations with strict Human-in-the-Loop governance, multilingual Indic clinical voice intake, and cost-sensitive tabular risk modeling.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'rgba(168,85,247,0.3)', color: 'var(--pur)' }}>LangGraph Multi-Agent</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(168,85,247,0.3)', color: 'var(--pur)' }}>Google Gemini 2.5</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(168,85,247,0.3)', color: 'var(--pur)' }}>Sarvam AI (Indic STT/TTS)</span>
                <span className="sk-tag">LlamaParse</span>
                <span className="sk-tag">Pinecone Vector DB</span>
                <span className="sk-tag">Tavily Search API</span>
                <span className="sk-tag">Scikit-Learn</span>
                <span className="sk-tag">XGBoost / LightGBM</span>
                <span className="sk-tag">SHAP Interpretability</span>
                <span className="sk-tag">PyTorch</span>
                <span className="sk-tag">TensorFlow</span>
              </div>
            </div>

            {/* 4. Embedded Systems & Hardware (Span 1) */}
            <div className="skill-card sk-a reveal reveal-delay-2">
              <div className="sk-icon">📡</div>
              <div className="sk-cat">Microcontrollers &amp; Protocols</div>
              <div className="sk-title">Embedded &amp; IoT Hardware</div>
              <div style={{ fontSize: '14.9px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Deterministic serial buses, motor actuation, and deep-sleep telemetry nodes.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--amb)' }}>STM32 (UART DMA)</span>
                <span className="sk-tag">ESP32 / ESP8266</span>
                <span className="sk-tag">SIM800L GSM</span>
                <span className="sk-tag">Binary CRC8 Protocols</span>
                <span className="sk-tag">FreeRTOS</span>
                <span className="sk-tag">Arduino</span>
                <span className="sk-tag">I2C / SPI / CAN</span>
              </div>
            </div>

            {/* 5. Core Languages (Span 1) */}
            <div className="skill-card sk-c reveal reveal-delay-1">
              <div className="sk-icon">💻</div>
              <div className="sk-cat">Systems Programming</div>
              <div className="sk-title">Languages</div>
              <div className="sk-bar-wrap">
                <div className="sk-bar-row">
                  <div className="sk-bar-label">C++17 / 20</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="92" style={{ width: "92%" }}></div></div>
                  <div className="sk-bar-pct">92%</div>
                </div>
                <div className="sk-bar-row">
                  <div className="sk-bar-label">Python 3</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="94" style={{ width: "94%" }}></div></div>
                  <div className="sk-bar-pct">94%</div>
                </div>
                <div className="sk-bar-row">
                  <div className="sk-bar-label">Bash Shell</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="75" style={{ width: "75%" }}></div></div>
                  <div className="sk-bar-pct">75%</div>
                </div>
                <div className="sk-bar-row">
                  <div className="sk-bar-label">Modern SQL</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="70" style={{ width: "70%" }}></div></div>
                  <div className="sk-bar-pct">70%</div>
                </div>
              </div>
            </div>

            {/* 6. DevOps, Tooling & CAD (Wide, span 2) */}
            <div className="skill-card wide sk-a reveal reveal-delay-2">
              <div className="sk-icon">🛠️</div>
              <div className="sk-cat">Infrastructure · Microservices · Mechanical Design</div>
              <div className="sk-title">DevOps, Tooling &amp; Engineering CAD</div>
              <div style={{ fontSize: '14.9px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Reproducible robotics development workflows, containerized microservices, and competition CAD engineering.
              </div>
              <div className="sk-tags">
                <span className="sk-tag">Git &amp; GitHub Actions</span>
                <span className="sk-tag">Docker Containerization</span>
                <span className="sk-tag">colcon &amp; CMake</span>
                <span className="sk-tag">Linux (Ubuntu 22.04 / 24.04)</span>
                <span className="sk-tag">FastAPI &amp; Flask</span>
                <span className="sk-tag">Streamlit Dashboarding</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--amb)' }}>SolidWorks</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--amb)' }}>Autodesk Fusion 360</span>
                <span className="sk-tag">Pytest Validation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects">
        <div className="projects-wrapper">
          <div className="reveal">
            <div className="sec-tag">Authentic Portfolio</div>
            <h2 className="sec-title">Shipped <span style={{ color: "var(--cyan)" }}>Projects</span></h2>
            <p className="sec-sub">
              14 production repositories spanning multi-arm UR10e robotics, &gt;1 kHz motor interfaces, 257 FPS edge vision, and LangGraph agentic AI. Filter by domain below.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="proj-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`proj-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="filter-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Projects Bento Grid */}
          <div className="proj-bento">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className={`proj-card ${p.feat ? 'feat' : ''}`}
              >
                <div className="proj-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="proj-icon">{p.icon}</div>
                    <span className="proj-badge">{p.badge}</span>
                  </div>
                  <div className="proj-actions">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-live-badge" title="Live Deployment">
                        ● Live App ↗
                      </a>
                    )}
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="proj-link-icon" title="GitHub Repository">
                      ↗
                    </a>
                  </div>
                </div>

                <div className="proj-title">{p.title}</div>
                <div className="proj-subtitle">{p.subtitle}</div>
                
                {/* Crisp Point-Wise Highlights */}
                <ul className="proj-points">
                  {p.points.map((point, pi) => (
                    <li key={pi} className="proj-point">
                      <span className="proj-point-dot"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics row */}
                <div style={{ display: "flex", gap: "20px", margin: "14px 0 10px 0", borderTop: '1px solid var(--bdr)', borderBottom: '1px solid var(--bdr)', padding: '10px 0' }}>
                  {p.stats.map((s, si) => (
                    <div key={si}>
                      <div className="proj-stat">{s.val}</div>
                      <div className="proj-stat-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="proj-stack">
                  {p.stack.map((tech, ti) => (
                    <span key={ti} className="proj-tech">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section id="achievements">
        <div className="ach-wrapper">
          <div className="reveal">
            <div className="sec-tag">Proven Impact</div>
            <h2 className="sec-title">Awards &amp; <span style={{ color: "var(--cyan)" }}>Recognitions</span></h2>
          </div>
          <div className="ach-grid">
            <div className="ach-card reveal reveal-delay-1">
              <div className="ach-medal">🥇</div>
              <div className="ach-title">Top Submission — CODECURE 2025 (Track B)</div>
              <div className="ach-desc">IIT BHU Hackathon. Developed WHO/CLSI-aligned antibiotic resistance predictor achieving macro-F1 0.80 on heavily imbalanced clinical isolate datasets.</div>
            </div>
            <div className="ach-card reveal reveal-delay-2">
              <div className="ach-medal">🏆</div>
              <div className="ach-title">Finalist — IIIT Pune "Thinking Machines" 2025</div>
              <div className="ach-desc">MedSynapse diagnostic workbench selected for Diagnostic Tools Track with 4 integrated ML models and Xception brain MRI classifier.</div>
            </div>
            <div className="ach-card reveal reveal-delay-3">
              <div className="ach-medal">🤖</div>
              <div className="ach-title">All India Rank &lt; 20 — ABU Robocon 2026</div>
              <div className="ach-desc">Led Team CEAR Stage-I mechanical and kinematics design packet; authored production ONNX vision node executing at 257 FPS on CPU.</div>
            </div>
            <div className="ach-card reveal reveal-delay-1">
              <div className="ach-medal">🥈</div>
              <div className="ach-title">Runner-Up — National Hackathon 2026</div>
              <div className="ach-desc">Credi-Mitra 5-phase agentic corporate credit appraisal engine with LangGraph state machine, LlamaParse extraction, and HITL governance.</div>
            </div>
            <div className="ach-card reveal reveal-delay-2">
              <div className="ach-medal">🌐</div>
              <div className="ach-title">15+ Merged PRs — Core ROS 2 Repositories</div>
              <div className="ach-desc">Active open-source contributor across navigation2, ros2_control, ros2_controllers, and moveit2 codebases.</div>
            </div>
            <div className="ach-card reveal reveal-delay-3">
              <div className="ach-medal">🎓</div>
              <div className="ach-title">Software Lead — Centre of Excellence for AI &amp; Robotics</div>
              <div className="ach-desc">Elected software leader for 100+ member research cell at AIT Pune, orchestrating competitive robotics and research delivery.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact">
        <div className="contact-wrapper">
          <div className="reveal">
            <div className="sec-tag" style={{ justifyContent: "center" }}>Get In Touch</div>
            <div className="contact-card">
              <div className="contact-big">Let's Build Something<br /><span style={{ color: "var(--cyan)" }}>Autonomous &amp; Intelligent.</span></div>
              <p className="contact-sub">
                Open to Robotics Software, Perception, Controls, and Applied ML engineering internships, research collaborations, and open-source contributions.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '540px', margin: '32px auto 0' }}>
                <a href="mailto:shivammaurya14032005@gmail.com" className="btn-primary" style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '16.5px', padding: '16px' }}>
                  ✉️ shivammaurya14032005@gmail.com
                </a>
                <a href="https://linkedin.com/in/shivammaurya14" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}>
                  LinkedIn Profile ↗
                </a>
                <a href="https://github.com/ShivamMaurya14" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}>
                  GitHub Profile ↗
                </a>
              </div>

              {/* Resume download options */}
              <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--bdr)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '14.3px', color: 'var(--mid)' }}>Direct Resumes:</span>
                <a href="/Shivam_Maurya_Robotics_Engineer.pdf" download className="btn-ghost" style={{ fontSize: '13.2px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ⬇ Robotics (PDF)
                </a>
                <a href="/Shivam_Maurya_AIML.pdf" download className="btn-ghost" style={{ fontSize: '13.2px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ⬇ AI/ML (PDF)
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ justifyContent: 'center' }}>
        <span style={{ fontSize: '14.3px' }}>© 2026 Shivam Maurya</span>
      </footer>
    </>
  );
}
