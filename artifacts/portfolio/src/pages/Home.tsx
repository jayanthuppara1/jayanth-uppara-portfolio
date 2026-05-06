import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Terminal, Database, Cloud, FileCode2, MapPin, Phone, Download, Star, Award, Layers, Users } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import HeroParticles from "@/components/HeroParticles";
import CoffeeMugLetter from "@/components/CoffeeMugLetter";
import SteamDeco from "@/components/SteamDeco";

import project1Img from "../assets/project-1.png";
import project2Img from "../assets/project-2.png";
import project3Img from "../assets/project-3.png";

const STAGGER_CHILDREN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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

/* ─── Animated coffee cup illustration ─── */
function AnimatedCoffeeCup() {
  return (
    <div className="coffee-bob">
      <svg
        viewBox="0 0 160 210"
        width="200"
        height="220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Saucer */}
        <ellipse cx="80" cy="192" rx="62" ry="10" fill="rgba(59,31,18,0.5)" stroke="#a0622a" strokeWidth="1.5" />

        {/* Cup body */}
        <path
          d="M 28 68 L 132 68 L 121 168 Q 119 180 80 180 Q 41 180 39 168 Z"
          fill="rgba(59,31,18,0.45)"
          stroke="#a0622a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Handle */}
        <path
          d="M 132 90 C 162 90 162 142 132 142"
          fill="none"
          stroke="#a0622a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Rim */}
        <path
          d="M 24 68 Q 80 57 136 68"
          fill="rgba(160,98,42,0.25)"
          stroke="#c9a97a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Coffee surface */}
        <ellipse cx="80" cy="84" rx="44" ry="9" fill="rgba(59,31,18,0.75)" />
        <ellipse cx="72" cy="82" rx="14" ry="5" fill="rgba(160,98,42,0.2)" />

        {/* Steam wisps */}
        <path
          d="M 58 66 C 54 52 62 42 58 28"
          stroke="#c9a97a"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
          className="mug-steam-1"
        />
        <path
          d="M 80 63 C 76 49 84 39 80 25"
          stroke="#c9a97a"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
          className="mug-steam-2"
        />
        <path
          d="M 102 66 C 98 52 106 42 102 28"
          stroke="#c9a97a"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
          className="mug-steam-3"
        />

        {/* Brand mark inside cup */}
        <text
          x="80"
          y="136"
          textAnchor="middle"
          fontSize="18"
          fontFamily="Georgia, serif"
          fill="rgba(201,169,122,0.35)"
          fontWeight="700"
        >
          JU.
        </text>
      </svg>
    </div>
  );
}

/* ─── Static data ─── */

