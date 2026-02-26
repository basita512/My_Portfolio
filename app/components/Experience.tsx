"use client";

import { motion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";

const EXPERIENCE = [
  {
    title: "Implementation Engineer",
    company: "Zenius-IT Services Pvt Ltd",
    period: "June 2024 – Present",
    description: [
      "Engineered LLM Orchestrator for a diagnostic center AI receptionist, automating appointment management and query resolution via function calling loop, FSM and Gaurdrails",
      "Developed a Conversational AI IVR system using a RAG-based service architecture for accurate, low-latency information retrieval with intelligent call routing to call queues",
      "Built a real-time voice intelligence pipeline by transcribing live RTP audio streams using Faster-Whisper, streaming JWT-authenticated STT events via WebSockets with post-call detail report call center analytics.",
      "Developed frontend UI for the real-time call center platform, implementing a JWT-secured WebSocket-based Agent UI and an integrated analytics dashboard for visualizing call intelligence and performance metrics."
    ]
  }
];

export default function Experience() {
  return (
    <section className="py-24" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader>Experience</SectionHeader>

        <div className="space-y-12">
          {EXPERIENCE.map((exp, index) => (
            <div key={index} className="relative pl-4 md:pl-0">
              <div className="md:grid md:grid-cols-4 md:gap-8 items-baseline">
                <div className="mb-4 md:mb-0 text-sm text-white/50 font-medium">
                  {exp.period}
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                  <div className="text-white/60 mb-6">{exp.company}</div>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3">
                        <span className="text-white/30 mt-2 text-[10px]">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
