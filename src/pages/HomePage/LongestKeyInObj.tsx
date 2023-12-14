import React from 'react'

import { Box, Typography } from '@mui/material'

import { obj1, obj2 } from '../../mocks/commonKeysMocks'
import { findCommonKeys } from '../helpers'

import '../../app.css'

const LongestKeyInObj = () => {
  const commonKeysArr = findCommonKeys(obj1, obj2)
  const longestKey = commonKeysArr.reduce((acc, cur) => {
    if (cur.length > acc.length) return cur
    return acc
  }, '')



  return (
    <Box>
      <Typography variant="h4">Compare 2 obj and find longest key</Typography>
      <Typography>Given 2 objects with different depth, find the longest key between them</Typography>
      <Typography>The longest key between obj1 mock and obj2 mock is <b>{longestKey}</b></Typography>
    </Box >
  )
}

export default LongestKeyInObj
