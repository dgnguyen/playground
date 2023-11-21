import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { DebouncePage, HomePage } from '../pages'
import PokemonDex from '../pages/PokemonDex'
import Pomodoro from '../pages/Pomodoro'

const Body = () => {
  return (
    <Routes>
      <Route path="/debounce" element={<DebouncePage />} />
      <Route path="/pokemon" element={<PokemonDex />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
      <Route path="/" element={<HomePage />} />
    </Routes>

  )
}

export default Body
