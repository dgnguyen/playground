import React from 'react'

import { Box, Stack } from '@mui/material'

import { Body, Header } from './layout'

import './app.css'

export const App = () => {

  return (
    <div className="App">
      <Stack display="flex" flexDirection="row">
        <Header />
        <Box className="app-container">
          <Box className="body">
            <Body />
          </Box>
        </Box>
      </Stack>
    </div>
  )
}
