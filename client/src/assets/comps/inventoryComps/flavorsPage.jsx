import { Box, Paper, styled, Typography } from '@mui/material'
import React from 'react'
import Flavors from './flavors'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ec9747' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '20px auto',
    maxWidth: '500px',
  }))
  
function flavorsPage() {

  return (

    <Box>
        <Item sx={{backgroundColor:'white'}}>
            <Typography variant="h5" gutterBottom>
              Flavors
            </Typography>
            <Flavors />
        </Item>
    </Box>
  )
}

export default flavorsPage