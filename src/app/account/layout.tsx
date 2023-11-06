'use client'
import { Box, Container, List, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProcessInfos } from "@/redux/slices/process";
import { SideMenuItem } from "@/components/styled";
import { fetchProcesseInfos } from "@/api/Api";
import Editor from "./process/[processId]/Editor";
import { setIsOpenEditor } from "@/redux/slices/dialog";

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

    useEffect(() => {
        fetchProcesseInfos().then(result => {
            dispatch(setProcessInfos(result));
        });
        dispatch(setIsOpenEditor(false));
    }, []);
    return (
        <Box justifyContent={'center'} display={'flex'}>
            <Container maxWidth='lg' sx={{mt : {md : 10, xs : 5}}} onClick={() => dispatch(setIsOpenEditor(false))}>
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
            <Editor/>
        </Box>
    )
}