import axios from "axios"

const baseURL = "https://api.github.com/search/users?q="

export const getUsers = async (search: string) => {
  const url = `${baseURL}${search}`

  const response = await axios.get(url)

  return response.data
}

