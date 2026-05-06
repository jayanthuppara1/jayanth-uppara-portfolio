import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Terminal, Database, Cloud, FileCode2, MapPin, Phone, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import project1Img from "../assets/project-1.png";
import project2Img from "../assets/project-2.png";
import project3Img from "../assets/project-3.png";

const STAGGER_CHILDREN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-tighter text-primary">JU.</span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative min-h-[100dvh] flex items-center pt-16">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 w-full z-10 relative">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER}
            className="max-w-3xl"
          >
            <motion.div variants={STAGGER_CHILDREN} className="flex items-center gap-2 text-primary font-mono mb-4">
              <Terminal size={16} />
              <span>Hello, I am</span>
            </motion.div>
            
            <motion.h1 variants={STAGGER_CHILDREN} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Jayanth Uppara
            </motion.h1>
            
            <motion.div variants={STAGGER_CHILDREN} className="text-2xl md:text-4xl font-bold text-muted-foreground mb-6 h-[40px] md:h-[48px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTitleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
                  {titles[activeTitleIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.p variants={STAGGER_CHILDREN} className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Software Engineer focused on BI and data products, with 4+ years building digital products, backend services, automation workflows, and cloud data platforms across government, higher education, and life sciences. Known for owning work end-to-end, translating user problems into shipped solutions.
            </motion.p>
            
            <motion.div variants={STAGGER_CHILDREN} className="flex items-center gap-4 mb-12">
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin size={14}/> Tampa, FL</span>
              <span className="hidden md:inline text-border">|</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Mail size={14}/> jayanthuppara999@gmail.com</span>
            </motion.div>
            
            <motion.div variants={STAGGER_CHILDREN} className="flex flex-wrap gap-4">
              <Button onClick={() => scrollToSection('projects')} size="lg" className="font-semibold px-8 border-primary hover:bg-primary/90 text-primary-foreground">
                View My Work
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" size="lg" className="font-semibold px-8 border-border hover:bg-muted">
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative border-t border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="text-primary font-mono text-xl">01.</span> Experience
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
                <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 bg-card rounded-lg overflow-hidden px-6">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full pr-4 text-left">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                        <p className="text-primary font-medium mt-1">{job.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-sm text-muted-foreground text-left md:text-right font-mono">
                        <div>{job.date}</div>
                        <div>{job.location}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.tech.map(t => (
                        <Badge key={t} variant="secondary" className="bg-muted text-muted-foreground">{t}</Badge>
                      ))}
                    </div>
                    <ul className="space-y-3 mt-4 text-muted-foreground">
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-primary mt-1.5">▹</span>
                          <span className="leading-relaxed">{bullet}</span>
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

      {/* Projects Section */}
      <section id="projects" className="py-24 relative border-t border-border/50 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="text-primary font-mono text-xl">02.</span> Selected Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "USF Power BI Ticketing Dashboard",
                  description: "Gave USF IT teams real-time visibility into equipment support work by owner, assignment, status, and resolution. Built end-to-end from data modeling to dashboard delivery.",
                  tech: ["Power BI", "SQL", "Python", "SSRS", "Snowflake"],
                  image: project1Img
                },
                {
                  title: "Gilead Sciences ETL Pipeline Platform",
                  description: "Production PySpark pipelines on AWS supporting clinical and marketing analytics for a life sciences company. Included reconciliation across 100K+ records/run.",
                  tech: ["PySpark", "AWS S3", "Glue", "Athena", "Airflow"],
                  image: project2Img
                },
                {
                  title: "Samsung Gesture Recognition Demo",
                  description: "Applied ML prototype for touchless smart TV and gaming control. Replaced remote control actions with camera-based hand gestures, deployed as an Android demo.",
                  tech: ["Python", "OpenCV", "scikit-learn", "Android"],
                  image: project3Img
                }
              ].map((project, i) => (
                <motion.div key={i} variants={STAGGER_CHILDREN} className="h-full">
                  <Card className="h-full flex flex-col bg-card border-border/50 overflow-hidden hover:border-primary/50 transition-colors group">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{project.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map(t => (
                            <span key={t} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">{t}</span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="gap-2 border-border/50 text-muted-foreground hover:text-foreground" asChild>
                            <a href="https://github.com/jayanthu" target="_blank" rel="noopener noreferrer">
                              <Github size={16} /> Code
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 border-border/50 text-muted-foreground hover:text-foreground" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} /> Live Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative border-t border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
          >
            <motion.h2 variants={STAGGER_CHILDREN} className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="text-primary font-mono text-xl">03.</span> Technical Stack
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Backend & APIs",
                  icon: <FileCode2 className="text-primary" size={24}/>,
                  skills: ["Python", "Flask", "FastAPI", "Node.js", "REST APIs", "C# MVC", "Automation", "Service Logic"]
                },
                {
                  title: "Frontend",
                  icon: <ExternalLink className="text-primary" size={24}/>,
                  skills: ["JavaScript", "HTML/CSS", "Responsive Web Apps", "Power BI Product Experiences"]
                },
                {
                  title: "Cloud & Data Engineering",
                  icon: <Cloud className="text-primary" size={24}/>,
                  skills: ["AWS S3", "Glue", "Athena", "Redshift", "Lambda", "Airflow", "PySpark", "Snowflake", "ETL/ELT"]
                },
                {
                  title: "Databases & BI",
                  icon: <Database className="text-primary" size={24}/>,
                  skills: ["SQL Server", "PostgreSQL", "Snowflake", "Teradata", "T-SQL", "Power BI", "SSRS", "Tableau", "Excel"]
                },
                {
                  title: "AI & Dev Tools",
                  icon: <Terminal className="text-primary" size={24}/>,
                  skills: ["Claude", "ChatGPT", "GitHub Copilot", "Replit", "Lovable", "AI-Assisted Development", "Prompt-Driven Prototyping"]
                }
              ].map((category, i) => (
                <motion.div key={i} variants={STAGGER_CHILDREN} className="p-6 rounded-xl border border-border/50 bg-card/50">
                  <div className="flex items-center gap-3 mb-6">
                    {category.icon}
                    <h3 className="text-lg font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="border-border text-muted-foreground py-1.5 px-3 rounded-md font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education & Certs Section */}
      <section className="py-24 relative border-t border-border/50 bg-muted/20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <motion.h2 variants={STAGGER_CHILDREN} className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-primary font-mono text-lg">04.</span> Education
              </motion.h2>
              <div className="space-y-6">
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
                      className="block p-5 border border-border/50 rounded-lg bg-card hover:border-primary/50 hover:bg-card/80 transition-all group"
                    >
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{edu.degree}</h4>
                      <div className="text-primary font-medium mb-3">{edu.school}</div>
                      <div className="flex justify-between text-sm text-muted-foreground font-mono">
                        <span>{edu.location}</span>
                        <span>{edu.date}</span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h2 variants={STAGGER_CHILDREN} className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-primary font-mono text-lg">05.</span> Certifications
              </motion.h2>
              <div className="space-y-6">
                {[
                  { title: "AWS Certified Solutions Architect – Associate", theme: "text-amber-400 border-amber-400/20 bg-amber-400/5" },
                  { title: "Microsoft PL-300 Power BI Data Analyst", theme: "text-blue-400 border-blue-400/20 bg-blue-400/5" }
                ].map((cert, i) => (
                  <motion.div key={i} variants={STAGGER_CHILDREN} className={`p-6 border rounded-lg flex items-center gap-4 ${cert.theme}`}>
                    <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center flex-shrink-0">
                      ★
                    </div>
                    <h4 className="font-bold">{cert.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative border-t border-border/50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
          >
            <motion.p variants={STAGGER_CHILDREN} className="text-primary font-mono mb-4">06. What's Next?</motion.p>
            <motion.h2 variants={STAGGER_CHILDREN} className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something Together</motion.h2>
            <motion.p variants={STAGGER_CHILDREN} className="text-muted-foreground text-lg mb-12">
              Currently looking for new opportunities. Whether you have a question, a project in mind, or just want to say hi, my inbox is always open.
            </motion.p>
            
            <motion.div variants={STAGGER_CHILDREN} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button size="lg" className="px-8 text-md h-12 w-full sm:w-auto" asChild>
                <a href="mailto:jayanthuppara999@gmail.com">
                  <Mail className="mr-2" size={18} /> Say Hello
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-md h-12 w-full sm:w-auto border-border" asChild>
                <a href="/JayanthUppara_Resume.pdf" download="JayanthUppara_Resume.pdf" className="flex items-center">
                  <Download className="mr-2" size={18} /> Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div variants={STAGGER_CHILDREN} className="flex justify-center gap-8">
              <a href="https://github.com/jayanthu" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/jayanthu" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="tel:656-203-4661" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone size={24} />
                <span className="sr-only">Phone</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border/20 text-muted-foreground font-mono text-sm">
        <p>Built with React, Vite & Tailwind. Designed by Jayanth Uppara.</p>
      </footer>
    </div>
  );
}
