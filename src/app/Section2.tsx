import { Box, Container, Typography } from "@mui/material"
import { grey, yellow } from "@mui/material/colors"

const Item = () => {
    return (
        <Container>
            <Typography variant="h4" display={'flex'} justifyContent={'space-between'}>
                <span>😍</span>
                <span>img</span>
            </Typography>
            <Typography variant="subtitle2" display={"flex"} justifyContent={'end'}>
            id
            </Typography>
            <Typography variant="body1" height={100}>
                Contents
            </Typography>
        </Container>
    )
}
const l = [0,1,2,3,4,5,6,7,8,9];
const items = l.map(i => {
    return (<Item/>);
})
export default () => {
    return (
        <Container sx={{overflow:'none'}}>
            <Box 
                color={grey[100]}
                mt={1}
                height={'200vh'} 
                display={'flex'}
                flexDirection={'column'}
            >
                {items}
            </Box>
        </Container>
    )
}