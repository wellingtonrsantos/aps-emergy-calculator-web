// src/components/Alert.tsx
type AlertProps = {
  message: string | string[];
  onClose: () => void;
};

export default function Alert({ message, onClose }: AlertProps) {
  const messages = Array.isArray(message) ? message : [message];

  return (
    <div className="mt-4 flex w-full flex-col rounded-md border border-red-300 bg-red-100 px-4 py-3 text-red-800">
      <ul className="mb-2 list-disc space-y-1 pl-5">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div className="flex justify-end">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={onClose}
          aria-label="Fechar alerta"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
