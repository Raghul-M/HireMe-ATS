
import { FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const JobDescriptionInput = ({ value, onChange, error }: JobDescriptionInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="jobDescription" className="text-sm font-medium text-gray-700">
        Job Description (Optional)
      </Label>
      <div className="relative">
        <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
        <Textarea
          id="jobDescription"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here for better analysis..."
          className={`pl-10 min-h-[120px] transition-all duration-200 ${
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
              : "border-gray-300 focus:border-elevate-blue-500 focus:ring-elevate-blue-200"
          }`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default JobDescriptionInput;
