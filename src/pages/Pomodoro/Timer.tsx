import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { usePomodoro } from './PomodoroContext'

// import moment from 'moment'


const getTimeDisplay = (seconds: number) => {
  const minutesLeft = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60
  const displayMinutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
  const displaySecondes = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
  return `${displayMinutes} : ${displaySecondes}`
  // return moment.utc(seconds * 1000).format("mm:ss")
}

const Timer = () => {
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const { settingInfo, setIsTimerPage } = usePomodoro()
  const [isPaused, setIsPaused] = useState(true)
  const [secondsLeft, setsecondsLeft] = useState(settingInfo.workMinutes * 60)


  const secondsLeftRef = useRef(secondsLeft)
  const isPausedRef = useRef(isPaused)
  const modeRef = useRef(mode)

  const handleReset = () => {
    setsecondsLeft(settingInfo.workMinutes * 60)
    secondsLeftRef.current = settingInfo.workMinutes * 60
  }


  function switchMode() {
    const nextMode = mode === 'work' ? 'break' : 'work'
    const nextSecondsLeft = nextMode === 'work' ? settingInfo.workMinutes * 60 : settingInfo.breakMinutes * 60
    setsecondsLeft(nextSecondsLeft)
    setMode(nextMode)
    modeRef.current = nextMode
    secondsLeftRef.current = nextSecondsLeft
  }


  function tick() {
    // eslint-disable-next-line no-plusplus
    secondsLeftRef.current--
    setsecondsLeft(secondsLeftRef.current)
  }


  const handlePlay = () => {
    setIsPaused(!isPaused)
    isPausedRef.current = !isPaused
  }





  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return
      if (secondsLeftRef.current === 0) return switchMode()
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [settingInfo])

  return (
    <Box>
      <Typography variant="h3">{mode}</Typography>
      <Box fontSize={128}>{getTimeDisplay(secondsLeft)}</Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <Button variant="contained" onClick={handlePlay}>{isPaused ? 'Play' : 'Stop'}</Button>
        <Button variant="contained" onClick={() => setIsTimerPage(false)}>Settings</Button>
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        <Button variant="outlined" onClick={switchMode}>Next</Button>
      </Box>
    </Box>
  )
}

export default Timer
