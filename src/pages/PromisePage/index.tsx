import React from 'react'

import { Box, Divider } from '@mui/material'

import PerformancePromise from './PerformancePromise'
import PromiseChainDatabase from './PromiseChainDatabase'
import PromiseChaining from './PromiseChaining'

const PromisePage = () => {




  return (
    <Box padding={2}>
      <PromiseChaining />
      <Divider sx={{ marginY: 4 }} />
      <PerformancePromise />
      <Divider sx={{ marginY: 4 }} />
      <PromiseChainDatabase />
    </Box >
  )
}

export default PromisePage
