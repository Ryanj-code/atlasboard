import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-xl font-semibold focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 dark:from-blue-500 dark:to-cyan-400",
    secondary:
      "bg-amber-100 text-amber-900 dark:bg-slate-700 dark:text-amber-200 border border-amber-300 dark:border-slate-500 hover:bg-amber-200 dark:hover:bg-slate-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
