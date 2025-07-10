import { useState, useEffect } from 'react';

export default function MeetingControls({ 
  meeting, 
  setMeeting 
}: { 
  meeting: { time: "now" | "today" | string } | null;
  setMeeting: (meeting: { time: "now" | "today" | string } | null) => void;
}) {
  const [daysValue, setDaysValue] = useState<string>('3');
  
  // Extract days from meeting time string when it changes
  useEffect(() => {
    if (meeting && typeof meeting.time === 'string' && meeting.time.startsWith('in ')) {
      const match = meeting.time.match(/in (\d+)/);
      if (match && match[1]) {
        setDaysValue(match[1]);
      }
    }
  }, [meeting]);
  
  const handleSetMeeting = (time: "now" | "today" | string | null) => {
    if (time === null) {
      setMeeting(null)
    } else {
      setMeeting({ time })
    }
  }
  
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value)
    setDaysValue(e.target.value)
    
    if (!isNaN(days) && days > 0) {
      setMeeting({ time: `in ${days} ${days === 1 ? 'day' : 'days'}` })
    }
  }
  
  const handleDaysClick = () => {
    if (meeting === null || meeting.time === "now" || meeting.time === "today") {
      // Enable days input and set a default value
      const days = parseInt(daysValue) || 3;
      setDaysValue(days.toString());
      setMeeting({ time: `in ${days} ${days === 1 ? 'day' : 'days'}` });
    }
  }
  
  return (
    <div className="border rounded-[12px] p-4">
      <h3 className="font-medium mb-2">🗓️ Meeting</h3>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleSetMeeting(null)}
            className={`px-3 py-1 rounded text-[13px] ${meeting === null ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            None
          </button>
          <button 
            onClick={() => handleSetMeeting("now")}
            className={`px-3 py-1 rounded text-[13px] ${meeting?.time === "now" ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Now
          </button>
          <button 
            onClick={() => handleSetMeeting("today")}
            className={`px-3 py-1 rounded text-[13px] ${meeting?.time === "today" ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Today
          </button>
          <button 
            onClick={handleDaysClick}
            className={`px-3 py-1 rounded text-[13px] ${meeting?.time && !["now", "today"].includes(meeting.time) ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            In Days
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap text-[13px]">In days:</label>
          <input 
            type="number" 
            min="1" 
            value={daysValue}
            className="border rounded px-2 py-1 w-16 dark:bg-gray-800 text-[13px]"
            onChange={handleDaysChange}
            disabled={meeting === null || meeting.time === "now" || meeting.time === "today"}
          />
        </div>
      </div>
    </div>
  )
} 