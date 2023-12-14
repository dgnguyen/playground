import React from 'react'

import { Box, Link, Typography } from '@mui/material'

import { player1, ranked1 } from '../../mocks/climingLeaderBoard'
import { climbingLeaderboard, } from '../helpers'

import '../../app.css'

const ClimbingBoard = () => {


  const climbingBoard = climbingLeaderboard(ranked1, player1)


  return (
    <Box>
      <Typography variant="h4">Climbing the leader board</Typography>
      <Link href="/assets/climbing-the-leaderboard-English.pdf">Link</Link>
      <Typography>Response : {climbingBoard}</Typography>
    </Box>
  )
}

export default ClimbingBoard
