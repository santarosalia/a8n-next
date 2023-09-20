import { Box, Button, Typography } from "@mui/material"
import { green } from "@mui/material/colors"

export default () => {
    return (
        <>
        {/* <Box height={'100vh'} padding={20} sx={{display : {xs : 'none', md : 'flex'}}}> */}
        <Box height={'100vh'} padding={'20vw'} display={'flex'} sx={{flexDirection : { xs:'column', md : 'row' }, display : 'flex'}}>
            <Box flex={1}>
                <Typography variant="h4">
                    Easiest Chromium Automation
                </Typography>
                <Typography variant="subtitle2">
                Lunatic Monster helps with routine
                </Typography>
            </Box>
            <Box flex={1} display={'flex'} flexDirection={'column'}>
                <Box 
                component={'img'}
                margin={'auto'}
                sx={{
                    height : 250,
                    width : 250,
                    minWidth : 250
                }}
                src={'/hello.png'}
                >
                </Box>
                <Button 
                href={'/plans'}
                className="bg-green-100" 
                size="large"  
                variant="contained" 
                sx={{
                    color : 'green',
                    ":hover" : {backgroundColor : green[200]},
                    backgroundColor : green[100]
                    }}
                >
                        Get Started
                </Button>
            </Box>
        </Box>
        </>
    )
}