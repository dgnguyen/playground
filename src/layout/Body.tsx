import React from 'react'

import GihubSearch from 'pages/GithubSearch'
import LiveVisitor from 'pages/LiveVisitor'
import { Route, Routes } from 'react-router-dom'

import { DebouncePage, HomePage } from '../pages'
import PokemonDex from '../pages/PokemonDex'
import Pomodoro from '../pages/Pomodoro'
import PromisePage from '../pages/PromisePage'

const Body = () => {
  return (
    <Routes>
      <Route path="/debounce" element={<DebouncePage />} />
      <Route path="/pokemon" element={<PokemonDex />} />
      <Route path="/pomodoro" element={<Pomodoro />} />
      <Route path="/github-search" element={<GihubSearch />} />
      <Route path="/promise" element={<PromisePage />} />
      <Route path="/live-visitor" element={<LiveVisitor />} />
      <Route path="/" element={<HomePage />} />
    </Routes>

  )
}

export default Body
