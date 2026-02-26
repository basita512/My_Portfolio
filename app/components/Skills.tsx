"use client";

import { motion } from "motion/react";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const SKILLS = {
  "Languages": ["Python", "JavaScript", "TypeScript", "C", "C++"],
  "Backend": ["FastAPI", "Node.js", "Express.js", "WebSockets"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Redux", "HTML", "CSS"],
  "Databases": ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
  "Gen AI": ["LLMs", "RAG", "LangChain", "LangGraph", "STT", "TTS", "Vector DB"],
  "Tools": ["Git", "Github", "Docker", "AWS", "CI/CD", "Kafka"]
};

export default function Skills() {
  return (
    <section className="py-24" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeader>Skills</SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <Card key={index}>
              <h3 className="text-lg font-medium text-white mb-4 md:mb-6">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <Badge key={i}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
