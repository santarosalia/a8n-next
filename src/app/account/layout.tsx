'use client'
import { Box, Container, List, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { fetchProcess } from "./fetch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProcessInfos } from "@/redux/slices/process";
import { SideMenuItem } from "@/components/styled";
import { getUser } from "@/redux/slices/user";

export default ({children}: { children: ReactNode }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const accountMenus = [
        {
            name : 'Overview',
            onClick : () => {
                router.push('/account/overview');
            }
        },
        {
            name : 'Process',
            onClick : () => {
                router.push('/account/process');

            }
        },
        {
            name : 'Billing History',
            onClick : () => {
                router.push('/account/billing');
            }
        }
    ]
    const user = useAppSelector(getUser);
    if (user) {
        fetchProcess(user.id!).then(result => {
            dispatch(setProcessInfos(result));
        });
    }
    return (
        <Container maxWidth='lg' sx={{mt : {md : 10, xs : 5}}}>
            <Box display={'flex'} height={'100vh'} sx={{flexDirection : { md : 'row', xs : 'column'}}}>
                <Box flex={1}>
                    <List sx={{display : 'flex', flexDirection : {md : 'column', xs : 'row'}}}>
                        {accountMenus.map((menu, i) => {
                            return <SideMenuItem key={i} onClick={menu.onClick}>{menu.name}</SideMenuItem>
                        })}
                    </List>
                </Box>
                <Box flex={10} paddingX={3}>{children}</Box>
            </Box>
        </Container>
    )
}