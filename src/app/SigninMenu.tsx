import { Box, IconButton, Menu, MenuItem, Skeleton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getIsLoading, getUser, setUser } from "@/redux/slices/user";
import { AccountCircle, Login } from "@mui/icons-material";
import { deleteAccessToken } from "@/api/Api";
export default () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(getUser);
    const isLoading = useAppSelector(getIsLoading);
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
                deleteAccessToken();
                dispatch(setUser(null));
                handleCloseUserMenu();
            }
        }
    ]

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    if (isLoading) return <Skeleton width={24}></Skeleton>
    if (user) {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit" size="large">
                    <AccountCircle/>
                </IconButton>
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
        <IconButton onClick={() => router.push('/signin')} color="inherit">
            <Login/>
        </IconButton>
    )
    
}