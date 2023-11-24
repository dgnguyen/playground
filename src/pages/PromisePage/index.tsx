import React, { FormEvent, useState } from 'react'

import { Box, Button, FormHelperText, Typography } from '@mui/material'

interface PromiseFulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

interface PromiseRejectedResult<T> {
  status: "rejected";
  reason: T;
}

interface PropsResult {
  result: number
  time: number
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult<T>;


function simulatePromise(time: number, result: string | number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result !== 'error') {
        resolve({ result, time })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ result, time })
      }
    }, time)
  })
}


async function promiseFunction(arrayPromise: Promise<PropsResult>[], callback: (value: number, time: number) => void) {

  const resultPromise = Promise.allSettled(arrayPromise).then((data: PromiseSettledResult<PropsResult>[]) => {

    const findFailPromise = data.findIndex(p => p.status === 'rejected')

    if (findFailPromise !== -1) {
      (data as PromiseFulfilledResult<PropsResult>[]).slice(0, findFailPromise).forEach((item: PromiseFulfilledResult<PropsResult>) => callback(item?.value?.result, item.value.time))
      callback(-1, (data[findFailPromise] as PromiseRejectedResult<PropsResult>)?.reason?.time)
    }
    else {
      (data as PromiseFulfilledResult<PropsResult>[]).forEach((item: PromiseFulfilledResult<PropsResult>) => callback(item.value.result, item.value.time,))
    }
  })
  return resultPromise


}



function getRandomInt(min: number, max: number) {
  const minn = Math.ceil(min)
  const maxx = Math.floor(max)
  return Math.floor(Math.random() * (maxx - minn) + minn)
}

const PromisePage = () => {

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
    <form onSubmit={onSubmit}>
      <Box padding={2}>
        <Typography variant="h2">Number of promise</Typography>
        <FormHelperText>5 promises wil be returned, Resolve & reject will be random (if promise is fullfiled, return result, if promise is rejected, return -1 and then stop)</FormHelperText>

        <Button variant="contained" type="submit">Use promise.settled</Button>


        <Box marginY={2}>
          <Typography fontWeight="bold">Result : </Typography>{result.map((item, index) =>
          (<Box display="flex" key={`${item.time}-${item.value}`} alignContent="center">
            <Box>Result promise {index + 1} {item.value > 0 ? 'fullfiled' : 'rejected and stop promises chain'} : {item.value}</Box>
            <Box marginLeft={2}>Data fetch time : {item.time} ms</Box>
          </Box>)
          )}</Box>
      </Box>
    </form >
  )
}

export default PromisePage
