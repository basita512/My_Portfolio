import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12" id="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
      >
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-white/60 mb-2">
            <MapPin size={16} />
            <span className="text-sm font-medium">Hyderabad, India</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Hi, I'm Basita.
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/70 font-medium tracking-tight">
              Software Developer building Gen AI apps.
            </h2>
            <h3 className="text-lg text-white/50 max-w-xl mx-auto md:mx-0 leading-relaxed font-normal">
              I build scalable AI orchestrators, real-time voice intelligence pipelines, and modern web applications with a focus on performance and user experience.
            </h3>
          </div>

          <div className="space-y-8 pt-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Button href="#contact" variant="primary">
                Get in touch <ArrowRight size={18} />
              </Button>
              <Button
                href={process.env.NEXT_PUBLIC_RESUME_LINK || "#"}
                target="_blank"
                variant="outline"
              >
                Resume
              </Button>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <SocialLink href="https://github.com/basita512" icon={<Github size={20} />} />
              <SocialLink href="https://linkedin.com/in/basita512" icon={<Linkedin size={20} />} />
              <SocialLink
                href="https://x.com/justAnotherDevv"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              />
              <SocialLink href="mailto:mail2basita@gmail.com" icon={<Mail size={20} />} />
            </div>
          </div>
        </div>

        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 relative rounded-full overflow-hidden border border-white/10 shrink-0">
          <img
            src="/self/me.jpg"
            alt="Basita Tashfeen"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
    >
      {icon}
    </a>
  );
}
