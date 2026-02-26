"use client";

import { useState } from 'react';
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);

    // Using environment variable for security
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Error", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section className="py-24 mb-24" id="contact">
      <Card
        hover={false}
        className="relative overflow-hidden max-w-3xl mx-auto p-8 md:p-12 lg:p-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Let's build something <span className="text-gradient">extraordinary</span>.
          </h2>
          <p className="text-white/60 text-lg">
            I'm currently open for new opportunities. Send me a message and I'll get back to you.
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 size={48} className="text-white mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-white/60">Thank you for reaching out. I'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                id="name"
                name="name"
                required
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                required
                placeholder="youremail@example.com"
              />
            </div>
            <Input
              textarea
              label="Message"
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Your message"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-4"
            >
              {isSubmitting ? 'Sending...' : (
                <>Send Message <ArrowRight size={16} /></>
              )}
            </Button>
          </form>
        )}
      </Card>
    </section>
  );
}
