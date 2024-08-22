import React from 'react'
import Grid from '@mui/material/Grid'
import FlavorsPage from './flavorsPage'
import ScoutsPage from './scoutsPage'


const combineall = () => {

  return (
    <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
            <FlavorsPage/>
        </Grid>
        <Grid item xs={6} md={4} sx={{}}>
            <ScoutsPage/>
        </Grid>
    </Grid>

  )
}

export default combineall