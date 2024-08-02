import { Add, Favorite, Home, Person, Search } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Divider, Icon, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default () => {
    return (
        <AppBar position="fixed" variant="elevation" sx={{top: 'auto', bottom: '0', backgroundColor: 'black'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
                        <Button variant="text" color="inherit">
                            <Home></Home>
                        </Button>
                        <Button variant="text" color="inherit">
                            <Search></Search>
                        </Button>
                        <Button variant="text" color="inherit">
                            <Add></Add>
                        </Button>
                        <Button variant="text" color="inherit">
                            <Favorite></Favorite>
                        </Button>
                        <Button variant="text" color="inherit">
                            <Person></Person>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}