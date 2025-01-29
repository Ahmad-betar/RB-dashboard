import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

export default function LoadingSpinner({
  size = "medium",
  color = "primary",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-secondary",
    secondary: "text-secondary",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center h-screen dark:bg-background",
        className
      )}
    >
      <Loader2
        className={cn("animate-spin", sizeClasses[size], colorClasses[color])}
      />
    </div>
  );
}
