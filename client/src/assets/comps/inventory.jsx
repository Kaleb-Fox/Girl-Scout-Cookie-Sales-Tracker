import React from 'react'
import {Container, Grid} from '@mui/material'
import UpdateInv from './inventoryComps/updateInv'
import Flavors from './inventoryComps/flavors'
import Scouts from './inventoryComps/scouts'
function inventory() {
    
    return (
        // <Container maxWidth="l" style={ {marginTop:'8px' }}>
        <Grid container spacing={1} backgroundColor="#d89648">
        <UpdateInv/>
        <Flavors/>
        <Scouts/>
        </Grid>
        /* </Container> */
)
}

export default inventory