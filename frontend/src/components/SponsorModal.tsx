
import { Heart, Coffee, X, Github, Linkedin, Instagram, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FollowModal = ({ isOpen, onClose }: FollowModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl text-center">
            <Heart className="w-6 h-6 text-blue-500" />
            <span>Follow Us</span>
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6 pt-4">
          <div className="space-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Connect with us!</h3>
            <p className="text-gray-600 text-sm">
              Stay updated with Resume Ready and connect with the developer
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mx-auto w-48 h-48 flex items-center justify-center">
            <div className="text-center space-y-2">
              <img 
                src="/qrcode.png" 
                alt="QR Code to connect" 
                className="w-32 h-32 mx-auto rounded border border-gray-200"
              />
              <p className="text-xs text-gray-500">Scan to connect</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700">Follow us on social media:</h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://linkedin.com/in/m-raghul/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">LinkedIn</span>
              </a>
              
              <a
                href="https://github.com/Raghul-M"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-800">GitHub</span>
              </a>
              
              <a
                href="https://instagram.com/raghul_official._/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
                <span className="text-sm font-medium text-pink-800">Instagram</span>
              </a>
              
              <a
                href="mailto:raghulmadhavan1@gmail.com"
                className="flex items-center space-x-2 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">Gmail</span>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm font-medium">
              Thanks for using Resume Ready! 🚀
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Follow us for updates, tips, and new features
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowModal;
