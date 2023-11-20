import * as React from 'react'

import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import HomeIcon from '@mui/icons-material/Home'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const routes = [
    { label: 'Home', value: '/' },
    { label: 'Debounce', value: '/debounce' },
    { label: 'PokemonDex', value: '/pokemon' },
  ]
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Playground
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {routes.map((item, index) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => navigate(item.value)}>
                <ListItemIcon>{index === 0 ? <HomeIcon /> : <AirportShuttleIcon />}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
    </Box>
  )
}

export default Header
