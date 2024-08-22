import React from 'react'
import { AppBar, Toolbar, Button, Typography, Container, Grid } from '@mui/material'
import { Link } from "react-router-dom"
function home() {

return (      
    <div>
       <Grid></Grid>
        <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Girl Scout's Cookies Placeholder
          </Typography>
          <Button component={Link} to='/' sx={{ color: 'red' }}>
            Home
          </Button>
          <Button component={Link} to='/scouts' sx={{ color: 'red' }}>
            Scouts
          </Button>
          <Button component={Link} to='/locations' sx={{ color: 'red' }}>
          locations
          </Button>
          <Button component={Link} to='/flavors/add' sx={{ color: 'red' }}>
            Flavors
          </Button>
          <Button component={Link} to='/scouts/add' sx={{ color: 'red' }}>
          Scouts Form
          </Button>
          <Button component={Link} to='/updateinventory' sx={{ color: 'red' }}>
          updateinventory
          </Button>
        </Toolbar>
      </Container>
   
    </div>
)
}

export default home