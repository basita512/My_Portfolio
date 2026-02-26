"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
    return (
        <div
            className={`p-5 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 ${hover ? "hover:bg-white/[0.04] hover:border-white/20" : ""
                } ${className}`}
        >
            {children}
        </div>
    );
}
