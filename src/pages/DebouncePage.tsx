import React, { ChangeEventHandler, useCallback, useMemo, useState } from 'react'

import { Box, Stack, TextField } from '@mui/material'

import debounce from 'lodash/debounce'

import { useDebounce } from '@/hooks/useDebounce'

const DebouncePageV1 = () => {
  const [value, setValue] = useState('')

  const sendRequest = useCallback((value: string) => {
    // send value to the backend
    // eslint-disable-next-line no-console
    console.log({ sendRequest: value })
  }, [])

  const debouncedSendRequest = useMemo(() => debounce(sendRequest, 500), [sendRequest])

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value
    setValue(value)
    debouncedSendRequest(value)
  }
  return (
    <Box >
      <TextField label='debounce classic' value={value} onChange={onChange} />
    </Box>
  )
}

const DebouncePageV2 = () => {
  const [value, setValue] = useState('')

  const sendRequest = () => {
    // eslint-disable-next-line no-console
    console.log({ sendRequest: value })
  }

  const debounceCallback = useDebounce(sendRequest)

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value
    setValue(value)
    debounceCallback()
  }

  return (
    <Box>
      <TextField label='debounce with ref' value={value} onChange={onChange} />
    </Box>
  )

}

const DebouncePage = () => (
  <Stack display="flex" flexDirection="row" justifyContent="space-between" padding={2}>
    <DebouncePageV1 />
    <DebouncePageV2 />
  </Stack>
)

export default DebouncePage
