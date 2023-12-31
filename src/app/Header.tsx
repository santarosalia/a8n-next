'use client';
import { AppBar, Toolbar, Box, Container, Menu, IconButton, MenuItem, Typography} from "@mui/material";
import Image from "next/image";
import { Menu as MenuIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Link from "next/link";
import SigninMenu from "@/app/SigninMenu";
import { EXTENSION_URL, PAGES } from "@/constants/Constants";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setIsLoading, setUser } from "@/redux/slices/user";
import { authorization } from "@/api/Function";
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
        <AppBar position="sticky" sx={{backgroundColor : 'black'}} variant="elevation">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component={Link} href="/" sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}>
                        <Image src='/rgb.gif' alt="logo" width={60} height={60}></Image>
                    </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {PAGES.map((page, i) => (
                        <MenuItem key={i}
                        onClick={() => navOnClick(page.url)}>
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Box sx={{display: {xs: 'flex', md: 'none'}, mr: 1, flexGrow : 1}}>
                    <Link href="/">
                        <Image src='/rgb.gif' alt="logo" width={60} height={60}></Image>
                    </Link>
                </Box>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {PAGES.map((page, i) => (
                    <MenuItem
                        key={i}
                        onClick={() => navOnClick(page.url)}
                        {...(page.name === 'Get Extension' ? {target : '_blank'} : null)}
                    >
                        {page.name}
                    </MenuItem>
                    ))}
                </Box>
                <SigninMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
