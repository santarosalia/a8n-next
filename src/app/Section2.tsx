import { Box, Typography } from "@mui/material"
import { yellow } from "@mui/material/colors"

export default () => {
    return (
        <>
        <Box 
        height={'100vh'} 
        padding={'20vw'} 
        display={'flex'} 
        sx={{
            flexDirection : {
                xs : 'column',
                md : 'row'
            },
            backgroundColor : yellow[100]
        }}>
            <Box flex={1}>
                <Typography variant="h4">
                    Section2
                </Typography>
                <Typography variant="subtitle2">
                Section 2 Subtitle
                </Typography>
                Contents
            </Box>
            
        </Box>
        </>
    )
}