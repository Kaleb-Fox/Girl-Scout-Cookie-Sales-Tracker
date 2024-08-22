import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { Box , TextField , Button , Typography, Grid, Paper, FormControl } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#ec9747' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  width: '20%',
  color: theme.palette.text.secondary,
  margin: 'auto',
}))

function Scouts() {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [scouts, setScouts] = useState([]);
  
  useEffect(() => {
    fetchScouts();
  }, [])

  async function fetchScouts() {
    const response = await fetch('http://127.0.0.1:5555/scouts');
    const data = await response.json();
    setScouts(data);
  }
    async function submitScout(newScout) {
        const response = await fetch("http://127.0.0.1:5555/scouts", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScout)
        })
        if (response.status === 200) {
          setSubmissionStatus('Submitted');
          const savedScout = await response.json();
          setScouts([...scouts, savedScout]);
        } else {
          setSubmissionStatus('Failed to submit')
        }
    }
    const initialValues ={
        scout: ''
    }
    const validationSchema = yup.object({
        scout: yup.string().min(2, "Must Be 2 Characters").max(25).required("Must Be 2 Characters")
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function(values){
            submitScout({...values})
            resetForm()
        }
    })



  return (
 
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add A New Scout
        </Typography>  
        <FormControl  margin="normal">
            <TextField
              id="scout"
              name="scout"
              label="scout"
              value={formik.values.scout}
              onChange={formik.handleChange}
              error={formik.touched.scout && Boolean(formik.errors.scout)}
              helperText={formik.touched.scout && formik.errors.scout}
              
            />
          </FormControl>
          <br></br>
          <Button type="submit" variant="contained" color="primary"  sx={{ mt: 2 }}>
            Add Scout
          </Button>
          {submissionStatus && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              {submissionStatus}
            </Typography>
          )}
        </Box>
   
)
}

export default Scouts