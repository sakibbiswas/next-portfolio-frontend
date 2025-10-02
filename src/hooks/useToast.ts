// src/hooks/useToast.ts
import toast from "react-hot-toast";

export const useToast = () => {
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);
  const info = (msg: string) => toast(msg);
  return { success, error, info };
};
