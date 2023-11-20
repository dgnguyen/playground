import React, { useEffect } from 'react'

import { Box, Button, List, ListItem } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { fetchPokemon } from './redux/pokemonListReducer'
import { pokemonListSelector, pokemonTotalSelector } from './redux/selector'
import { PokemonDetailData } from './types'

const PAGE_SIZE = 10

const Display = () => {
  const dispatch = useDispatch<any>()
  const data = useSelector(pokemonListSelector)
  const total = useSelector(pokemonTotalSelector)
  const [page, setPage] = React.useState<number>(PAGE_SIZE)

  useEffect(() => {
    dispatch(
      fetchPokemon({
        limit: PAGE_SIZE,
        page,
      }),
    )
  }, [dispatch, page])



  const loadMore = React.useCallback(() => {

    if (total <= page) return
    setPage(page + PAGE_SIZE)

  }, [page, total, dispatch,])






  // if (isLoading || isUninitialized) {
  //   return <p>loading, please wait</p>
  // }

  // if (isError) {
  //   return <p>something went wrong</p>
  // }

  if (data.length < 0) return <p>loading, please wait</p>


  return (<Box sx={{ margin: 2 }}>

    <Box>
      <List>
        {data.map((pokemon: PokemonDetailData) => (
          <ListItem key={pokemon.name}>
            <Button >
              {pokemon.name}
            </Button>
          </ListItem>
        ))}
      </List>
      <Button onClick={loadMore}>loadMore</Button>
    </Box>

  </Box>)
}

export default Display
