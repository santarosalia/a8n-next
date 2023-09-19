import { CheckCircle } from '@mui/icons-material';
import {Box, Button, Container, Icon, List, ListItem, Paper, Typography} from '@mui/material';
import Plan from './Plan';
export default () => {
  return (
    <Container maxWidth='lg'>
      <Box margin={10} textAlign={'center'}>
        <Typography variant='h3'>
          Pick the plan that's right for you
        </Typography>
      </Box>
      <Box display={'flex'} textAlign={'center'} justifyContent={'center'} sx={{display : {xs : 'none', md : 'flex'}}}>
        <Plan 
        title='Free'
        subtitle='Recording and execute process'
        access={[
          'Recording process',
          'Execute process'
        ]}
        buttonText='Get Started'
        ></Plan>
        
      </Box>
    </Container>
  
  
  )
}
