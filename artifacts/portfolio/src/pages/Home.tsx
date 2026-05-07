import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Terminal, Database, Cloud, FileCode2, MapPin, Phone, Download, Star, Award, Layers, Users } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import HeroParticles from "@/components/HeroParticles";
import SteamDeco from "@/components/SteamDeco";
import SectionTransition from "@/components/SectionTransition";

import project1Img from "../assets/project-1.png";
import project2Img from "../assets/project-2.png";
import project3Img from "../assets/project-3.png";

const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const STAGGER_CHILDREN = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } }
};

const HEADING_CHILD = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO }
  }
};

/* ─── Speech bubble with rotating taglines ─── */
const TAGLINES = [
  "Brewing ideas into products ☕",
  "Coffee → Code → Ship",
  "Let's build something meaningful",
];

function SpeechBubble() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 3800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mb-4">
      <div className="speech-bubble-tail px-5 py-2.5 rounded-2xl border border-coffee-bronze/30 bg-coffee-espresso/90 text-coffee-latte text-xs font-sans text-center min-w-[200px] backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="block"
          >
            {TAGLINES[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Brew mini-game sounds (Web Audio API, no external files) ─── */
function playDripSound(brewLevel: number) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    // Pitch rises as cup fills — liquid in a fuller vessel resonates higher
    const startFreq = 260 + (brewLevel / 100) * 220;
    const endFreq   = 140 + (brewLevel / 100) * 120;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.14);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
    osc.onended = () => ctx.close();
  } catch { /* audio not supported */ }
}

function playRewardSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    // Ascending major arpeggio: C5 → E5 → G5 → C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.14;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
      osc.start(t);
      osc.stop(t + 0.45);
    });
    setTimeout(() => ctx.close(), 1800);
  } catch { /* audio not supported */ }
}

/* ─── Brew mini-game reward particles ─── */
const REWARD_PARTICLES = [
  { angle: 0,   color: "#c9a97a" },
  { angle: 45,  color: "#f5cba7" },
  { angle: 90,  color: "#a0622a" },
  { angle: 135, color: "#c9a97a" },
  { angle: 180, color: "#f5cba7" },
  { angle: 225, color: "#a0622a" },
  { angle: 270, color: "#c9a97a" },
  { angle: 315, color: "#f5cba7" },
];

