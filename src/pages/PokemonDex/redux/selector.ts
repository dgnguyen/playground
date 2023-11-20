import { IRootState } from '../store'

export const pokemonListSelector = ({ pokemonListReducer }: IRootState) => {
  return pokemonListReducer.pokemon
}

export const pokemonTotalSelector = ({ pokemonListReducer }: IRootState) => {
  return pokemonListReducer.total
}


// export const loadingPokemonSelector = ({ pokemon }: IRootState) =>
//   pokemon.pokemonListReducer.loading

// export const pokemonDetailSelector = ({ pokemon }: IRootState) =>
//   pokemon.pokemonDetailReducer.pokemon
