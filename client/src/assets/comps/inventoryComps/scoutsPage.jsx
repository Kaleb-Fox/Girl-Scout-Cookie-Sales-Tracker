import { Box } from '@mui/material'
import React from 'react'
import Scouts from './scouts'
import ScoutsRedux from './scoutsRedux'
function scoutsPage() {

  return (
    <Box sx={{ mt: 3 }}>
      <Scouts />
      <ScoutsRedux />
    </Box>
  )
}

export default scoutsPage