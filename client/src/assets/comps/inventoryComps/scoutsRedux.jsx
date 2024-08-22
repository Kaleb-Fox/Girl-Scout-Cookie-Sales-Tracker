import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5', 
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: '10px auto',
}));

const ScoutsRedux = () => {
  const scouts = useSelector((state) => state.scouts.scouts);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://127.0.0.1:5555/scouts')
      .then(response => {
        dispatch({ type: 'SET_SCOUTS', payload: response.data });
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5555/scouts/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_SCOUT', payload: id });
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom >
        Scouts
      </Typography>
      <Grid container spacing={2} sx={{backgroundColor: 'white'}}>
        {scouts.map((scout) => (
          <Grid item xs={12} sm={6} md={4} key={scout.id}>
            <Item>
              <Typography variant="h6">{scout.scouts}</Typography>
              <Button 
                variant="contained" 
                sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                onClick={() => handleDelete(scout.id)}>
                Delete
              </Button>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ScoutsRedux