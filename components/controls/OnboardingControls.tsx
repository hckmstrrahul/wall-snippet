export default function OnboardingControls({ 
  onboardingLeft, 
  setOnboardingLeft 
}: { 
  onboardingLeft: number | null;
  setOnboardingLeft: (onboardingLeft: number | null) => void;
}) {
  const handleToggle = () => {
    if (onboardingLeft === null) {
      setOnboardingLeft(25) // Default value (half of the new max)
    } else {
      setOnboardingLeft(null)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 50) {
      setOnboardingLeft(value)
      
      // If value is 0, set to null to hide the onboarding message
      if (value === 0) {
        setOnboardingLeft(null)
      }
    }
  }
  
  return (
    <div className="border rounded-[12px] p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">🌀 Onboarding Progress</h3>
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={onboardingLeft !== null}
            onChange={handleToggle}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      {onboardingLeft !== null && (
        <div className="space-y-2">
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={onboardingLeft} 
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>1%</span>
            <span>{onboardingLeft}%</span>
            <span>50%</span>
          </div>
        </div>
      )}
    </div>
  )
} 