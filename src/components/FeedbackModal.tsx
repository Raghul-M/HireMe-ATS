
import { X, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
}

const FeedbackModal = ({ isOpen, onClose, category }: FeedbackModalProps) => {
  // Mock feedback data - replace with actual API response
  const feedbackData: Record<string, any> = {
    "Skills Match": {
      score: 85,
      strengths: [
        "Strong technical skills alignment with job requirements",
        "Relevant programming languages mentioned",
        "Good balance of hard and soft skills"
      ],
      improvements: [
        "Add more specific project examples",
        "Include quantifiable achievements",
        "Mention industry-specific tools"
      ],
      recommendations: [
        "Consider adding React.js experience",
        "Highlight cloud computing skills",
        "Include certification details"
      ]
    },
    "Experience Relevance": {
      score: 78,
      strengths: [
        "Good career progression shown",
        "Relevant industry experience",
        "Leadership roles highlighted"
      ],
      improvements: [
        "More specific achievement metrics needed",
        "Better job description alignment",
        "Include remote work experience"
      ],
      recommendations: [
        "Quantify your impact with numbers",
        "Use action verbs for achievements",
        "Align experience with job posting"
      ]
    }
    // Add more categories as needed
  };

  if (!category || !feedbackData[category]) return null;

  const data = feedbackData[category];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl">
            <TrendingUp className="w-6 h-6 text-elevate-blue-600" />
            <span>{category} - Detailed Analysis</span>
            <span className={`text-lg font-bold ${
              data.score >= 80 ? 'text-elevate-emerald-600' :
              data.score >= 60 ? 'text-elevate-amber-500' :
              'text-red-500'
            }`}>
              {data.score}%
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Strengths Section */}
          <div className="space-y-3">
            <h3 className="flex items-center space-x-2 text-lg font-semibold text-elevate-emerald-700">
              <CheckCircle className="w-5 h-5" />
              <span>Strengths</span>
            </h3>
            <div className="space-y-2">
              {data.strengths.map((strength: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-elevate-emerald-50 rounded-lg">
                  <div className="w-2 h-2 bg-elevate-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-elevate-emerald-800">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Improvements Section */}
          <div className="space-y-3">
            <h3 className="flex items-center space-x-2 text-lg font-semibold text-elevate-amber-700">
              <AlertCircle className="w-5 h-5" />
              <span>Areas for Improvement</span>
            </h3>
            <div className="space-y-2">
              {data.improvements.map((improvement: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-elevate-amber-50 rounded-lg">
                  <div className="w-2 h-2 bg-elevate-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-elevate-amber-800">{improvement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="space-y-3">
            <h3 className="flex items-center space-x-2 text-lg font-semibold text-elevate-blue-700">
              <TrendingUp className="w-5 h-5" />
              <span>Action Items</span>
            </h3>
            <div className="space-y-2">
              {data.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-elevate-blue-50 rounded-lg">
                  <input 
                    type="checkbox" 
                    className="mt-1 rounded border-elevate-blue-300"
                  />
                  <p className="text-sm text-elevate-blue-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gradient-primary gradient-primary-hover">
            Apply Suggestions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
