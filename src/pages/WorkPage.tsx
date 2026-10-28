import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, Sparkles, Filter, Layers, ExternalLink, Shield, Cpu, Activity } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Footer } from '../components/Footer';
import { ProjectModal } from '../components/ProjectModal';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { sound } from '../utils/sound';
import { FitText } from '../components/FitText';

const CATEGORIES = ['ALL', 'STARTUPS', 'WEBSITES & APPS', 'BOOK'];

export function WorkPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredProjectId, setHoveredProjectId] = useState<string>('wythher');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'STARTUPS') return p.kind === 'Startup';
    if (activeCategory === 'WEBSITES & APPS') return p.kind === 'Website' || p.kind === 'Web app';
    if (activeCategory === 'BOOK') return p.kind === 'Book';
    return true;
  });

  const activeProject = PROJECTS.find((p) => p.id === hoveredProjectId) || PROJECTS[0];

  const handleProjectClick = (project: Project) => {
    sound.playClick();
    if (project.id === 'wythher') {
      setIsExpanding(true);
      setTimeout(() => {
        navigate('/work/wythher');
      }, 350);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#050505] text-[#F4F2EC]">
        {/* Fullscreen Expand Overlay for WythHer */}
        <AnimatePresence>
          {isExpanding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9995] bg-[#FF2B2B] flex items-center justify-center pointer-events-none"
            >
              <div className="font-display font-black text-6xl sm:text-8xl text-black uppercase tracking-tight">
                WYTHHER
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Hero Header */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-[#FF2B2B] font-bold">02 // VENTURES ARCHIVE</span>
                <span className="text-white">SELECTED WORK</span>
              </div>
              <span className="text-emerald-400 font-bold">{PROJECTS.length} SHIPPED PROJECTS</span>
            </div>

            <FitText as="h1" text="PROJECTS & VENTURES." max={8} className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white mb-6">
              PROJECTS &<br />
              <span className="text-[#FF2B2B]">VENTURES.</span>
            </FitText>

            <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Startups I help run, websites and apps I've designed and built — and one novel.
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-6 px-4 sm:px-8 md:px-12 border-b border-white/10 bg-[#080808] sticky top-16 z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#FF2B2B]" />
              <span className="font-tech text-xs text-[#8A8A84] tracking-wider hidden sm:inline">FILTER ARCHIVE:</span>
            </div>

            <div className="flex items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playSwitch();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1.5 font-tech text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#FF2B2B] text-black font-bold border border-[#FF2B2B]'
                      : 'bg-white/5 text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Split / Sticky Visual Work Architecture */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT / MAIN AREA: Interactive Project Archive List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-3 flex justify-between">
                <span>INDEX / VENTURE</span>
                <span>ROLE & TIMELINE</span>
              </div>

              <div className="divide-y divide-white/10">
                {filteredProjects.map((project) => {
                  const isHovered = hoveredProjectId === project.id;
                  return (
                    <div
                      key={project.id}
                      onMouseEnter={() => {
                        setHoveredProjectId(project.id);
                        sound.playHover();
                      }}
                      onClick={() => handleProjectClick(project)}
                      data-cursor="project"
                      className={`group py-8 transition-all duration-300 cursor-pointer block ${
                        isHovered ? 'pl-4 sm:pl-6 bg-white/[0.02]' : 'hover:pl-2'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-3 font-tech text-xs">
                            <span
                              className={`font-bold transition-colors ${
                                isHovered ? 'text-[#FF2B2B]' : 'text-neutral-500'
                              }`}
                            >
                              PROJECT {project.number}
                            </span>
                            <span className="text-neutral-600">/</span>
                            <span className="text-neutral-400">{project.year}</span>
                            {project.id === 'wythher' && (
                              <span className="px-2 py-0.5 bg-[#FF2B2B]/20 text-[#FF2B2B] border border-[#FF2B2B]/40 text-[10px] font-bold">
                                FLAGSHIP
                              </span>
                            )}
                          </div>

                          <FitText as="h2" text={project.title} max={3.75} className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight transition-colors duration-200 ${
                              isHovered ? 'text-[#FF2B2B]' : 'text-white'
                            }`}>
                            {/* Real link for crawlers; the row's click handler drives the UI. */}
                            <Link to={`/work/${project.id}`} onClick={(e) => e.preventDefault()}>
                              {project.title}
                            </Link>
                          </FitText>

                          <div className="font-future text-xs text-neutral-400">
                            {project.category}
                          </div>

                          <p className="font-sans text-sm text-neutral-300 leading-relaxed max-w-lg pt-1">
                            {project.tagline}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {project.techStack.slice(0, 4).map((tech) => (
                              <span key={tech} className="font-tech text-[10px] text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between self-stretch pt-2">
                          <span className="font-tech text-xs text-white font-bold hidden sm:inline">
                            {project.role}
                          </span>
                          <div
                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                              isHovered
                                ? 'border-[#FF2B2B] bg-[#FF2B2B] text-black'
                                : 'border-white/20 text-white'
                            }`}
                          >
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT / STICKY AREA: Dynamic Visual Project Preview Showcase */}
            <div className="lg:col-span-5 sticky top-28 hidden lg:block">
              <div className="border border-white/15 bg-neutral-950 p-6 shadow-2xl space-y-6">
                {/* Visual Header */}
                <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-pulse" />
                    <span className="text-white font-bold">VISUAL SCHEMATIC</span>
                  </div>
                  <span>PRJ / {activeProject.number}</span>
                </div>

                {/* Morphing Visual Canvas */}
                <div className="relative aspect-[4/3] w-full bg-black border border-white/15 overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-black to-[#0E0E0E]"
                    >
                      {/* Visual Blueprint Overlay */}
                      <div className="flex items-center justify-between font-tech text-[10px] text-[#8A8A84]">
                        <span className="text-[#FF2B2B] font-bold uppercase">{activeProject.category}</span>
                        <span>{activeProject.year}</span>
                      </div>

                      {/* Graphic Composition for the Active Project */}
                      <div className="py-4 space-y-3">
                        <FitText as="div" text={activeProject.title} max={2.25} className="font-display font-black text-4xl text-white tracking-tight">
                          {activeProject.title}
                        </FitText>

                        <p className="font-editorial italic text-base text-neutral-300">
                          "{activeProject.tagline}"
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-2 font-tech text-[10px]">
                          <div className="p-2 bg-neutral-900 border border-white/10">
                            <span className="text-neutral-400 block text-[9px]">ROLE</span>
                            <span className="text-white font-bold">{activeProject.role}</span>
                          </div>
                          <div className="p-2 bg-neutral-900 border border-white/10">
                            <span className="text-neutral-400 block text-[9px]">OUTCOME</span>
                            <span className="text-emerald-400 font-bold">{activeProject.metricsPlaceholder || 'LIVE SYSTEM'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Click prompt */}
                      <div className="font-tech text-xs text-white flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="text-[#FF2B2B] font-bold">
                          {activeProject.id === 'wythher' ? 'CLICK FOR CASE STUDY' : 'CLICK TO INSPECT SPECS'}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#FF2B2B]" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Subordinate Deliverables Checklist */}
                <div className="space-y-2 font-tech text-xs">
                  <div className="text-[#8A8A84] uppercase tracking-wider text-[10px]">CORE DELIVERABLES:</div>
                  <div className="space-y-1.5">
                    {activeProject.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-neutral-300 text-[11px]">
                        <span className="text-[#FF2B2B]">▪</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blueprint Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <Footer />
      </div>
    </PageTransition>
  );
}
