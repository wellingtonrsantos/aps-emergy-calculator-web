import { useState } from "react";
import FileUpload from "../../components/FileUpload";

function CalculateEmergy() {
  const [fileName, setFileName] = useState("");

  const handleFileAccepted = (file: File) => {
    setFileName(file.name);
    console.log("Arquivo recebido:", file);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-6 text-2xl font-bold">Calcular Emergia</h1>
      <h2 className="mb-6 text-2xl font-bold">Importar Arquivo</h2>
      <FileUpload onFileAccepted={handleFileAccepted} />
      {fileName && (
        <p className="mt-4 text-green-600">Arquivo aceito: {fileName}</p>
      )}
    </div>
  );
}

export default CalculateEmergy;
