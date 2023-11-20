import axios from 'axios'

import './config'

export const getPokemon = async (
  offset: number,
  limit: number,
) => {

  const url = '/pokemon'
  const response = await axios.get(url, { params: { offset, limit } })

  return response.data
}
