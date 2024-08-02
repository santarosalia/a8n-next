import { Box, Container, Typography } from "@mui/material"
import { grey, yellow } from "@mui/material/colors"

export default () => {
    return (
        <Container>
            <Box color={grey[100]}
            mt={1}
            height={'200vh'} 
            display={'flex'} 
            >
                <Container component={'div'}>
                    <Typography variant="h4" display={'flex'} justifyContent={'space-between'}>
                        <span>😍</span>
                        <span>img</span>
                    </Typography>
                    <Typography variant="subtitle2" display={"flex"} justifyContent={'end'}>
                    id
                    </Typography>
                    <Typography variant="body1">
                        Contents
                    </Typography>
                </Container>
                
            </Box>
        </Container>
    )
}