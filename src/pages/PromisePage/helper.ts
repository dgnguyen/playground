import { PromiseRejectedResult, PropsResult } from "./types"

export function simulatePromise2(time: number, result: unknown) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result !== 'error') {
        resolve(result)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(result)
      }
    }, time)
  })
}

export function simulatePromise(time: number, result: unknown) {
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


export function promiseFunction(arrayPromise: Promise<PropsResult>[], callback: (value: number, time: number) => void) {

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

export function getRandomInt(min: number, max: number) {
  const minn = Math.ceil(min)
  const maxx = Math.floor(max)
  return Math.floor(Math.random() * (maxx - minn) + minn)
}



