"use client";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
    return (
        <span className={`text-xs md:text-sm font-medium text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full transition-colors hover:bg-white/10 ${className}`}>
            {children}
        </span>
    );
}
