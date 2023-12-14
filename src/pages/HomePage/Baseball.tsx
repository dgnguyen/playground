import React from 'react'

import { Box, Typography } from '@mui/material'

import { calPointsBaseball, } from '../helpers'

const Baseball = () => {
  const calPoints = calPointsBaseball(['5', '2', 'C', 'D', '+'])
  return (
    <Box marginY={2}>
      <Typography variant="h4">Calcul baseball game point</Typography>
      <img alt="baseball" src="src/assets/img/baseballgame.png" height="400" />
      <Typography>If the points are <code>5,2,C,D,+</code>. The total point will be {calPoints}</Typography>
    </Box>
  )
}

export default Baseball
