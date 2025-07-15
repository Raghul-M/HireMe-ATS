import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingLinkedInButton = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  useEffect(() => {
    // Auto-hide tooltip after 3 seconds
    const timer = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLinkedInClick = () => {
    // Replace with your LinkedIn profile URL
    window.open("https://www.linkedin.com/in/yourprofile", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleLinkedInClick}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            size="icon"
          >
            <Linkedin className="w-6 h-6 text-white fill-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-900 text-white">
          <p>Love this tool? Connect with me</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FloatingLinkedInButton; 