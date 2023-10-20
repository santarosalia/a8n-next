'use client'
import { Box, Container, List, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { fetchProcess } from "./fetch";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { setProcesses } from "@/redux/slices/process";
import { SideMenuItem } from "@/components/styled";

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
    const session = useSession();
    if (session.data?.user) {
        fetchProcess(session.data?.user.id!).then(result => {
            dispatch(setProcesses(result));
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