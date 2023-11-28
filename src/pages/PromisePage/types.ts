
export interface PromiseFulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

export interface PromiseRejectedResult<T> {
  status: "rejected";
  reason: T;
}

export interface PropsResult {
  result: number
  time: number
}

export type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult<T>;


export type DataDB = {
  id: number,
  username: string,
  country: string,
}

export type DataMarked = {
  marked: boolean
}

export interface DataVault {
  firstname: string
  lastname: string
  email: string
}


export type DataUser = DataDB & DataVault 
