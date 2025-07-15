import { useState, useMemo } from "react";
import { ArrowLeft, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import ScoreCircle from "@/components/ScoreCircle";
import OverallScoreGauge from "@/components/OverallScoreGauge";
import FeedbackModal from "@/components/FeedbackModal";
import SponsorModal from "@/components/SponsorModal";
import html2pdf from "html2pdf.js";

interface ResultsProps {
  analysisResult: {
    response: string;
  };
  setShowResults: (show: boolean) => void;
}

const Results = ({ analysisResult, setShowResults }: ResultsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const { toast } = useToast();

  const downloadPDF = () => {
    const element = document.getElementById('pdf-content');
    if (!element) {
      toast({
        title: "Error",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Temporarily hide navigation and buttons
    const elementsToHide = document.querySelectorAll('.pdf-hide');
    elementsToHide.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    const opt = {
      margin: 0.5,
      filename: 'resume-analysis-results.pdf',
      image: { 
        type: 'jpeg', 
        quality: 0.98
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Show hidden elements again
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
      
      toast({
        title: "PDF Downloaded",
        description: "Your resume analysis results have been saved as PDF.",
      });
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      
      // Show hidden elements again
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
      
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    });
  };

  // 1. Parse the raw JSON response
  let parsed: any = {};
  try {
    let resp = analysisResult.response;
    if (typeof resp === 'string') {
      resp = resp.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(resp);
    } else {
      parsed = resp;
    }
  } catch (e) {
    parsed = {};
  }

  // 2. Store each key in its own variable based on your consistent API structure
  const overallScore = parsed.overall_score ?? 0;
  const feedbackSummary = Array.isArray(parsed.feedback_summary) ? parsed.feedback_summary.join(' ') : (parsed.feedback_summary ?? '');
  const pros = parsed.pros ?? [];
  const cons = parsed.cons ?? [];
  const ats = parsed.ats_criteria_ratings ?? {};

  const totalIssues = 15;
  
  const scoreCategories = [
    { 
      name: "Skill Match Score", 
      score: (ats.skill_match_score ?? 0) * 10, 
      rawScore: ats.skill_match_score ?? 0,
      color: "emerald", 
      description: "How well your skills align with the job requirements"
    },
    { 
      name: "Keyword Match Score", 
      score: (ats.keyword_match_score ?? 0) * 10, 
      rawScore: ats.keyword_match_score ?? 0,
      color: "blue", 
      description: "Relevance of keywords used in your resume"
    },
    { 
      name: "Experience Relevance Score", 
      score: (ats.experience_relevance_score ?? 0) * 10, 
      rawScore: ats.experience_relevance_score ?? 0,
      color: "green", 
      description: "Alignment of your experience with the target role"
    },
    { 
      name: "Resume Formatting Score", 
      score: (ats.resume_formatting_score ?? 0) * 10, 
      rawScore: ats.resume_formatting_score ?? 0,
      color: "amber", 
      description: "Professional presentation and structure of your resume"
    },
    { 
      name: "Action Verbs Usage Score", 
      score: (ats.action_verb_usage_score ?? 0) * 10, 
      rawScore: ats.action_verb_usage_score ?? 0,
      color: "blue", 
      description: "Effectiveness of action verbs in describing achievements"
    },
    { 
      name: "Job Fit Prediction Score", 
      score: (ats.job_fit_score ?? 0) * 10, 
      rawScore: ats.job_fit_score ?? 0,
      color: "emerald", 
      description: "Overall prediction of your fit for the position"
    }
  ];

  const motivationalQuotes = [
    "Your next opportunity is just one optimized resume away!",
    "Every rejection is a redirection to something better.",
    "Success is where preparation meets opportunity.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-elevate-emerald-600";
    if (score >= 60) return "text-elevate-amber-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elevate-blue-50 via-white to-elevate-blue-50">
      <Navigation onFollowUsClick={() => setIsSponsorModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation and buttons that should be hidden in PDF */}
        <div className="pdf-hide flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => setShowResults(false)}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Upload</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">Resume Analysis Complete</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}</p>
          </div>
          
          <div className="w-24"></div> {/* Spacer for layout balance */}
        </div>

        {/* PDF Content - This is what gets captured in the PDF */}
        <div id="pdf-content">
          {/* PDF Title */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis Report</h1>
            <p className="text-gray-600">Generated by HireMe ATS AI Assistant</p>
            <hr className="mt-4 border-gray-300" />
          </div>

          {/* Overall Score Card */}
        <Card className="glass-card mb-8 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall Resume Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <OverallScoreGauge score={overallScore} size={300} />
            </div>
          </CardContent>
        </Card>





        {/* Summary - full width */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg flex items-center mb-2">
              <span className="text-blue-500 mr-2">ℹ️</span> Summary
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-gray-700">
              {feedbackSummary}
            </div>
          </div>
        </div>

        {/* Strengths & Areas for Improvement - side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-bold text-lg flex items-center mb-2">
                <span className="text-emerald-500 mr-2">💪</span> Strengths
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <ul>
                  {pros.map((pro, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <span className="text-xs text-emerald-600 mr-2">●</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Areas for Improvement */}
          <div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-bold text-lg flex items-center mb-2">
                <span className="text-orange-400 mr-2">⚠️</span> Areas for Improvement
              </div>
              <div className="rounded-lg bg-orange-50 p-4">
                <ul>
                  {cons.map((con, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <span className="text-xs text-orange-500 mr-2">●</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>





        {/* Score Categories Grid - Keep together in PDF */}
        <div className="pdf-break-before pdf-no-break">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">ATS Criteria Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {scoreCategories.map((category, index) => (
              <Card 
                key={category.name} 
                className="glass-card cursor-pointer hover:shadow-lg transition-all duration-300 animate-scale-in hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center mb-4">
                    <ScoreCircle score={category.score} rawScore={category.rawScore} size={100} />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-center">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-2 text-center">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </div> {/* End of pdf-content */}

        {/* Quick Actions */}
        <div className="pdf-hide text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-elevate-emerald-500 hover:bg-elevate-emerald-600 text-white flex items-center space-x-2"
              onClick={downloadPDF}
            >
              <Download className="w-4 h-4" />
              <span>Download Analysis</span>
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowResults(false)}
            >
              Analyze Another Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FeedbackModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory}
      />
      
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </div>
  );
};

export default Results;
