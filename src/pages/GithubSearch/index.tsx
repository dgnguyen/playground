import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Box, TextField, Typography } from '@mui/material'

import { debounce } from 'lodash'

import { getUsers } from './api'
import Result from './Result'

const GihubSearch = () => {
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    try {
      const result = await getUsers(search)
      const resultModified = result
        ? result.items.map(({ id, avatar_url, login, html_url }) => ({
          id,
          avatar_url,
          login,
          html_url,
        }))
        : []
      setData(resultModified)
    }

    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  const ref = useRef(sendRequest)

  useEffect(() => {
    ref.current = sendRequest
  }, [search])

  const debouncedCallback = useMemo(() => {
    const func = () => {
      if (!ref.current) return
      ref.current()
    }
    return debounce(func, 1000)
  }, [])



  const handleSearch = e => {
    setSearch(e.target.value)
    debouncedCallback()
  }

  return (
    <Box padding={2}>
      <Typography variant='h4'>Search Github user</Typography>
      <TextField id="outlined-basic" label="Search" variant="outlined" value={search} onChange={handleSearch} />
      {search && <Result data={data} loading={loading} />}
    </Box>
  )
}

export default GihubSearch
