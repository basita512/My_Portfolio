"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

const PROJECTS = [
  {
    title: "Career Page Builder",
    tech: ["React+TypeScript", "Express", "Postgres", "Prisma", "TailwindCSS"],
    description: "Multi-tenant SaaS job board platform to make customized career pages for companies with company-specific branding, SEO configurations, and role-based access control.",
    link: "https://career-page-builder-frontend-123.vercel.app/",
    github: "https://github.com/basita512/Career-Page-Builder",
    images: [
      "/projects/careerPageBuilder/a-image.png",
      "/projects/careerPageBuilder/a2.png",
      "/projects/careerPageBuilder/a3.png",
      "/projects/careerPageBuilder/a4.png",
      "/projects/careerPageBuilder/a5.png",
      "/projects/careerPageBuilder/a6.png"
    ]
  },
  {
    title: "Math Mentor AI",
    tech: ["Python", "LangChain", "LangGraph", "Hybrid RAG", "EasyOCR", "Whisper", "Groq Llama3", "ChromaDB", "Streamlit"],
    description: "JEE Math problem-solving AI with Text, speech and image input using a deterministic state machine to manage complex agent workflows.",
    link: "https://aimathmentor-hwn5xtsc4ade5zfwx3ksbza.streamlit.app/",
    github: "https://github.com/basita512/Math-Mentor-AI",
    images: [
      "/projects/mathmentor/b1.png",
      "/projects/mathmentor/b2.png",
      "/projects/mathmentor/b3.png",
      "/projects/mathmentor/b4.png",
      "/projects/mathmentor/b5.png",
      "/projects/mathmentor/b66.png"
    ]
  },
  {
    title: "Real Time AI Voice Orchestrator",
    tech: ["React+TypeScript", "FastAPI", "LiveKit Agents", "RAG", "Qdrank Vector DB", "Deepgram TTS", "Groq Llama3", "Whisper"],
    description: "A low-latency AI voice assistant that can hold natural conversations while citing information from uploaded documents.",
    github: "https://github.com/basita512/RealTime_AI_Voice_Orchestrator",
    images: [
      "/projects/reatimeVoice/c1.png",
      "/projects/reatimeVoice/c2.png",
      "/projects/reatimeVoice/c3.png"
    ]
  },
  {
    title: "Trade Portfolio AI Chatbot",
    tech: ["Python", "LangChain", "RAG", "FAISS Vector DB", "SQLite", "Pandas", "Numpy"],
    description: "Self-improving financial analytics chatbot with a hybrid RAG pipeline and automated feedback loop.",
    github: "https://github.com/basita512/Trade-Portfolio-AI-Chatbot",
    images: [
      "/projects/portfolioChatbot/d1.png",
      "/projects/portfolioChatbot/d2.png",
      "/projects/portfolioChatbot/d3.png",
      "/projects/portfolioChatbot/d4.png",
      "/projects/portfolioChatbot/d5.png"
    ]
  },
];

interface ImageCarouselProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

function ImageCarousel({ images, title, onImageClick }: ImageCarouselProps) {
  const [state, setState] = useState({ current: 0, direction: 0 });

  const next = () => setState(prev => ({
    current: (prev.current + 1) % images.length,
    direction: 1
  }));
  const prev = () => setState(prev => ({
    current: (prev.current - 1 + images.length) % images.length,
    direction: -1
  }));

  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : direction < 0 ? -300 : 0,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : direction > 0 ? -300 : 0,
      opacity: 0
    })
  };

  return (
    <div className="relative group aspect-video overflow-hidden cursor-zoom-in">
      <AnimatePresence mode="popLayout" custom={state.direction}>
        <motion.img
          key={state.current}
          src={images[state.current]}
          alt={`${title} screenshot ${state.current + 1}`}
          custom={state.direction}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="w-full h-full object-contain object-center"
          onClick={() => onImageClick(state.current)}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />

      {images.length > 1 && (
        <div className="z-20">
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setState(prev => ({
                  current: i,
                  direction: i > prev.current ? 1 : -1
                }));
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === state.current ? "bg-white w-4" : "bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<{ projectIndex: number; imageIndex: number; direction: number } | null>(null);

  const closeLightbox = () => setLightbox(null);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightbox) return;
    const project = PROJECTS[lightbox.projectIndex];
    setLightbox({
      ...lightbox,
      imageIndex: (lightbox.imageIndex + 1) % project.images.length,
      direction: 1
    });
  }, [lightbox]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightbox) return;
    const project = PROJECTS[lightbox.projectIndex];
    setLightbox({
      ...lightbox,
      imageIndex: (lightbox.imageIndex - 1 + project.images.length) % project.images.length,
      direction: -1
    });
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, nextImage, prevImage]);

  const lightboxVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : direction < 0 ? -1000 : 0,
      opacity: 0,
      scale: direction === 0 ? 0.9 : 1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : direction > 0 ? -1000 : 0,
      opacity: 0,
      scale: direction === 0 ? 0.9 : 1
    })
  };

  return (
    <section className="py-16 md:py-24" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader>Projects</SectionHeader>

        <div className="space-y-16 md:space-y-24">
          {PROJECTS.map((project, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-center">

              <div className="w-full lg:w-3/5 group relative">
                <div className="absolute -inset-[2px] rounded-[18px] opacity-20 blur-[2px] transition-all duration-500" />
                <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
                  <div className="h-8 md:h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-[10px] text-white/20 font-medium tracking-widest uppercase truncate max-w-[150px] inline-block">
                        {project.title}
                      </span>
                    </div>
                  </div>
                  <ImageCarousel
                    images={project.images}
                    title={project.title}
                    onImageClick={(imageIndex) => setLightbox({ projectIndex: index, imageIndex, direction: 0 })}
                  />
                </div>
              </div>

              <div className="w-full lg:w-2/5 space-y-4 md:space-y-6">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-white/60 leading-relaxed text-base md:text-lg">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Badge key={i}>{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4">
                  {project.link && (
                    <Button href={project.link} variant="primary" className="text-sm px-5 py-2.5">
                      Live Site <ArrowUpRight size={16} />
                    </Button>
                  )}
                  <Button
                    href={project.github}
                    variant="outline"
                    className="text-sm px-5 py-2.5 bg-transparent backdrop-blur-sm"
                  >
                    Source <Github size={16} />
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-[110]"
            >
              <X size={24} />
            </button>

            {PROJECTS[lightbox.projectIndex].images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md z-[110]"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md z-[110]"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence initial={false} custom={lightbox.direction} mode="popLayout">
                <motion.img
                  key={`${lightbox.projectIndex}-${lightbox.imageIndex}`}
                  src={PROJECTS[lightbox.projectIndex].images[lightbox.imageIndex]}
                  alt={`${PROJECTS[lightbox.projectIndex].title} full screen`}
                  custom={lightbox.direction}
                  variants={lightboxVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                />
              </AnimatePresence>

              <div className="absolute bottom-0 md:-bottom-12 left-0 right-0 text-center pointer-events-none">
                <span className="text-white/40 text-sm font-medium tracking-widest uppercase">
                  {PROJECTS[lightbox.projectIndex].title} — {lightbox.imageIndex + 1} / {PROJECTS[lightbox.projectIndex].images.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
