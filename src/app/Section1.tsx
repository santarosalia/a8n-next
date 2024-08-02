import { Box, Button, Card, colors, Container, Divider, Paper, Typography } from "@mui/material"
import { green, grey } from "@mui/material/colors"
import Image from "next/image"

export default () => {
    return (
        <Container>
            <Box
                height={'110px'}
                display={'flex'}
                flexDirection={'column'}
                color={colors.grey[100]}
                alignItems={'center'}
            >
            <Image src={'/rgb.gif'} width={50} height={50} alt="rgb"></Image>
            <Container>
                <Typography fontSize={12}>id</Typography>
                <Typography fontSize={12}>오늘의 감정?</Typography>
                <Box display={"flex"} justifyContent={'space-around'}>
                    <Button color="inherit">
                        <Typography fontSize={13}>❤️‍🔥</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography fontSize={13}>🙌</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography fontSize={13}>🦄</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography fontSize={13}>💩</Typography>
                    </Button>
                </Box>
            </Container>
            </Box>
            <Divider variant="middle" color={grey[50]}></Divider>
        </Container>
    )
}