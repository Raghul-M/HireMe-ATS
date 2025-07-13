interface OverallScoreGaugeProps {
  score: number;
  size?: number;
}

const OverallScoreGauge = ({ score, size = 300 }: OverallScoreGaugeProps) => {
  const radius = (size - 60) / 2;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // Full circle
  const centerX = size / 2;
  const centerY = size / 2;

  // Calculate the offset for the score arc
  const offset = circumference - (score / 100) * circumference;

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "EXCELLENT";
    if (score >= 70) return "GOOD";
    if (score >= 60) return "AVERAGE";
    return "NEEDS IMPROVEMENT";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // emerald-500
    if (score >= 60) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  // Create gradient segments for the colorful arc
  const segments = [
    { color: "#ef4444", stop: "0%" },    // red
    { color: "#f97316", stop: "25%" },   // orange  
    { color: "#eab308", stop: "50%" },   // yellow
    { color: "#22c55e", stop: "75%" },   // green
    { color: "#10b981", stop: "100%" },  // emerald
  ];

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="scoreGradient" gradientUnits="userSpaceOnUse">
            {segments.map((segment, index) => (
              <stop 
                key={index}
                offset={segment.stop} 
                stopColor={segment.color} 
              />
            ))}
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Colored segments circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-2000 ease-out"
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-6xl font-bold text-gray-800 mb-2">
          {score}
        </div>
        <div className="text-lg font-medium text-gray-600 mb-3">
          out of 100
        </div>
        <div className={`text-sm font-bold px-4 py-2 rounded-full ${
          score >= 80 ? 'bg-elevate-emerald-100 text-elevate-emerald-700' :
          score >= 60 ? 'bg-elevate-amber-100 text-elevate-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {getScoreLabel(score)}
        </div>
      </div>
    </div>
  );
};

export default OverallScoreGauge;
