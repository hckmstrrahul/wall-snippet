import React from 'react';

interface StatusState {
  actions: number;
  meeting: { time: "now" | "today" | string } | null;
  onboardingLeft: number | null;
  isOutdated: boolean;
}

export default function StatusSnippet({ state }: { state: StatusState }) {
  const { actions, meeting, onboardingLeft, isOutdated } = state
  
  // Generate message fragments based on state
  const fragments = []
  
  if (actions > 0) {
    fragments.push(
      <span key="actions">
        📌 <span className="text-action">{actions} {actions === 1 ? 'action' : 'actions'}</span> pending
      </span>
    )
  }
  
  if (meeting) {
    let meetingText;
    if (meeting.time === 'now') {
      meetingText = <span className="text-meeting">1 meeting happening now</span>;
    } else if (meeting.time === 'today') {
      meetingText = <span className="text-meeting">1 meeting today</span>;
    } else {
      // Only color the "1 upcoming meeting" part, not the "in X days" part
      meetingText = (
        <>
          <span className="text-meeting">1 upcoming meeting</span> {meeting.time}
        </>
      );
    }
    
    fragments.push(
      <span key="meeting">
        🗓️ {meetingText}
      </span>
    )
  }
  
  if (onboardingLeft !== null && onboardingLeft > 0) {
    fragments.push(
      <span key="onboarding">
        Your onboarding is 🌀 <span className="text-onboarding">{onboardingLeft}% left</span>
      </span>
    )
  }
  
  if (isOutdated) {
    // Capitalize "Some" if it's the only fragment
    if (fragments.length === 0 && actions === 0 && !meeting && (onboardingLeft === null || onboardingLeft === 0)) {
      fragments.push(
        <span key="outdated">
          Some of your portfolio may be ⏱️ <span className="text-outdated">outdated</span>
        </span>
      )
    } else {
      fragments.push(
        <span key="outdated">
          some of your portfolio may be ⏱️ <span className="text-outdated">outdated</span>
        </span>
      )
    }
  }
  
  // Format the message with proper grammar
  let messageContent;
  if (fragments.length === 0) {
    messageContent = "You are all caught up!"
  } else if (fragments.length === 1) {
    // Check if the fragment is onboarding or portfolio (which don't need "You have" prefix)
    const fragmentKey = fragments[0].key;
    if (fragmentKey === 'onboarding' || fragmentKey === 'outdated') {
      messageContent = fragments[0];
    } else {
      messageContent = (
        <>
          You have {fragments[0]}
        </>
      )
    }
  } else if (fragments.length === 2) {
    // Check if both fragments are onboarding/portfolio (which don't need "You have" prefix)
    const onlySpecialFragments = fragments.every(fragment => 
      fragment.key === 'onboarding' || fragment.key === 'outdated'
    );
    
    if (onlySpecialFragments) {
      messageContent = (
        <>
          {fragments[0]} and {fragments[1]}
        </>
      )
    } else {
      messageContent = (
        <>
          You have {fragments[0]} and {fragments[1]}
        </>
      )
    }
  } else {
    // 3 or more items
    const fragmentsCopy = [...fragments];
    const lastFragment = fragmentsCopy.pop();
    
    // Check if all fragments are onboarding/portfolio (which don't need "You have" prefix)
    const onlySpecialFragments = fragments.every(fragment => 
      fragment.key === 'onboarding' || fragment.key === 'outdated'
    );
    
    if (onlySpecialFragments) {
      messageContent = (
        <>
          {fragmentsCopy.map((fragment, index) => (
            <React.Fragment key={index}>
              {fragment}{index < fragmentsCopy.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))} and {lastFragment}
        </>
      )
    } else {
      messageContent = (
        <>
          You have {fragmentsCopy.map((fragment, index) => (
            <React.Fragment key={index}>
              {fragment}{index < fragmentsCopy.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))} and {lastFragment}
        </>
      )
    }
  }
  
  return (
    <div className="text-lg font-semibold flex flex-col">
      <div>Hi Rahul,</div>
      <div>{messageContent}</div>
    </div>
  )
} 