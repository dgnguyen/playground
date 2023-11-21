import React from 'react'

import { Box, createTheme, PaletteMode, ThemeProvider, Typography } from '@mui/material'

import { usePomodoro } from './PomodoroContext'
import Settings from './Settings'
import Timer from './Timer'

const ColorModeContext = React.createContext({})

const Display = () => {
  const { settingInfo, setMode } = usePomodoro()


  const muiTheme = createTheme({
    palette: {
      mode: settingInfo.mode,
    },
  })



  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        )
      },
    }),
    [],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={muiTheme}>
        <Box padding={2} height="100vh" sx={{
          bgcolor: 'background.default', color: 'text.primary'
        }}>
          <Typography variant="h2" gutterBottom>
            Pomodoro timer
          </Typography>
          {settingInfo.isTimerPage ? <Timer /> : <Settings />}
        </Box>
      </ThemeProvider >
    </ColorModeContext.Provider >
  )
}

export default Display
