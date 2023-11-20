import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { PokemonDetailData } from '../types'

export interface PokemonState {
  detail?: PokemonDetailData
}

const initialState: PokemonState = {
  detail: undefined
}

export const pokemonDetailReducer = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
    setPokemonDetail(state, action: PayloadAction<PokemonDetailData>) {
      // eslint-disable-next-line no-param-reassign
      state.detail = action.payload
    },
  },
})

export const {
  setPokemonDetail
} = pokemonDetailReducer.actions

export default pokemonDetailReducer.reducer
