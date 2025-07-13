import { Download, Star, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  onFollowUsClick?: () => void;
}

const Navigation = ({ onFollowUsClick }: NavigationProps) => {
  const navigate = useNavigate();

  const handleDownloadExamples = () => {
    navigate('/templates');
  };

  const handleStarRepo = () => {
    // You can replace this with your actual GitHub repo link
    window.open('https://github.com/Raghul-M/HireMe-ATS', '_blank');
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 mr-2 -ml-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-elevate-blue-500 to-elevate-blue-600 shadow-md">
              <ArrowUp className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gray-800">HireMe</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-1 md:space-x-2 flex-1 justify-end">
            {/* Download Examples Button - Blue Filled */}
            <Button
              size="sm"
              onClick={handleDownloadExamples}
              className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-5 md:px-6 py-3 md:py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-md flex-1 sm:flex-none max-w-[140px] sm:max-w-none"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden lg:inline">Resume Examples</span>
              <span className="lg:hidden">Examples</span>
            </Button>

            {/* Star GitHub Button - Black Filled */}
            <Button
              size="sm"
              onClick={handleStarRepo}
              className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-5 md:px-6 py-3 md:py-3 bg-gray-900 hover:bg-black text-white shadow-md flex-1 sm:flex-none max-w-[100px] sm:max-w-none ml-2"
            >
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
              <span className="hidden lg:inline">Star GitHub Repo</span>
              <span className="lg:hidden">Repo Star</span>
            </Button>

            {/* Follow Us Button - Gradient Filled */}
            <Button
              size="sm"
              onClick={onFollowUsClick}
              className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-5 md:px-6 py-3 md:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md flex-1 sm:flex-none max-w-[100px] sm:max-w-none ml-2"
            >
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-red-500" />
              <span className="hidden lg:inline">Follow Us</span>
              <span className="lg:hidden">Follow Us</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 