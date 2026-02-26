"use client";

interface SectionHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionHeader({ children, className = "" }: SectionHeaderProps) {
    return (
        <h2 className={`text-3xl font-bold mb-10 md:mb-16 tracking-tight ${className}`}>
            {children}
        </h2>
    );
}
