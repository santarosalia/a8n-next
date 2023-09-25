
import { CheckCircle } from "@mui/icons-material"
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material"
import { green, pink, yellow } from "@mui/material/colors"
import { Plan } from "@/interface/Interface"

export default (props: Plan) => {
    const Price = () => {
        return props.price ? (
            <>
                from
                <Typography variant="h6" marginX={0.2}>
                    ${props.price}
                </Typography>
                /mo
            </>
        ) : (<></>)
    }
    const AccessList = () => {
        return props.access.map((item, i) => {
            return (
                <ListItem key={i}>
                    <Typography>
                        <CheckCircle fontSize='small' sx={{margin : '2px', color : green[600]}}></CheckCircle>
                        {item}
                    </Typography>
                </ListItem>
                )
        });
    }
    return (
        <Box margin={1} width={300}>
            <Paper elevation={4} sx={{ height : '400px', display : 'flex', flexDirection : 'column'}}>
                <Box flex={0.5}>
                    <img src={props.img} width={'80px'} style={{margin : 'auto'}}></img>
                </Box>
                <Box flex={1}>
                    <Typography variant='h6'>
                        {props.title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {props.subtitle}
                    </Typography>
                </Box>
                <Box margin={2} textAlign={'left'} flex={2}>
                <List>
                    <AccessList></AccessList>
                </List>
                </Box>
                <Box display={'flex'} justifyContent={'center'} lineHeight={2} height={'30px'}>
                    <Price></Price>
                </Box>
                <Box flex={1}>
                    <Button href={props.href} className="bg-green-100" size="large"  variant="contained" sx={{color : 'green', ":hover" : {backgroundColor : green[200]} ,backgroundColor : green[100]}}>
                        { props.buttonText }
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}