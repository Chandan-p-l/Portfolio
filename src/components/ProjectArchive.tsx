import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Plus, Sparkles, ExternalLink, Terminal, Shield, Flame, Radio, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { sound } from '../utils/sound';
import { ProjectModal } from './ProjectModal';

export function ProjectArchive() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    sound.playClick();
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#050505] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FF2B2B] font-bold">04 // SELECTED VENTURES</span>
            <span className="text-white">PROJECT UNIVERSE</span>
          </div>
          <span className="hidden sm:inline">CLICK TO INSPECT FULL BLUEPRINTS</span>
        </div>

        {/* Huge Editorial Section Title */}
        <div className="mb-20">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none text-white">
            PROJECTS &<br />
            <span className="text-stroke-white hover:text-white transition-colors duration-300">
              VENTURES.
            </span>
          </h2>
          <p className="font-sans text-[#8A8A84] text-base sm:text-lg mt-4 max-w-2xl">
            A curated archive of commercial ventures, hardware-software experiments, and critical protocols built from first principles.
          </p>
        </div>

        {/* Monumental Editorial Project Showcase */}
        <div className="space-y-12 mb-16">
          {PROJECTS.map((project, idx) => {
            const isWyther = project.id === 'wyther';
            const isVedavarti = project.id === 'vedavarti';
            const isCanezz = project.id === 'canezz';
            const isIndicall = project.id === 'indicall';
            const isExperiments = project.id === 'experiments';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4 }}
                onClick={() => handleOpenProject(project)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="project"
                className="group border border-white/15 bg-[#090909] p-6 sm:p-12 hover:border-[#FF2B2B] transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Background Giant Watermark Number */}
                <div className="absolute right-4 top-2 font-display text-8xl sm:text-9xl md:text-[12rem] font-black text-white/[0.03] group-hover:text-[#FF2B2B]/[0.08] transition-colors pointer-events-none select-none leading-none">
                  {project.number}
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Project Identity */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3 font-tech text-xs text-[#8A8A84] pb-2 border-b border-white/10">
                      <span className="text-[#FF2B2B] font-bold">PROJECT {project.number}</span>
                      <span>//</span>
                      <span>{project.role}</span>
                      <span>//</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight group-hover:text-[#FF2B2B] transition-colors">
                      {project.title}
                    </h3>

                    <div className="font-future text-xs sm:text-sm text-neutral-300 tracking-wider">
                      {project.category}
                    </div>

                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
                      {project.summary}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-tech text-[10px] sm:text-xs text-[#8A8A84] bg-white/5 border border-white/10 px-2.5 py-1 group-hover:border-white/20 group-hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables & CTA */}
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="font-tech text-xs text-[#8A8A84] mb-3 uppercase tracking-widest">
                        KEY DELIVERABLES:
                      </div>
                      <div className="space-y-2">
                        {project.deliverables.slice(0, 4).map((d) => (
                          <div key={d} className="font-tech text-xs text-white flex items-center gap-2">
                            <span className="text-[#FF2B2B]">»</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between font-tech text-xs">
                      <span className="text-[#FF2B2B] font-bold group-hover:underline">
                        OPEN BLUEPRINT & SPECS
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#FF2B2B] group-hover:bg-[#FF2B2B] group-hover:text-black flex items-center justify-center transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
