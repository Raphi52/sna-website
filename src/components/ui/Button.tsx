"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "reddit"
  | "twitter"
  | "pro";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantStyles: Record<ButtonVariant, string> = {
      default:
        "bg-surface hover:bg-surface-hover text-white border border-border",
      outline:
        "bg-transparent text-white border-2 border-white hover:bg-white/10",
      ghost: "bg-transparent text-white hover:bg-white/10",
      instagram: "gradient-border-instagram text-white",
      tiktok: "gradient-border-tiktok text-white",
      facebook: "gradient-border-facebook text-white",
      reddit: "gradient-border-reddit text-white",
      twitter: "gradient-border-twitter text-white",
      pro: "gradient-pro text-white hover:opacity-90",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
