import React, { FormEvent, useState } from 'react'

import { Box, Button, FormHelperText, Typography } from '@mui/material'

import { getRandomInt, promiseFunction, simulatePromise } from './helper'
import { PropsResult } from './types'

const PromiseChaining = () => {

  const [result, setResult] = useState<{
    value: number,
    time: number,
  }[]>([])

  const handleResult = (value: number, time: number,) => setResult(prevState => [...prevState, {
    value,
    time,
  }]
  )


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (result.length > 0) setResult([])
    e.preventDefault()
    const arrayPromise = Array.from({ length: 5 }).map(() => {
      const randomNumber = getRandomInt(0, 5)
      const randomWaiting = getRandomInt(1000, 3000)
      return simulatePromise(randomWaiting, randomNumber === 0 ? 'error' : randomNumber)
    }) as Promise<PropsResult>[]

    await promiseFunction(arrayPromise, handleResult)

  }


  return (
    <Box marginBottom={4}>
      <form onSubmit={onSubmit}>
        <Typography variant="h3">Number of promise</Typography>
        <FormHelperText>5 promises wil be returned, Resolve & reject will be random (if promise is fulfilled, return result, if promise is rejected, return -1 and then stop)</FormHelperText>
        <Button variant="contained" type="submit">Use promise.settled</Button>
        <Box marginY={2}>
          <Typography fontWeight="bold">Result : </Typography>{result.map((item, index) =>
          (<Box display="flex" key={`${item.time}-${item.value}`} alignContent="center">
            <Box>Result promise {index + 1} {item.value > 0 ? 'fullfiled' : 'rejected and stop promises chain'} : {item.value}</Box>
            <Box marginLeft={2}>Data fetch time : {item.time} ms</Box>
          </Box>)
          )}</Box>
      </form >
    </Box>
  )
}

export default PromiseChaining
