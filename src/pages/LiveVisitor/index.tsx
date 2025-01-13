import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'

import axios from 'axios'
import CountUp from 'react-countup'

import './index.scss'

const url = 'https://livevisitors-web.azurewebsites.net/LiveVisitor/getLiveVisitors'


const LiveVisitor = () => {
  const [visitor, setVisitor] = useState({
    dailyNewVisitorsCount: 10000,
    liveVisitorsCurrentCount: 1000,
  })
  const visitorDailyRef = useRef(0)
  const visitorLiveRef = useRef(0)
  const [firstLoadingDone, setFirstLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    visitorDailyRef.current = visitor.dailyNewVisitorsCount
    visitorLiveRef.current = visitor.liveVisitorsCurrentCount
  }, [visitor])

  async function fetchVisitor() {
    try {
      setLoading(true)
      const result = await axios.get(
        url,
      )
      if (result.status === 200) {
        setVisitor(result?.data)
      }
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFirstLoadingDone(true)
      fetchVisitor()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const onStart = () => {
    console.log('Started!')
  }


  return (
    <Box className="countup-wrapper">
      {
        Object.entries(visitor).map(item => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={`countup-${item[0]}}`}>
              <Box>{item[0]}</Box>
              {!firstLoadingDone ? <Box>Loading...</Box> : (<CountUp
                decimal=","
                className="live-visitor"
                start={item[0] === 'dailyNewVisitorsCount' ? visitorDailyRef.current : visitorLiveRef.current}
                end={item[1]}
                duration={2.75}
                useEasing
                useGrouping
                separator=","
                decimals={0}
                // prefix="Live visitor: "
                // suffix=" persons"
                // onComplete={onComplete}
                onStart={onStart}
              />)}
            </Box>
          )
        })
      }
    </Box >
  )
}

export default LiveVisitor
