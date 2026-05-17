import { type HTMLAttributes, forwardRef } from "react"
import { clsx } from "clsx"

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "yellow" | "blue" | "ghost"
  glow?: boolean
  noPadding?: boolean
}

const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  (
    { className, variant = "default", glow = false, noPadding = false, children, ...props },
    ref
  ) => {
    const variantStyles = {
      default: "border-[#2A2A2A] bg-[#1A1A1A]",
      yellow: "border-[#FFD400] bg-[#1A1A1A]",
      blue: "border-[#00B2FF] bg-[#1A1A1A]",
      ghost: "border-[#2A2A2A] bg-transparent",
    }

    const glowStyles = {
      default: "",
      yellow: "shadow-[0_0_20px_rgba(255,212,0,0.15)]",
      blue: "shadow-[0_0_20px_rgba(0,178,255,0.15)]",
      ghost: "",
    }

    return (
      <div
        ref={ref}
        className={clsx(
          "relative border rounded-none",
          "before:absolute before:top-0 before:left-0 before:w-2 before:h-2",
          "before:border-t-2 before:border-l-2",
          "after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2",
          "after:border-b-2 after:border-r-2",
          variantStyles[variant],
          variant === "yellow"
            ? "before:border-[#FFD400] after:border-[#FFD400]"
            : variant === "blue"
            ? "before:border-[#00B2FF] after:border-[#00B2FF]"
            : "before:border-[#FFD400] after:border-[#FFD400]",
          glow && glowStyles[variant],
          !noPadding && "p-4",
          "transition-all duration-150",
          className
        )}
        {...props}
      >
        {/* Top-right corner */}
        <span
          className={clsx(
            "absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2",
            variant === "blue" ? "border-[#00B2FF]" : "border-[#FFD400]"
          )}
          aria-hidden="true"
        />
        {/* Bottom-left corner */}
        <span
          className={clsx(
            "absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2",
            variant === "blue" ? "border-[#00B2FF]" : "border-[#FFD400]"
          )}
          aria-hidden="true"
        />
        {children}
      </div>
    )
  }
)

PixelCard.displayName = "PixelCard"

export { PixelCard }
