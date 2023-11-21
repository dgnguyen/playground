import React, { createContext, ReactNode, useContext, useState } from 'react'

import { PaletteMode } from '@mui/material'

// interface ContextType {
//   theme: PaletteMode,
//   time: number,
//   startTimer: boolean,
//   toggleTimer: () => void
//   setTheme: () => void
//   setTime: () => void
//   timeDisplay: string
// }

// const initialState = {
//   theme: 'light' as PaletteMode,
//   time: 25,
//   startTimer: false,
//   toggleTimer: () => { },
//   setTheme: () => { },
//   setTime: () => { },
//   timeDisplay: ''
// }

// const stateInfo = {
//   settingsInfo: {
//     work: 25,
//     break: 5
//   },
//   mode: 'work'
// }


const PomodoroContext = createContext<any>(null)

export const PomodoroContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  const [isTimerPage, setIsTimerPage] = useState(true)
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)

  const switchMode = () => setMode(mode === 'dark' ? 'light' : 'dark')

  const value = {
    settingInfo: {
      workMinutes,
      breakMinutes,
      isTimerPage,
      mode,
    },
    switchMode,
    setWorkMinutes,
    setBreakMinutes,
    setIsTimerPage,

  }

  return (<PomodoroContext.Provider value={value}>
    {children}
  </PomodoroContext.Provider>)
}

export const usePomodoro = () => {
  return useContext(PomodoroContext)
}

export default PomodoroContextProvider

