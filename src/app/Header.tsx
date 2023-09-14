'use client';
import { AppBar, Toolbar, Box, Container, Menu, Avatar, Button, Tooltip, IconButton, MenuItem, Typography} from "@mui/material";
import Image from "next/image";
import {Adb as AdbIcon, Menu as MenuIcon} from '@mui/icons-material';
import {usePathname} from 'next/navigation'
import * as React from 'react';
import Link from "next/link";
import HeaderSettings from "@/components/HeaderSettings";

const pages = ['Products'];

const ResponsiveAppBar = () => {
    const pathname = usePathname();
    if (pathname === '/signup') return (<></>)
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    };
    

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component='a' href="/" sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}>
                        <Image src='/rgb.gif' alt="logo" width={60} height={60}></Image>
                    </Box>
                

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
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
                    {pages.map((page) => (
                        <MenuItem key={page}
                        onClick={handleCloseNavMenu}>
                            <Link href={`/${page.toLowerCase()}`}>
                                <Typography textAlign="center">{page}</Typography>
                            </Link>
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
                    {pages.map((page) => (
                    <Button
                        key={page}
                        href={`/${page.toLowerCase()}`}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                <HeaderSettings></HeaderSettings>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;