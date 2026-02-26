"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "outline" | "secondary" | "ghost";
    className?: string;
    target?: string;
    rel?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
    children,
    href,
    onClick,
    variant = "primary",
    className = "",
    target,
    rel,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-white text-black hover:bg-white/90",
        outline: "border border-white/20 text-white hover:bg-white hover:text-black",
        secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
        ghost: "text-white/60 hover:text-white transition-colors",
    };

    const Component = href ? "a" : "button";

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
        >
            <Component
                href={href}
                onClick={onClick}
                target={target}
                rel={rel}
                type={href ? undefined : type}
                disabled={disabled}
                className={`${baseStyles} ${variants[variant]} ${className}`}
            >
                {children}
            </Component>
        </motion.div>
    );
}
