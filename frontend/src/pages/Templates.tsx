import { Download, ArrowLeft, FileText, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import SponsorModal from "@/components/SponsorModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Templates = () => {
  const navigate = useNavigate();
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);

  const templates = [
    {
      id: 1,
      name: "HR Professional Resume",
      description: "Professional HR resume template with clean layout and industry-specific sections",
      previewImage: "/placeholder.svg",
      downloads: 67,
      rating: 4.8,
      format: "PDF",
      downloadUrl: "https://github.com/Raghul-M/HireMe-ATS/raw/main/templates/Philomina_HR_Resume.pdf"
    },
    {
      id: 2,
      name: "Modern Professional Resume", 
      description: "Clean and modern resume design suitable for various professional roles",
      previewImage: "/placeholder.svg",
      downloads: 45,
      rating: 4.9,
      format: "PDF",
      downloadUrl: "https://github.com/Raghul-M/HireMe-ATS/raw/main/templates/Shwethamaran_resume.pdf"
    },
    {
      id: 3,
      name: "Tech Developer Resume",
      description: "Software developer and DevOps focused resume with technical skills emphasis",
      previewImage: "/placeholder.svg",
      downloads: 38,
      rating: 4.7,
      format: "PDF",
      downloadUrl: "https://github.com/Raghul-M/HireMe-ATS/raw/main/templates/Raghul_M_Resume_SDE-Devops.pdf"
    }
  ];

  const handleDownload = (template: typeof templates[0]) => {
    // In a real implementation, you would track downloads
    window.open(template.downloadUrl, '_blank');
  };

  const handlePreview = (template: typeof templates[0]) => {
    // Set the template to preview in the modal
    setPreviewTemplate(template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elevate-blue-50 via-white to-elevate-blue-50">
      <Navigation onFollowUsClick={() => setIsSponsorModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              Free Resume Examples
            </h1>
            <p className="text-gray-600">
              Download professional, ATS-optimized resume examples for inspiration
            </p>
          </div>
          
          <div className="w-24"></div> {/* Spacer for layout balance */}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Total Downloads</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-gray-600">ATS Pass Rate</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-amber-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Section */}
        <Card className="glass-card mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              How to Use These Resume Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">1. Download & Study</h3>
                <p className="text-sm text-gray-600">
                  Download the PDF resume examples to study their structure, layout, and content organization
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">2. Recreate in Canva</h3>
                <p className="text-sm text-gray-600">
                  Use the examples as inspiration to create your own resume design in Canva or your preferred editor
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">3. Customize & Optimize</h3>
                <p className="text-sm text-gray-600">
                  Adapt the layout and content style to your field, adding your own information and achievements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <Card 
              key={template.id} 
              className="glass-card hover:shadow-lg transition-all duration-300 animate-scale-in hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {template.format}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => handleDownload(template)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Want to Analyze Your Resume?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our AI-powered ATS analyzer to score your resume and get personalized improvement suggestions.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            Analyze My Resume Now
          </Button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] w-[90vw] h-[80vh] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>
              Preview: {previewTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="flex-1 px-6 pb-6">
              <iframe
                src={previewTemplate.downloadUrl}
                className="w-full h-full border border-gray-200 rounded-lg"
                title={`Preview of ${previewTemplate.name}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </div>
  );
};

export default Templates; 