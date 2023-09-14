'use client'
import {Button, Container} from '@mui/material';
import { signIn, signOut, useSession } from "next-auth/react";

export default () => {
  return (
    <Container maxWidth='xl'>
      <Button onClick={()=>{signIn('credentials')}}>
        signin cre
      </Button>
    </Container>
  
  
  )
}
