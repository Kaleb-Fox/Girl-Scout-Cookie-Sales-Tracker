import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { Box , TextField , Button , FormControl, InputLabel, Select,  MenuItem , Typography, Grid, Paper } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ec9747' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    margin: 'auto',
  }))

function flavors() {
    const initialValues = {
        create_flavor: ""
    }
    const validationSchema = yup.object({
        create_flavor: yup.string().min(3, "Must Be longer then 3").required("Must Be longer then 3 Characters")
    })
    async function submitFlavor(newFlavor) {
        const response = await fetch("http://127.0.0.1:5555/flavors", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFlavor)
        })
        const flavor = await response.json()
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function (values) {
        submitFlavor({ ...values })
        }
    })



  return (
    <Grid item xs={3}>
            <Item>
            <Box sx={{ backgroundColor: '#d89648', py: 4 }}>
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
            Add Flavor
            </Typography>
            <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                id="create_flavor"
                name="create_flavor"
                label="Create Flavor"
                type="text"
                value={formik.values.create_flavor}
                onChange={formik.handleChange}
                error={formik.touched.create_flavor && Boolean(formik.errors.create_flavor)}
                helperText={formik.touched.create_flavor && formik.errors.create_flavor}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Create Flavor
            </Button>
            </form>
            </Box>
        </Box>
        </Item>
        </Grid>
  )
}

export default flavors