import { ArrowUp, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elevate-blue-50 via-white to-elevate-blue-50">
      <Navigation onFollowUsClick={() => {}} />
      
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="glass-card rounded-3xl p-12 max-w-lg w-full text-center animate-scale-in">
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-elevate-blue-500 to-elevate-blue-600 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <FileText className="w-8 h-8 text-elevate-blue-600 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Analyzing Your Resume
            </h2>
            <p className="text-gray-600">
              Our AI is carefully reviewing your resume...
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-2 h-2 bg-elevate-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Parsing Resume Content</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-2 h-2 bg-elevate-blue-500 rounded-full animate-pulse delay-300"></div>
              <span className="text-sm text-gray-700">Analyzing Skills & Experience</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-2 h-2 bg-elevate-amber-500 rounded-full animate-pulse delay-700"></div>
              <span className="text-sm text-gray-700">Generating ATS Scores</span>
            </div>
          </div>
          
          <div className="mt-8 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-elevate-blue-500 to-elevate-emerald-500 rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            This usually takes 30-60 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
