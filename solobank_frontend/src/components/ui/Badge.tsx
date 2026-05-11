import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "purple";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-surface border border-border text-muted",
  accent:
    "bg-[rgba(153,69,255,0.1)] border border-[rgba(153,69,255,0.2)] text-solana-purple",
  purple:
    "bg-[rgba(153,69,255,0.1)] border border-[rgba(153,69,255,0.2)] text-solana-purple",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
