import { Download, ArrowLeft, FileText, Star, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import SponsorModal from "@/components/SponsorModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Templates = () => {
  const navigate = useNavigate();
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const templates = [
    {
      id: 1,
      name: "SDE Cloud Resume",
      description:
        "Software developer resume with cloud computing and scalable systems expertise",
      previewImage: "/resume-previews/raghul.png",
      downloads: 38,
      rating: 4.7,
      format: "PDF",
      downloadUrl:
        "https://github.com/Raghul-M/HireMe-ATS/raw/main/templates/Raghul_M_Resume_SDE-Devops.pdf",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Tech DevOps Resume",
      description:
        "Professional DevOps engineer resume with infrastructure and automation focus",
      previewImage: "/resume-previews/shwetha.png",
      downloads: 45,
      rating: 4.9,
      format: "PDF",
      downloadUrl:
        "https://github.com/Raghul-M/HireMe-ATS/raw/main/templates/Shwethamaran_resume.pdf",
      isAvailable: true,
    },
    {
      id: 3,
      name: "Coming Soon",
      description: "More professional resume templates will be available soon",
      previewImage: "/placeholder.svg",
      downloads: 0,
      rating: 0,
      format: "PDF",
      downloadUrl: "",
      isAvailable: false,
    },
    {
      id: 4,
      name: "Coming Soon",
      description: "More professional resume templates will be available soon",
      previewImage: "/placeholder.svg",
      downloads: 0,
      rating: 0,
      format: "PDF",
      downloadUrl: "",
      isAvailable: false,
    },
  ];

  const handleDownload = (template: (typeof templates)[0]) => {
    // Only allow downloads for available templates
    if (template.isAvailable && template.downloadUrl) {
      window.open(template.downloadUrl, "_blank");
    }
  };

  const handlePreview = (template: (typeof templates)[0]) => {
    if (template.isAvailable && template.previewImage) {
      setPreviewImage(template.previewImage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elevate-blue-50 via-white to-elevate-blue-50">
      <Navigation onFollowUsClick={() => setIsSponsorModalOpen(true)} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Mobile: Back button above heading */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </Button>
          </div>

          {/* Desktop: Back button, heading, and spacer in a row */}
          <div className="hidden md:flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
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
                Download professional, ATS-optimized resume examples for
                inspiration
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for layout balance */}
          </div>

          {/* Mobile: Centered heading */}
          <div className="md:hidden text-center">
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Free Resume Examples
            </h1>
            <p className="text-gray-600">
              Download professional, ATS-optimized resume examples for
              inspiration
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">83+</div>
              <div className="text-gray-600">Total Downloads</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                98%
              </div>
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
                <h3 className="font-semibold text-gray-800 mb-2">
                  1. Download & Study
                </h3>
                <p className="text-sm text-gray-600">
                  Download the PDF resume examples to study their structure,
                  layout, and content organization
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  2. Recreate in Canva
                </h3>
                <p className="text-sm text-gray-600">
                  Use the examples as inspiration to create your own resume
                  design in Canva or your preferred editor
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  3. Customize & Optimize
                </h3>
                <p className="text-sm text-gray-600">
                  Adapt the layout and content style to your field, adding your
                  own information and achievements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {/* First two cards - available templates */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates
              .filter((template) => template.isAvailable)
              .map((template, index) => (
                <Card
                  key={template.id}
                  className="glass-card hover:shadow-lg transition-all duration-300 animate-scale-in hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-4 overflow-hidden border border-blue-100 relative">
                      <img
                        src={template.previewImage}
                        alt={`${template.name} preview`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
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
                        size="sm"
                        onClick={() => handlePreview(template)}
                        variant="outline"
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

          {/* Coming Soon cards - 2 columns below */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {templates
              .filter((template) => !template.isAvailable)
              .map((template, index) => (
                <Card
                  key={template.id}
                  className="glass-card hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{
                    animationDelay: `${
                      (templates.filter((t) => t.isAvailable).length + index) *
                      0.1
                    }s`,
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-4 overflow-hidden border border-blue-100 relative">
                      <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <FileText className="w-16 h-16 text-gray-400 mb-3" />
                        <div className="text-center">
                          <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">
                            COMING SOON
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            Preview Available Soon
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-4 text-sm text-gray-400">
                      <span>Coming Soon</span>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {template.format}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        disabled={true}
                        className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Coming Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Want to Analyze Your Resume?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our AI-powered ATS analyzer to score your resume and get
            personalized improvement suggestions.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            Analyze My Resume Now
          </Button>
        </div>
      </div>

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-4xl h-auto max-h-[90vh] bg-white rounded-lg overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={previewImage}
              alt="Resume preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
