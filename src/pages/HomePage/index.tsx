import React from 'react'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'

import Baseball from './Baseball'
import ClimbingBoard from './ClimbingLeaderBoard'
import LongestKeyInObj from './LongestKeyInObj'
import StrictInputs from './StrictInputs'

import '../../app.css'

const HomePage = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className='App'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="basic tabs example">
            <Tab label="ClimbingBoard" value="4" />
            <Tab label="Baseball" value="2" />
            <Tab label="LongestKeyInObj" value="3" />
            <Tab label="StrictInputs" value="1" />
          </TabList>
        </Box>
        <TabPanel value="4"> <ClimbingBoard /></TabPanel>
        <TabPanel value="2"> <Baseball /></TabPanel>
        <TabPanel value="3"> <LongestKeyInObj /></TabPanel>
        <TabPanel value="1">  <StrictInputs /></TabPanel>
      </TabContext>
    </div >
  )
}

export default HomePage
