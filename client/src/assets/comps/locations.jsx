import { CssBaseline, Card , Typography , CardActions , CardContent , CardMedia , Grid , Container, Button  } from '@mui/material'
import React from 'react'


function locations() {
    return (
      <>
        <CssBaseline />
        <main>
          <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Locations
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is a list of all the locations for the cards 
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  See my locations
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  See my locations
                </Button>
              </Grid>
            </Grid>
          </Container>
  
          <Container maxWidth="md" sx={{ padding: '20px' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ paddingTop: '56.25%' }}
                    image="data:image/jpeg;base64,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"
                    title="Image title"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5">
                      Heading
                    </Typography>
                    <Typography>
                      This is some sauce
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">View</Button>
                    <Button size="small" color="primary">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
      </>
    );
  }

export default locations