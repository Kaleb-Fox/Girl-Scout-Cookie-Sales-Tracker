import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { Box , TextField , Button , Typography, Grid, Paper } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ec9747' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    margin: 'auto',
  }))

function Scouts() {

    async function submitScout(newScout) {
        const response = await fetch("http://127.0.0.1:5555/scouts", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScout)
        })
        const scout = await response.json()
    }
    const initialValues ={
        scout: ''
    }
    const validationSchema = yup.object({
        scout: yup.string().min(2, "Must Be 2 Characters").required("Must Be 2 Characters")
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function(values){
            submitScout({...values})
        }
    })



  return (
        <Grid item xs={3}>
            <Item>
            <Box sx={{ backgroundColor: '#d89648', py: 4 }}>
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
            Add A New Scout
            </Typography>
            <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                id="scout"
                name="scout"
                label="Scout"
                type="text"
                value={formik.values.scout}
                onChange={formik.handleChange}
                error={formik.touched.scout && Boolean(formik.errors.scout)}
                helperText={formik.touched.scout && formik.errors.scout}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Create Scout
            </Button>
            </form>
            </Box>
            </Box>
            </Item>
         </Grid> 
)
}

export default Scouts