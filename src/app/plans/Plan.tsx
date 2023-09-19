
import { CheckCircle } from "@mui/icons-material"
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material"
import { green, pink, yellow } from "@mui/material/colors"

export default (props: {
    title: string,
    subtitle: string,
    access: string[],
    buttonText: string
}) => {
    const list = () => {
        const listItems = props.access.map(item => {
            return (
                <ListItem>
                    <Typography>
                        <CheckCircle fontSize='small' sx={{margin : '2px', color : green[600]}}></CheckCircle>
                        {item}
                    </Typography>
                </ListItem>
                )
        });
        return (
            <List>
                {listItems}
            </List>
        )
    }
    return (
        <Box margin={1}>
            <Paper elevation={4} sx={{width : '20vw', height : '400px', display : 'flex', flexDirection : 'column'}}>
                <Box flex={0.5}></Box>
                <Box flex={1}>
                    <Typography variant='h6'>
                        {props.title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {props.subtitle}
                    </Typography>
                </Box>
                <Box margin={3} textAlign={'left'} flex={1}>
                    {list()}
                </Box>
                <Box flex={1}>
                    <Button className="bg-green-100" size="large"  variant="contained" sx={{color : 'green', ":hover" : {backgroundColor : green[200]}}}>
                        { props.buttonText }
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}