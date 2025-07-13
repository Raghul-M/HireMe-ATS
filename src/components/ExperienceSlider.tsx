import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ExperienceSliderProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const ExperienceSlider = ({ value, onChange, error }: ExperienceSliderProps) => {
  const getExperienceLabel = (years: number) => {
    if (years === 0) return "Fresher";
    if (years === 1) return "1 Year";
    return `${years} Years`;
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Years of Experience
      </Label>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Fresher</span>
          <span className="text-lg font-semibold text-elevate-blue-600">
            {getExperienceLabel(value)}
          </span>
          <span className="text-sm text-gray-500">25+ Years</span>
        </div>
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          max={25}
          min={0}
          step={1}
          className={`w-full ${error ? 'border-red-300' : ''}`}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
          <span>25</span>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ExperienceSlider;
