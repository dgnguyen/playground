import React, { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'

import { simulatePromise } from './helper'

const PerformancePromise = () => {
  const [data, setData] = useState<string>('')
  async function performancePromise(promise: Promise<unknown>, timeOut: number) {
    const startInstant = performance.now()
    const resultPromise = await promise
    const endInstant = performance.now()
    const duration = endInstant - startInstant
    if (duration > timeOut) {
      setData('time out')
    }
    else setData(`Promise take ${duration} ms and return result ${resultPromise?.result}`)
  }

  useEffect(() => {
    performancePromise(promiseToTest, 1000)
  }, [])
  const promiseToTest = simulatePromise(200, 4)


  return (
    <Box marginTop={4}><Typography variant='h3'>Performance promise</Typography>
      <Box>
        {data}
      </Box>
    </Box>)
}

export default PerformancePromise
