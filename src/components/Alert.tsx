type AlertProps = {
  message: string;
  onClose: () => void;
};

export default function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-md border border-red-300 bg-red-100 px-4 py-3 text-red-800">
      <span>{message}</span>
      <button
        className="ml-2 text-red-600 hover:text-red-800"
        onClick={onClose}
        aria-label="Fechar alerta"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
