import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number; // em ms (opcional)
};

export default function Toast({
  message,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-sm rounded-lg bg-red-100 p-4 text-red-800 shadow-lg">
      <div className="flex items-start justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-xl leading-none font-bold text-red-800 hover:text-red-900"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
