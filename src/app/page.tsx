'use client'
import {Button, Container} from '@mui/material';
import { signIn, signOut, useSession } from "next-auth/react";
import Section1 from './Section1';
import Section2 from './Section2';

export default () => {
  return (
    <Container maxWidth='xl'>
      <Section1></Section1>
      <Section2></Section2>
    </Container>
  
  
  )
}
