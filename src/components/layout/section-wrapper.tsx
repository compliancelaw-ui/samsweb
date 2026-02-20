import { cn } from "@/lib/utils";

type SectionVariant = "default" | "white" | "light" | "dark" | "gradient";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: SectionVariant;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background text-gray-900",
  white: "bg-white text-gray-900",
  light: "bg-[#F0F4F8] text-gray-900",
  dark: "bg-[#2E3B4E] text-white",
  gradient: "bg-gradient-to-br from-primary to-teal text-white",
};

export function SectionWrapper({
  children,
  className,
  id,
  variant = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(variantStyles[variant], "py-16 md:py-24", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
