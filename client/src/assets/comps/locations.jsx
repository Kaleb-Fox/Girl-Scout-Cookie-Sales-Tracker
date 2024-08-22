import { CssBaseline, Card , Typography , CardActions , CardContent , CardMedia , Grid , Container, Button, Box  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ThemeContext } from '@emotion/react'

function locations() {
  const [locations, setLocations] = useState([])

  useEffect(() =>{
    axios.get('http://127.0.0.1:5555/locations')
    .then(responce => {
      setLocations(responce.data)
      console.log(responce.data)
    })},[])

    function handleClick(location){
      window.open(location.address)
    }
  return (
    <>
      <Box sx={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue' }}>
        <Container maxWidth="sm" sx={{ marginTop: '100px', backgroundColor: "lightblue"}}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Locations
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is a list of all the locations, Please come out and see us!  
            </Typography>
          </Container>
  
          <Container maxWidth="md" sx={{ padding: '20px', backgroundColor: "#white" }}>
            <Grid container spacing={4}>
              {locations.map((location) => (
                
                <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ paddingTop: '0%' }}
                    image={location.locationPicture}
                    title="Image title"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5">
                      Click This link below to be directed to google maps
                    </Typography>
                    <Typography gutterBottom variant="h6">
                     Name of location:<Button onClick={() => handleClick(location)}> {location.summary}</Button> 
                    </Typography>
                    <Typography>
                    at {location.time} on {location.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              ))}
            </Grid>
          </Container>
       
        <footer sx={{ backgroundColor: "gray", padding: '50px'}}>
              <Typography variant='h6' align="center" gutterBottom>
                Location details!
              </Typography>
              <Typography variant='subtitle1' align="center" color="textSecondary" >
                There will not be any girl scouts at these locations, this is all dummy data that i put in for the locations.
              </Typography>
        </footer>

        </Box>
      </>
    )
  }

export default locations