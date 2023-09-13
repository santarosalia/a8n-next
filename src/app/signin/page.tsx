'use client'
import {Container, Button} from '@mui/material';
import {signIn} from 'next-auth/react';
export default () => {
  const signInWithGoogle = async () => {
    await signIn('google');
  }
  return (
    <Container maxWidth='xl'>
      <Button onClick={signInWithGoogle}>d</Button>
    </Container>
  
  
  )
}
