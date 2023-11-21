import React from 'react'

import { Button, Stack, Switch, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { usePomodoro } from './PomodoroContext'

const Settings = () => {

  const { settingInfo, setIsTimerPage, setWorkMinutes, switchMode, setBreakMinutes } = usePomodoro()

  return (
    <Box>
      <Button onClick={() => setIsTimerPage(true)}>Return to timer</Button>
      <Box margin={2}>
        <Typography variant="h5" marginBottom={4}>Work minutes</Typography>
        <Slider
          value={settingInfo.workMinutes}
          step={5}
          max={60}
          min={5}
          onChange={(_, newValue) => setWorkMinutes(newValue)}
          valueLabelDisplay="on"
        />
      </Box >
      <Box margin={2}>
        <Typography variant="h5" marginBottom={4}>Break minutes</Typography>
        <Slider
          value={settingInfo.breakMinutes}
          step={5}
          max={60}
          min={5}
          onChange={(_, newValue) => setBreakMinutes(newValue)}
          valueLabelDisplay="on"
        />
      </Box >
      <Box margin={2}>
        <Typography variant="h5" marginBottom={4}>Theme</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Light</Typography>
          <Switch onChange={switchMode} checked={settingInfo.mode === 'dark'} inputProps={{ 'aria-label': 'Theme' }} />
          <Typography>Dark</Typography>
        </Stack>
      </Box>
    </Box >
  )
}

export default Settings
