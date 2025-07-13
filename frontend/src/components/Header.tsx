
import { ArrowUp } from "lucide-react";

const Header = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-elevate-blue-500 to-elevate-blue-600 shadow-lg">
          <ArrowUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          Hire Me ATS AI Assistant
        </h1>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Your AI-Powered Resume Analyzer
      </h2>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        AI-powered ATS scoring to maximize your job application success
      </p>
    </div>
  );
};

export default Header;
