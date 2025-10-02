// src/components/ui/Button.tsx
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export const Button: React.FC<Props> = (props) => {
  const { children, className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};
