import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#ec9747' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  margin: 'auto',
}));

const flavors = () => {
  const flavors = useSelector((state) => state.flavors.flavors);
  const dispatch = useDispatch();
  const [editFlavor, setEditFlavor] = useState(null);
  useEffect(() => {
    async function fetchFlavors() {
      const response = await fetch('http://127.0.0.1:5555/flavors');
      const data = await response.json();
      dispatch({ type: 'SET_FLAVORS', payload: data });
    }
    fetchFlavors();
  }, [dispatch]);
  
  const handleEdit = (flavor) => {
    setEditFlavor(flavor);
  };

  const handleEditSubmit = async (values) => {
    const response = await fetch(`http://127.0.0.1:5555/flavors/${editFlavor.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (response.status === 200) {
      const updatedFlavor = await response.json();
      dispatch({ type: 'SET_FLAVORS', payload: flavors.map(f => f.id === updatedFlavor.id ? updatedFlavor : f) });
      setEditFlavor(null);
    }
  }
  const editFormik = useFormik({
    initialValues: editFlavor || { flavor: '' },
    enableReinitialize: true,
    validationSchema: yup.object({
      flavor: yup.string().min(3, 'Must be longer than 3').required('Must be longer than 3 characters'),
    }),
    onSubmit: handleEditSubmit,
  })

    const handleDelete = async (id) => {
      const response = await fetch(`http://127.0.0.1:5555/flavors/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        dispatch({ type: 'DELETE_FLAVOR', payload: id });
      }
    };
  
    const initialValues = {
      create_flavor: '',
    };
  
    const validationSchema = yup.object({
      create_flavor: yup.string().min(3, 'Must be longer than 3').required('Must be longer than 3 characters'),
    });
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        const response = await fetch('http://127.0.0.1:5555/flavors', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.status === 200) {
          const newFlavor = await response.json();
          dispatch({ type: 'SET_FLAVORS', payload: [...flavors, newFlavor] });
          resetForm();
        }
      },
    });



    return (
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="create_flavor"
            name="create_flavor"
            label="Create Flavor"
            value={formik.values.create_flavor}
            onChange={formik.handleChange}
            error={formik.touched.create_flavor && Boolean(formik.errors.create_flavor)}
            helperText={formik.touched.create_flavor && formik.errors.create_flavor}
          />
          <br />
          <br />
          <Button color="primary" variant="contained" type="submit">
            Create Flavor 
          </Button>
        </form>
        <Grid container spacing={2}>
          {flavors.map((flavor) => (
            <Grid item xs={12} key={flavor.id}>
              <Item>
                <Typography variant="h6">{flavor.flavor}</Typography>
                <Button color="secondary" onClick={() => handleDelete(flavor.id)}>
                   Delete
                </Button>
              <Button color="primary" onClick={() => handleEdit(flavor)}>
                Edit
              </Button>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!editFlavor} onClose={() => setEditFlavor(null)}>
        <DialogTitle>Edit Flavor</DialogTitle>
        <form onSubmit={editFormik.handleSubmit}>
          <DialogContent>
            <TextField
              id="flavor"
              name="flavor"
              label="Flavor Name"
              value={editFormik.values.flavor}
              onChange={editFormik.handleChange}
              error={editFormik.touched.flavor && Boolean(editFormik.errors.flavor)}
              helperText={editFormik.touched.flavor && editFormik.errors.flavor}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditFlavor(null)} color="secondary">
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
    )
}
export default flavors