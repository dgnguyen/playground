import {
  Action,
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  createAction,
  ThunkAction,
} from '@reduxjs/toolkit'

import pokemonDetailReducer, { PokemonState } from './redux/pokemonDetailReducer'
import pokemonListReducer from './redux/pokemonListReducer'

const appReducer = combineReducers({
  pokemonListReducer,
  pokemonDetailReducer,
})


const resetType = 'RESET_STORE'

export const resetAction = createAction(resetType)

function reducer(state: CombinedState<{ pokemonListReducer: any; pokemonDetailReducer: PokemonState }> | undefined, action: AnyAction) {
  if (action.type === resetType) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({ serializableCheck: false })],
})



export type IRootState = ReturnType<typeof reducer>
export type AppThunk = ThunkAction<void, IRootState, null, Action<string>>
export default store
