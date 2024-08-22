import React, { useEffect, useState } from 'react'
import adventureful from "../comps/pictures/adventureful.png"
import thinMints from "../comps/pictures/thinMints.png"
import carmelCookie from "../comps/pictures/carmelCookie.png"
import peanutButter from "../comps/pictures/peanutButter.png"
import trefold from "../comps/pictures/trefold.png"
import samoas from "../comps/pictures/samoas.png"
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
function girlscouts() {
const linkForDonate = <a href='https://www.girlscouts.org/en/support-us/donate/donate-now.html'>Donate</a>
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 120,
  padding: theme.spacing(2),
  backgroundColor: '#B3B381',
  color: '#FBFDF8',
  ...theme.typography.body2,
  textAlign: 'center',
}))
  return (

    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <Box
        sx={{
        backgroundColor:'#1A2027',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '25vh',
        width: '100%',
        gap:2,
        padding:2,
        boxSizing: 'border-box',
        }}>
        <Stack direction="row" spacing={2}>
          <DemoPaper square={false}>This page is for additional information about the cookie's nutritional facts</DemoPaper>
        </Stack>
        <Stack direction="row" spacing={2}>
          <DemoPaper square={false}>If your looking to donate to the girl scouts, please click here: {linkForDonate}. This is a link to the offical girl scouts page.</DemoPaper>
        </Stack>
      </Box>


    <Box sx={{backgroundColor:'#7669DE',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '25vh',
        gap:25,
        padding:6
        }}>
      <br></br><br></br><br></br>
      <Grid container spacing={4} gap={3}>
      <Grid xs={3} sx={{backgroundColor: '#dc174d'}}>
          <Item sx={{backgroundColor: '#C7CDCE'}}><img src={thinMints} alt='Thin Mints picture' style={{ width: '100%', height: 'auto' }}/>Thin Mints: Serving Size: 4 Cookies | 160 Calories | 7g Fat | 22g Carbs | 10g Sugar |  1g Protein</Item>
        </Grid>
        <Grid xs={3} sx={{backgroundColor: '#DCD317'}}>
          <Item sx={{backgroundColor: '#C7CDCE'}}><img src={adventureful} alt='Adventurefuls cookie picture' style={{ width: '100%', height: 'auto' }}/>Adventurefuls: Serving Size: 2 Cookies | 130 Calories | 6g Fat | 18g Carbs | 11g Sugar |  &lt;1g Protein</Item>
        </Grid>
        <Grid xs={3} sx={{backgroundColor: '#17DC42'}}>
          <Item sx={{backgroundColor: '#C7CDCE'}}><img src={carmelCookie} alt='Carmel Cookie cookie picture' style={{ width: '100%', height: 'auto' }}/>Carmel Cookie: Serving Size: 3 Cookies | 160 Calories | 7g Fat | 22g Carbs | 9g Sugar |  3g Protein</Item>
        </Grid>
        <Grid xs={3} sx={{backgroundColor: '#174DDC'}}>
          <Item sx={{backgroundColor: '#C7CDCE'}}><img src={peanutButter} alt='Peanut Butter cookie picture' style={{ width: '100%', height: 'auto' }}/>Peanut Butter cookie: Serving Size: 3 Cookies | 160 Calories | 7g Fat | 22g Carbs | 11g Sugar |  3g Protein</Item>
        </Grid>
        <Grid xs={3} sx={{backgroundColor: '#B017DC'}}>
          <Item sx={{backgroundColor: '#C7CDCE'}}><img src={trefold} alt='Trefoils cookie picture' style={{ width: '100%', height: 'auto' }}/>Trefoils cookie: Serving Size: 4 Cookies | 120 Calories | 4.5g Fat | 19g Carbs | 6g Sugar |  1g Protein</Item>
        </Grid>
        <Grid xs={3} sx={{backgroundColor: '#271515'}}>
          <Item sx={{backgroundColor: '#C7CDCE'}}><img src={samoas} alt='Samoas cookie picture' style={{ width: '100%', height: 'auto' }}/>Samoas: Serving Size: 2 Cookies | 150 Calories | 8g Fat | 18g Carbs | 11g Sugar |  1g Protein</Item>
        </Grid>
      </Grid>
    </Box>
    </div>
  )
}

export default girlscouts