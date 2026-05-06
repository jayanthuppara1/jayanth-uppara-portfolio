import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Terminal, Database, Cloud, FileCode2, MapPin, Phone, Download, Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CustomCursor from "@/components/CustomCursor";
import HeroParticles from "@/components/HeroParticles";

import project1Img from "../assets/project-1.png";
import project2Img from "../assets/project-2.png";
import project3Img from "../assets/project-3.png";

const STAGGER_CHILDREN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800, start = false) {
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
      className="flex flex-col items-center gap-3 px-6 py-8 rounded-2xl border border-[#a0622a]/25 bg-[#1f1108]/70 latte-glow backdrop-blur-sm text-center group hover:border-[#c9a97a]/40 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-[#a0622a]/15 flex items-center justify-center text-[#c9a97a] group-hover:bg-[#a0622a]/25 transition-colors">
        {icon}
      </div>
      <div className="text-4xl font-serif font-bold text-latte-gradient">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-[#c9a97a]/70 tracking-wide uppercase leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const titles = [
    "Product Engineer",
    "Full-Stack Software Engineer",
    "Data Platform Builder",
    "Backend Engineer"
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
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <CustomCursor />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#a0622a]/20"
        style={{ background: "rgba(18, 10, 4, 0.88)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-serif font-bold text-xl tracking-tight"
            style={{ color: "#c9a97a" }}
          >
            JU.
          </span>
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
                className="relative text-[#c9a97a]/65 hover:text-[#c9a97a] transition-colors duration-200 group py-1"
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#c9a97a] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href="/JayanthUppara_Resume.pdf"
              download="JayanthUppara_Resume.pdf"
              className="ml-2 px-4 py-1.5 text-xs font-semibold rounded border border-[#a0622a] text-[#c9a97a] hover:bg-[#a0622a]/20 transition-colors tracking-wide font-sans"
            >
              Resume ↓
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="about" className="relative min-h-[100dvh] flex items-center pt-16">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#c9a97a12_1px,transparent_1px),linear-gradient(to_bottom,#c9a97a12_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute left-1/4 top-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
            style={{ background: "radial-gradient(circle, #a0622a, transparent)" }} />
          <div className="absolute right-0 bottom-0 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[100px]"
            style={{ background: "radial-gradient(circle, #c9a97a, transparent)" }} />
        </div>
        <HeroParticles />

        <div className="max-w-6xl mx-auto px-6 w-full z-10 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER}
            className="max-w-3xl"
          >
            <motion.div variants={STAGGER_CHILDREN} className="flex items-center gap-2 font-mono text-sm mb-5" style={{ color: "#a0622a" }}>
              <Terminal size={14} />
              <span>Hello, I am</span>
            </motion.div>

            <motion.h1
              variants={STAGGER_CHILDREN}
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4 text-latte-gradient"
            >
              Jayanth Uppara
            </motion.h1>

            <motion.div variants={STAGGER_CHILDREN} className="text-xl md:text-3xl font-serif font-semibold mb-6 h-[36px] md:h-[44px] overflow-hidden" style={{ color: "#c9a97a" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTitleIndex}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -36, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {titles[activeTitleIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={STAGGER_CHILDREN} className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-sans" style={{ color: "#c9a97a80" }}>
              Software Engineer focused on BI and data products, with 4+ years building digital products, backend services, automation workflows, and cloud data platforms across government, higher education, and life sciences. Known for owning work end-to-end, translating user problems into shipped solutions.
            </motion.p>

            <motion.div variants={STAGGER_CHILDREN} className="flex items-center gap-5 mb-10">
              <span className="flex items-center gap-1.5 text-sm font-sans" style={{ color: "#a0622a" }}>
                <MapPin size={13} /> Tampa, FL
              </span>
              <span className="text-[#a0622a]/30 hidden md:inline">|</span>
              <span className="flex items-center gap-1.5 text-sm font-sans hidden md:flex" style={{ color: "#a0622a" }}>
                <Mail size={13} /> jayanthuppara999@gmail.com
              </span>
            </motion.div>

            <motion.div variants={STAGGER_CHILDREN} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 rounded-lg font-semibold text-sm font-sans transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, #a0622a, #c27a3a)", color: "#fdf6ee" }}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-lg font-semibold text-sm font-sans border transition-all duration-200 hover:bg-[#a0622a]/10"
                style={{ borderColor: "#a0622a55", color: "#c9a97a" }}
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>
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
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-2" style={{ color: "#a0622a" }}>At a Glance</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold" style={{ color: "#c9a97a" }}>By the Numbers</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard label="Years Experience" value={4} suffix="+" icon={<Terminal size={18} />} delay={0} />
            <MetricCard label="Degrees Earned" value={2} suffix="" icon={<Award size={18} />} delay={0.07} />
            <MetricCard label="Certifications" value={3} suffix="+" icon={<Star size={18} />} delay={0.14} />
            <MetricCard label="Projects Built" value={5} suffix="+" icon={<FileCode2 size={18} />} delay={0.21} />
            <MetricCard label="Tech Domains" value={6} suffix="+" icon={<Cloud size={18} />} delay={0.28} />
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
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-serif font-bold mb-12 flex items-center gap-3" style={{ color: "#f5ede0" }}>
              <span className="font-mono text-lg font-normal" style={{ color: "#a0622a" }}>01.</span> Experience
            </motion.h2>

            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
              {[
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
              ].map((job, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl overflow-hidden px-6 transition-all duration-200"
                  style={{
                    border: "1px solid rgba(160, 98, 42, 0.25)",
                    background: "rgba(31, 17, 8, 0.6)"
                  }}
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full pr-4 text-left">
                      <div>
                        <h3 className="text-lg font-serif font-semibold" style={{ color: "#f5ede0" }}>{job.role}</h3>
                        <p className="font-medium mt-1 text-sm font-sans" style={{ color: "#c9a97a" }}>{job.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-xs font-mono text-left md:text-right" style={{ color: "#a0622a" }}>
                        <div>{job.date}</div>
                        <div className="mt-0.5">{job.location}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.tech.map(t => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2.5 py-1 rounded-md"
                          style={{ background: "rgba(160, 98, 42, 0.12)", color: "#c9a97a", border: "1px solid rgba(160, 98, 42, 0.25)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-3 mt-4">
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 font-sans text-sm leading-relaxed" style={{ color: "#c9a97a80" }}>
                          <span className="mt-1 flex-shrink-0" style={{ color: "#a0622a" }}>▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 relative" style={{ background: "rgba(26, 14, 8, 0.4)" }}>
        <div className="coffee-divider" />
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-serif font-bold mb-12 flex items-center gap-3" style={{ color: "#f5ede0" }}>
              <span className="font-mono text-lg font-normal" style={{ color: "#a0622a" }}>02.</span> Selected Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "USF Power BI Ticketing Dashboard",
                  description: "Gave USF IT teams real-time visibility into equipment support work by owner, assignment, status, and resolution. Built end-to-end from data modeling to dashboard delivery.",
                  tech: ["Power BI", "SQL", "Python", "SSRS", "Snowflake"],
                  image: project1Img,
                  github: null,
                  demo: null,
                  note: "Internal enterprise tool — source code is proprietary."
                },
                {
                  title: "Gilead Sciences ETL Pipeline Platform",
                  description: "Production PySpark pipelines on AWS supporting clinical and marketing analytics for a life sciences company. Included reconciliation across 100K+ records/run.",
                  tech: ["PySpark", "AWS S3", "Glue", "Athena", "Airflow"],
                  image: project2Img,
                  github: null,
                  demo: null,
                  note: "Proprietary production system — code is confidential."
                },
                {
                  title: "Samsung Gesture Recognition Demo",
                  description: "Applied ML prototype for touchless smart TV and gaming control. Replaced remote control actions with camera-based hand gestures, deployed as an Android demo.",
                  tech: ["Python", "OpenCV", "scikit-learn", "Android"],
                  image: project3Img,
                  github: null,
                  demo: null,
                  note: "Research internship project — source not publicly available."
                }
              ].map((project, i) => (
                <motion.div key={i} variants={STAGGER_CHILDREN} className="h-full">
                  <div
                    className="h-full flex flex-col rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-2px]"
                    style={{
                      border: "1px solid rgba(160, 98, 42, 0.2)",
                      background: "rgba(31, 17, 8, 0.65)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201, 169, 122, 0.35)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(160, 98, 42, 0.2)")}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300"
                        style={{ background: "linear-gradient(to top, rgba(18,10,4,0.7) 0%, transparent 60%)" }} />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-serif font-semibold mb-3 transition-colors duration-200 group-hover:text-[#c9a97a]" style={{ color: "#f5ede0" }}>
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4 flex-grow font-sans" style={{ color: "#c9a97a70" }}>
                        {project.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map(t => (
                            <span
                              key={t}
                              className="text-xs font-mono px-2 py-0.5 rounded"
                              style={{ background: "rgba(160, 98, 42, 0.12)", color: "#c9a97a" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        {(project.github || project.demo) ? (
                          <div className="flex gap-4">
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-sans transition-colors hover:text-[#c9a97a]"
                                style={{ color: "#a0622a" }}>
                                <Github size={14} /> Code
                              </a>
                            )}
                            {project.demo && (
                              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-sans transition-colors hover:text-[#c9a97a]"
                                style={{ color: "#a0622a" }}>
                                <ExternalLink size={14} /> Live Demo
                              </a>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs italic font-sans" style={{ color: "#a0622a60" }}>{project.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-serif font-bold mb-12 flex items-center gap-3" style={{ color: "#f5ede0" }}>
              <span className="font-mono text-lg font-normal" style={{ color: "#a0622a" }}>03.</span> Technical Stack
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "Backend & APIs",
                  icon: <FileCode2 size={20} />,
                  skills: ["Python", "Flask", "FastAPI", "Node.js", "REST APIs", "C# MVC", "Automation", "Service Logic"]
                },
                {
                  title: "Frontend",
                  icon: <ExternalLink size={20} />,
                  skills: ["JavaScript", "HTML/CSS", "React", "Responsive Web Apps", "Power BI Product Experiences"]
                },
                {
                  title: "Cloud & Data Engineering",
                  icon: <Cloud size={20} />,
                  skills: ["AWS S3", "Glue", "Athena", "Redshift", "Lambda", "Airflow", "PySpark", "Snowflake", "ETL/ELT"]
                },
                {
                  title: "Databases & BI",
                  icon: <Database size={20} />,
                  skills: ["SQL Server", "PostgreSQL", "Snowflake", "Teradata", "T-SQL", "Power BI", "SSRS", "Tableau", "Excel"]
                },
                {
                  title: "AI & Dev Tools",
                  icon: <Terminal size={20} />,
                  skills: ["Claude", "ChatGPT", "GitHub Copilot", "Replit", "Lovable", "AI-Assisted Development", "Prompt-Driven Prototyping"]
                }
              ].map((category, i) => (
                <motion.div
                  key={i}
                  variants={STAGGER_CHILDREN}
                  className="p-6 rounded-xl transition-all duration-200"
                  style={{
                    border: "1px solid rgba(160, 98, 42, 0.2)",
                    background: "rgba(31, 17, 8, 0.55)"
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span style={{ color: "#a0622a" }}>{category.icon}</span>
                    <h3 className="text-base font-serif font-semibold" style={{ color: "#f5ede0" }}>{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs font-sans px-3 py-1.5 rounded-md border transition-colors duration-200 hover:border-[#c9a97a]/40"
                        style={{
                          borderColor: "rgba(160, 98, 42, 0.25)",
                          color: "#c9a97a80",
                          background: "rgba(160, 98, 42, 0.06)"
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Education & Certs ── */}
      <section className="py-24 relative" style={{ background: "rgba(18, 10, 4, 0.5)" }}>
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
              <motion.h2 variants={STAGGER_CHILDREN} className="text-2xl font-serif font-bold mb-8 flex items-center gap-3" style={{ color: "#f5ede0" }}>
                <span className="font-mono text-lg font-normal" style={{ color: "#a0622a" }}>04.</span> Education
              </motion.h2>
              <div className="space-y-5">
                {[
                  {
                    degree: "M.S., Business Analytics & Information Systems",
                    school: "University of South Florida",
                    location: "Tampa, FL",
                    date: "May 2025",
                    url: "https://www.usf.edu"
                  },
                  {
                    degree: "B.Tech, Electronics & Communication Engineering",
                    school: "Karunya University",
                    location: "Coimbatore, India",
                    date: "May 2022",
                    url: "https://www.karunya.edu"
                  }
                ].map((edu, i) => (
                  <motion.div key={i} variants={STAGGER_CHILDREN}>
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 rounded-xl transition-all duration-200 group"
                      style={{ border: "1px solid rgba(160, 98, 42, 0.2)", background: "rgba(31, 17, 8, 0.6)" }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201, 169, 122, 0.35)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(160, 98, 42, 0.2)")}
                    >
                      <h4 className="font-serif font-semibold text-base mb-1 group-hover:text-[#c9a97a] transition-colors" style={{ color: "#f5ede0" }}>
                        {edu.degree}
                      </h4>
                      <div className="font-sans text-sm mb-3" style={{ color: "#c9a97a" }}>{edu.school}</div>
                      <div className="flex justify-between text-xs font-mono" style={{ color: "#a0622a" }}>
                        <span>{edu.location}</span>
                        <span>{edu.date}</span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h2 variants={STAGGER_CHILDREN} className="text-2xl font-serif font-bold mb-8 flex items-center gap-3" style={{ color: "#f5ede0" }}>
                <span className="font-mono text-lg font-normal" style={{ color: "#a0622a" }}>05.</span> Certifications
              </motion.h2>
              <div className="space-y-5">
                {[
                  {
                    title: "AWS Certified Solutions Architect – Associate",
                    label: "AWS",
                  },
                  {
                    title: "Microsoft PL-300 Power BI Data Analyst",
                    label: "Microsoft",
                  }
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    variants={STAGGER_CHILDREN}
                    className="p-5 rounded-xl flex items-center gap-4 transition-all duration-200"
                    style={{ border: "1px solid rgba(160, 98, 42, 0.25)", background: "rgba(31, 17, 8, 0.6)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-serif font-bold text-xs"
                      style={{ background: "rgba(160, 98, 42, 0.15)", color: "#c9a97a", border: "1px solid rgba(160, 98, 42, 0.3)" }}
                    >
                      ★
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm" style={{ color: "#f5ede0" }}>{cert.title}</p>
                      <p className="font-mono text-xs mt-0.5" style={{ color: "#a0622a" }}>{cert.label}</p>
                    </div>
                  </motion.div>
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
            <motion.p variants={STAGGER_CHILDREN} className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#a0622a" }}>
              06. What's Next?
            </motion.p>
            <motion.h2 variants={STAGGER_CHILDREN} className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: "#f5ede0" }}>
              Let's Build Something Together
            </motion.h2>
            <motion.p variants={STAGGER_CHILDREN} className="text-base leading-relaxed mb-12 font-sans" style={{ color: "#c9a97a70" }}>
              Currently looking for new opportunities. Whether you have a question, a project in mind, or just want to say hi, my inbox is always open.
            </motion.p>

            <motion.div variants={STAGGER_CHILDREN} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="mailto:jayanthuppara999@gmail.com"
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm font-sans w-full sm:w-auto justify-center transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, #a0622a, #c27a3a)", color: "#fdf6ee" }}
              >
                <Mail size={16} /> Say Hello
              </a>
              <a
                href="/JayanthUppara_Resume.pdf"
                download="JayanthUppara_Resume.pdf"
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm font-sans border w-full sm:w-auto justify-center transition-all duration-200 hover:bg-[#a0622a]/10"
                style={{ borderColor: "rgba(160, 98, 42, 0.4)", color: "#c9a97a" }}
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div variants={STAGGER_CHILDREN} className="flex justify-center gap-8">
              {[
                { href: "https://github.com/jayanthu", icon: <Github size={22} />, label: "GitHub" },
                { href: "https://linkedin.com/in/jayanthu", icon: <Linkedin size={22} />, label: "LinkedIn" },
                { href: "tel:656-203-4661", icon: <Phone size={22} />, label: "Phone" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  className="transition-all duration-200 hover:scale-110"
                  style={{ color: "#a0622a" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#c9a97a")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#a0622a")}
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
      <footer
        className="py-10 border-t relative"
        style={{ borderColor: "rgba(160, 98, 42, 0.2)", background: "rgba(18, 10, 4, 0.8)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif font-bold text-lg" style={{ color: "#c9a97a" }}>Jayanth Uppara</span>
            <span className="font-mono text-xs" style={{ color: "#a0622a" }}>Product Engineer · Tampa, FL</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { href: "https://github.com/jayanthu", icon: <Github size={18} />, label: "GitHub" },
              { href: "https://linkedin.com/in/jayanthu", icon: <Linkedin size={18} />, label: "LinkedIn" },
              { href: "mailto:jayanthuppara999@gmail.com", icon: <Mail size={18} />, label: "Email" },
              { href: "/JayanthUppara_Resume.pdf", icon: <Download size={18} />, label: "Resume", download: true },
            ].map(({ href, icon, label, download }) => (
              <a
                key={label}
                href={href}
                {...(download ? { download: "JayanthUppara_Resume.pdf" } : { target: "_blank", rel: "noopener noreferrer" })}
                title={label}
                className="transition-all duration-200 hover:scale-110"
                style={{ color: "#a0622a" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#c9a97a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a0622a")}
              >
                {icon}
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
          <p className="font-sans text-xs text-center md:text-right" style={{ color: "rgba(160, 98, 42, 0.5)" }}>
            © {new Date().getFullYear()} Jayanth Uppara · Built with React & Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
