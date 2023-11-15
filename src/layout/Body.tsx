import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { DebouncePage, HomePage } from '../pages'

const Body = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/debounce" element={<DebouncePage />} />
      </Routes>
    </Router>
  )
}

export default Body
