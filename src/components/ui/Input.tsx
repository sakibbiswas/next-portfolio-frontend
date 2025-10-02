// src/components/ui/Input.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return <input {...props} className={`w-full p-2 border rounded ${props.className ?? ""}`} />;
};
