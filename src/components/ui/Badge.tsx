"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "pro";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles: Record<BadgeVariant, string> = {
      default: "bg-surface text-muted border-border",
      success: "bg-success/20 text-success border-success/30",
      warning: "bg-warning/20 text-warning border-warning/30",
      error: "bg-error/20 text-error border-error/30",
      info: "bg-info/20 text-info border-info/30",
      pro: "gradient-pro text-white border-transparent",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
