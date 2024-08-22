import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { Box, Button, Container } from '@mui/material';

function signUp() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
    scope: 'https://www.googleapis.com/auth/drive'
  });

  async function postUser(userData) {
    const response = await fetch("http://127.0.0.1:5555/user/signup", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
  }

  async function getUser(user) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: 'application/json'
      }
    })
    const data = await response.json()
    postUser(data)
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'gray' }}>
      <Box>
        <Button variant="contained" color="primary" onClick={() => login()} sx={{ fontSize: '1.5em', padding: '1em 2em' }}>
          Sign up with Google
        </Button>
        </Box>
    </Container>
  );
}

export default signUp