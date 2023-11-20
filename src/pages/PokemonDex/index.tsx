import React from 'react'

import { Provider } from 'react-redux'

import Display from './Display'
import store from './store'

const PokemonDex = () => {

  return (
    <Provider store={store}>
      <Display />
    </Provider>)
}

export default PokemonDex
