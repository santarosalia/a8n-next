'use client'
import { Container} from '@mui/material';
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
