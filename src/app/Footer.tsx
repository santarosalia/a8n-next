'use client'
import { authorization } from "@/api/Function"
import { EXTENSION_URL } from "@/constants/Constants"
import { useAppDispatch } from "@/redux/hooks"
import { setIsLoading, setUser } from "@/redux/slices/user"
import { Add, Favorite, Home, Person, Search } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Divider, Icon, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const navOnClick = (url: string) => {
        setAnchorElNav(null);
        if (url === EXTENSION_URL) {
            window.open(url);
        } else {
            router.push(url);
        }
    };
    useEffect(() => {
        const auth = async () => {
            const user = await authorization();
            dispatch(setUser(user));
            dispatch(setIsLoading(false));
        }
        auth();
        const interval = setInterval(auth, 59 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);
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