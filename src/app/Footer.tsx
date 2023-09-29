import { Box, Container, Divider, Typography } from "@mui/material"
import { pink } from "@mui/material/colors"

export default () => {
    return (
        <Box
        textAlign={'center'}
        height={'150px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        bgcolor={pink[50]}
        marginTop={5}
        >
            <Typography>
                Copyright ©  2023 Lunatic Monster All rights reserved.
            </Typography>
        </Box>
    )
}