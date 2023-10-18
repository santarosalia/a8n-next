'use client'
import { Box, Container, List, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default ({children}: { children: ReactNode }) => {
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
    return (
        <Container maxWidth='xl'>
            <Box display={'flex'} height={'100vh'} mt={5}>
                <Box flex={1}>
                    <List>
                        {accountMenus.map(menu => {
                            return <MenuItem onClick={menu.onClick} sx={{borderRadius : 5}}>{menu.name}</MenuItem>
                        })}
                    </List>
                </Box>
                <Box flex={10} ml={2}>{children}</Box>
            </Box>
        </Container>
    )
}