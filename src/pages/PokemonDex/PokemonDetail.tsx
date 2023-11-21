// import Button from '@mui/material/Button'
import React from 'react'

import Card from '@mui/material/Card'

// import CardActions from '@mui/material/CardActions'
// import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import Typography from '@mui/material/Typography'

const listFormatter = new Intl.ListFormat("en-GB", {
  style: "short",
  type: "conjunction",
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PokemonDetail = ({ name, setSelectPokemon }: any) => {






  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image={data.sprites.front_default}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>


        <Typography variant="body2" color="text.secondary">
          Height: {data.height}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {data.weight}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Types:
          {listFormatter.format(data.types.map(item => item.type.name))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setSelectPokemon(undefined)}>Go back</Button>
      </CardActions> */}
    </Card >
  )
}

export default PokemonDetail
