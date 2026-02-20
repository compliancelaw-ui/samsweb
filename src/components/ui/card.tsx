import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "default" | "lg";
  shadow?: "none" | "sm" | "default" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  default: "p-6",
  lg: "p-8",
} as const;

const shadowMap = {
  none: "",
  sm: "shadow-sm",
  default: "shadow",
  lg: "shadow-lg",
} as const;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = false,
      padding = "default",
      shadow = "default",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "rounded-lg border border-primary-100 bg-white",
          paddingMap[padding],
          shadowMap[shadow],
          hover && "transition-shadow hover:shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };
