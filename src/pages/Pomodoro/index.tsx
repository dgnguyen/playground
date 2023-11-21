import React from 'react'

import Display from './Display'
import PomodoroProvider from './PomodoroContext'

const Pomodoro = () => {

  return (
    <PomodoroProvider>
      <Display />
    </PomodoroProvider>
  )
}

export default Pomodoro
