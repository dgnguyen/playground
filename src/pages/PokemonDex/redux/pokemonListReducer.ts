/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { getPokemon } from '../api'
import { AppThunk } from '../store'

const initialState: any = {
  loading: false,
  pokemon: [],
  offset: 0,
  total: 0,
  errors: {} as any,
}

const pokemonListReducer = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    getPokemonRequest(state) {
      state.loading = true
    },
    getPokemonSuccess(state, { payload }: PayloadAction<any>) {
      state.loading = false
      state.total = payload.count
      state.pokemon.push(...payload.results)
    },

    getPokemonFailure(state, { payload }: PayloadAction<any>) {
      state.loading = false
      state.errors = payload.errors
    },
  },
})

export const fetchPokemon = ({
  limit,
  page,
}: { limit: number, page: number }): AppThunk => async dispatch => {
  try {


    dispatch(getPokemonRequest())
    const pokemons = await getPokemon(
      page,
      limit
    )

    dispatch(getPokemonSuccess(pokemons))

  } catch (error) {
    console.error(error)
  }
}


export const {
  getPokemonRequest,
  getPokemonSuccess,
  getPokemonFailure,
} = pokemonListReducer.actions

export default pokemonListReducer.reducer

