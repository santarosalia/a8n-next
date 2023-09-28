
import { Box, Button, Chip, Dialog, DialogContent, Divider, InputLabel, Menu, MenuItem, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { open, close } from "@/redux/slices/signinModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

const settings = ['Profile', 'Account', 'Dashboard', 'Signout'];

export default () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => {
        return state.signinModal.isOpen;
    })
    const {data: session, status} = useSession();
    const [inputs, setInputs] = React.useState({
        email : '',
        password : ''
    });
    const {email, password} = inputs;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setInputs({
            ...inputs,
            [id] : value
        });
    } 
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openSignInModal, setOpenSignInModal] = React.useState(false);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const signInWithCredentials = async () => {
        await signIn('credentials', inputs);
    }
    const signOutSession = async () => {
        await signOut();
    }
    
    if (status === 'loading') {
        return <Skeleton variant="rounded"></Skeleton>
    }
    if (session) {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                    {session?.user?.name?.toUpperCase() ?? 'User'}
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
        <>
        <Button onClick={() => dispatch(open(null))} color="inherit">
            Signin
        </Button>
        <Dialog open={isOpen} onClose={() => dispatch(close(null))}>
            <DialogContent>
                <Box>
                    <InputLabel htmlFor="email" size="normal">Email</InputLabel>
                    <TextField id="email" size="small" required value={email} type={"email"} onChange={onChange}></TextField>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <TextField id="password" size="small" required value={password} type={"password"} onChange={onChange}></TextField>
                </Box>
                <Box>
                    <Button fullWidth color="inherit" onClick={signInWithCredentials}>Signin</Button>
                    <Button fullWidth color="info" href="/signup">Signup</Button>
                </Box>
                <Divider><Chip label="or"></Chip></Divider>
                <Box>
                    <Button fullWidth onClick={() => signIn('google')}>Sign with Google</Button>
                </Box>
            </DialogContent>
        </Dialog>
        </>
    )
    
}