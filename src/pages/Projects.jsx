import React, { useState, useEffect, useCallback } from "react";
import {
  FaGithub,
  FaReact,
  FaNodeJs,
  FaPython,
  FaLock,
  FaBrain,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  X,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Layers,
  Workflow,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { createPortal } from "react-dom";

// ==========================================
// DATA
// ==========================================
const projects = [
  {
    id: "cascade-shield",
    title: "CascadeShield",
    shortDescription: "Cyber-Physical Cascade Failure Prediction | Python, GNN, PyTorch.",
    fullDescription:
      "An infrastructure cascade failure prediction system modeling how cyberattacks and physical faults propagate across highly interconnected, multi-subsystem city grids (Power, Water, Traffic, Transit).",
    problem:
      "Predicting how localized cyberattacks or physical faults cascade through interconnected smart-city infrastructure networks where compromised nodes represent a small minority (only 8.2% affected vs. 91.8% safe nodes).",
    whyItMatters:
      "Urban power, water, traffic, and transit networks share tight cyber-physical dependencies. Failing to identify high-centrality bridge nodes beforehand leaves cities exposed to multi-sector blackouts triggered by a single substation or SCADA compromise.",
    solution:
      "Fused standardized IEEE Power Test Feeders (via OpenDSS) with synthetic SCADA and IoT cross-dependencies into a 2,278-node tri-layer graph, simulated continuous-time contagion with a SimPy SEIR Discrete Event Simulator, and trained a Pairwise-Ranking GNN benchmarked against classical SEIR and distance heuristics inside a FastAPI + React SCADA dashboard.",
    architecture:
      "Tri-layer topology synthesis (OpenDSS to NetworkX/Neo4j), SimPy SEIR discrete-event failure simulator, PyTorch Geometric pairwise-ranking GNN, FastAPI inference server, and a `react-force-graph-2d` control-room visualizer.",
    workflow: [
      { step: "01", title: "Topology Synthesis", detail: "Fuse IEEE Power Test Feeders (OpenDSS) with SCADA & IoT dependencies into a 2,278-node graph." },
      { step: "02", title: "SEIR Simulation", detail: "Generate continuous-time cascade trajectories from ICS telemetry origins (PWR_111–114) using SimPy." },
      { step: "03", title: "Pairwise Ranking GNN", detail: "Train PyTorch Geometric GNN with pairwise ranking loss to counter 91.8% safe-node imbalance." },
      { step: "04", title: "SCADA Dashboard", detail: "Serve scenario predictions via FastAPI to a React + react-force-graph-2d visualizer." },
    ],
    results: [
      "Reproducibility-audited 0.9089 ± 0.0003 ROC-AUC and 0.6790 ± 0.0060 Precision@K across 3 seeds",
      "Statistically significant global AUC gain over Naive Distance heuristic (0.8991 AUC, 0.6601 P@K) and MLP (0.9014 AUC)",
      "GNN recovers structural proximity (~0.83–0.84 AUC) via message passing even when explicit distance is withheld (MLP drops to ~0.56)",
    ],
    limitations: [
      "Evaluated on synthetic SCADA/IoT cross-dependencies fused with IEEE test feeders rather than proprietary live utility telemetry",
      "Topological shortest-path distance already achieves 0.8991 AUC, so the GNN adds +0.0098 AUC and top-K precision varies across random seeds",
      "Local FastAPI + Vite deployment; no public hosted demo URL is live",
    ],
    image: "/projects/cascade_shield.jpg",
    screenshots: [],
    tech: [
      { icon: <FaPython />, name: "Python", color: "text-purple-400" },
      { icon: <FaBrain />, name: "GNNs", color: "text-fuchsia-400" },
      { icon: <FaDatabase />, name: "Data Modeling", color: "text-violet-400" },
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/Cascade-Shield",
    year: "2024",
    role: "Lead Developer",
    status: "Completed",
  },
  {
    id: "cyber-dna",
    title: "Cyber DNA",
    shortDescription: "Continuous Behavioral Authentication for Insider-Threat Detection.",
    fullDescription:
      "A behavioral authentication framework generating per-user 'digital DNA' profiles from login, device, email, and HTTP activity patterns evaluated on the 1.3GB CMU CERT r4.2 dataset.",
    problem:
      "Detecting malicious or compromised insiders buried inside massive chronological enterprise telemetry (72 weeks of logons, USB transfers, emails, and web requests) without data leakage or excessive false alerts.",
    whyItMatters:
      "Insiders already hold legitimate credentials, bypassing traditional perimeter firewalls. Late detection of off-hours data staging or unauthorized USB transfers creates severe intellectual property, financial, and regulatory risks.",
    solution:
      "Built an end-to-end pipeline computing temporal behavioral drift metrics (BDS, IDP, BC, SRC), replacing manual feature ablation with a Quantum-Inspired Evolutionary Algorithm (QEA), optimizing XGBoost via Optuna under strict rolling-origin chronological cross-validation, and surfacing SHAP explanations plus Mamdani Fuzzy risk tiers in a React SOC dashboard.",
    architecture:
      "CERT r4.2 loader, leak-free temporal drift extractor, QEA vs. DEAP Genetic Algorithm feature selectors, Optuna-tuned XGBoost + PyTorch LSTM baseline, Mamdani Fuzzy Logic tiering, SHAP explainability, and a React + Vite SOC Analyst UI.",
    workflow: [
      { step: "01", title: "Telemetry Ingestion", detail: "Parse 72 weeks of CMU CERT r4.2 logon, USB, email, and HTTP activity logs." },
      { step: "02", title: "Behavioral Drift", detail: "Compute per-user BDS, IDP, BC, and SRC metrics with leak-free normalization." },
      { step: "03", title: "QEA Feature Search", detail: "Select optimal behavioral features using qubit rotation-gate updates (QEA vs. GA)." },
      { step: "04", title: "Rolling CV & Fuzzy SOC UI", detail: "Run Optuna XGBoost across rolling folds, assign Low/Medium/High fuzzy tiers & SHAP plots." },
    ],
    results: [
      "Rolling-origin mean Precision: 87.1% (0.871 ± 0.125) and mean AUPRC: 0.607 ± 0.263",
      "Mean F1 Score: 0.486 ± 0.082 across strict leak-free chronological evaluation folds",
      "Triaged 7,667 evaluated instances into 9 High, 61 Medium, and 7,597 Low risk tiers with SHAP attribution",
    ],
    limitations: [
      "Conservative mean Recall (33.7% / 0.337 ± 0.061) and notable cross-fold AUPRC variance (std 0.263) under severe insider class imbalance",
      "McNemar test vs. baseline heuristic (p = 0.109) shows modest statistical separation on rare positive counts",
      "Evaluated on historical CMU CERT r4.2 benchmark files rather than live streaming enterprise SIEM logs",
    ],
    image: "/projects/cyber_dna.jpg",
    screenshots: [
      {
        src: "/projects/cyberdna_convergence.png",
        caption: "Feature Selection Convergence: QEA (Quantum-Inspired) vs. GA (DEAP) across folds",
      },
      {
        src: "/projects/cyberdna_shap.png",
        caption: "SHAP Feature Impact Summary across USB, after-hours logon, and IDP indicators",
      },
    ],
    tech: [
      { icon: <FaNodeJs />, name: "JavaScript", color: "text-purple-400" },
      { icon: <FaCode />, name: "Analytics", color: "text-violet-400" },
      { icon: <FaLock />, name: "Authentication", color: "text-fuchsia-400" },
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/Cyber-DNA--MIT",
    year: "2024",
    role: "Security Engineer",
    status: "Completed",
  },
  {
    id: "qr-intel",
    title: "QRIntel",
    shortDescription: "Explainable Threat Intelligence Platform for Malicious QR Infrastructure.",
    fullDescription:
      "A proactive, multi-modal cybersecurity intelligence platform detecting malicious QR-based infrastructure ('quishing'), fake UPI payloads, and nested redirect campaigns with deterministic JSON audit logs.",
    problem:
      "Phishing via QR codes ('quishing') obfuscates malicious destinations, multi-hop redirects, and fraudulent payment payloads inside physical or digital QR images that bypass standard URL inspection.",
    whyItMatters:
      "Mobile cameras and browsers follow decoded QR links automatically without inspecting DNS age, SSL posture, redirect chains, or credential-harvesting DOM patterns—putting end users and enterprise teams at immediate risk.",
    solution:
      "Built a Flask + React intelligence platform combining multi-strategy OpenCV QR decoding, lexical/DNS/redirect/SSL analysis, headless Selenium visual & DOM tracing, predictive campaign forecasting, NetworkX behavioral trust graphs, and deterministic JSON audit logs for SOC analysts.",
    architecture:
      "Python Flask backend (OpenCV decoder, risk orchestrator, Selenium DOM/screenshot tracer, SQLite caches), NetworkX threat clustering, and a React + Tailwind + Recharts analytics hub.",
    workflow: [
      { step: "01", title: "Zero-Trust Decode", detail: "Decode QR images or raw payloads (URLs, UPI, vCards) via multi-strategy OpenCV." },
      { step: "02", title: "Multi-Modal Inspection", detail: "Inspect lexical entropy, DNS/SSL intelligence, redirects, and headless Selenium DOM." },
      { step: "03", title: "Risk & Graph Engine", detail: "Compute weighted risk score, campaign velocity forecasts, and NetworkX actor clusters." },
      { step: "04", title: "SOC Audit Hub", detail: "Emit deterministic JSON audit logs and ROC/PR evaluation views in the React dashboard." },
    ],
    results: [
      "Published research paper on IEEE Xplore (Document 11746844)",
      "Achieved 95.1% Accuracy, 100.0% Precision, 90.2% Recall, and 0.9485 F1 Score on benchmark datasets",
      "Zero-Day Temporal Holdout: TN = 1,712, FP = 3, FN = 21, TP = 1,694; Full-system ablation F1 = 85.33% (vs. 67.29% without content module)",
    ],
    limitations: [
      "Live remote threat feeds (VirusTotal, Google Safe Browsing, AbuseIPDB, AlienVault OTX) require API keys and fall back to local mock feeds without credentials",
      "Headless Selenium visual/DOM tracing requires local Chrome runtime and introduces higher latency than static lexical checks",
    ],
    image: "/projects/qr_intel.jpg",
    screenshots: [
      {
        src: "/projects/qrintel_confusion_matrix.png",
        caption: "Zero-Day Temporal Holdout Confusion Matrix (TN=1712, FP=3, FN=21, TP=1694)",
      },
      {
        src: "/projects/qrintel_ablation_study.png",
        caption: "Ablation Study: F1-Score impact when removing DNS, Brand, Graph, Lexical, or Content modules",
      },
    ],
    tech: [
      { icon: <FaPython />, name: "Python", color: "text-purple-400" },
      { icon: <FaCode />, name: "Analysis Engine", color: "text-fuchsia-400" },
      { icon: <FaDatabase />, name: "Threat Intel", color: "text-violet-400" },
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/QR-Intel-2.0",
    paperUrl: "https://ieeexplore.ieee.org/document/11746844",
    year: "2024",
    role: "Threat Intel Dev",
    status: "Completed",
  },
  {
    id: "agilegraph",
    title: "AgileGraph",
    shortDescription: "Graph-Learned Crypto-Agility Risk Scoring for Post-Quantum Migration.",
    fullDescription:
      "An automated cryptographic discovery, typed property-graph modeling, and crypto-agility risk scoring platform engineered for post-quantum cryptographic (PQC) migration across multi-language codebases.",
    problem:
      "Large multi-language codebases conceal legacy cryptographic primitives (such as RSA and ECC) across AST call sites and package manifests without an automated map of blast radius or post-quantum migration urgency.",
    whyItMatters:
      "Quantum computing advances threaten classical public-key cryptography ('Harvest Now, Decrypt Later'). Organizations must prioritize which vulnerable primitives and dependencies pose the highest Mosca-theorem risk before migration deadlines.",
    solution:
      "Built an automated scanner and graph-scoring platform that inventories cryptographic primitives across Python, Java, Go, and manifests, builds 6-node property graphs, computes deterministic 7-factor heuristic risk scores and Mosca urgency across a 6-state remediation lifecycle, and evaluates a Heterogeneous GATv2 model behind a FastAPI + React/TypeScript multi-user dashboard.",
    architecture:
      "Multi-language AST/manifest scanners, 6-node property graph builder, 7-factor heuristic & Mosca engine, PyTorch Geometric Heterogeneous GATv2 model, FastAPI with bcrypt/PyJWT isolation, and React 19 + TypeScript + Vite dashboard.",
    workflow: [
      { step: "01", title: "Codebase Scanning", detail: "Inventory cryptographic primitives across Python AST, Java, Go, and package manifests." },
      { step: "02", title: "Property Graph", detail: "Construct formal 6-node typed property graphs capturing files, primitives, and call edges." },
      { step: "03", title: "Risk & Mosca Triage", detail: "Compute 7-factor heuristic scores, Mosca PQC urgency, and 6-state lifecycle tracking." },
      { step: "04", title: "GATv2 & Dashboard", detail: "Run Heterogeneous GATv2 structural propagation and serve isolated views in React + FastAPI." },
    ],
    results: [
      "439 passing backend pytest tests (4 Windows symlink/FIFO skips) and 40 passing frontend Vitest tests",
      "Clean frontend TypeScript + Vite production build and CI pipeline across 8 pinned benchmark repositories",
      "Operational static scanners, 7-factor heuristic scoring, Mosca PQC triage, and bcrypt + PyJWT multi-user isolation",
    ],
    limitations: [
      "Ongoing B.Tech Major Project (2023–2027); not yet deployed to a public hosted demo URL",
      "Heterogeneous GATv2 is evaluated via weak-label distillation under 8-fold LOPO cross-repository shift against heuristic priors; independent human expert consensus validation is blocked",
      "Deterministic 7-factor heuristic scores remain the authoritative ground truth rather than formal cryptographic proofs",
    ],
    image: "/projects/agilegraph.jpg",
    screenshots: [],
    tech: [
      { icon: <FaPython />, name: "Python / FastAPI", color: "text-purple-400" },
      { icon: <FaReact />, name: "React / TypeScript", color: "text-fuchsia-400" },
      { icon: <FaBrain />, name: "GATv2 GNN", color: "text-violet-400" },
      { icon: <FaLock />, name: "PQC Agility", color: "text-purple-300" },
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/agilegraph--major-project",
    year: "2026",
    role: "Major Project Team",
    status: "Ongoing",
  },
];

// ==========================================
// DEDICATED CASE STUDY PAGE OVERLAY
// ==========================================
const CaseStudyPage = ({ project, onClose, nextProject, prevProject }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-gray-950 overflow-y-auto custom-scrollbar"
      data-lenis-prevent="true"
    >
      {/* Top Sticky Case Study Header */}
      <div className="sticky top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 bg-gray-950/85 backdrop-blur-md border-b border-white/10">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400" />
          <span>Back to Projects</span>
        </button>

        <div className="hidden sm:block text-xs font-bold tracking-widest uppercase text-purple-400">
          Case Study // {project.title}
        </div>

        <button
          onClick={onClose}
          aria-label="Close case study"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden group border-b border-white/10">
        <motion.div layoutId={`project-image-${project.id}`} className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/20" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 lg:px-24 max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              {project.status} &bull; {project.year}
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter mb-4">
              {project.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Case Study Content */}
      <div className="max-w-[100rem] mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24 flex flex-col lg:flex-row gap-16">
        {/* Left Main Column */}
        <div className="w-full lg:w-2/3 flex flex-col gap-16">
          {/* 1. The Problem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4" />
              <span>01 / The Problem</span>
            </div>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              {project.problem}
            </p>
          </motion.section>

          {/* 2. Why the Problem Matters */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-400 uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" />
              <span>02 / Why the Problem Matters</span>
            </div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {project.whyItMatters}
            </p>
          </motion.section>

          {/* 3. Solution */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              <span>03 / Solution</span>
            </div>
            <p className="text-base md:text-xl text-gray-200 font-light leading-relaxed">
              {project.solution}
            </p>
          </motion.section>

          {/* 4. Architecture & Workflow */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <Workflow className="w-4 h-4" />
              <span>04 / Architecture &amp; Workflow</span>
            </div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {project.architecture}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {project.workflow.map((stage) => (
                <div
                  key={stage.step}
                  className="rounded-2xl border border-white/10 bg-[#0a0a12] p-5 space-y-2 hover:border-purple-500/40 transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-purple-400">
                    STEP {stage.step}
                  </span>
                  <h4 className="text-base font-bold text-white">{stage.title}</h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 5. Results & Limitations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <BarChart3 className="w-4 h-4" />
              <span>05 / Results &amp; Limitations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Verified Results */}
              <div className="rounded-2xl border border-purple-500/25 bg-purple-500/[0.04] p-6 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                  Verified Results
                </h4>
                <ul className="space-y-3">
                  {project.results.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-200 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Honest Limitations */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">
                  Limitations &amp; Scope
                </h4>
                <ul className="space-y-3">
                  {project.limitations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* 6. Screenshots & Evaluation Visuals */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>06 / Visuals, Benchmarks &amp; Demo</span>
            </div>

            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((shot, idx) => (
                  <figure
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#0a0a12] overflow-hidden flex flex-col"
                  >
                    <div className="bg-white p-2">
                      <img
                        src={shot.src}
                        alt={shot.caption}
                        className="w-full h-56 object-contain"
                      />
                    </div>
                    <figcaption className="p-4 text-xs text-gray-300 leading-relaxed border-t border-white/10">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-[#0a0a12] p-6 text-sm text-gray-400 leading-relaxed">
                This system runs locally via its backend API and React dashboard (no public cloud
                demo URL is hosted). Full setup commands, reproduction scripts, and architecture
                documentation are available in the GitHub repository.
              </div>
            )}
          </motion.section>
        </div>

        {/* Right Sticky Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 space-y-12">
            {/* Project Metadata */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-white/10 pb-3">
                Case Study Details
              </h3>
              <div className="grid grid-cols-2 gap-y-5">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Year</div>
                  <div className="text-white font-medium">{project.year}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</div>
                  <div className="text-white font-medium">{project.role}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
                  <div className="text-purple-400 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    {project.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-white/10 pb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <div
                    key={idx}
                    className="relative px-4 py-2 text-gray-300 font-medium text-sm rounded-full border border-white/10 overflow-hidden group cursor-default"
                  >
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      {t.icon} {t.name}
                    </span>
                    <div className="absolute inset-0 bg-purple-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </div>
                ))}
              </div>
            </div>

            {/* 7. GitHub & Publication Links */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest border-b border-white/10 pb-3">
                07 / Source &amp; Publication
              </h3>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-purple-500/50 hover:bg-white/[0.06] p-4 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">GitHub Repository</div>
                    <div className="text-xs text-gray-400">Inspect source code &amp; docs</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </a>

              {project.paperUrl && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 p-4 text-purple-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Published Paper</div>
                      <div className="text-xs text-purple-300/80">Read on IEEE Xplore</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Previous / Next Case Study Navigation */}
      <div className="w-full flex border-t border-white/10">
        <button
          onClick={prevProject}
          className="w-1/2 p-8 md:p-16 bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col items-start gap-2 text-left"
        >
          <span className="text-purple-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Previous Case Study
          </span>
        </button>
        <button
          onClick={nextProject}
          className="w-1/2 p-8 md:p-16 bg-gray-900 hover:bg-gray-800 transition-colors border-l border-white/10 flex flex-col items-end text-right gap-2"
        >
          <span className="text-purple-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            Next Case Study <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </motion.div>,
    document.body
  );
};

// ==========================================
// MAIN COMPONENT (Stacking Cards)
// ==========================================
export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const openCaseStudy = useCallback((project) => {
    setActiveProject(project);
    window.history.replaceState(null, "", `#case-study/${project.id}`);
  }, []);

  const closeCaseStudy = useCallback(() => {
    setActiveProject(null);
    if (window.location.hash.startsWith("#case-study/")) {
      window.history.replaceState(null, "", "#projects");
    }
  }, []);

  // Support direct hash navigation (#case-study/<id>)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#case-study/")) {
        const slug = hash.replace("#case-study/", "");
        const matched = projects.find((p) => p.id === slug);
        if (matched) setActiveProject(matched);
      } else {
        setActiveProject(null);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const navigateProject = (direction) => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = projects.length - 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    openCaseStudy(projects[nextIndex]);
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-12 relative bg-[#060608]">
      {/* Title */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-5xl md:text-7xl font-display font-black mb-4 text-white tracking-tighter">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
            Projects
          </span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Click any project card to open its full case study—covering problem framing, architecture, results, limitations, and source code.
        </p>
      </div>

      {/* The Stack */}
      <div className="max-w-6xl mx-auto px-6 relative pb-32 flex flex-col gap-8 md:gap-16">
        {projects.map((project, index) => {
          const topOffset = 100 + index * 30;

          return (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => openCaseStudy(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openCaseStudy(project);
                }
              }}
              aria-label={`Open case study for ${project.title}`}
              className="sticky w-full h-[70vh] min-h-[500px] rounded-[3rem] overflow-hidden border border-white/10 hover:border-purple-500/40 bg-[#0a0a0f] shadow-2xl flex flex-col md:flex-row group cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              style={{ top: `${topOffset}px` }}
            >
              {/* Left: Image */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                <motion.img
                  layoutId={`project-image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/[0.02] backdrop-blur-xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">
                    0{index + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-300">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCaseStudy(project);
                    }}
                    className="w-fit flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-gray-950 font-bold hover:bg-purple-400 hover:text-white transition-colors"
                  >
                    Read Case Study <ArrowRight className="w-5 h-5" />
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-fit flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/15 bg-white/5 text-gray-200 font-semibold hover:bg-white/15 hover:text-white transition-colors"
                  >
                    <FaGithub className="w-4 h-4" /> GitHub
                  </a>

                  {project.paperUrl && (
                    <a
                      href={project.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-fit flex items-center gap-2 px-5 py-3.5 rounded-full border border-purple-400/40 bg-purple-500/10 text-purple-200 font-bold hover:bg-purple-500/25 hover:text-white transition-colors"
                    >
                      IEEE Paper <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DEDICATED CASE STUDY PAGE */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyPage
            project={activeProject}
            onClose={closeCaseStudy}
            nextProject={() => navigateProject(1)}
            prevProject={() => navigateProject(-1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
