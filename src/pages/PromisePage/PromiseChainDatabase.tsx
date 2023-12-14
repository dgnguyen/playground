/* eslint-disable prefer-promise-reject-errors */
import React, { useEffect, useState } from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

import { simulatePromise2 } from './helper'
import { DataDB, DataUser, DataVault } from './types'

const PromiseChainDatabase = () => {

  function central(id: number) {
    return id < 2 ? simulatePromise2(2000, `db${id}`) : simulatePromise2(2000, 'error')
  }

  function db1(id: number) {
    return simulatePromise2(1000, {
      id,
      username: 'user1',
      country: 'vietnam'
    } as DataDB)
  }
  function db2(id: number) {
    return simulatePromise2(1000, {
      id,
      username: 'user2',
      country: 'France'
    } as DataDB)
  }
  function db3(id: number) {
    return simulatePromise2(1000, {
      id,
      username: 'user3',
      country: 'American'
    } as DataDB)
  }

  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  }

  function vault(id: number) {
    return id < 3 ? simulatePromise2(3000, {
      firstname: `userFirstName-${id}`,
      lastname: `userLastName-${id}`,
      email: `email-${id}@gmail.com`
    } as DataVault) : simulatePromise2(3000, 'error')
  }

  function mark(id: number) {
    return simulatePromise2(2000, {
      mark: `userMarked-${id}`
    })
  }

  const [dataShow, setDataShow] = useState<unknown>(undefined)
  const [value, setValue] = useState<string | number>('')
  const [loadingCentral, setLoadingCentral] = useState(false)
  const [loadingBD, setLoadingBD] = useState(false)
  const [loadingVault, setLoadingVault] = useState(false)
  const [loadingMark, setLoadingMark] = useState(false)
  const [error, setError] = useState('')

  function getData(id: number) {
    return new Promise((resolve, reject) => {
      Promise.all([
        central(id)
          .catch(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('Error central')
          }).then(db => {
            setLoadingCentral(false)
            return dbs[db](id)
              .catch(() => {
                setError(`Error ${db}`)
                return Promise.reject(`Error ${db}`)
              })
          }),
        vault(id)
          .catch(() => {
            setError('Error vault')
            return Promise.reject('Error vault')
          })
      ])
        .then((data: any) => {
          mark(id).catch(() => { }).then(() => setLoadingMark(false))
          setLoadingBD(false)
          setLoadingVault(false)
          resolve({
            id,
            username: data[0].username,
            country: data[0].country,
            firstname: data[1].firstname,
            lastname: data[1].lastname,
            email: data[1].email
          } as DataUser)
        })
        .catch(error => reject(error))
    })
  }

  const fetchData = (value: unknown) => {
    setLoadingCentral(true)
    setLoadingBD(true)
    setLoadingVault(true)
    setLoadingMark(true)
    try {
      getData(value).then(data => {
        setDataShow(data)
      }, error => {
        setError(error)
        console.error({ error })
      })

    }
    catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    if (value) fetchData(value)
  }, [value])

  const options = [
    { label: 'None', value: '' },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ]
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  return (
    <Box>
      <a href="https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/the-last-challenge">Link to the challenge</a>
      <Box>
        You are a developer in a big company, with multiple databases across the world. Your job is to assemble all the information for a user personnel profile. However, the information is distributed in different databases and services.

        Your function takes a simple id (a number) and you have to return a promise with an object as data. The object must contains all this information:

        <div>{`{
          id: A number,
        username: A string,
        country: A string,
        firstname: A string,
        lastname: A string,
        email: A string
        }`}
        </div>
        To achieve your task, you must use the different provided services:

        central: Due to the number of users, we cant store them in a single database. So we have 3 databases. The central database identifies in which database the users are stored. Use it like this: central(id).then(function(data) {`{... }`}). data is a string with 3 possibles values: db1, db2 and db3. If the central database has an error, your function must return a rejected promise with Error central in the data.
        db1, db2 and db3 contain the basic information for the users. Use it like this: db1(id).then(function(data) {`{... }`}). data is an object containing 2 properties: username and country. If a database has an error, your function must return a rejected promise with Error db1 (or Error db2 or Error db3) in the data.
        vault: Personal data is restricted by law. This particular type of data is often stored in a specific database. The vault can be used to obtain personal information about a user. Use it like this: vault(id).then(function(data) {`{... }`}). data is an object with 3 properties: firstname, lastname and email. If the vault has an error, your function must return a rejected promise with Error vault in the data.
        mark: Every time someone reads a user profile, we must mark it. The mark service will create this mark. Use it like this: mark(id).then(function() {`{... }`}). Do not call the mark service if another service is in error. Also, do not wait for the mark service to complete processing. If the mark service has an error, dont do anything specific. Just return your promise with the information.
        Every service responds in 100ms, except vault. (Security for personal data is heavier, so its slower. It will respond in 150ms.) Your code must respond in 200ms. If multiple services are in error, return the first error you found.
      </Box>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Select user</InputLabel>
          <Select value={value} label="Select user"
            labelId="demo-simple-select-label"
            onChange={handleChange} >
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {value && !error &&
          (<Box display="flex" gap={1} margin={2}>
            <Box>{loadingCentral ? 'Is loadingCentral... > ' : 'Loaded central > '}</Box>
            <Box>{loadingBD ? `Is loadingBD  ${value}... > ` : `Loaded BD ${value} > `}</Box>
            <Box>{loadingVault ? 'Is loadingVault... > ' : 'Loaded Vault > '}</Box>
            <Box>{loadingMark ? 'Is loadingMark... > ' : 'Loaded Mark'}</Box>
          </Box>)
        }
        {error && <Typography color="error">{error}</Typography>}

        {dataShow && !error && [loadingCentral, loadingBD, loadingVault, loadingMark].includes(false) &&
          (<Box>
            <Typography variant="h5">Result</Typography>
            {Object.keys(dataShow).map(key => {
              return (
                <Box key={key}>{key}: {JSON.stringify(dataShow[key], null, 4)}</Box>
              )
            })}
          </Box>)
        }
      </Box>
    </Box>
  )
}

export default PromiseChainDatabase
