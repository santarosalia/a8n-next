import { CheckCircle } from '@mui/icons-material';
import {Box, Button, Container, Icon, List, ListItem, Paper, Typography} from '@mui/material';
import PlansMd from './PlansMd';
import PlansXs from './PlansXs';
export default () => {
  return (
    <Container maxWidth='lg'>
      <Box display={{xs:'none', md :'flex'}} flexDirection={'column'}>
      <PlansMd></PlansMd>
      </Box>
      <Box display={{xs:'flex', md :'none'}} flexDirection={'column'}>
      <PlansXs></PlansXs>
      </Box>
    </Container>
  )
}
