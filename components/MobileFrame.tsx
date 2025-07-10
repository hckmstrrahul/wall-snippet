'use client'

import { useState } from 'react'
import StatusSnippet from './StatusSnippet'
import ControlPanel from './ControlPanel'

export default function MobileFrame() {
  const [statusState, setStatusState] = useState({
    actions: 0,
    meeting: null as { time: 'now' | 'today' | string } | null,
    onboardingLeft: null as number | null,
    isOutdated: false,
  })

  return (
    <div className="border-[8px] border-gray-800 rounded-[40px] overflow-hidden shadow-xl">
      <div className="w-[340px] bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="p-4">
          <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-[20px]">
            <StatusSnippet state={statusState} />
          </div>
          
          <ControlPanel state={statusState} setState={setStatusState} />
        </div>
      </div>
    </div>
  )
} 