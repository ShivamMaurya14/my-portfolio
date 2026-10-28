import React, { useState, useEffect, useMemo } from 'react';
import './index.css';
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Cpu,
  Layers,
  Terminal,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  X,
  Search,
  Sparkles,
  Radio,
  FileText,
  Download,
  Menu,
  ArrowUpRight,
  Activity,
  Trophy,
  CheckCircle2
} from 'lucide-react';

/* =========================================================================
   PROJECTS DATA (Exact alignment with context/all_project.md & readme.md)
   ========================================================================= */
const PROJECTS = [
  {
    id: 'medsynapse',
    cat: 'agentic',
    icon: '🩺',
    badge: 'Clinical AI · Multi-Disease XAI',
    title: 'MedSynapse: Agentic Clinical Diagnostic Suite',
    subtitle: '9 Disease Modules · Fused XAI (SHAP+LIME+Grad-CAM) · IIIT Pune Finalist',
    overview: 'Unified agentic medical AI platform orchestrating 9 disease-specific diagnostic modules (metabolic, cardiology, pulmonary, neuro-oncological, oncological, hepatic, renal, dermatological, ophthalmic) orchestrated by an LLM agent with cross-module correlation reasoning.',
    points: [
      'Architected a 9-module agentic medical AI platform unifying metabolic, cardiology, pulmonary, neuro-oncological, oncological, hepatic, renal, dermatological, and ophthalmic diagnostics under an LLM orchestration layer.',
      'Implemented a fused multi-method XAI engine combining SHAP, LIME, Grad-CAM, DiCE counterfactuals, and Anchor explanations, achieving SHAP-LIME agreement scoring for confidence-aware clinical reporting.',
      'Built 9 deep learning / ML backbone classifiers achieving up to 99.25% test accuracy (kidney CT) with cross-module correlation reasoning (e.g. diabetic nephropathy and retinopathy links).',
      'Developed multi-modal ingestion pipeline processing clinical text, spoken audio, chest X-rays, cranial MRI, fundus images, and lab PDF reports via Tesseract OCR 5 and PyMuPDF.',
      'Deployed FastAPI + React/Vite full-stack application with Groq LLM final report generation, SQLite local feature store, and clinician review/approval workflow.'
    ],
    stats: [
      { val: '9 Modules', lbl: 'Diagnostic Suite' },
      { val: '99.25%', lbl: 'Max Accuracy' },
      { val: 'Finalist', lbl: 'IIIT Pune 2025' }
    ],
    stack: ['FastAPI', 'React', 'TensorFlow', 'PyTorch', 'Groq LLM', 'Xception', 'SHAP', 'LIME', 'Grad-CAM', 'SQLite'],
    repo: 'https://github.com/ShivamMaurya14/MedSynapse',
    live: null,
    feat: true,
    modulesTable: [
      { mod: 'M1', disease: 'Diabetes (Tabular)', arch: 'Soft-Voting Ensemble (RF+GB+ET+LR)', acc: '74.68%', auc: '0.82' },
      { mod: 'M2', disease: 'Heart Disease (Tabular)', arch: 'Random Forest (100 Trees)', acc: '98.54%', auc: '0.99' },
      { mod: 'M3', disease: 'Pneumonia (Chest X-Ray)', arch: 'Xception Transfer Learning', acc: '83.01%', auc: '0.91' },
      { mod: 'M4', disease: 'Brain Tumor 4-Class (MRI)', arch: 'Xception Transfer Network', acc: '95.25%', auc: '0.98' },
      { mod: 'M5', disease: 'Breast Cancer (FNA Tabular)', arch: 'PCA + Logistic Regression / Ensemble', acc: '96.49%', auc: '0.99' },
      { mod: 'M6', disease: 'Liver Disease (Tabular)', arch: 'RF / XGBoost / GBDT', acc: '79.49%', auc: '0.84' },
      { mod: 'M7', disease: 'Kidney Pathology 4-Class (CT)', arch: 'MobileNetV2 + EfficientNetB0 + U-Net', acc: '99.25%', auc: '0.99' },
      { mod: 'M8', disease: 'Skin Cancer 7-Class (HAM10000)', arch: 'Deep 4-Block Hierarchical CNN', acc: '97.98%', auc: '0.99' },
      { mod: 'M9', disease: 'Eye Disease 4-Class (Fundus)', arch: 'PyTorch ResNet-18', acc: '90.78%', auc: '0.97' }
    ]
  },
  {
    id: 'med-sarthi',
    cat: 'agentic',
    icon: '🎙️',
    badge: 'Voice AI · Indic Healthcare',
    title: 'MedSarthi: Multilingual Voice Health Assistant',
    subtitle: 'Sarvam AI (STT/TTS) + Gemini 2.0 Pro · Live Indic Voice Consultation',
    overview: 'Full-stack AI healthcare platform enabling multilingual conversational clinical triage (English, Hindi, Indic languages) via browser with offline diagnostic ML/DL models.',
    points: [
      'Built MedSarthi, a zero-infrastructure multilingual voice health assistant with Indic language support (Hindi, English, Tamil+) using Sarvam AI STT/TTS and Google Gemini 2.0 Pro LLM conversation engine.',
      'Designed a browser-native voice pipeline: MediaRecorder API → Sarvam ASR (saarika:v2) → Gemini NLU → Sarvam TTS (bulbul:v2, anushka), eliminating WebRTC/call-provider dependencies with single-command deployment.',
      'Integrated 4 offline ML/DL diagnostic models (diabetes risk, heart disease, chest X-ray pneumonia CNN, brain MRI Xception) locally, ensuring zero cloud dependency for predictions.',
      'Implemented AI-driven triage escalation: urgency classification, real-time doctor dashboard with AI-generated triage reports, and appointment scheduling.'
    ],
    stats: [
      { val: 'Voice-to-Voice', lbl: 'Indic Consultation' },
      { val: '4 Models', lbl: 'Local Edge ML/DL' },
      { val: '● Live Demo', lbl: 'Railway Deployed' }
    ],
    stack: ['Sarvam AI', 'Google Gemini 2.0 Pro', 'FastAPI', 'WebSockets', 'TensorFlow', 'Railway'],
    repo: 'https://github.com/ShivamMaurya14/MedSarthi',
    live: 'https://medsarthi-production.up.railway.app',
    feat: true
  },
  {
    id: 'credi-mitra',
    cat: 'agentic',
    icon: '💳',
    badge: 'Agentic AI · FinTech',
    title: 'CREDI-MITRA — Autonomous Credit Appraisal Agent',
    subtitle: '5-Phase LangGraph Engine · LlamaParse, Pinecone RAG & XGBoost (97% Acc)',
    overview: 'Autonomous end-to-end credit appraisal AI agent using LangGraph stateful ReAct pattern with Dual-Brain LLM architecture and Human-in-the-Loop review gates.',
    points: [
      'Awarded Runner-Up at National Hackathon 2026 for CREDI-MITRA: an autonomous 5-phase corporate credit appraisal LangGraph agent with Human-in-the-Loop review panels at every critical stage.',
      'Implemented Dual-Brain LLM architecture separating orchestration (Llama 3.3/Gemini) from deep analysis (Gemini 2.5 Pro), with LlamaParse + Pinecone RAG reducing hallucinations by 85%.',
      'Integrated Tavily AI for granular one-by-one litigation research (NCLT filings, RBI penalties) and live news sentiment cross-verification.',
      'Deployed pre-trained XGBoost classifier (97% accuracy) predicting loan approval, credit limits, and interest rates from engineered financial features.',
      'Automated generation of audit-compliant PDF Credit Appraisal Memos (CAM) for corporate underwriting.'
    ],
    stats: [
      { val: 'Runner-Up', lbl: 'Hackathon 2026' },
      { val: '97%', lbl: 'XGBoost Acc' },
      { val: '85%', lbl: 'Hallucination Drop' }
    ],
    stack: ['LangGraph', 'XGBoost', 'Pinecone', 'LlamaParse', 'Gemini 2.5 Pro', 'Tavily AI', 'Streamlit'],
    repo: 'https://github.com/ShivamMaurya14/CREDI-MITRA',
    live: null,
    feat: true,
    phases: [
      'Phase 1: RAG Document Analysis (LlamaParse + Pinecone Vector Store)',
      'Phase 2: Live Web Litigation & Due Diligence (Tavily AI across NCLT/RBI)',
      'Phase 3: Financial Feature Extraction with Human-in-the-Loop (HITL) Review',
      'Phase 4: XGBoost Machine Learning Scoring (97% default classification accuracy)',
      'Phase 5: Automated PDF Credit Appraisal Memo (CAM) Generation'
    ]
  },
  {
    id: 'credit-risk',
    cat: 'ml',
    icon: '📊',
    badge: 'Applied ML · FinTech & Data Science',
    title: 'Credit Risk Intelligence & Profit-First Engine',
    subtitle: 'Cost-Sensitive Model on 307k Loans · 91.5% Recall · ~$9.08B Net Benefit',
    overview: 'Machine learning system predicting credit default risk for unbanked and thin-file users on 307,511 Home Credit loan records with profit-maximizing decision thresholds.',
    points: [
      'Built a profit-optimized credit risk ML system on 307,511 loan applications; achieved 91.46% default recall (ROC-AUC 0.8866) with Random Forest, representing ~$9.08B Net Financial Benefit.',
      'Engineered 125 credit-specific features including DAYS_EMPLOYED_PERCENT and CREDIT_INCOME_RATIO with synchronized calibration pipeline (calibration_params.json) ensuring zero prediction drift.',
      'Implemented dynamic threshold optimization searching the global maximum of Portfolio Utility Function at 0.40 optimal cutoff.',
      'Deployed SHAP explainability for regulatory reason-code compliance alongside async FastAPI microservices and dark-mode dashboard.'
    ],
    stats: [
      { val: '91.46%', lbl: 'Default Recall' },
      { val: '0.8866', lbl: 'ROC-AUC' },
      { val: '~$9.08B', lbl: 'Net Benefit' }
    ],
    stack: ['Random Forest', 'LightGBM', 'XGBoost', 'SHAP', 'FastAPI', 'Docker', 'Scikit-Learn'],
    repo: 'https://github.com/ShivamMaurya14/CreditRisk-Predictor',
    live: null,
    feat: false
  },
  {
    id: 'amr-predictor',
    cat: 'ml',
    icon: '🔬',
    badge: 'Bio-AI · Healthcare Data Science',
    title: 'Antimicrobial Resistance (AMR) Predictor',
    subtitle: 'Top Submission IIT BHU CODECURE 2025 · 99.27% Accuracy · WHO-Aligned',
    overview: 'Clinical machine learning framework predicting expensive IMIPENEM antibiotic resistance from cheap antibiotic susceptibility tests (AST), addressing WHO-priority CRE detection in low-resource settings.',
    points: [
      'Awarded Top Submission (Track B) at CODECURE Hackathon 2025, IIT BHU for cross-antibiotic resistance ML predictor achieving 99.27% accuracy across 274 bacterial isolates under severe 99.3% class imbalance.',
      'Applied stratified 5-fold cross-validation with macro-averaged F1 (0.80) for imbalanced multiclass susceptibility data (S/I/R), benchmarking 7 classifiers.',
      'Identified CEFTAZIDIME as most predictive feature (44.8% importance in Gradient Boosting) and built 5-tier antibiotic treatment clinical decision algorithm.',
      'Directly addresses detection of Carbapenem-Resistant Enterobacteriaceae (CRE) without requiring high-cost laboratory assays.'
    ],
    stats: [
      { val: 'Top Rank', lbl: 'IIT BHU 2025' },
      { val: '99.27%', lbl: 'Test Accuracy' },
      { val: '0.80', lbl: 'Macro-F1' }
    ],
    stack: ['Scikit-Learn', 'Random Forest', 'XGBoost', 'Pandas', 'SMOTE', 'Clinical AST Data'],
    repo: 'https://github.com/ShivamMaurya14/Antibiotic-Resistance-Predictor',
    live: null,
    feat: false
  },
  {
    id: 'iiot-anomaly',
    cat: 'ml',
    icon: '🏭',
    badge: 'Edge IoT & ML · Predictive Maintenance',
    title: 'Industrial IoT Predictive Maintenance System',
    subtitle: 'ESP32 Telemetry · 5 Failure Modes · >98% Accuracy · Live Streamlit',
    overview: 'AI-driven equipment failure prediction platform ingesting real-time sensor telemetry with multi-mode operation, dynamic failure alerts, and MTBF countdowns.',
    points: [
      'Built Industrial IoT predictive maintenance platform with >98% failure prediction accuracy using Random Forest on AI4I 2020 industrial sensor data (air temp, process temp, RPM, torque, tool wear).',
      'Implemented 4 operation modes: manual diagnostics, 9-machine fleet simulation, live ESP32 IoT sensor ingestion via FastAPI microservice, and interactive historical analytics with Plotly.',
      'Deployed decoupled microservice architecture: FastAPI backend (IoT data ingestion) + Streamlit frontend with dark-mode UI, health indicators, and dynamic failure alerts.'
    ],
    stats: [
      { val: '>98%', lbl: 'Prediction Acc' },
      { val: '4 Modes', lbl: 'Simulation & IoT' },
      { val: '● Live Demo', lbl: 'Streamlit Cloud' }
    ],
    stack: ['ESP32', 'Random Forest', 'FastAPI', 'Streamlit', 'Plotly', 'Pandas', 'Python'],
    repo: 'https://github.com/ShivamMaurya14/Predictive-Maintenance-System',
    live: 'https://pms-shivam-maurya.streamlit.app',
    feat: false
  },
  {
    id: 'rosnav',
    cat: 'robotics',
    icon: '🚗',
    badge: 'Robotics · Navigation & SLAM',
    title: 'rosnav: Autonomous Mobile Robot Stack',
    subtitle: 'Decoupled Nav2 Architecture · Differential Drive Autonomy & AMCL',
    overview: 'Production-ready Nav2 navigation stack engineered to avoid monolithic bringup failures on differential-drive mobile robots.',
    points: [
      'Implemented decoupled 3-tier ROS 2 Nav2 autonomous navigation pipeline with independent lifecycle-managed map server, AMCL particle filter localization, and planning stack.',
      'Configured DWB local trajectory controller with 7 weighted scoring critics (path alignment, goal alignment, obstacle clearance, deceleration).',
      'Tuned KLD-sampled AMCL with 500–2000 particles, likelihood_field beam models, and rolling local costmaps.',
      'Built Gazebo Classic + RViz2 simulation with custom URDF/Xacro differential-drive robot, 360° 2D LiDAR (30m range), and occupancy grid mapping supporting autonomous waypoint navigation.'
    ],
    stats: [
      { val: 'Decoupled', lbl: 'Nav2 Lifecycle' },
      { val: '500–2k', lbl: 'AMCL Particles' },
      { val: '7 Critics', lbl: 'DWB Controller' }
    ],
    stack: ['ROS 2 Humble', 'Nav2', 'Gazebo', 'SLAM Toolbox', 'AMCL', 'BehaviorTree.CPP'],
    repo: 'https://github.com/ShivamMaurya14/rosnav',
    live: null,
    feat: false
  },
  {
    id: 'multiarm',
    cat: 'robotics',
    icon: '🦾',
    badge: 'Robotics · Manipulation & Sim',
    title: 'Multi-Arm UR10e Pick-and-Place Workcell',
    subtitle: '3× UR10e Relay Workcell & 30-Arm NVIDIA Cosmos Spawner · ROS 2 Jazzy, MoveIt 2 & Isaac Sim',
    overview: 'Production-grade autonomous workcell orchestrated across multiple UR10e manipulators and Robotiq 2F-140 grippers executing sequential workpiece relays (Station A → B → C → D) with real-time PhysX GPU simulation.',
    points: [
      'Built production-grade 3-arm UR10e relay workcell using ROS 2 Jazzy + MoveIt 2 + NVIDIA Isaac Sim with PhysX GPU simulation; implemented custom PickPlace action interfaces and sequential state machine task manager (A→B→C→D).',
      'Developed NVIDIA Cosmos Multi-Cell Spawner procedurally constructing 10 tri-arm groups (30 UR10e + Robotiq 2F-140, 20 RTX pinhole cameras) at ~40–50 FPS on consumer hardware (RTX 5060 Ti 16GB).',
      'Integrated tactile sensing array (PhysxContactReportAPI across 7 rigid bodies per robot) and calibrated camera array for Physical AI foundation model dataset generation.',
      'Applied critically damped position drives (Kp=5000, Kd=1000), frame-0 joint initialization, and disabled pedestal colliders for stable zero-jitter GPU physics simulation.',
      'Tuned FastDDS non-blocking UDP transports for zero-packet-drop synchronization between MoveIt 2 and Isaac Sim OmniGraph bridges.'
    ],
    stats: [
      { val: '30 Arms', lbl: 'Sim Scaling' },
      { val: '40–50 FPS', lbl: 'PhysX GPU' },
      { val: 'FastDDS', lbl: 'Zero-Drop UDP' }
    ],
    stack: ['ROS 2 Jazzy', 'MoveIt 2', 'NVIDIA Isaac Sim', 'Omniverse', 'PhysX GPU', 'C++17', 'Python'],
    repo: 'https://github.com/ShivamMaurya14/MultiArm-Pick-and-Place',
    live: null,
    feat: true
  },
  {
    id: 'motor-interface',
    cat: 'robotics',
    icon: '⚡',
    badge: 'Robotics · Hardware Interface',
    title: 'ros2_control Dual-Mode Motor Interface',
    subtitle: 'Deterministic STM32 & Arduino Actuation · >1 kHz Binary UART & Micro-ROS',
    overview: 'Modular ros2_control SystemInterface hardware plugin bridging ROS 2 to physical actuators with custom binary protocols and native Micro-ROS DDS communication.',
    points: [
      'Developed ros2_control SystemInterface plugin (motor_controller/Stm32Interface) supporting dual-mode communication: custom binary UART protocol (>1 kHz deterministic loops) and Micro-ROS native DDS.',
      'Designed hardware-abstracted firmware templates for STM32 (F4/H7) and Arduino with DMA-enabled UART, 1 kHz hardware timer interrupts, encoder mode, and real-time PID loops.',
      'Engineered compact 16-byte UART packet protocol: PC → MCU [0xAA, Mode, TargetPos_f32, TargetVel_f32, TargetEff_f32, CRC8] and MCU → PC [0xBB, ParamPos_f32, ParamVel_f32, ParamEff_f32, CRC8].',
      'Implemented seamless mock hardware simulation toggle allowing identical launch configuration for physical hardware or software simulation without code changes.'
    ],
    stats: [
      { val: '>1 kHz', lbl: 'Control Loop' },
      { val: 'CRC8', lbl: 'Frame Checksum' },
      { val: 'Dual-Mode', lbl: 'UART / Micro-ROS' }
    ],
    stack: ['ros2_control', 'C++17', 'Micro-ROS', 'STM32', 'UART DMA', 'FreeRTOS'],
    repo: 'https://github.com/shivammaurya14/ros2_control_motor_interface',
    live: null,
    feat: false
  },
  {
    id: 'realfake',
    cat: 'perception',
    icon: '👁️',
    badge: 'Computer Vision · ABU Robocon',
    title: 'RealFake Robocon Vision & Decision Node',
    subtitle: '257 FPS (3.89 ms) CPU-Only Inference · ONNX Runtime & YOLOv8',
    overview: 'High-throughput perception pipeline for ABU Robocon autonomous manipulation, achieving sub-4ms latency on CPU without requiring discrete GPU acceleration.',
    points: [
      'Engineered 250+ FPS CPU-only ROS 2 perception pipeline for ABU Robocon using ONNX Runtime graph-optimized backend (3.89 ms average latency, 8.5× target performance).',
      'Built hot-swappable inference backend switching seamlessly between ONNX, YOLOv8, and TensorFlow CNN without node restarts.',
      'Built Autonomous Robot Decision Engine mapping bounding box coordinates to real-time gripper commands (PICK_REAL, REJECT_FAKE) and kinematics alignment targets (optical center offset dx/dy, heading error angle).',
      'Integrated dark-mode industrial Flask web visualizer with MJPEG streaming, live telemetry, backend hot-swap controls, and zero-ROS standalone competition arena simulation mode.'
    ],
    stats: [
      { val: '257 FPS', lbl: 'CPU Inference' },
      { val: '3.89 ms', lbl: 'Avg Latency' },
      { val: 'AIR < 20', lbl: 'ABU Robocon' }
    ],
    stack: ['ROS 2', 'ONNX Runtime', 'YOLOv8', 'OpenCV', 'TensorFlow', 'Flask', 'Python', 'Pytest'],
    repo: 'https://github.com/ShivamMaurya14/RealFake-Classifier-Robocon',
    live: null,
    feat: true,
    benchmarks: [
      { backend: 'ONNX Runtime (Graph Optimized)', latency: '3.89 ms', fps: '257 FPS (8.5× Target)' },
      { backend: 'TensorFlow / Keras CNN', latency: '22.18 ms', fps: '45.1 FPS' },
      { backend: 'YOLOv8 Object Detection', latency: '18.50 ms', fps: '54.0 FPS' }
    ]
  },
  {
    id: 'road-defect',
    cat: 'perception',
    icon: '🛣️',
    badge: 'Computer Vision · Infrastructure AI',
    title: 'Road Defect & Pothole Detector',
    subtitle: 'Dual-Stage YOLOv8 + U-Net · Geotagged NMEA GPS & Leaflet GIS',
    overview: 'Real-time edge computer vision platform for road surface hazard detection, crack segmentation, and geotagged municipal infrastructure survey logging.',
    points: [
      'Built 3-mode road defect detection platform (Raw GPS survey, U-Net semantic segmentation, YOLOv8 bounding box detection) deployable on vehicle dashcams, survey trucks, and inspection robots.',
      'Integrated GPS telemetry pipeline burning live coordinates and vehicle speed into MP4 video HUD recordings (HTML5 browser geolocation, NMEA serial NEO-6M/8M, or mock GPS simulation).',
      'Designed Flask web dashboard with MJPEG live streaming, Leaflet map with geotagged defect pins, and full log/video management including CSV export and local disk cleanup.'
    ],
    stats: [
      { val: 'Dual-Stage', lbl: 'YOLOv8 + U-Net' },
      { val: 'GPS Sync', lbl: 'NMEA Telemetry' },
      { val: 'Leaflet', lbl: 'GIS Web Export' }
    ],
    stack: ['YOLOv8', 'U-Net', 'PyTorch', 'Flask', 'OpenCV', 'Leaflet.js', 'Python'],
    repo: 'https://github.com/ShivamMaurya14/Road-Defect-Detector',
    live: null,
    feat: false
  },
  {
    id: 'pcb-fault',
    cat: 'perception',
    icon: '🔍',
    badge: 'Computer Vision · Manufacturing QC',
    title: 'PCB Fault Detector & AOI System',
    subtitle: 'Automated Optical Inspection · YOLOv8 & Barcode Traceability',
    overview: 'Lightweight web-based YOLO classification pipeline for PCB manufacturing defect identification (solder bridges, missing parts, misalignments) with QR traceability.',
    points: [
      'Built plug-and-play PCB defect classifier using YOLO classification (supports .pt weights and .engine TensorRT acceleration).',
      'Browser webcam streaming paired with real-time QR code and barcode scanning for PCB serial traceability.',
      'FastAPI microservice backend providing automated CSV audit inspection logging and annotated defect snapshot capture.'
    ],
    stats: [
      { val: 'Real-Time', lbl: 'AOI Inspection' },
      { val: 'TensorRT', lbl: '.engine / .pt' },
      { val: 'FastAPI', lbl: 'REST & Webhook' }
    ],
    stack: ['YOLOv8', 'TensorRT', 'OpenCV', 'FastAPI', 'PyZbar', 'Python'],
    repo: 'https://github.com/ShivamMaurya14/PCB-Fault-Detector',
    live: null,
    feat: false
  },
  {
    id: 'edge-kws',
    cat: 'embedded',
    icon: '🔊',
    badge: 'Embedded AI · Edge Voice & IoT',
    title: 'Edge KWS Voice Activator (ISRO / SIH 2026)',
    subtitle: 'ESP32-S3 INT8 Wake-Word CNN · Vosk ASR & Eclipse Zenoh (<2 ms LAN)',
    overview: 'Hybrid edge-cloud voice control system engineered for Smart India Hackathon 2026 (ISRO / Department of Space PS-26172) with sub-2ms network dispatch.',
    points: [
      'Designed hybrid edge-cloud voice control system (SIH 2026, ISRO PS-26172): INT8-quantized binary wake-word CNN (111 KB, <10.1% Flash/8.2% RAM) on ESP32-S3 with MFCC feature extraction.',
      'Engineered Vosk streaming ASR + 3-stage Hybrid NLP intent parser (Regex → Fuzzy Levenshtein → TF ML fallback) achieving >97% intent accuracy on noisy or accented inputs.',
      'Implemented dual transport protocols: WebSockets (~14 ms LAN) and Eclipse Zenoh-Pico (~1–2 ms LAN, 5-byte wire overhead, ~0.9% ESP32 RAM) with 5-channel relay switching.',
      'Built desktop simulation suite (GUI ESP32 hardware simulator + server manager) enabling full system testing without physical hardware.'
    ],
    stats: [
      { val: '111 KB', lbl: 'INT8 Wake CNN' },
      { val: '<2 ms', lbl: 'Zenoh Latency' },
      { val: '>97%', lbl: 'Noisy Accuracy' }
    ],
    stack: ['ESP32-S3', 'TFLite INT8', 'Vosk ASR', 'Eclipse Zenoh-Pico', 'WebSockets', 'C++', 'Python'],
    repo: 'https://github.com/ShivamMaurya14/Edge-KWS-Voice-Activator',
    live: null,
    feat: false
  },
  {
    id: 'nanotracker',
    cat: 'embedded',
    icon: '📡',
    badge: 'Embedded · Low-Power IoT',
    title: 'NanoTracker-24/7 Cellular Asset Monitor',
    subtitle: 'ESP8266 + SIM800L GSM · 99% Deep-Sleep Duty Cycle · Zero GPS Power',
    overview: 'Industrial-grade cellular asset tracking firmware operating on cellular tower triangulation (LBS) with sub-mA sleep current and SMS OTA configuration.',
    points: [
      'Engineered ultra-low-power ESP8266 asset tracker with 99% deep sleep duty cycle (sub-mA current) using LBS cellular triangulation (no GPS) via SIM800L; supports indoor and underground tracking.',
      'Implemented SMS-based OTA configuration with EEPROM persistence: TRACK mode (60s interval) vs SAVE mode (3600s interval) without physical device access.',
      'Integrated battery voltage telemetry and dual-reporting to both asset owner and logistics backend.'
    ],
    stats: [
      { val: '99%', lbl: 'Deep Sleep Cycle' },
      { val: 'sub-mA', lbl: 'Sleep Current' },
      { val: 'GSM LBS', lbl: 'Cell Triangulation' }
    ],
    stack: ['ESP8266', 'SIM800L GSM', 'C/C++', 'AT Commands', 'EEPROM', 'Hardware'],
    repo: 'https://github.com/ShivamMaurya14/NanoTracker',
    live: null,
    feat: false
  },
  {
    id: 'tictactoe-rl',
    cat: 'ml',
    icon: '🎯',
    badge: 'Reinforcement Learning · Game Theory',
    title: 'Unbeatable Tic-Tac-Toe RL Agent',
    subtitle: 'Self-Play Q-Learning · Converged to Nash Equilibrium · 0% Loss vs Minimax',
    overview: 'Reinforcement learning agent mastering Tic-Tac-Toe via self-play Q-Learning, converging to game-theoretic perfection with comprehensive validation.',
    points: [
      'Trained self-play Q-Learning agent achieving Nash Equilibrium in Tic-Tac-Toe: 98.5% win rate vs random baseline, 0% loss rate vs perfect Minimax opponent across 1,000 games.',
      'Implemented temporal difference learning with ε-greedy exploration decay (0.90 → 0.10).',
      'Engineered modular Python package with CLI, Jupyter Widget interactive UI, pre-trained Q-table serialization, and 18-case automated pytest suite.'
    ],
    stats: [
      { val: '0% Loss', lbl: 'vs Minimax' },
      { val: '98.5%+', lbl: 'Win Rate vs Rand' },
      { val: '18 Cases', lbl: 'Pytest Suite' }
    ],
    stack: ['Q-Learning', 'Reinforcement Learning', 'Python', 'Minimax', 'Pytest', 'Jupyter'],
    repo: 'https://github.com/ShivamMaurya14/Unbeatable-Tic-Tac-Toe-RL',
    live: null,
    feat: false
  },
  {
    id: 'robocon-cear',
    cat: 'robotics',
    icon: '🏆',
    badge: 'Robotics · Mechanical & Kinematics',
    title: 'ABU Robocon 2026 Robot Engineering',
    subtitle: 'Team CEAR Stage-I Design Packet · AIR < 20 · Dual-Robot Fleet CAD',
    overview: 'Complete Stage-I mechanical and autonomous engineering design packet for Team CEAR at ABU Robocon 2026.',
    points: [
      'Stage-I mechanical and autonomous engineering design packet for Team CEAR at ABU Robocon 2026 (All India Rank < 20).',
      'Complete SolidWorks & Fusion 360 CAD for R1 & R2 competition robots, planetary drive base, and vertical lifting mechanisms.',
      'Rigorous actuator torque sizing, dynamic acceleration calculations, center-of-mass balance, and competition arena playbook.'
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
  }
];

/* =========================================================================
   HONORS & AWARDS (Exact alignment with context/readme.md & resume order)
   ========================================================================= */
const AWARDS_DATA = [
  {
    id: 'abu-robocon',
    medal: '🤖',
    badge: 'National Robotics',
    title: 'All India Rank under 20, ABU Robocon 2025/26',
    venue: 'Lead Software Architect · Team AIT',
    desc: 'Led robotics software design, kinematics packets, and onboard real-time CNN perception directly into navigation decision loops for Team AIT, securing an All India Rank (AIR) < 20.',
    metricLbl: 'National Standing',
    metricVal: 'All India Rank < 20'
  },
  {
    id: 'sih-isro',
    medal: '🚀',
    badge: 'SIH / ISRO PS-26172',
    title: 'Smart India Hackathon 2026 Participant',
    venue: 'ISRO / Dept. of Space · Edge Voice Activator',
    desc: 'Selected for ISRO PS-26172: engineered low-latency edge voice activator with INT8-quantized binary wake-word CNN (111 KB) on ESP32-S3 + Vosk streaming ASR + Eclipse Zenoh-Pico achieving <2 ms LAN dispatch latency.',
    metricLbl: 'Network Latency',
    metricVal: '<2 ms Eclipse Zenoh'
  },
  {
    id: 'amazon-ml-2026',
    medal: '📈',
    badge: 'Amazon ML Challenge',
    title: 'Top 500 All India, Amazon ML Challenge 2026',
    venue: 'Amazon ML Challenge · Nationwide',
    desc: 'Ranked among the Top 500 teams across thousands of national participants, delivering robust multi-modal feature extraction and predictive machine learning models under strict evaluation criteria.',
    metricLbl: 'National Rank',
    metricVal: 'Top 500 Nationwide'
  },
  {
    id: 'hackathon-2026',
    medal: '🥈',
    badge: 'National Hackathon',
    title: 'Runner-Up, Hackathon 2026',
    venue: 'National Level Hackathon 2026',
    desc: 'Recognized for CREDI-MITRA, an autonomous agentic credit appraisal system orchestrated with LangGraph stateful ReAct pattern and XGBoost (97% default classification accuracy) with Human-in-the-Loop review gates.',
    metricLbl: 'Classification Acc',
    metricVal: '97% Default Acc'
  },
  {
    id: 'codecure-2025',
    medal: '🥇',
    badge: 'IIT BHU Top Submission',
    title: 'Top Submission, CODECURE 2025, IIT BHU',
    venue: 'IIT BHU · CODECURE Hackathon (Track B)',
    desc: 'Awarded top ranking for the Antimicrobial Resistance (AMR) Prediction system achieving 99.27% accuracy across 274 bacterial isolates under severe 99.3% class imbalance, predicting expensive IMIPENEM resistance from cheap AST panels.',
    metricLbl: 'Validated Accuracy',
    metricVal: '99.27% (Macro-F1 0.80)'
  },
  {
    id: 'avishkar-2026',
    medal: '🏛️',
    badge: 'State Research Convention',
    title: 'State Level Round 2, Avishkar 2026',
    venue: 'Maharashtra Inter-University Research Convention',
    desc: 'Selected for State-Level Round 2 at Maharashtra premier inter-university research convention, presenting collegiate engineering research and autonomous robotics innovation.',
    metricLbl: 'Selection Stage',
    metricVal: 'State Level Round 2'
  },
  {
    id: 'iiit-pune-2025',
    medal: '🩺',
    badge: 'Diagnostic Track Finalist',
    title: 'Finalist, IIIT Pune Thinking Machines 2025',
    venue: 'IIIT Pune · Thinking Machines',
    desc: 'MedSynapse platform selected in the Diagnostic Tools track for its multimodal 9-disease diagnostic architecture with fused SHAP, LIME, Grad-CAM, and DiCE counterfactual explainability.',
    metricLbl: 'Disease Modules',
    metricVal: '9 Modules (99.25% Acc)'
  },
  {
    id: 'ros2-contributions',
    medal: '🌐',
    badge: 'Core Open Source',
    title: 'Open-Source Impact — ROS 2 Core Ecosystem',
    venue: 'navigation2 · ros2_control · ros2_controllers',
    desc: '15+ merged pull requests (5+ open) across fundamental robotics software libraries under active review by global maintainers, documenting real-time safety patterns and fixing controller initialization regressions.',
    metricLbl: 'Codebase PRs',
    metricVal: '15+ Merged Pull Requests'
  },
  {
    id: 'embedded-portfolio',
    medal: '⚡',
    badge: 'Hardware Systems',
    title: 'Embedded Engineering & Hardware Portfolio',
    venue: 'Centre of Excellence for AI & Robotics Labs',
    desc: 'Architected and built 40+ hardware and embedded microcontroller systems spanning STM32 UART DMA, ESP32 Micro-ROS, SIM800L low-power GSM telemetry, and motor actuation with sub-mA sleep budgets.',
    metricLbl: 'Physical Systems',
    metricVal: '40+ HW Nodes Deployed'
  }
];

const CATEGORIES_CONFIG = [
  { id: 'all', label: 'All Projects' },
  { id: 'robotics', label: 'Robotics & Controls' },
  { id: 'perception', label: 'Perception & Vision' },
  { id: 'agentic', label: 'Agentic AI & Healthcare' },
  { id: 'ml', label: 'Applied ML & FinTech' },
  { id: 'embedded', label: 'Embedded & IoT' }
];

/* =========================================================================
   TAILORED ATS RESUMES (Exact order requested with direct role names)
   ========================================================================= */
const RESUMES = [
  {
    role: 'Robotics Engineer',
    file: '/resumes/Shivam_Maurya_Robotics_Engineer.pdf',
    filename: 'Shivam_Maurya_Robotics_Engineer.pdf',
    icon: '🦾',
    tag: 'ROS 2 · MoveIt 2 · Controls'
  },
  {
    role: 'AI / ML Engineer',
    file: '/resumes/Shivam_Maurya_AI_Engineer.pdf',
    filename: 'Shivam_Maurya_AI_Engineer.pdf',
    icon: '🧠',
    tag: 'LangGraph · PyTorch · Tabular'
  },
  {
    role: 'Computer Vision Engineer',
    file: '/resumes/Shivam_Maurya_Computer_Vision_Engineer.pdf',
    filename: 'Shivam_Maurya_Computer_Vision_Engineer.pdf',
    icon: '👁️',
    tag: 'ONNX 257 FPS · YOLO · U-Net'
  },
  {
    role: 'Data Scientist',
    file: '/resumes/Shivam_Maurya_Data_Scientist.pdf',
    filename: 'Shivam_Maurya_Data_Scientist.pdf',
    icon: '📊',
    tag: 'EDA · Imbalance · SHAP XAI'
  },
  {
    role: 'Embedded Engineer',
    file: '/resumes/Shivam_Maurya_Embedded_Engineer.pdf',
    filename: 'Shivam_Maurya_Embedded_Engineer.pdf',
    icon: '⚡',
    tag: 'STM32 · ESP32 · Zenoh <2ms'
  }
];

/* =========================================================================
   MAIN APP COMPONENT
   ========================================================================= */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Primary Email requested by user
  const PRIMARY_EMAIL = 'shivammaurya142005@gmail.com';
  const PHONE = '+91 7009411956';
  const LOCATION = 'Pune, Maharashtra, India';

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Dynamic category counts
  const categories = useMemo(() => {
    return CATEGORIES_CONFIG.map(cat => {
      const count = cat.id === 'all'
        ? PROJECTS.length
        : PROJECTS.filter(p => p.cat === cat.id).length;
      return { ...cat, count };
    });
  }, []);

  // Filtered projects by category and search
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesCategory = activeFilter === 'all' || p.cat === activeFilter;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = p.title.toLowerCase().includes(q);
      const inSubtitle = p.subtitle.toLowerCase().includes(q);
      const inStack = p.stack.some(s => s.toLowerCase().includes(q));
      const inPoints = p.points.some(pt => pt.toLowerCase().includes(q));
      const inBadge = p.badge.toLowerCase().includes(q);

      return inTitle || inSubtitle || inStack || inPoints || inBadge;
    });
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    /* =========== CUSTOM CURSOR =========== */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let cx = -100, cy = -100, rx = -100, ry = -100;

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
      rx += (cx - rx) * 0.14;
      ry += (cy - ry) * 0.14;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      animFrame = requestAnimationFrame(animRing);
    }
    animRing();

    /* =========== SCROLL REVEAL =========== */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
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
        if (window.scrollY > 40) {
          navbar.style.background = 'rgba(2,8,16,0.92)';
          navbar.style.borderBottom = '1px solid rgba(0,229,200,0.2)';
        } else {
          navbar.style.background = 'rgba(2,8,16,0.75)';
          navbar.style.borderBottom = '1px solid var(--bdr)';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    /* =========== TYPING HERO ROLE =========== */
    const roles = [
      'Physical AI Engineer',
      'Robotics Software Engineer (ROS 2 / MoveIt 2)',
      'Autonomous Systems & Nav2 Engineer',
      'Computer Vision & Edge Perception (257 FPS)',
      'Agentic AI & Healthcare LLMs'
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
        if (charIdx >= current.length) {
          deleting = true;
          typeTimeout = setTimeout(typeRole, 2200);
          return;
        }
      } else {
        charIdx--;
        roleEl.innerHTML = current.slice(0, charIdx);
        if (charIdx <= 2) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      typeTimeout = setTimeout(typeRole, deleting ? 35 : 75);
    }
    typeTimeout = setTimeout(typeRole, 1000);

    /* =========== CANVAS PARTICLES BACKGROUND =========== */
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

      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 2 + 0.8,
          color: Math.random() > 0.45 ? '0,229,200' : '168,85,247',
          alpha: Math.random() * 0.4 + 0.12
        });
      }

      function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p, i) => {
          const dx = cx - p.x, dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            p.vx -= (dx / dist) * 0.04;
            p.vy -= (dy / dist) * 0.04;
          }
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.985; p.vy *= 0.985;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha + ')';
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx2 = p.x - q.x, dy2 = p.y - q.y;
            const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (d < 105) {
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(0,229,200,' + (0.05 * (1 - d / 105)) + ')';
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
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
      <div className="noise"></div>

      {/* Canvas background */}
      <canvas id="bg-canvas"></canvas>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="copy-toast">
          <Check size={16} color="var(--cyan)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===== MOBILE DRAWER MENU ===== */}
      <div
        className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}
        id="mobile-drawer"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="nav-logo">SM<span>.</span></div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--mid)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>
        <a href="#about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About &amp; Education</a>
        <a href="#experience" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Experience</a>
        <a href="#skills" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Skills &amp; Tech</a>
        <a href="#projects" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Projects (16)</a>
        <a href="#achievements" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Honors &amp; Awards</a>
        <a href="#contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            Download Role Resumes:
          </div>
          {RESUMES.map((res) => (
            <a
              key={res.role}
              href={res.file}
              download={res.filename}
              className="btn-ghost"
              style={{ fontSize: '12.5px', padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{res.icon}</span>
                <span>{res.role}</span>
              </span>
              <Download size={13} />
            </a>
          ))}
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* ===== NAVBAR ===== */}
      <nav id="navbar">
        <a href="#hero" className="nav-logo">SM<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#achievements">Awards</a>
          <a href="#contact">Contact</a>

          {/* Resume dropdown */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              className="nav-resume"
              onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
              style={{ cursor: 'pointer', background: 'transparent', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Resume <ChevronDown size={14} />
            </button>
            {isResumeDropdownOpen && (
              <div className="resume-dropdown-menu">
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--cyan)', textTransform: 'uppercase', padding: '6px 12px 4px', letterSpacing: '0.08em' }}>
                  Download Role Resume:
                </div>
                {RESUMES.map((res) => (
                  <a
                    key={res.role}
                    href={res.file}
                    download={res.filename}
                    className="resume-dropdown-item"
                    onClick={() => setIsResumeDropdownOpen(false)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{res.icon}</span>
                      <span>{res.role}</span>
                    </span>
                    <Download size={13} color="var(--cyan)" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hamburger" id="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} color="var(--cyan)" />
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero">
        <div className="hero-glow-blob" style={{ width: "500px", height: "500px", background: "var(--cyan)", top: "-100px", right: "15%", opacity: "0.08" }}></div>
        <div className="hero-glow-blob" style={{ width: "420px", height: "420px", background: "var(--pur)", bottom: "8%", left: "-5%", opacity: "0.07" }}></div>
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} color="var(--cyan)" />
              <span>Available for Robotics &amp; AI Roles, Internships &amp; Research</span>
            </div>
            <h1 className="hero-name">Shivam Maurya</h1>
            <div className="hero-role" style={{ minHeight: '38px', color: 'var(--cyan)' }}>
              &gt; Physical AI &amp; Robotics Engineer ·
            </div>
            <p className="hero-sub" style={{ fontSize: '17.5px', lineHeight: 1.7 }}>
              Pursuing <strong>B.E. Automation &amp; Robotics at Army Institute of Technology (AIT), Pune (CGPA 8.06/10)</strong>. Physical AI Intern at Nextup Robotics and Software Lead at CEAR. I architect deterministic autonomous systems — spanning <code>ros2_control</code> hardware drivers, MoveIt 2 multi-arm workcells, Nav2 mobile autonomy, and high-throughput 257 FPS edge vision.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Explore All 16 Projects <ArrowUpRight size={16} />
              </a>
              <a
                href={`mailto:${PRIMARY_EMAIL}`}
                className="btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                title={`Open email client to send message to ${PRIMARY_EMAIL}`}
              >
                <Mail size={16} color="var(--cyan)" /> Send Email
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">15+</div>
                <div className="hero-stat-lbl">ROS 2 PRs Merged</div>
              </div>
              <div>
                <div className="hero-stat-num">16</div>
                <div className="hero-stat-lbl">Shipped Projects</div>
              </div>
              <div>
                <div className="hero-stat-num">8.06</div>
                <div className="hero-stat-lbl">AIT Pune CGPA</div>
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

      {/* ===== ABOUT & EDUCATION ===== */}
      <section id="about">
        <div className="about-wrapper" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal">
            <div className="sec-tag">Identity &amp; Academic Foundations</div>
            <h2 className="sec-title">About <span style={{ color: "var(--cyan)" }}>Me</span></h2>
          </div>
          <div className="about-grid reveal reveal-delay-1">
            {/* Left Card: Core Narrative & Pillars */}
            <div className="about-card">
              <div className="about-text">
                <p>
                  I am a multi-disciplinary engineer operating at the convergence of <strong>Physical AI, Robotics Software, Edge Computer Vision, and Embedded Systems</strong> based in <strong>Pune, India</strong>.
                </p>
                <p>
                  My engineering philosophy is rooted in building mathematically grounded, deterministic systems: from low-level register and hardware interfaces up to multi-agent distributed LLM architectures.
                </p>
              </div>

              <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--cyan)' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>🦾 Autonomous Manipulation &amp; Isaac Sim Scaling</div>
                  <div style={{ fontSize: '14.2px', color: 'var(--mid)', lineHeight: 1.6 }}>Architected a 3× UR10e workcell in ROS 2 Jazzy, MoveIt 2, and NVIDIA Isaac Sim; scaled simulations to 30 UR10e arms and 20 RTX cameras operating at 40–50 FPS on PhysX GPU.</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>🚗 Lifecycle Nav2 Mobile Autonomy</div>
                  <div style={{ fontSize: '14.2px', color: 'var(--mid)', lineHeight: 1.6 }}>Engineered decoupled Nav2 architectures with explicit lifecycle control, SLAM Toolbox 2D LiDAR mapping, and AMCL particle filtering for differential-drive robots.</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>👁️ High-Throughput CPU Edge Perception</div>
                  <div style={{ fontSize: '14.2px', color: 'var(--mid)', lineHeight: 1.6 }}>Engineered vision pipelines executing at <strong style={{ color: 'var(--cyan)' }}>257 FPS (3.89 ms)</strong> on CPU using ONNX Runtime for ABU Robocon arena manipulation (AIR &lt; 20).</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>⚡ Hardware Interfaces &amp; Embedded Bus Protocols</div>
                  <div style={{ fontSize: '14.2px', color: 'var(--mid)', lineHeight: 1.6 }}>Authored <code>ros2_control</code> <code>SystemInterface</code> plugins with binary CRC8 UART (&gt;1 kHz control loop) and native Micro-ROS modes on STM32 and ESP32.</div>
                </div>

                <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--bdr2)' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>🧠 Agentic Systems &amp; Applied Machine Learning</div>
                  <div style={{ fontSize: '14.2px', color: 'var(--mid)', lineHeight: 1.6 }}>Built 5-phase LangGraph credit appraisal engines with HITL gates, multilingual Indic clinical voice triage, and 9-disease diagnostic suites with fused SHAP/LIME/Grad-CAM.</div>
                </div>
              </div>

              <div className="info-chips" style={{ marginTop: '24px' }}>
                <span className="chip">Lead @ CEAR (100+ Members)</span>
                <span className="chip">15+ Merged ROS 2 PRs</span>
                <span className="chip">ABU Robocon AIR &lt; 20</span>
                <span className="chip">National Hackathon Runner-Up</span>
                <span className="chip">40+ Embedded HW Builds</span>
              </div>
            </div>

            {/* Right Card: Academic Foundations & Education Card */}
            <div className="about-card">
              <div style={{ fontSize: '15px', fontFamily: 'var(--mono)', letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={18} /> // Academic Foundations &amp; Degree
              </div>

              <div className="edu-highlight-card" style={{ marginTop: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
                      Bachelor of Engineering (B.E.) in Automation &amp; Robotics
                    </h3>
                    <div style={{ fontSize: '15px', color: 'var(--cyan)', fontWeight: 600 }}>
                      Army Institute of Technology (AIT), Pune, India
                    </div>
                  </div>
                  <span className="gpa-badge">
                    CGPA: 8.06 / 10.0
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--mid)', marginTop: '6px' }}>
                  June 2024 – May 2028 (Undergraduate)
                </div>

                <div style={{ marginTop: '18px', borderTop: '1px solid var(--bdr)', paddingTop: '16px' }}>
                  <div style={{ fontSize: '13.5px', fontFamily: 'var(--mono)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Relevant Academic Coursework:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <span className="sk-tag">Robotics Systems</span>
                    <span className="sk-tag">Kinematics &amp; Dynamics</span>
                    <span className="sk-tag">Control Theory</span>
                    <span className="sk-tag">Signals &amp; Systems</span>
                    <span className="sk-tag">State Estimation &amp; Fusion</span>
                    <span className="sk-tag">Machine Learning</span>
                    <span className="sk-tag">Deep Learning</span>
                    <span className="sk-tag">Computer Vision</span>
                    <span className="sk-tag">Data Structures &amp; Algorithms</span>
                    <span className="sk-tag">Database Management (SQL)</span>
                    <span className="sk-tag">Embedded AI Systems</span>
                    <span className="sk-tag">Microcontrollers (ESP32 / STM32)</span>
                    <span className="sk-tag">IoT &amp; Sensor Networks</span>
                    <span className="sk-tag">Low-Power Firmware</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact & Verified Profile Details */}
              <div style={{ marginTop: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--bdr)', borderRadius: 'var(--r)', padding: '18px' }}>
                <div style={{ fontSize: '13.5px', fontFamily: 'var(--mono)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Verified Profile Details:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--mid)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} color="var(--cyan)" />
                    <span style={{ color: 'var(--text)' }}>Primary:</span>
                    <a href={`mailto:${PRIMARY_EMAIL}`} style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>{PRIMARY_EMAIL}</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Phone size={16} color="var(--cyan)" />
                    <span style={{ color: 'var(--text)' }}>Phone:</span>
                    <span>{PHONE}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={16} color="var(--cyan)" />
                    <span style={{ color: 'var(--text)' }}>Location:</span>
                    <span>{LOCATION}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal">
            <div className="sec-tag">Professional &amp; Research Track Record</div>
            <h2 className="sec-title">Work <span style={{ color: "var(--cyan)" }}>Experience</span></h2>
            <p className="sec-sub">Hands-on leadership across physical AI, competitive robotics systems, and foundational open-source robotics codebases.</p>
          </div>

          <div className="timeline" style={{ marginTop: '36px' }}>
            {/* 1. Nextup Robotics */}
            <div className="tl-item reveal reveal-delay-1">
              <div className="tl-dot-wrap">
                <div className="tl-dot" style={{ background: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan)' }}></div>
                <div className="tl-line"></div>
              </div>
              <div className="tl-content" style={{ background: 'var(--glass)', border: '1px solid var(--bdr2)', borderRadius: 'var(--r2)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div className="tl-year" style={{ color: 'var(--cyan)' }}>AUGUST 2026 – OCTOBER 2026</div>
                    <div className="tl-title" style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0' }}>Physical AI Intern</div>
                    <div style={{ fontSize: '15.5px', color: 'var(--cyan)', marginBottom: '10px' }}>Nextup Robotics · Ghaziabad (Remote)</div>
                  </div>
                  <span className="proj-badge">Physical AI &amp; NVIDIA Isaac Sim</span>
                </div>
                <div className="tl-desc" style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text)' }}>
                  Scaled robotics simulation, synthetic data generation, and reinforcement learning pipelines on NVIDIA Omniverse / Isaac Sim and ROS 2.
                </div>
                <ul className="proj-points" style={{ marginTop: '14px' }}>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Multi-Robot Workcell Orchestration:</strong> Architected autonomous 3-arm relay system (UR10e manipulators with Robotiq 2F-140 grippers) sequentially passing workpieces across four stations (A→B→C→D) via custom ROS 2 PickPlace action servers.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Massive Physics Scaling:</strong> Scaled simulation to 30 UR10e robots and 20 RTX cameras operating at 40–50 FPS on a consumer workstation (~1.1 GiB VRAM, ~8.2 GiB RAM) using USDA instancing and PhysX GPU buffer tuning.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Real-Time Control Stability:</strong> Stabilized arm dynamics with critically damped joint drives (Kp=5000, Kd=1000) and frame-0 joint initialization, preventing startup gravity drops and contact jitter.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Jitter-Free Middleware:</strong> Tuned FastDDS non-blocking UDP transports for zero-packet-drop synchronization between MoveIt 2 and Isaac Sim OmniGraph bridges.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Multimodal Foundation Data:</strong> Configured calibrated 20-camera pinhole arrays with 7-rigid-body contact sensors to output synchronized multimodal streams (vision + tactile) for NVIDIA Cosmos foundation models.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Documentation:</strong> Authored 7 comprehensive engineering guides detailing workcell setup, kinematic calibration, and headless CI deployment.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Centre of Excellence for AI & Robotics */}
            <div className="tl-item reveal reveal-delay-2">
              <div className="tl-dot-wrap">
                <div className="tl-dot" style={{ background: 'var(--pur)', boxShadow: '0 0 12px var(--pur)' }}></div>
                <div className="tl-line"></div>
              </div>
              <div className="tl-content" style={{ background: 'var(--glass)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div className="tl-year" style={{ color: 'var(--pur)' }}>JUNE 2024 – PRESENT</div>
                    <div className="tl-title" style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0' }}>Software Lead</div>
                    <div style={{ fontSize: '15.5px', color: 'var(--pur)', marginBottom: '10px' }}>Centre of Excellence for AI &amp; Robotics · Army Institute of Technology, Pune</div>
                  </div>
                  <span className="proj-badge" style={{ borderColor: 'rgba(168,85,247,0.4)', color: 'var(--pur)' }}>Technical Leadership</span>
                </div>
                <div className="tl-desc" style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text)' }}>
                  Technical leadership for autonomous systems, competitive robotics, and production machine learning pipelines.
                </div>
                <ul className="proj-points" style={{ marginTop: '14px' }}>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Leadership &amp; Mentorship:</strong> Directed technical initiatives for a 100+ member student research cell; organized hackathons, ROS 2 workshops, and multi-week project sprints across 5+ cross-functional teams.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>ABU Robocon Software Architecture:</strong> Led software design and hardware-software integration for national competition robot (All India Rank &lt; 20); deployed onboard real-time CNN perception directly into navigation decision loops.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Edge AI &amp; CPU Inference:</strong> Designed modular AI vision pipelines combining YOLO object detection with lightweight CNN classifiers, achieving 30+ FPS and 257 FPS on CPU-only embedded hardware without discrete GPU.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Model Portability &amp; A/B Testing:</strong> Built export pipelines converting TensorFlow/PyTorch weights to optimized ONNX graphs with a JSON-configurable hot-swappable backend allowing runtime model swaps with zero code changes.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Supervised Learning Workflows:</strong> Trained and validated 4+ end-to-end ML architectures (CNNs, Xception transfer learning, Random Forest, XGBoost) incorporating stratified CV and automated sweeps.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Open Source Contributor */}
            <div className="tl-item reveal reveal-delay-3">
              <div className="tl-dot-wrap">
                <div className="tl-dot" style={{ background: 'var(--amb)', boxShadow: '0 0 12px var(--amb)' }}></div>
                <div className="tl-line"></div>
              </div>
              <div className="tl-content" style={{ background: 'var(--glass)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div className="tl-year" style={{ color: 'var(--amb)' }}>JUNE 2025 – PRESENT</div>
                    <div className="tl-title" style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0' }}>Core Open-Source Contributor</div>
                    <div style={{ fontSize: '15.5px', color: 'var(--amb)', marginBottom: '10px' }}>ROS 2 Core Ecosystem (navigation2, ros2_control, ros2_controllers, moveit2)</div>
                  </div>
                  <span className="proj-badge" style={{ borderColor: 'rgba(245,158,11,0.4)', color: 'var(--amb)' }}>15+ Merged PRs</span>
                </div>
                <div className="tl-desc" style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text)' }}>
                  Core systems software, hardware-software abstraction layer, CI stability, and static analysis in C++17 and Python.
                </div>
                <ul className="proj-points" style={{ marginTop: '14px' }}>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>15+ Merged Pull Requests (5+ Open):</strong> Contributed across fundamental robotics software libraries under active review by global maintainers.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Real-Time Safe Hardware Interfaces:</strong> Documented real-time safety patterns and thread execution constraints within <code>ros2_control</code>'s <code>controller_interface</code> headers to ensure deterministic actuator loop timing.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>Root-Cause Regression Diagnosis:</strong> Investigated strictness checks in <code>ResourceManager</code> / <code>ControllerManager</code> initialization pipelines that triggered runtime crashes in <code>gz_ros2_control</code>.</span>
                  </li>
                  <li className="proj-point">
                    <span className="proj-point-dot"></span>
                    <span><strong>CI / Build Pipeline Stabilization:</strong> Resolved cross-repository build failures, migrated <code>ros2_control</code> spawner configurations for the ROS 2 Kilted release, and introduced <code>ament_mypy</code> type validation.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills">
        <div className="skills-wrapper">
          <div className="reveal">
            <div className="sec-tag">Technical Competencies</div>
            <h2 className="sec-title">Skills &amp; <span style={{ color: "var(--cyan)" }}>Tooling</span></h2>
            <p className="sec-sub">Master technical matrix systematically categorizing competencies across autonomous robotics, perception, agentic AI, and embedded hardware.</p>
          </div>
          <div className="skills-bento">

            {/* 1. Robotics & Simulation (Wide, span 2) */}
            <div className="skill-card wide sk-c reveal reveal-delay-1">
              <div className="sk-icon">🤖</div>
              <div className="sk-cat">Core Autonomy · Manipulation · Digital Twins</div>
              <div className="sk-title">Robotics &amp; Simulation (ROS 2 Stack)</div>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Full-stack ROS 2 architecture from hardware interfaces and simulation bridges to multi-arm motion planning and autonomous mobile navigation.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'var(--bdr2)', color: 'var(--cyan)' }}>ROS 2 (Humble / Jazzy)</span>
                <span className="sk-tag" style={{ borderColor: 'var(--bdr2)', color: 'var(--cyan)' }}>rclcpp &amp; rclpy</span>
                <span className="sk-tag">Nav2 Stack Lifecycle</span>
                <span className="sk-tag">MoveIt 2</span>
                <span className="sk-tag">NVIDIA Isaac Sim</span>
                <span className="sk-tag">Omniverse &amp; USD/USDA</span>
                <span className="sk-tag">PhysX GPU Tuning</span>
                <span className="sk-tag">Gazebo (Harmonic / Classic)</span>
                <span className="sk-tag">ros2_control</span>
                <span className="sk-tag">hardware_interface</span>
                <span className="sk-tag">Micro-ROS</span>
                <span className="sk-tag">TF2 Transforms</span>
                <span className="sk-tag">URDF &amp; Xacro</span>
                <span className="sk-tag">Behavior Trees</span>
                <span className="sk-tag">OMPL (RRTConnect / RRT*)</span>
                <span className="sk-tag">AMCL Localization</span>
                <span className="sk-tag">DWB Local Planner</span>
                <span className="sk-tag">Sim-to-Real Transfer</span>
              </div>
            </div>

            {/* 2. Perception & Edge Vision (Span 1) */}
            <div className="skill-card sk-c reveal reveal-delay-2">
              <div className="sk-icon">👁️</div>
              <div className="sk-cat">Real-Time Vision &amp; Sensors</div>
              <div className="sk-title">Perception &amp; Edge Vision</div>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Sub-4ms CPU inference, object detection, and multi-modal spatial perception.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'var(--bdr2)', color: 'var(--cyan)' }}>ONNX Runtime (257 FPS)</span>
                <span className="sk-tag">YOLO (v5/v8/v11)</span>
                <span className="sk-tag">OpenCV</span>
                <span className="sk-tag">U-Net Segmentation</span>
                <span className="sk-tag">TensorRT &amp; Quantization (INT8)</span>
                <span className="sk-tag">RealSense D435i</span>
                <span className="sk-tag">2D / 3D LiDAR</span>
                <span className="sk-tag">EKF State Estimation</span>
              </div>
            </div>

            {/* 3. Agentic AI & Applied ML (Wide, span 2) */}
            <div className="skill-card wide sk-p reveal reveal-delay-1">
              <div className="sk-icon">🧠</div>
              <div className="sk-cat">Multi-Agent FSMs · Clinical Voice · Predictive Modeling</div>
              <div className="sk-title">Agentic AI, LLMs &amp; Applied Machine Learning</div>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Production multi-agent orchestrations with strict Human-in-the-Loop governance, multilingual Indic clinical voice intake, and cost-sensitive tabular risk modeling.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'rgba(168,85,247,0.3)', color: 'var(--pur)' }}>LangGraph Multi-Agent</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(168,85,247,0.3)', color: 'var(--pur)' }}>Google Gemini 2.0 / 2.5</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(168,85,247,0.3)', color: 'var(--pur)' }}>Sarvam AI (Indic STT/TTS)</span>
                <span className="sk-tag">LlamaParse</span>
                <span className="sk-tag">Pinecone Vector DB</span>
                <span className="sk-tag">Tavily AI Search</span>
                <span className="sk-tag">XGBoost &amp; LightGBM</span>
                <span className="sk-tag">Random Forest Ensembles</span>
                <span className="sk-tag">SHAP &amp; LIME Interpretability</span>
                <span className="sk-tag">Grad-CAM &amp; DiCE Counterfactuals</span>
                <span className="sk-tag">PyTorch &amp; TensorFlow / Keras 3</span>
                <span className="sk-tag">Transfer Learning (Xception / ResNet)</span>
              </div>
            </div>

            {/* 4. Embedded Systems & Hardware (Span 1) */}
            <div className="skill-card sk-a reveal reveal-delay-2">
              <div className="sk-icon">📡</div>
              <div className="sk-cat">Microcontrollers &amp; Protocols</div>
              <div className="sk-title">Embedded Systems &amp; Hardware</div>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Deterministic serial buses, motor actuation, and deep-sleep telemetry nodes.
              </div>
              <div className="sk-tags">
                <span className="sk-tag" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--amb)' }}>STM32 (F4/H7, UART DMA)</span>
                <span className="sk-tag">ESP32 / ESP32-S3</span>
                <span className="sk-tag">ESP8266 &amp; SIM800L GSM</span>
                <span className="sk-tag">TFLite Micro (INT8)</span>
                <span className="sk-tag">Eclipse Zenoh-Pico</span>
                <span className="sk-tag">FastDDS UDP Tuning</span>
                <span className="sk-tag">UART / SPI / I2C / PWM</span>
                <span className="sk-tag">FreeRTOS &amp; Arduino</span>
              </div>
            </div>

            {/* 5. Core Languages (Span 1) */}
            <div className="skill-card sk-c reveal reveal-delay-1">
              <div className="sk-icon">💻</div>
              <div className="sk-cat">Core Engineering Languages</div>
              <div className="sk-title">Languages</div>
              <div className="sk-bar-wrap">
                <div className="sk-bar-row">
                  <div className="sk-bar-label">C++ (C++14/C++17)</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="92" style={{ width: "92%" }}></div></div>
                  <div className="sk-bar-pct">92%</div>
                </div>
                <div className="sk-bar-row">
                  <div className="sk-bar-label">Python 3</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="95" style={{ width: "95%" }}></div></div>
                  <div className="sk-bar-pct">95%</div>
                </div>
                <div className="sk-bar-row">
                  <div className="sk-bar-label">Bash Shell Scripting</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="80" style={{ width: "80%" }}></div></div>
                  <div className="sk-bar-pct">80%</div>
                </div>
                <div className="sk-bar-row">
                  <div className="sk-bar-label">SQL &amp; Feature Stores</div>
                  <div className="sk-bar-track"><div className="sk-bar-fill c" data-w="75" style={{ width: "75%" }}></div></div>
                  <div className="sk-bar-pct">75%</div>
                </div>
              </div>
            </div>

            {/* 6. DevOps, Tooling & CAD (Wide, span 2) */}
            <div className="skill-card wide sk-a reveal reveal-delay-2">
              <div className="sk-icon">🛠️</div>
              <div className="sk-cat">Infrastructure · Microservices · Mechanical Design</div>
              <div className="sk-title">DevOps, MLOps, Tooling &amp; CAD</div>
              <div style={{ fontSize: '14.5px', color: 'var(--mid)', marginBottom: '14px', lineHeight: 1.65 }}>
                Reproducible robotics development workflows, containerized microservices, and competition CAD engineering.
              </div>
              <div className="sk-tags">
                <span className="sk-tag">Docker Containerization</span>
                <span className="sk-tag">Git &amp; GitHub Actions CI/CD</span>
                <span className="sk-tag">colcon &amp; CMake</span>
                <span className="sk-tag">Linux (Ubuntu 22.04 / 24.04)</span>
                <span className="sk-tag">FastAPI &amp; Flask</span>
                <span className="sk-tag">Streamlit Dashboards</span>
                <span className="sk-tag">pytest &amp; ament_mypy</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--amb)' }}>SolidWorks</span>
                <span className="sk-tag" style={{ borderColor: 'rgba(245,158,11,0.3)', color: 'var(--amb)' }}>Autodesk Fusion 360</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects">
        <div className="projects-wrapper">
          <div className="reveal">
            <div className="sec-tag">Authentic Portfolio</div>
            <h2 className="sec-title">Shipped <span style={{ color: "var(--cyan)" }}>Projects</span></h2>
            <p className="sec-sub">
              16 engineering repositories spanning 30-arm Isaac Sim digital twins, &gt;1 kHz motor interfaces, 257 FPS edge vision, and LangGraph agentic AI. Filter by domain or search by keyword below.
            </p>
          </div>

          {/* Search Bar */}
          <div className="proj-search-container">
            <div className="proj-search-icon">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by keyword, tech (e.g. Isaac Sim, YOLO, ESP32, ROS 2)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="proj-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="proj-search-clear"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="proj-filters">
            {categories.map(cat => (
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

          {/* Filter results count if searching */}
          {searchQuery && (
            <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--mid)', marginBottom: '16px' }}>
              Showing {filteredProjects.length} of {PROJECTS.length} projects matching "{searchQuery}"
            </div>
          )}

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
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-live-badge"
                        title="Open Live Deployment"
                      >
                        <span className="live-pulse"></span>
                        <span>Live App</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link-icon"
                        title="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="proj-title">{p.title}</div>
                <div className="proj-subtitle">{p.subtitle}</div>

                {/* Point-wise Highlights */}
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

                {/* Tech Stack Tags */}
                <div className="proj-stack">
                  {p.stack.map((tech, ti) => (
                    <span key={ti} className="proj-tech">{tech}</span>
                  ))}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedProject(p)}
                  className="proj-view-btn"
                >
                  <span>View Full Architecture &amp; Metrics</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== PROJECT DETAILS MODAL ===== */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              title="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div className="proj-icon" style={{ width: '48px', height: '48px', fontSize: '24px' }}>
                {selectedProject.icon}
              </div>
              <div>
                <span className="proj-badge">{selectedProject.badge}</span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)', marginTop: '4px' }}>
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--cyan)', marginBottom: '16px' }}>
              {selectedProject.subtitle}
            </div>

            <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', borderLeft: '3px solid var(--cyan)' }}>
              {selectedProject.overview || selectedProject.subtitle}
            </p>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'rgba(0,229,200,0.05)', border: '1px solid var(--bdr2)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
              {selectedProject.stats.map((s, si) => (
                <div key={si} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>{s.val}</div>
                  <div style={{ fontSize: '12px', color: 'var(--mid)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* MedSynapse 9-Modules Matrix Table if applicable */}
            {selectedProject.modulesTable && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>
                  9 Diagnostic Modules &amp; Quantitative Performance:
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'var(--mono)' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0,229,200,0.08)', borderBottom: '1px solid var(--bdr2)' }}>
                        <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--cyan)' }}>#</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--cyan)' }}>Disease Domain</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--cyan)' }}>Architecture</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--cyan)' }}>Accuracy</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--cyan)' }}>AUC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.modulesTable.map((m, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--bdr)' }}>
                          <td style={{ padding: '8px 12px', color: 'var(--cyan)' }}>{m.mod}</td>
                          <td style={{ padding: '8px 12px', color: 'var(--text)' }}>{m.disease}</td>
                          <td style={{ padding: '8px 12px', color: 'var(--mid)' }}>{m.arch}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'right', color: '#22c55e', fontWeight: 700 }}>{m.acc}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--cyan)' }}>{m.auc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CREDI-MITRA 5-Phase Workflow if applicable */}
            {selectedProject.phases && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>
                  5-Phase Autonomous Agentic Workflow (LangGraph ReAct):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedProject.phases.map((ph, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid var(--pur)', fontSize: '13.5px', color: 'var(--text)' }}>
                      {ph}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RealFake Robocon Benchmarks Table if applicable */}
            {selectedProject.benchmarks && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>
                  Runtime Inference Benchmarking (CPU-Only):
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'var(--mono)' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0,229,200,0.08)', borderBottom: '1px solid var(--bdr2)' }}>
                        <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--cyan)' }}>Backend</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--cyan)' }}>Average Latency</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--cyan)' }}>Throughput</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.benchmarks.map((b, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--bdr)' }}>
                          <td style={{ padding: '8px 12px', color: 'var(--text)' }}>{b.backend}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--mid)' }}>{b.latency}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'right', color: '#22c55e', fontWeight: 700 }}>{b.fps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Detailed Points */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>
                Key Technical Achievements &amp; Engineering Highlights:
              </div>
              <ul className="proj-points">
                {selectedProject.points.map((pt, i) => (
                  <li key={i} className="proj-point" style={{ marginBottom: '10px' }}>
                    <span className="proj-point-dot" style={{ marginTop: '6px' }}></span>
                    <span style={{ fontSize: '14px', lineHeight: 1.6 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.06em' }}>
                Technology &amp; Tooling Stack:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedProject.stack.map((t, ti) => (
                  <span key={ti} className="proj-tech" style={{ fontSize: '13px', padding: '5px 12px' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--bdr)' }}>
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <span className="live-pulse"></span>
                  <span>Launch Live Application ↗</span>
                </a>
              )}
              {selectedProject.repo && (
                <a
                  href={selectedProject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Github size={16} />
                  <span>GitHub Repository ↗</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-ghost"
                style={{ marginLeft: 'auto' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== ACHIEVEMENTS & AWARDS (Exact alignment with context/readme.md) ===== */}
      <section id="achievements">
        <div className="ach-wrapper">
          <div className="reveal">
            <div className="sec-tag">Proven Impact</div>
            <h2 className="sec-title">Awards &amp; <span style={{ color: "var(--cyan)" }}>Recognitions</span></h2>
            <p className="sec-sub">Verified competitive hackathon finishes, national robotics rankings, and core open-source achievements as documented in the master profile.</p>
          </div>
          <div className="ach-grid">
            {AWARDS_DATA.map((a) => (
              <div key={a.id} className="ach-card reveal reveal-delay-1">
                <div className="ach-card-top">
                  <div className="ach-medal">{a.medal}</div>
                  <span className="ach-badge">{a.badge}</span>
                </div>
                <div className="ach-title">{a.title}</div>
                <div className="ach-venue">{a.venue}</div>
                <div className="ach-desc">{a.desc}</div>
                <div className="ach-metric-row">
                  <span className="ach-metric-lbl">{a.metricLbl}</span>
                  <span className="ach-metric-val">{a.metricVal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact">
        <div className="contact-wrapper">
          <div className="reveal">
            <div className="sec-tag">Get In Touch</div>
            <h2 className="sec-title">Contact &amp; <span style={{ color: "var(--cyan)" }}>Connect</span></h2>
            <p className="sec-sub">
              Open to Physical AI, Robotics Software, MoveIt 2 / Nav2, Computer Vision, and Applied ML engineering internships, research collaborations, and open-source contributions.
            </p>
          </div>

          <div className="contact-card reveal reveal-delay-1">
            <div className="contact-big" style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', textAlign: 'center' }}>
              Let's Build Something <span style={{ color: "var(--cyan)" }}>Autonomous &amp; Intelligent.</span>
            </div>
            <p className="contact-sub" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '680px', fontSize: '15px' }}>
              Feel free to reach out directly via email, connect on LinkedIn, or explore open-source code repositories on GitHub.
            </p>

            {/* Action buttons (uniform row, Open in Gmail Web removed) */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', margin: '28px 0 20px' }}>
              <a
                href={`mailto:${PRIMARY_EMAIL}`}
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', fontSize: '14.5px' }}
                title={`Send email to ${PRIMARY_EMAIL}`}
              >
                <Mail size={16} /> Send Email
              </a>
              <a
                href="https://linkedin.com/in/shivammaurya14"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', fontSize: '14.5px' }}
              >
                <ExternalLink size={16} /> LinkedIn Profile ↗
              </a>
              <a
                href="https://github.com/ShivamMaurya14"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', fontSize: '14.5px' }}
              >
                <Github size={16} /> GitHub Profile ↗
              </a>
            </div>

            {/* Verified Details Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--mid)', marginTop: '20px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="var(--cyan)" /> {PRIMARY_EMAIL}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="var(--cyan)" /> {PHONE}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--cyan)" /> {LOCATION}
              </span>
            </div>

            {/* Tailored Role Resumes Hub (All 5 roles in exact requested order) */}
            <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--bdr)' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
                  Download <span style={{ color: 'var(--cyan)' }}>Resumes</span>
                </h3>
              </div>

              <div className="resume-hub-grid">
                {RESUMES.map((res) => (
                  <a
                    key={res.role}
                    href={res.file}
                    download={res.filename}
                    className="resume-hub-card"
                    title={`Download ${res.role} Resume`}
                  >
                    <div className="resume-hub-role">
                      <span>{res.icon}</span>
                      <span>{res.role}</span>
                    </div>
                    <div className="resume-hub-tag">{res.tag}</div>
                    <div className="resume-hub-action">
                      <Download size={13} />
                      <span>Download PDF</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '32px 20px', borderTop: '1px solid var(--bdr)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--mid)', fontSize: '14px' }}>
          <span>Designed &amp; Engineered by <strong>Shivam Maurya</strong></span>
          <span>·</span>
          <span>Army Institute of Technology, Pune</span>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>
          Main: <a href={`mailto:${PRIMARY_EMAIL}`} style={{ color: 'var(--cyan)' }}>{PRIMARY_EMAIL}</a> · © {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}
