// src/components/FileUpload.tsx
import { useState, DragEvent, ChangeEvent } from "react";
import Alert from "./Alert";

type FileUploadProps = {
  onFileAccepted: (file: File) => void;
};

export default function FileUpload({ onFileAccepted }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const validTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (file: File) => {
    if (!validTypes.includes(file.type)) {
      setError("Arquivo inválido. Envie um CSV ou Excel.");
      return;
    }

    setError("");
    onFileAccepted(file);
  };

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="file-upload"
        className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition hover:bg-gray-100 ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="mb-4 h-8 w-8 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Clique para enviar</span> ou arraste
            o arquivo
          </p>
          <p className="text-xs text-gray-500">CSV ou Excel (XLSX, XLS)</p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".csv,.xls,.xlsx"
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {error && <Alert message={error} onClose={() => setError("")} />}
    </div>
  );
}