/* ─── Animated coffee cup illustration ─── */
function AnimatedCoffeeCup() {
  const [hovering, setHovering] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [rippleActive, setRippleActive] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [brewLevel, setBrewLevel] = useState(0);
  const [rewarded, setRewarded] = useState(false);
  const [rewardKey, setRewardKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const brewLevelRef = useRef(0);
  const rewardedRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-120, 120], [8, -8]);
  const rotateY = useTransform(mouseX, [-120, 120], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    if (rewardedRef.current) return;
    setRippleKey(k => k + 1);
    setRippleActive(true);
    setClicking(true);
    setTimeout(() => setRippleActive(false), 900);
    setTimeout(() => setClicking(false), 600);

    const next = Math.min(brewLevelRef.current + 10, 100);
    brewLevelRef.current = next;
    setBrewLevel(next);
    if (next >= 100) {
      rewardedRef.current = true;
      setRewarded(true);
      setRewardKey(k => k + 1);
      playRewardSound();
      setTimeout(() => {
        rewardedRef.current = false;
        brewLevelRef.current = 0;
        setRewarded(false);
        setBrewLevel(0);
      }, 2800);
    } else {
      playDripSound(next);
    }
  };

  // Steam intensity scales with brew level + hover
  const brewBoost = brewLevel / 100;
  const steamOpacity = Math.min((hovering ? 0.8 : 0.45) + brewBoost * 0.5, 1.0);
  // Steam speed: animate faster as cup fills up
  const steamDuration = hovering
    ? Math.max(0.65, 1.1 - brewBoost * 0.45)
    : Math.max(1.0, 2.2 - brewBoost * 1.2);

  // Liquid fill: cup interior spans y=90 (full) to y=205 (empty), height=115
  const liquidTop = 205 - (brewLevel / 100) * 115;

  // Top surface opacity: fades from 0.15 (empty) to 1.0 (full) so cup looks emptier at 0%
  const surfaceOpacity = 0.15 + brewBoost * 0.85;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        className="coffee-bob cursor-pointer select-none relative"
        style={{ perspective: "600px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        title={brewLevel === 0 ? "Click to brew ☕" : `${brewLevel}% brewed — keep clicking!`}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={clicking ? { y: [-4, 7, -4, 2, 0] } : { y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 180 240"
            width="200"
            height="230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="md:w-[240px] md:h-[260px]"
          >
            <defs>
              {/* Clip path matching the cup body interior */}
              <clipPath id="cup-body-clip">
                <path d="M 39 83 L 141 83 L 129 192 Q 127 207 90 207 Q 53 207 51 192 Z" />
              </clipPath>
            </defs>

            {/* Drop shadow under saucer */}
            <ellipse cx="90" cy="228" rx="66" ry="7" fill="rgba(0,0,0,0.38)" />

            {/* Saucer outer */}
            <ellipse cx="90" cy="220" rx="62" ry="9.5" fill="rgba(59,31,18,0.7)" stroke="#a0622a" strokeWidth="1.5" />
            {/* Saucer inner lip */}
            <ellipse cx="90" cy="219" rx="44" ry="5.5" fill="rgba(201,169,122,0.07)" stroke="#c9a97a" strokeWidth="0.8" />

            {/* Cup body */}
            <path
              d="M 38 82 L 142 82 L 130 192 Q 128 208 90 208 Q 52 208 50 192 Z"
              fill="rgba(59,31,18,0.55)"
              stroke="#a0622a"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* ── Brew liquid fill (rises from bottom with each click) ── */}
            <rect
              x="30"
              width="120"
              y={liquidTop}
              height={Math.max(0, 210 - liquidTop)}
              fill="rgba(101,55,20,0.82)"
              clipPath="url(#cup-body-clip)"
              style={{ transition: "y 0.4s cubic-bezier(0.34,1.56,0.64,1), height 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
            />
            {/* Liquid surface sheen */}
            {brewLevel > 0 && (
              <ellipse
                cx="90"
                cy={liquidTop}
                rx="46"
                ry="7"
                fill="rgba(140,82,30,0.55)"
                clipPath="url(#cup-body-clip)"
                style={{ transition: "cy 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
              />
            )}

            {/* Ceramic highlight strip (left sheen) */}
            <path
              d="M 42 88 L 60 190 Q 62 202 70 206"
              stroke="rgba(253,246,238,0.10)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />

            {/* Handle outer */}
            <path
              d="M 142 104 C 178 104 178 166 142 166"
              fill="none"
              stroke="#a0622a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Handle inner highlight */}
            <path
              d="M 142 114 C 168 114 168 156 142 156"
              fill="none"
              stroke="rgba(201,169,122,0.22)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Rim arc */}
            <path
              d="M 34 82 Q 90 70 146 82"
              fill="rgba(160,98,42,0.28)"
              stroke="#c9a97a"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Coffee dark surface — fades in as cup fills */}
            <ellipse cx="90" cy="98" rx="48" ry="10" fill="rgba(18,8,3,0.88)" opacity={surfaceOpacity} style={{ transition: "opacity 0.3s ease" }} />

            {/* Crema foam ring */}
            <ellipse cx="90" cy="96" rx="40" ry="7" fill="rgba(140,82,30,0.32)" opacity={surfaceOpacity} style={{ transition: "opacity 0.3s ease" }} />

            {/* Latte art swirl */}
            <path
              d="M 90 90 C 102 88 112 93 109 99 C 106 105 96 107 89 103 C 82 99 78 92 85 89 C 88 88 93 90 96 93"
              stroke="rgba(201,169,122,0.55)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity={surfaceOpacity}
              style={{ transition: "opacity 0.3s ease" }}
            />

            {/* Ripple on click */}
            <AnimatePresence>
              {rippleActive && (
                <motion.ellipse
                  key={rippleKey}
                  cx="90"
                  cy="96"
                  rx={8}
                  ry={3}
                  fill="none"
                  stroke="#c9a97a"
                  strokeWidth="1.5"
                  initial={{ scaleX: 1, scaleY: 1, opacity: 0.85 }}
                  animate={{ scaleX: 6, scaleY: 5, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  style={{ transformOrigin: "90px 96px" }}
                />
              )}
            </AnimatePresence>

            {/* Ring stain decorative motif */}
            <ellipse cx="78" cy="166" rx="20" ry="4.5" fill="none" stroke="rgba(160,98,42,0.10)" strokeWidth="1" />

            {/* Brand mark */}
            <text
              x="90"
              y="158"
              textAnchor="middle"
              fontSize="17"
              fontFamily="Georgia, serif"
              fill="rgba(201,169,122,0.30)"
              fontWeight="700"
            >
              JU.
            </text>

            {/* Steam wisps — speed and opacity scale with brew level */}
            <path
              d="M 66 78 C 62 62 70 50 66 34"
              stroke="#c9a97a"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={steamOpacity}
              style={{ animation: `steam-waft ${steamDuration}s ease-in infinite`, transformOrigin: "bottom center" }}
            />
            <path
              d="M 90 74 C 86 58 94 46 90 30"
              stroke="#c9a97a"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={steamOpacity}
              style={{ animation: `steam-waft ${steamDuration}s ease-in infinite ${steamDuration * 0.2}s`, transformOrigin: "bottom center" }}
            />
            <path
              d="M 114 78 C 110 62 118 50 114 34"
              stroke="#c9a97a"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={steamOpacity}
              style={{ animation: `steam-waft ${steamDuration}s ease-in infinite ${steamDuration * 0.4}s`, transformOrigin: "bottom center" }}
            />

            {/* ── Reward burst particles at 100% ── */}
            <AnimatePresence>
              {rewarded && REWARD_PARTICLES.map((p, i) => {
                const rad = (p.angle * Math.PI) / 180;
                const tx = Math.cos(rad) * 55;
                const ty = Math.sin(rad) * 55;
                return (
                  <motion.circle
                    key={`${rewardKey}-${i}`}
                    cx="90"
                    cy="145"
                    r="4"
                    fill={p.color}
                    initial={{ cx: 90, cy: 145, opacity: 1, scale: 1 }}
                    animate={{ cx: 90 + tx, cy: 145 + ty, opacity: 0, scale: 0.3 }}
                    exit={{}}
                    transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.04 }}
                  />
                );
              })}
            </AnimatePresence>
          </svg>
        </motion.div>
      </div>

      {/* ── Idle hint (shown before first click) ── */}
      <AnimatePresence>
        {brewLevel === 0 && !rewarded && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-0.5 text-center"
          >
            <p className="text-coffee-latte/70 text-xs font-sans tracking-wide">
              Click to brew ☕
            </p>
            <p className="text-coffee-latte/40 text-[10px] font-sans">
              Choose your drink:{" "}
              <span className="line-through opacity-60">Latte · Cappuccino · Flat White</span>
            </p>
            <p className="text-coffee-bronze/70 text-[10px] font-sans italic">
              N/A — Jayanth only drinks Americano.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Brew progress bar + label ── */}
      <AnimatePresence>
        {brewLevel > 0 && !rewarded && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-1.5 w-[160px] md:w-[200px]"
          >
            <div className="text-coffee-latte/80 text-xs font-sans tracking-wide">
              {brewLevel}% brewed ☕
            </div>
            <div className="w-full h-1.5 rounded-full bg-coffee-espresso/60 overflow-hidden border border-coffee-bronze/20">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-800 to-amber-500"
                animate={{ width: `${brewLevel}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Reward celebration overlay ── */}
      <AnimatePresence>
        {rewarded && (
          <motion.div
            key={rewardKey}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl border border-coffee-bronze/40 bg-coffee-espresso/90 backdrop-blur-sm text-center"
          >
            <span className="text-base">✨</span>
            <p className="text-coffee-latte text-xs font-sans leading-snug max-w-[160px]">
              Fully caffeinated.<br />Let's build something.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Static data ─── */

const PROJECTS = [
  {
    title: "TogetherFlow",
    tagline: "Real-time collaborative task management",
    problem: "Teams working async lose visibility into blockers, ownership, and status — wasting hours in status meetings and context switching.",
    solution: "Full-stack web app with real-time collaborative boards, role-based access, and automated notifications. Designed and shipped end-to-end as a solo project.",
    tech: ["React", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    image: project1Img,
    github: null as string | null,
    demo: null as string | null,
    note: "Personal project — actively in development" | null
  },
  {
    title: "Photo Organizer",
    tagline: "AI-assisted personal photo library organizer",
    problem: "Large personal photo libraries lack intelligent organization — manual tagging is slow and album structures don't scale.",
    solution: "Local-first photo organizer using computer vision to auto-tag images by scene and subject, generating smart albums and a searchable gallery interface.",
    tech: ["Python", "OpenCV", "Flask", "React", "SQLite"],
    image: project2Img,
    github: null as string | null,
    demo: null as string | null,
    note: "Personal project — actively in development."
  },
  {
    title: "USF Dining App",
    tagline: "Campus dining discovery & menu browsing",
    problem: "USF students had no mobile-friendly way to check real-time dining hours, menus, and dietary filters across all campus locations.",
    solution: "Responsive campus dining discovery app aggregating menus, hours, and dietary info with search and filter across all USF dining locations.",
    tech: ["React", "Python", "Flask", "PostgreSQL", "REST APIs"],
    image: project3Img,
    github: "https://github.com/PriyaankaReddyB/usf-dining-web-app"| null,
    demo: "https://priyaankareddyb.github.io/usf-dining-web-app/" | null,
    note: "University project — source in private academic repository."
  }
];

const EDUCATION = [
  {
    degree: "M.S., Business Analytics & Information Systems",
    school: "University of South Florida",
    location: "Tampa, FL",
    date: "May 2025",
    coursework: ["Data Mining", "Business Intelligence", "Cloud Computing", "Machine Learning", "Data Visualization", "Database Management", "Applied Analytics"],
    narrative: "A bridge year that transformed an engineering background into product and data fluency — learning to speak both the language of data and the language of business."
  },
  {
    degree: "B.Tech, Electronics & Communication Engineering",
    school: "Karunya University",
    location: "Coimbatore, India",
    date: "May 2022",
    coursework: ["Digital Signal Processing", "Data Structures & Algorithms", "Embedded Systems", "Communication Networks", "Linear Algebra", "Probability & Statistics"],
    narrative: "Where systems thinking took root — building the analytical foundation that later translated directly into data engineering and backend work."
  }
];

const CERTS = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    year: "2023",
    icon: "AWS"
  },
  {
    title: "Microsoft PL-300 Power BI Data Analyst",
    provider: "Microsoft",
    year: "2024",
    icon: "PBI"
  },
  {
    title: "Mathematics for Machine Learning Specialization",
    provider: "Imperial College London · Coursera",
    year: "2023",
    icon: "ML"
  },
  {
    title: "Data Visualization with Tableau Specialization",
    provider: "UC Davis · Coursera",
    year: "2023",
    icon: "VIZ"
  },
  {
    title: "Python for Everybody Specialization",
    provider: "University of Michigan · Coursera",
    year: "2022",
    icon: "PY"
  }
];

const SKILL_CATEGORIES = [
  {
    title: "Backend & APIs",
    icon: <Terminal size={18} />,
    skills: ["Python", "Flask", "FastAPI", "Node.js", "REST APIs", "C#/.NET MVC", "Automation", "Service Logic"]
  },
  {
    title: "Frontend",
    icon: <FileCode2 size={18} />,
    skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "Vite", "Responsive Design"]
  },
  {
    title: "Cloud",
    icon: <Cloud size={18} />,
    skills: ["AWS S3", "Glue", "Athena", "Redshift", "Lambda", "Airflow/MWAA", "Snowflake (Cloud)", "IAM", "CloudWatch"]
  },
  {
    title: "Data Engineering",
    icon: <Layers size={18} />,
    skills: ["PySpark", "ETL/ELT", "Data Pipelines", "Data Modeling", "pandas", "Data Validation", "Reconciliation"]
  },
  {
    title: "Databases",
    icon: <Database size={18} />,
    skills: ["SQL Server", "PostgreSQL", "Snowflake", "Teradata", "T-SQL", "MySQL", "Query Optimization"]
  },
  {
    title: "BI & Analytics",
    icon: <Star size={18} />,
    skills: ["Power BI", "SSRS", "Tableau", "Excel", "Power Query", "DAX", "Data Visualization"]
  },
  {
    title: "AI & Copilot Tools",
    icon: <Award size={18} />,
    skills: ["Claude", "ChatGPT", "GitHub Copilot", "Replit AI", "Cursor", "Lovable", "Prompt Engineering"]
  },
  {
    title: "Languages",
    icon: <ExternalLink size={18} />,
    skills: ["Python", "SQL / T-SQL", "JavaScript", "TypeScript", "C#", "Shell/Bash", "PySpark"]
  },
  {
    title: "Soft Skills",
    icon: <Users size={18} />,
    skills: ["Stakeholder Communication", "End-to-end Ownership", "Technical Documentation", "Agile/Scrum", "Cross-functional Collaboration", "Product Thinking"]
  }
];

const EXPERIENCE_JOBS = [
  {
    company: "Franchise Tax Board",
    role: "IT Associate",
    date: "Jan 2026 – Present",
    location: "Sacramento, CA",
    tech: ["Python", "Flask", "FastAPI", "SQL Server", "T-SQL", "REST APIs", "Automation"],
    bullets: [
      "Built internal backend services and workflow automation for regulated tax operations",
      "Owned features across the full product lifecycle — from analyst pain points to deployment",
      "Developed SQL-driven application logic using complex T-SQL, CTEs, window functions, and KPI rules across large state tax datasets",
      "Automated recurring weekly, monthly, and annual processes, reducing manual handoffs for audit, compliance, and operational teams"
    ]
  },
  {
    company: "University of South Florida",
    role: "BI Engineer Intern",
    date: "Oct 2023 – May 2025",
    location: "Tampa, FL",
    tech: ["Power BI", "SSRS", "Snowflake", "Python", "SQL", "Excel"],
    bullets: [
      "Owned end-to-end development of a Power BI ticketing product for USF IT",
      "Built self-service finance reporting for 3–5 campus units using SSRS, Power BI, SQL, Python, Snowflake, and Excel",
      "Cleaned, joined, and modeled operational datasets to improve reporting accuracy",
      "Worked directly with Finance and IT stakeholders on usability and metric documentation"
    ]
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Data Engineer (Gilead Sciences)",
    date: "Jan 2022 – Jul 2023",
    location: "Chennai, India",
    tech: ["PySpark", "AWS", "Glue", "Athena", "Redshift", "Airflow/MWAA", "ETL"],
    bullets: [
      "Engineered production PySpark ETL pipelines on AWS for Gilead Sciences clinical and marketing analytics",
      "Owned reliability for SLA-bound pipelines — monitoring, failure triage, debugging, overnight on-call support",
      "Built new pipelines and hardened inherited systems in a 3-engineer team",
      "Implemented reconciliation and validation checks across ~100K records/run for regulated life sciences data delivery"
    ]
  },
  {
    company: "Samsung R&D Institute",
    role: "Research Intern — Gesture Recognition",
    date: "Apr 2021 – Dec 2021",
    location: "Bengaluru, India",
    tech: ["Python", "OpenCV", "pandas", "SciPy", "scikit-learn", "Android"],
    bullets: [
      "Built an ML prototype for touchless smart TV control and gaming using camera-based hand gestures",
      "Designed gesture taxonomies that balanced recognition accuracy with natural user movement",
      "Created a labeled gesture dataset from thousands of motion sequences",
      "Trained and integrated ML models into an Android demo showing end-to-end product thinking"
    ]
  }
];

/* ─── Experience timeline (horizontal desktop / vertical mobile) ─── */
const EXP_ACCENT = ["#c9a97a", "#a0622a", "#c27a3a", "#8b5523"];

function ExpDetailPanel({ idx }: { idx: number }) {
  const job = EXPERIENCE_JOBS[idx];
  const accent = EXP_ACCENT[idx % EXP_ACCENT.length];
  return (
    <div
      className="rounded-xl border p-5 mt-5"
      style={{ borderColor: `${accent}30`, background: `${accent}08` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
        <div>
          <h3 className="font-serif font-semibold text-coffee-foam">{job.company}</h3>
          <p className="text-sm font-sans mt-0.5" style={{ color: accent }}>{job.role}</p>
        </div>
        <div className="text-xs font-mono text-coffee-bronze sm:text-right flex-shrink-0">
          <div>{job.date}</div>
          <div className="opacity-70">{job.location}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tech.map(t => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-md border text-coffee-latte"
            style={{ background: `${accent}12`, borderColor: `${accent}30` }}
          >{t}</span>
        ))}
      </div>
      <ul className="space-y-2.5">
        {job.bullets.map((b, j) => (
          <li key={j} className="flex gap-3 text-sm font-sans text-coffee-latte/70 leading-relaxed">
            <span className="flex-shrink-0 mt-1" style={{ color: accent }}>▹</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceTimeline() {
  const [expanded, setExpanded] = React.useState<number | null>(0);

  return (
    <>
      {/* ── Desktop: horizontal timeline ── */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Horizontal connecting line */}
          <div
            className="absolute left-[2rem] right-[2rem] top-[15px] h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(160,98,42,0.4) 12%, rgba(160,98,42,0.4) 88%, transparent)" }}
          />
          {/* Dots row */}
          <div className="flex">
            {EXPERIENCE_JOBS.map((job, i) => {
              const accent = EXP_ACCENT[i % EXP_ACCENT.length];
              const isOpen = expanded === i;
              return (
                <button
                  key={i}
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="flex-1 flex flex-col items-center gap-3 group text-center px-3"
                >
                  <div
                    className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ borderColor: accent, background: isOpen ? `${accent}30` : "rgba(26,14,8,0.9)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-transform duration-200"
                      style={{ background: accent, transform: isOpen ? "scale(1.35)" : "scale(1)" }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-serif font-semibold text-coffee-foam group-hover:text-coffee-latte transition-colors leading-tight">{job.company}</p>
                    <p className="text-xs font-sans mt-0.5 leading-tight" style={{ color: accent }}>{job.role}</p>
                    <p className="text-xs font-mono text-coffee-bronze/55 mt-1">{job.date.split("–")[0].trim()}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel below */}
        <AnimatePresence>
          {expanded !== null && (
            <motion.div
              key={`exp-desktop-${expanded}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="overflow-hidden"
            >
              <ExpDetailPanel idx={expanded} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile: vertical timeline ── */}
      <div className="md:hidden relative">
        <div
          className="absolute top-4 bottom-4"
          style={{ left: "15px", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(160,98,42,0.35) 10%, rgba(160,98,42,0.35) 90%, transparent)" }}
        />
        <div className="space-y-1">
          {EXPERIENCE_JOBS.map((job, i) => {
            const accent = EXP_ACCENT[i % EXP_ACCENT.length];
            const isOpen = expanded === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left flex gap-5 group py-3"
                >
                  <div
                    className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-300"
                    style={{ borderColor: accent, background: isOpen ? `${accent}28` : "rgba(26,14,8,0.9)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-transform duration-200"
                      style={{ background: accent, transform: isOpen ? "scale(1.35)" : "scale(1)" }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <h3 className="text-base font-serif font-semibold text-coffee-foam group-hover:text-coffee-latte transition-colors">{job.company}</h3>
                    <p className="text-sm font-sans" style={{ color: accent }}>{job.role}</p>
                    <p className="text-xs font-mono text-coffee-bronze/70">{job.date} · {job.location}</p>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key={`exp-mob-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 28 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-4 space-y-3" style={{ marginLeft: "33px", borderLeft: `1px solid ${accent}28` }}>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tech.map(t => (
                            <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md border text-coffee-latte"
                              style={{ background: `${accent}12`, borderColor: `${accent}30` }}>{t}</span>
                          ))}
                        </div>
                        <ul className="space-y-2.5">
                          {job.bullets.map((b, j) => (
                            <li key={j} className="flex gap-3 text-sm font-sans text-coffee-latte/70 leading-relaxed">
                              <span className="flex-shrink-0 mt-1" style={{ color: accent }}>▹</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─── 3D flip card (projects) ─── */
function FlipCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <motion.div variants={STAGGER_CHILDREN} className="h-[440px]" style={{ perspective: "1000px" }}>
      <motion.div
        onClick={() => setFlipped(f => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%", cursor: "pointer" }}
        className="flip-preserve-3d"
        whileHover={!flipped ? { scale: 1.012 } : undefined}
      >
        {/* Front */}
        <div
          className="flip-backface-hidden absolute inset-0 rounded-xl overflow-hidden border border-coffee-bronze/20 bg-coffee-espresso/65 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-44 overflow-hidden relative flex-shrink-0">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,10,4,0.85) 0%, transparent 60%)" }} />
            <div className="absolute bottom-3 left-4">
              <span className="font-mono text-xs text-coffee-bronze/70">0{index + 1}</span>
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-base font-serif font-semibold text-coffee-cream mb-1 leading-snug">{project.title}</h3>
            <p className="text-xs font-sans text-coffee-latte/55 italic mb-2.5">{project.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.slice(0, 4).map(t => (
                <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-coffee-bronze/12 text-coffee-latte">{t}</span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-coffee-bronze/8 text-coffee-bronze/55">+{project.tech.length - 4}</span>
              )}
            </div>
            <p className="text-xs font-sans text-coffee-bronze/55 mt-auto flex items-center gap-1.5">
              <span>Click to read details</span>
              <ExternalLink size={10} />
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-backface-hidden absolute inset-0 rounded-xl border border-coffee-latte/20 bg-coffee-mocha flex flex-col p-5"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-serif font-semibold text-coffee-latte leading-snug flex-1 pr-3">{project.title}</h3>
            <button
              onClick={e => { e.stopPropagation(); setFlipped(false); }}
              className="text-coffee-bronze/50 hover:text-coffee-latte transition-colors text-base flex-shrink-0"
              aria-label="Flip back"
            >✕</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
            <div>
              <p className="text-xs font-mono text-coffee-bronze uppercase tracking-wider mb-1">Problem</p>
              <p className="text-xs font-sans text-coffee-cream/75 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-coffee-bronze uppercase tracking-wider mb-1">Solution</p>
              <p className="text-xs font-sans text-coffee-cream/75 leading-relaxed">{project.solution}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-coffee-bronze uppercase tracking-wider mb-1.5">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-coffee-latte/10 text-coffee-latte border border-coffee-latte/15">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between flex-shrink-0">
            {project.note && <p className="text-xs italic font-sans text-coffee-bronze/50 leading-snug">{project.note}</p>}
            {(project.github || project.demo) && (
              <div className="flex gap-4 ml-auto">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-sans text-coffee-bronze hover:text-coffee-latte transition-colors">
                    <Github size={12} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-sans text-coffee-bronze hover:text-coffee-latte transition-colors">
                    <ExternalLink size={12} /> Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Contact form with mailto fallback ─── */
function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hey Jayanth — reaching out from your portfolio`);
    const body = encodeURIComponent(`Hi Jayanth,\n\nMy name is ${name} (${email}).\n\n${message}`);
    window.location.href = `mailto:jayanthuppara999@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass =
    "w-full rounded-lg px-4 py-3 text-sm font-sans bg-coffee-espresso/70 border border-coffee-bronze/25 text-coffee-foam placeholder:text-coffee-latte/35 focus:outline-none focus:border-coffee-bronze/60 focus:ring-2 focus:ring-coffee-bronze/20 transition-all duration-200";

  return (
    <div className="p-6 rounded-xl border border-coffee-bronze/20 bg-coffee-espresso/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.1 }}
              className="w-14 h-14 rounded-full bg-coffee-bronze/20 border border-coffee-bronze/40 flex items-center justify-center text-coffee-latte text-2xl"
            >
              ☕
            </motion.div>
            <p className="font-serif text-xl font-semibold text-coffee-foam">Thanks! Your email client should open.</p>
            <p className="font-sans text-sm text-coffee-latte/65">I'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-coffee-bronze mb-1.5">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your secret identity"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-coffee-bronze mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="I promise I won't spam you"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-coffee-bronze mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your message goes here — ask me anything"
                className={`${inputClass} resize-none`}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, backgroundColor: "#c27a3a" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg bg-coffee-bronze text-coffee-foam font-semibold text-sm font-sans transition-colors duration-200"
            >
              <Mail size={15} /> Send Message
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Certification stamp badge ─── */
function CertBadge({ cert, index }: { cert: typeof CERTS[number]; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.5, rotate: -18, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 280, damping: 14, delay: index * 0.14 }}
      whileHover={{ scale: 1.03, rotate: 1, y: -3 }}
      className="p-5 rounded-xl flex items-center gap-4 border border-coffee-bronze/25 bg-coffee-espresso/60"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(160,98,42,0.06)" }}
    >
      <motion.div
        initial={{ scale: 0.3, rotate: -28 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 380, damping: 10, delay: index * 0.14 + 0.08 }}
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-coffee-bronze/50 bg-coffee-bronze/15 text-coffee-latte font-mono font-bold text-xs"
      >
        {cert.icon}
      </motion.div>
      <div>
        <p className="font-sans font-semibold text-sm text-coffee-foam leading-snug">{cert.title}</p>
        <p className="font-mono text-xs mt-1 text-coffee-bronze">{cert.provider}</p>
        <p className="font-mono text-xs text-coffee-bronze/55">{cert.year}</p>
      </div>
    </motion.div>
  );
}

/* ─── Education expandable card ─── */
function EducationCard({ edu }: { edu: typeof EDUCATION[number] }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      variants={STAGGER_CHILDREN}
      onClick={() => setOpen(o => !o)}
      className="rounded-xl border border-coffee-bronze/20 bg-coffee-espresso/60 overflow-hidden cursor-pointer hover:border-coffee-latte/30 transition-colors duration-200"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.18)" }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-sm text-coffee-foam mb-1 leading-snug">{edu.degree}</h4>
            <div className="font-sans text-sm text-coffee-latte">{edu.school}</div>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-coffee-bronze/60 mt-0.5 flex-shrink-0 text-base"
          >▾</motion.span>
        </div>
        <div className="flex justify-between text-xs font-mono text-coffee-bronze mt-3">
          <span>{edu.location}</span>
          <span>{edu.date}</span>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="edu-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="overflow-hidden"
          >
            <div className="border-t border-coffee-bronze/15 px-5 pb-5 pt-4 space-y-3">
              <div>
                <p className="text-xs font-mono text-coffee-bronze uppercase tracking-wider mb-2">Key Coursework</p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map(c => (
                    <span key={c} className="text-xs font-sans px-2.5 py-1 rounded-md bg-coffee-bronze/10 text-coffee-latte/80 border border-coffee-bronze/20">{c}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm font-sans italic text-coffee-latte/60 leading-relaxed">{edu.narrative}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ─── Single metric card ─── */
function MetricCard({
  label, value, suffix, icon, delay
}: {
  label: string; value: number; suffix: string; icon: React.ReactNode; delay: number;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1600, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="flex flex-col items-center gap-3 px-6 py-8 rounded-2xl border border-coffee-bronze/25 bg-coffee-espresso/70 latte-glow backdrop-blur-sm text-center group hover:border-coffee-latte/40 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-coffee-bronze/15 flex items-center justify-center text-coffee-latte group-hover:bg-coffee-bronze/25 transition-colors">
        {icon}
      </div>
      <div className="text-4xl font-serif font-bold text-latte-gradient">
        {count}{suffix}
      </div>
      <div className="text-xs font-medium text-coffee-latte/70 tracking-wide uppercase leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export default function Home() {

  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const titles = [
    "Product Engineer",
    "Full-Stack Software Engineer",
    "Backend & Cloud Builder",
    "Applied AI Engineer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-coffee-cream overflow-x-hidden">
      <CustomCursor />

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-coffee-bronze/20"
        style={{ background: "rgba(18, 10, 4, 0.88)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif font-bold text-xl text-coffee-latte tracking-tight">JU.</span>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              { label: "About", id: "about" },
              { label: "Experience", id: "experience" },
              { label: "Projects", id: "projects" },
              { label: "Skills", id: "skills" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative text-coffee-latte/65 hover:text-coffee-latte transition-colors duration-200 group py-1"
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-coffee-latte group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href="/JayanthUppara_Resume.pdf"
              download="JayanthUppara_Resume.pdf"
              className="ml-2 px-4 py-1.5 text-xs font-semibold rounded border border-coffee-bronze text-coffee-latte hover:bg-coffee-bronze/20 transition-colors tracking-wide font-sans"
            >
              Resume ↓
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="about" className="relative min-h-[100dvh] flex items-center pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#c9a97a12_1px,transparent_1px),linear-gradient(to_bottom,#c9a97a12_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div
            className="absolute left-1/4 top-1/3 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[140px]"
            style={{ background: "radial-gradient(circle, #a0622a, transparent)" }}
          />
          <div
            className="absolute right-10 bottom-20 w-[360px] h-[360px] rounded-full opacity-[0.04] blur-[110px]"
            style={{ background: "radial-gradient(circle, #c9a97a, transparent)" }}
          />
        </div>
        <HeroParticles />

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto px-6 w-full z-10 relative py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── LEFT: Text content ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER_CONTAINER}
              className="flex-1 max-w-2xl"
            >
              {/* Hello label */}
              <motion.div
                variants={STAGGER_CHILDREN}
                className="flex items-center gap-2 font-mono text-sm text-coffee-bronze mb-6"
              >
                <Terminal size={14} />
                <span>Hello, I am</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={STAGGER_CHILDREN}
                className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-2"
              >
                <span className="text-latte-gradient">Jayanth Uppara</span>
              </motion.h1>

              {/* Professional tagline */}
              <motion.p
                variants={STAGGER_CHILDREN}
                className="text-sm font-sans italic text-coffee-bronze mb-5 tracking-wide"
              >
                Building products at the intersection of engineering and data
              </motion.p>

              {/* Animated role title */}
              <motion.div
                variants={STAGGER_CHILDREN}
                className="text-xl md:text-2xl font-serif font-semibold text-coffee-latte mb-7 h-[34px] md:h-[38px] overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTitleIndex}
                    initial={{ y: 34, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -34, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {titles[activeTitleIndex]}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={STAGGER_CHILDREN}
                className="text-base leading-relaxed mb-7 font-sans text-coffee-latte/70"
              >
                Software Engineer with 4+ years shipping digital products, backend services, automation workflows, and cloud data platforms across government, higher ed, and life sciences. Known for owning work end-to-end and turning user problems into shipped solutions.
              </motion.p>

              {/* Location / email */}
              <motion.div
                variants={STAGGER_CHILDREN}
                className="flex flex-wrap items-center gap-4 mb-9"
              >
                <span className="flex items-center gap-1.5 text-sm font-sans text-coffee-bronze">
                  <MapPin size={13} /> Tampa, FL
                </span>
                <span className="text-coffee-bronze/30 hidden sm:inline">·</span>
                <a
                  href="mailto:jayanthuppara999@gmail.com"
                  className="hidden sm:flex items-center gap-1.5 text-sm font-sans text-coffee-bronze hover:text-coffee-latte transition-colors"
                >
                  <Mail size={13} /> jayanthuppara999@gmail.com
                </a>
              </motion.div>

              {/* 4 CTA buttons */}
              <motion.div
                variants={STAGGER_CHILDREN}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm font-sans bg-coffee-bronze text-coffee-foam hover:bg-coffee-bronze-light transition-colors duration-200 active:scale-95"
                >
                  View Projects
                </button>
                <a
                  href="/JayanthUppara_Resume.pdf"
                  download="JayanthUppara_Resume.pdf"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm font-sans border border-coffee-bronze/45 text-coffee-latte hover:bg-coffee-bronze/10 transition-colors duration-200"
                >
                  <Download size={15} /> Resume
                </a>
                <a
                  href="https://github.com/jayanthu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm font-sans border border-coffee-bronze/30 text-coffee-bronze hover:text-coffee-latte hover:border-coffee-latte/35 transition-colors duration-200"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/jayanthu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm font-sans border border-coffee-bronze/30 text-coffee-bronze hover:text-coffee-latte hover:border-coffee-latte/35 transition-colors duration-200"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT (lg) / BELOW (mobile): Animated illustration ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-0 flex-shrink-0 opacity-80 lg:opacity-100"
            >
              <SpeechBubble />
              <AnimatedCoffeeCup />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Metrics Snapshot ── */}
      <section className="py-20 relative">
        <SectionTransition className="mb-20" glow />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-coffee-bronze mb-2">At a Glance</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-coffee-latte">By the Numbers</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard label="Years Experience" value={4}   suffix="+" icon={<Terminal size={18} />}  delay={0}    />
            <MetricCard label="Degrees Earned"   value={2}   suffix=""  icon={<Award size={18} />}     delay={0.07} />
            <MetricCard label="Certifications"   value={3}   suffix="+" icon={<Star size={18} />}      delay={0.14} />
            <MetricCard label="Projects Built"   value={5}   suffix="+" icon={<FileCode2 size={18} />} delay={0.21} />
            <MetricCard label="Tech Domains"     value={6}   suffix="+" icon={<Cloud size={18} />}     delay={0.28} />
            <MetricCard label="Cloud + AI + Data" value={100} suffix="%" icon={<Database size={18} />} delay={0.35} />
          </div>
        </div>
        <SectionTransition className="mt-20" />
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={HEADING_CHILD} className="text-3xl font-serif font-bold text-coffee-foam mb-10 flex items-center gap-3">
              <SteamDeco />
              <span className="font-mono text-lg font-normal text-coffee-bronze mr-1">01.</span> Experience
            </motion.h2>

            <motion.div variants={STAGGER_CHILDREN}>
              <ExperienceTimeline />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 relative bg-coffee-dark/40">
        <SectionTransition glow />
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={HEADING_CHILD} className="text-3xl font-serif font-bold text-coffee-foam mb-12 flex items-center gap-3">
              <SteamDeco />
              <span className="font-mono text-lg font-normal text-coffee-bronze mr-1">02.</span> Selected Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <FlipCard key={i} project={project} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
        <SectionTransition className="mt-12" />
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={HEADING_CHILD} className="text-3xl font-serif font-bold text-coffee-foam mb-12 flex items-center gap-3">
              <SteamDeco />
              <span className="font-mono text-lg font-normal text-coffee-bronze mr-1">03.</span> Technical Stack
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SKILL_CATEGORIES.map((category, i) => (
                <motion.div
                  key={i}
                  variants={STAGGER_CHILDREN}
                  className="p-6 rounded-xl border border-coffee-bronze/20 bg-coffee-espresso/55 hover:border-coffee-bronze/35 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-coffee-bronze">{category.icon}</span>
                    <h3 className="text-base font-serif font-semibold text-coffee-foam">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <motion.span
                        key={skill}
                        whileHover={{ y: -3, scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="text-xs font-sans px-3 py-1.5 rounded-md border border-coffee-bronze/25 text-coffee-latte/80 bg-coffee-bronze/6 cursor-default"
                        style={{ display: "inline-block" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Education & Certs ── */}
      <section className="py-24 relative bg-coffee-dark/50">
        <SectionTransition glow />
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <motion.h2 variants={HEADING_CHILD} className="text-2xl font-serif font-bold text-coffee-foam mb-8 flex items-center gap-3">
                <SteamDeco />
                <span className="font-mono text-lg font-normal text-coffee-bronze mr-1">04.</span> Education
              </motion.h2>
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <EducationCard key={i} edu={edu} />
                ))}
              </div>
            </div>

            <div>
              <motion.h2 variants={HEADING_CHILD} className="text-2xl font-serif font-bold text-coffee-foam mb-8 flex items-center gap-3">
                <SteamDeco />
                <span className="font-mono text-lg font-normal text-coffee-bronze mr-1">05.</span> Certifications
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTS.map((cert, i) => (
                  <CertBadge key={i} cert={cert} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <SectionTransition className="mt-12" />
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-32 relative" style={{ background: "linear-gradient(160deg, rgba(26,14,8,0) 0%, rgba(59,31,18,0.35) 50%, rgba(26,14,8,0) 100%)" }}>
        {/* Coffee-ring decorative motif */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-coffee-bronze/8 opacity-40" />
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-coffee-bronze/10 opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-coffee-latte/6 opacity-25" />
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
          >
            <div className="text-center mb-12">
              <motion.p variants={STAGGER_CHILDREN} className="font-mono text-xs tracking-[0.2em] uppercase text-coffee-bronze mb-4">
                06. What's Next?
              </motion.p>
              <motion.h2 variants={HEADING_CHILD} className="text-4xl md:text-5xl font-serif font-bold text-coffee-foam mb-4">
                Let's Build Something Together
              </motion.h2>
              <motion.p variants={STAGGER_CHILDREN} className="text-base leading-relaxed font-sans text-coffee-latte/70 max-w-xl mx-auto">
                Currently open to new opportunities. Whether you have a project, a question, or just want to chat over (virtual) coffee — I'd love to hear from you.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* ── Left: Contact Form ── */}
              <motion.div variants={STAGGER_CHILDREN} className="lg:col-span-3">
                <ContactForm />
              </motion.div>

              {/* ── Right: Info panel ── */}
              <motion.div variants={STAGGER_CHILDREN} className="lg:col-span-2 flex flex-col gap-8">
                <div className="p-6 rounded-xl border border-coffee-bronze/20 bg-coffee-espresso/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                  <p className="font-serif text-lg font-semibold text-coffee-foam mb-2">Currently available</p>
                  <p className="font-sans text-sm text-coffee-latte/70 leading-relaxed mb-4">
                    Based in Tampa, FL · Open to remote &amp; hybrid roles · Usually reply within 24 hours.
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-xs text-coffee-latte/60">Open to opportunities</span>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-coffee-bronze mb-3">Reach me directly</p>
                  <a
                    href="mailto:jayanthuppara999@gmail.com"
                    className="flex items-center gap-2 text-coffee-latte hover:text-coffee-foam transition-colors duration-200 font-sans text-sm font-medium group"
                  >
                    <Mail size={15} className="text-coffee-bronze group-hover:text-coffee-latte transition-colors" />
                    jayanthuppara999@gmail.com
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-coffee-bronze mb-4">Find me online</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { href: "https://github.com/jayanthu",        icon: <Github size={18} />,   label: "GitHub",   extra: {} },
                      { href: "https://linkedin.com/in/jayanthu",   icon: <Linkedin size={18} />, label: "LinkedIn", extra: { target: "_blank", rel: "noopener noreferrer" } },
                      { href: "tel:656-203-4661",                   icon: <Phone size={18} />,    label: "Phone",    extra: {} },
                      { href: "/JayanthUppara_Resume.pdf",          icon: <Download size={18} />, label: "Resume",   extra: { download: "JayanthUppara_Resume.pdf" } },
                    ].map(({ href, icon, label, extra }) => (
                      <a
                        key={label}
                        href={href}
                        {...extra}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-coffee-bronze/25 bg-coffee-mocha/30 text-coffee-latte/80 hover:text-coffee-foam hover:border-coffee-bronze/50 hover:bg-coffee-bronze/10 transition-all duration-200 font-sans text-xs font-medium"
                      >
                        {icon} {label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-coffee-bronze/20 bg-coffee-dark/80">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif font-bold text-lg text-coffee-latte">Jayanth Uppara</span>
            <span className="font-mono text-xs text-coffee-bronze">Applied AI Engineer · Tampa, FL</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { href: "https://github.com/jayanthu",                icon: <Github size={18} />,   label: "GitHub",   download: false },
              { href: "https://linkedin.com/in/jayanthu",           icon: <Linkedin size={18} />, label: "LinkedIn", download: false },
              { href: "mailto:jayanthuppara999@gmail.com",          icon: <Mail size={18} />,     label: "Email",    download: false },
              { href: "/JayanthUppara_Resume.pdf",                  icon: <Download size={18} />, label: "Resume",   download: true  },
            ].map(({ href, icon, label, download }) => (
              <a
                key={label}
                href={href}
                {...(download ? { download: "JayanthUppara_Resume.pdf" } : { target: "_blank", rel: "noopener noreferrer" })}
                title={label}
                className="text-coffee-bronze hover:text-coffee-latte transition-colors duration-200 hover:scale-110 inline-block"
              >
                {icon}
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
          <p className="font-sans text-xs text-coffee-bronze/50 text-center md:text-right">
            © {new Date().getFullYear()} Jayanth Uppara · Built with React & Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
