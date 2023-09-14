
import { Avatar, Box, Button, CircularProgress, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";


const settings = ['Profile', 'Account', 'Dashboard', 'Signout'];

export default () => {
    const {data: session, status} = useSession();
    
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const signInWithGoogle = async () => {
        await signIn('google');
    }
    const signOutSession = async () => {
        await signOut();
    }
    
    if (status === 'loading') {
        return <CircularProgress color="inherit" size={20}/>
    }
    if (session) {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                    {session?.user?.name?.toUpperCase() ?? 'MENU'}
                </Button>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={setting === 'Signout' ? signOutSession : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
        )
    }
    return (
        <Button onClick={signInWithGoogle} color='inherit'>
            SignIn
        </Button>
    )
    
}