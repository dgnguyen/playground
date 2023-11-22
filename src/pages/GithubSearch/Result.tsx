import React from "react"

import { CardContent, CardMedia } from "@mui/material"

import { Card, Result } from "./Styled"

export default ({ data, loading }) => {
  if (loading) return <Result>Loading...</Result>
  if (data.length === 0) {
    return <Result>No Results Found!</Result>
  }
  return (
    <Result>
      {data.map(({ id, avatar_url, login, html_url }) => (
        <Card key={id} >
          <CardMedia
            component="img"
            height="50"
            image={avatar_url}
            alt="green iguana"
          />
          <CardContent>
            <div>{id}</div>
            <h3>{login}</h3>
            <a href={html_url} target="_blank" rel="noreferrer">
              View profile
            </a>
          </CardContent>
        </Card>
      ))}
    </Result>
  )
}
