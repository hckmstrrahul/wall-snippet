import ActionControls from './controls/ActionControls'
import MeetingControls from './controls/MeetingControls'
import OnboardingControls from './controls/OnboardingControls'
import FreshnessToggle from './controls/FreshnessToggle'

interface StatusState {
  actions: number;
  meeting: { time: "now" | "today" | string } | null;
  onboardingLeft: number | null;
  isOutdated: boolean;
}

interface ControlPanelProps {
  state: StatusState;
  setState: React.Dispatch<React.SetStateAction<StatusState>>;
}

export default function ControlPanel({ state, setState }: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <ActionControls 
        actions={state.actions} 
        setActions={(actions) => setState({ ...state, actions })} 
      />
      
      <MeetingControls 
        meeting={state.meeting} 
        setMeeting={(meeting) => setState({ ...state, meeting })} 
      />
      
      <OnboardingControls 
        onboardingLeft={state.onboardingLeft} 
        setOnboardingLeft={(onboardingLeft) => setState({ ...state, onboardingLeft })} 
      />
      
      <FreshnessToggle 
        isOutdated={state.isOutdated} 
        setIsOutdated={(isOutdated) => setState({ ...state, isOutdated })} 
      />
    </div>
  )
} 