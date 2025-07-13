import { useState } from "react";
import { Eye, EyeOff, Check, X, Loader2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { encryptApiKey } from "@/utils/encryption";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onValidationChange?: (isValid: boolean) => void;
}

const ApiKeyInput = ({ value, onChange, error, onValidationChange }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateApiKey = async () => {
    if (!value.trim()) return;
    
    setIsValidating(true);
    try {
      // Encrypt the API key before sending for validation
      const encryptedApiKey = encryptApiKey(value);
      console.log('Validating API key (encrypted)');
      const response = await fetch(`http://localhost:8000/validate-api-key?api_key=${encryptedApiKey}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: ''
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      console.log('Type of result.valid:', typeof result.valid);
      console.log('Value of result.valid:', result.valid);
      
      // Check if the response has valid property and it's true
      const validationResult = result.valid === true;
      console.log('Validation result:', validationResult);
      
      setIsValid(validationResult);
      onValidationChange?.(validationResult);
    } catch (error) {
      console.error('API key validation error:', error);
      setIsValid(false);
      onValidationChange?.(false);
    } finally {
      setIsValidating(false);
    }
  };

  const getValidationIcon = () => {
    if (isValidating) return <Loader2 className="w-4 h-4 animate-spin text-gray-500" />;
    if (isValid === true) return <Check className="w-4 h-4 text-elevate-emerald-600" />;
    if (isValid === false) return <X className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
          Google Gemini API Key
        </Label>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
        >
          <span>Get your own API key</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Input
            id="apiKey"
            type={showKey ? "text" : "password"}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setIsValid(null);
              onValidationChange?.(false);
            }}
            placeholder="Enter your API key"
            className={`pr-12 transition-all duration-200 ${
              error 
                ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                : isValid === true
                ? "border-elevate-emerald-300 focus:border-elevate-emerald-500 focus:ring-elevate-emerald-200"
                : "border-gray-300 focus:border-elevate-blue-500 focus:ring-elevate-blue-200"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        
        <Button
          type="button"
          onClick={validateApiKey}
          disabled={!value.trim() || isValidating}
          variant="outline"
          className="flex items-center space-x-2 min-w-[120px]"
        >
          {getValidationIcon()}
          <span>Validate</span>
        </Button>
      </div>
      
      {isValid === true && (
        <p className="text-sm text-elevate-emerald-600 flex items-center space-x-1">
          <Check className="w-4 h-4" />
          <span>API key is valid</span>
        </p>
      )}
      
      {isValid === false && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <X className="w-4 h-4" />
          <span>Invalid API key</span>
        </p>
      )}
      
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : !isValid && (
        <p className="text-sm text-gray-500">
          Your API key is secure and never stored
        </p>
      )}
    </div>
  );
};

export default ApiKeyInput;