const PROJECTS = [
  {
    title: "USF Power BI Ticketing Dashboard",
    description: "Gave USF IT teams real-time visibility into equipment support work by owner, assignment, status, and resolution. Built end-to-end from data modeling to dashboard delivery — including SQL data prep, Power BI semantic model, SSRS backups, and stakeholder walkthroughs.",
    tech: ["Power BI", "SQL", "Python", "SSRS", "Snowflake"],
    image: project1Img,
    github: null as string | null,
    demo: null as string | null,
    note: "Internal enterprise tool — source code is proprietary."
  },
  {
    title: "Gilead Sciences ETL Pipeline Platform",
    description: "Production PySpark pipelines on AWS supporting clinical and marketing analytics for a life sciences company. Included end-to-end reconciliation across 100K+ records/run, SLA monitoring, and failure triage. Built in a 3-engineer team embedded with Gilead's data org.",
    tech: ["PySpark", "AWS S3", "Glue", "Athena", "Airflow/MWAA", "Redshift"],
    image: project2Img,
    github: null as string | null,
    demo: null as string | null,
    note: "Proprietary production system — code is confidential."
  },
  {
    title: "Samsung Gesture Recognition Demo",
    description: "Applied ML prototype for touchless smart TV and gaming control. Replaced remote control actions with camera-based hand gestures, from gesture taxonomy design and dataset collection through model training to an end-to-end Android demo.",
    tech: ["Python", "OpenCV", "scikit-learn", "pandas", "SciPy", "Android"],
    image: project3Img,
    github: null as string | null,
    demo: null as string | null,
    note: "Research internship project — source not publicly available."
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
              transition={{ duration: 0.35 }}
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
                      transition={{ duration: 0.3 }}
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
            <h3 className="text-base font-serif font-semibold text-coffee-cream mb-2 leading-snug">{project.title}</h3>
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
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-serif font-semibold text-coffee-latte leading-snug flex-1 pr-3">{project.title}</h3>
            <button
              onClick={e => { e.stopPropagation(); setFlipped(false); }}
              className="text-coffee-bronze/50 hover:text-coffee-latte transition-colors text-base flex-shrink-0"
              aria-label="Flip back"
            >✕</button>
          </div>
          <p className="text-sm font-sans text-coffee-cream/75 leading-relaxed flex-1 overflow-y-auto">{project.description}</p>
          <div className="mt-3">
            <p className="text-xs font-mono text-coffee-bronze uppercase tracking-wider mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.map(t => (
                <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-coffee-latte/10 text-coffee-latte border border-coffee-latte/15">{t}</span>
              ))}
            </div>
          </div>
          {project.note && <p className="text-xs italic font-sans text-coffee-bronze/50 mb-2">{project.note}</p>}
          {(project.github || project.demo) && (
            <div className="flex gap-4 mt-1">
              {project.github && (
                <a href={project.github!} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-sans text-coffee-bronze hover:text-coffee-latte transition-colors">
                  <Github size={12} /> Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo!} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-sans text-coffee-bronze hover:text-coffee-latte transition-colors">
                  <ExternalLink size={12} /> Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
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
            transition={{ duration: 0.28 }}
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
    "AI-Assisted Builder",
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

              {/* Name with coffee mug J */}
              <motion.h1
                variants={STAGGER_CHILDREN}
                className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-2 flex items-baseline gap-0 flex-wrap"
              >
                <CoffeeMugLetter />
                <span className="text-latte-gradient">ayanth Uppara</span>
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
        <div className="coffee-divider mb-20" />
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
        <div className="coffee-divider mt-20" />
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
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-serif font-bold text-coffee-foam mb-10 flex items-center gap-3">
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
        <div className="coffee-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-serif font-bold text-coffee-foam mb-12 flex items-center gap-3">
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
        <div className="coffee-divider mt-12" />
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
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-serif font-bold text-coffee-foam mb-12 flex items-center gap-3">
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
        <div className="coffee-divider" />
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <motion.h2 variants={STAGGER_CHILDREN} className="text-2xl font-serif font-bold text-coffee-foam mb-8 flex items-center gap-3">
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
              <motion.h2 variants={STAGGER_CHILDREN} className="text-2xl font-serif font-bold text-coffee-foam mb-8 flex items-center gap-3">
                <SteamDeco />
                <span className="font-mono text-lg font-normal text-coffee-bronze mr-1">05.</span> Certifications
              </motion.h2>
              <div className="space-y-4">
                {CERTS.map((cert, i) => (
                  <CertBadge key={i} cert={cert} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="coffee-divider mt-12" />
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-32 relative text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
          >
            <motion.p variants={STAGGER_CHILDREN} className="font-mono text-xs tracking-[0.2em] uppercase text-coffee-bronze mb-4">
              06. What's Next?
            </motion.p>
            <motion.h2 variants={STAGGER_CHILDREN} className="text-4xl md:text-5xl font-serif font-bold text-coffee-foam mb-6">
              Let's Build Something Together
            </motion.h2>
            <motion.p variants={STAGGER_CHILDREN} className="text-base leading-relaxed mb-12 font-sans text-coffee-latte/70">
              Currently looking for new opportunities. Whether you have a question, a project in mind, or just want to say hi, my inbox is always open.
            </motion.p>

            <motion.div variants={STAGGER_CHILDREN} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="mailto:jayanthuppara999@gmail.com"
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm font-sans w-full sm:w-auto justify-center bg-coffee-bronze text-coffee-foam hover:bg-coffee-bronze-light transition-colors duration-200 active:scale-95"
              >
                <Mail size={16} /> Say Hello
              </a>
              <a
                href="/JayanthUppara_Resume.pdf"
                download="JayanthUppara_Resume.pdf"
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm font-sans border border-coffee-bronze/40 text-coffee-latte w-full sm:w-auto justify-center hover:bg-coffee-bronze/10 transition-colors duration-200"
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div variants={STAGGER_CHILDREN} className="flex justify-center gap-8">
              {[
                { href: "https://github.com/jayanthu",        icon: <Github size={22} />,   label: "GitHub" },
                { href: "https://linkedin.com/in/jayanthu",   icon: <Linkedin size={22} />, label: "LinkedIn" },
                { href: "tel:656-203-4661",                   icon: <Phone size={22} />,    label: "Phone" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-coffee-bronze hover:text-coffee-latte transition-colors duration-200 hover:scale-110 inline-block"
                >
                  {icon}
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-coffee-bronze/20 bg-coffee-dark/80">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif font-bold text-lg text-coffee-latte">Jayanth Uppara</span>
            <span className="font-mono text-xs text-coffee-bronze">Product Engineer · Tampa, FL</span>
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
