import React, { useEffect, useState } from 'react'
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
  
function updateInv() {
    const [flavors, setFlavors] = useState([])
    useEffect(() => {
        async function getInventory() {
        const response = await fetch("/api/inventory")
        const data = await response.json()
        setFlavors(data)
    }
    getInventory()
    }, [])

    async function submitForm(updatedInventory) {
        const response = await fetch("http://127.0.0.1:5555/inventory", {
        method: 'PATCH',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedInventory)
        })
        const inv = await response.json()
    }

    const initialValues = {
        flavor: "",
        stock: 1,
        pricePerBox: 1
    }
    const validationSchema = yup.object({
        flavor: yup.string().min(1).required("Must Select an option"),
        stock: yup.number().min(1, "Must add 1 or more to the inventory").required(),
        pricePerBox: yup.number().min(1, "Price Per box Must be $1 or more").required()
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function (values) {
        submitForm({ ...values })
        }
    })
    



  return (
    <Grid item xs={3} backgroundColor="#d89648">
        <Item>
        <Box sx={{ backgroundColor: '#f1aa5c', py: 4 }}>
        <Box sx={{ maxWidth: 500, mx: 'auto', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
            Update Inventory
            </Typography>
            <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="flavor" shrink>Flavors</InputLabel>
                <Select
                id="flavor"
                name="flavor"
                value={formik.values.flavor}
                onChange={formik.handleChange}
                label="Flavors"
                >
                {flavors.map(flavor => (
                    <MenuItem key={flavor.id} value={flavor.flavor}>
                    {flavor.flavor}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                margin="normal"
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
            />

            <TextField
                fullWidth
                margin="normal"
                id="pricePerBox"
                name="pricePerBox"
                label="Price Per Box"
                type="number"
                value={formik.values.pricePerBox}
                onChange={formik.handleChange}
                error={formik.touched.pricePerBox && Boolean(formik.errors.pricePerBox)}
                helperText={formik.touched.pricePerBox && formik.errors.pricePerBox}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
               Update Inventory
            </Button>
            </form>
            </Box>
            </Box>
            </Item>
            </Grid>
)
}

export default updateInv