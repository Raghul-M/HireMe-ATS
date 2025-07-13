
import { Briefcase, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JobDetailsFormProps {
  jobTitle: string;
  companyName: string;
  onJobTitleChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
  errors?: {
    jobTitle?: string;
    companyName?: string;
  };
}

const JobDetailsForm = ({ 
  jobTitle, 
  companyName, 
  onJobTitleChange, 
  onCompanyNameChange, 
  errors 
}: JobDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
          Job Title
        </Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => onJobTitleChange(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className={`pl-10 transition-all duration-200 ${
              errors?.jobTitle 
                ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:border-elevate-blue-500 focus:ring-elevate-blue-200"
            }`}
          />
        </div>
        {errors?.jobTitle && (
          <p className="text-sm text-red-600">{errors.jobTitle}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
          Company Name (Optional)
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            placeholder="e.g., Google, Microsoft"
            className={`pl-10 transition-all duration-200 ${
              errors?.companyName 
                ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                : "border-gray-300 focus:border-elevate-blue-500 focus:ring-elevate-blue-200"
            }`}
          />
        </div>
        {errors?.companyName && (
          <p className="text-sm text-red-600">{errors.companyName}</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailsForm;
