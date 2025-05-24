import { useState, useRef } from "react";
import { Upload, FileText, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = [".csv", ".xls", ".xlsx"];
    const fileName = file.name.toLowerCase();
    const fileExtension = "." + fileName.split(".").pop();

    if (validExtensions.includes(fileExtension)) {
      setFile(file);
      onFileChange?.(file);
      toast.success("Arquivo importado com sucesso", {
        description: `Nome do arquivo: ${file.name}`,
      });
    } else {
      toast.error("Formato de arquivo inválido", {
        description:
          "Por favor, selecione apenas arquivos CSV ou Excel (.csv, .xls, .xlsx)",
      });
    }
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    onFileChange?.(null);
    toast.success("Arquivo removido", {
      description: "O arquivo foi removido com sucesso",
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-all ${
        isDragging
          ? "border-green-500 bg-green-100/20"
          : file
            ? "border-green-500 bg-green-50/10"
            : "border-green-300 hover:border-green-500"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.xls,.xlsx"
        className="hidden"
        aria-label="Upload de arquivo"
      />

      {file ? (
        <div className="flex flex-col items-center">
          <FileText size={48} className="mb-3 text-green-500" />
          <p className="text-lg font-medium text-green-800">{file.name}</p>
          <p className="mb-4 text-sm text-green-600">
            {(file.size / 1024).toFixed(2)} KB
          </p>
          <Button
            variant="outline"
            className="cursor-pointer border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
            onClick={handleRemoveFile}
          >
            <FileX className="mr-2 h-4 w-4" />
            Remover arquivo
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Upload size={48} className="mb-3 text-green-500" />
          <h3 className="mb-2 text-xl font-semibold text-green-800">
            Arraste e solte seu arquivo aqui
          </h3>
          <p className="mb-6 text-green-600">ou clique para selecionar</p>
          <p className="mt-6 text-sm text-green-600">
            Formatos aceitos: .csv, .xls, .xlsx
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
