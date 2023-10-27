
import { Box, Button, Chip, Dialog, DialogContent, Divider, InputLabel, Menu, MenuItem, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { getIsOpenSigninDialog, setIsOpenSigninDialog } from "@/redux/slices/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";


export default () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const settings = [
        {
            name : 'Account',
            onClick : () => {
                router.push('/account/overview');
                handleCloseUserMenu();
            }
        },
        {
            name : 'Signout',
            onClick : () => {
                signOut();
                // handleCloseUserMenu();
            }
        }
    ]
    const isOpen = useAppSelector(getIsOpenSigninDialog);

    const session = useSession();
    const [inputs, setInputs] = useState({
        email : '',
        password : ''
    });
    const {email, password} = inputs;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setInputs({
            ...inputs,
            [id] : value
        });
    } 
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const signInWithCredentials = async () => {
        await fetch(`/api/signin`, {
            method : 'POST',
            body : JSON.stringify(inputs)
        });
    }
    
    if (session.status === 'loading') {
        return <Skeleton variant="rounded"></Skeleton>
    }
    if (session.data?.user) {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                    {session.data?.user?.name?.toUpperCase() ?? 'User'}
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
                {settings.map((setting, i) => (
                    <MenuItem key={i} onClick={setting.onClick}>
                    <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
        )
    }
    return (
        <>
        <Button onClick={() => dispatch(setIsOpenSigninDialog(true))} color="inherit">
            Signin
        </Button>
        <Dialog open={isOpen} onClose={() => dispatch(setIsOpenSigninDialog(false))}>
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
            </DialogContent>
        </Dialog>
        </>
    )
    
}