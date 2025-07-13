import { useState, useRef } from "react";
import { Upload, FileText, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  error?: string;
}

const ResumeUpload = ({ file, onFileSelect, error }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      onFileSelect(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700">
        Resume Upload
      </label>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? "border-elevate-blue-400 bg-elevate-blue-50" 
            : error 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300 bg-gray-50 hover:border-elevate-blue-400 hover:bg-elevate-blue-50"
          }
        `}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${isDragOver ? "bg-elevate-blue-100" : "bg-white"} shadow-md`}>
            <Upload className={`w-8 h-8 ${isDragOver ? "text-elevate-blue-600" : "text-gray-500"}`} />
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Drop your resume here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              PDF format only, up to 10MB
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="border-elevate-blue-200 text-elevate-blue-600 hover:bg-elevate-blue-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
      
      {file && (
        <div className="flex items-center space-x-3 p-4 bg-elevate-emerald-50 border border-elevate-emerald-200 rounded-lg animate-scale-in">
          <FileText className="w-5 h-5 text-elevate-emerald-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-elevate-emerald-800">{file.name}</p>
            <p className="text-xs text-elevate-emerald-600">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <ArrowUp className="w-4 h-4 text-elevate-emerald-600" />
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ResumeUpload;
