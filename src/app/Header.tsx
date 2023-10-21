'use client';
import { AppBar, Toolbar, Box, Container, Menu, Avatar, Button, Tooltip, IconButton, MenuItem, Typography} from "@mui/material";
import Image from "next/image";
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState, memo } from 'react';
import Link from "next/link";
import SigninMenu from "@/app/SigninMenu";
import { PAGES } from "@/constants/Constants";

export default () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

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
                    {PAGES.map((page, i) => (
                        <MenuItem key={i}
                        onClick={handleCloseNavMenu}>
                            <Link href={page.url} {...(page.name === 'Get Extension' ? {target : '_blank'} : null)}>
                                <Typography textAlign="center">{page.name}</Typography>
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
                    {PAGES.map((page, i) => (
                    <MenuItem
                        key={i}
                        onClick={handleCloseNavMenu}
                    >
                        <Link
                            href={page.url}
                            {...(page.name === 'Get Extension' ? {target : '_blank'} : null)}
                            >
                            {page.name}
                        </Link>
                    </MenuItem>
                    ))}
                </Box>
                <SigninMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
