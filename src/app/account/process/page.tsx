import { Box, Card, CardContent } from "@mui/material"

export default () => {
    return (
        <Box display={'flex'}>
            <Card variant="outlined" sx={{flex : 1, margin : 1}}>
                <CardContent>
                    d
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{flex : 1, margin : 1}}>
                <CardContent>
                    d
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{flex : 1, margin : 1}}>
                <CardContent>
                    d
                </CardContent>
            </Card>
        </Box>
    )
}