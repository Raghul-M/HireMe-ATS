/**
 * InputForm Component - Core Resume Analysis Form
 * 
 * This is the main component that handles the entire resume analysis workflow:
 * 1. API key validation (Google Gemini)
 * 2. Resume file upload (PDF support)
 * 3. Job details input (title, company, description)
 * 4. Experience level selection
 * 5. AI-powered analysis using Gemini API
 * 6. Results display with ATS scoring
 * 
 * Features:
 * - Real-time form validation
 * - Secure API key encryption
 * - File upload with validation
 * - Loading states and error handling
 * - Analytics tracking for user interactions
 * - Responsive design for all devices
 */

import { useState } from "react";
import { ArrowUp, AlertCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ApiKeyInput from "@/components/ApiKeyInput";
import ResumeUpload from "@/components/ResumeUpload";
import JobDetailsForm from "@/components/JobDetailsForm";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ExperienceSlider from "@/components/ExperienceSlider";
import LoadingAnimation from "@/components/LoadingAnimation";
import SponsorModal from "@/components/SponsorModal";
import Results from "./Results";
import { encryptApiKey } from "@/utils/encryption";

const InputForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!apiKey.trim()) {
      newErrors.apiKey = "API key is required";
    }
    
    if (!isApiKeyValid) {
      newErrors.apiKey = "Please validate your API key first";
    }
    
    if (!file) {
      newErrors.file = "Please upload your resume";
    }
    
    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnalyze = async () => {
    if (!validateForm()) {
      toast({
        title: "Please fill in all required fields",
        description: "Make sure to provide all required information and validate your API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Encrypt the API key before sending
      const encryptedApiKey = encryptApiKey(apiKey);
      
      const formData = new FormData();
      formData.append('file', file!);
      formData.append('job_description', jobDescription);
      formData.append('job_title', jobTitle);
      formData.append('company', companyName);
      formData.append('api_key', encryptedApiKey);
      formData.append('experience', experience.toString());

      const response = await fetch('https://hireme-ats-backend.onrender.com/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setAnalysisResult(data);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been successfully analyzed",
      });
      
      // Track resume analysis completion with Vercel Analytics
      track('resume_analyzed', {
        job_title: jobTitle,
        company: companyName,
        has_job_description: !!jobDescription,
        experience_level: experience
      });
      
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = apiKey && isApiKeyValid && file && jobTitle && experience >= 0;

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (showResults) {
    return <Results analysisResult={analysisResult} setShowResults={setShowResults} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-elevate-blue-50 via-white to-elevate-blue-50">
      <Navigation onFollowUsClick={() => setIsSponsorModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-12">
        <Header />
        
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 animate-scale-in">
            <div className="space-y-8">
              <ApiKeyInput
                value={apiKey}
                onChange={setApiKey}
                error={errors.apiKey}
                onValidationChange={setIsApiKeyValid}
              />
              
              {/* API Usage Disclaimer */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">API Usage Notice</h4>
                  <p className="text-sm text-green-700">
                    This application uses your Gemini API key to analyze resumes. Each analysis consumes API credits and may incur charges based on your Google Cloud billing plan. Please review your <a href="https://console.cloud.google.com/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-900">Google Cloud billing</a> before proceeding.
                  </p>
                </div>
              </div>
              
              <ResumeUpload
                file={file}
                onFileSelect={setFile}
                error={errors.file}
              />

              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />
              
              <JobDetailsForm
                jobTitle={jobTitle}
                companyName={companyName}
                onJobTitleChange={setJobTitle}
                onCompanyNameChange={setCompanyName}
                errors={{
                  jobTitle: errors.jobTitle,
                }}
              />

              <ExperienceSlider
                value={experience}
                onChange={setExperience}
                error={errors.experience}
              />
              
              <Button
                onClick={handleAnalyze}
                disabled={!isFormValid}
                className={`
                  w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300
                  ${isFormValid 
                    ? "gradient-primary gradient-primary-hover text-white shadow-lg hover:shadow-xl animate-pulse-glow" 
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                <ArrowUp className="w-5 h-5 mr-2" />
                Analyze Resume
              </Button>
            </div>
          </div>
          
          <footer className="text-center mt-12">
            <p className="text-gray-600">
              Developed with ❤️ by{" "}
              <span className="font-semibold text-elevate-blue-600">
                Raghul M
              </span>
              {" "}from{" "}
              <span className="font-semibold text-elevate-blue-600">
                CareerPod
              </span>
            </p>
          </footer>
        </div>
      </div>

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </div>
  );
};

export default InputForm;
