"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
    label?: string;
    error?: string;
    textarea?: boolean;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Input({
    label,
    error,
    textarea = false,
    className = "",
    id,
    ...props
}: InputProps) {
    const baseStyles = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors";

    const Component = textarea ? "textarea" : "input";

    return (
        <div className="space-y-2 text-left w-full">
            {label && (
                <label htmlFor={id} className="text-sm text-white/60 ml-1">
                    {label}
                </label>
            )}

            <Component
                id={id}
                className={`${baseStyles} ${textarea ? "resize-none" : ""} ${className}`}
                {...(props as any)}
            />

            {error && (
                <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>
            )}
        </div>
    );
}
