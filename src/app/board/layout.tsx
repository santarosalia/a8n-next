'use client'
import { ClassNames } from "@emotion/react"
import { Box, Container, List, ListItem, ListItemButton, ThemeProvider, Typography } from "@mui/material"
import { grey, purple } from "@mui/material/colors"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { listItem } from "@/theme/CommonTheme"
export default ({children} :
    { children: ReactNode }
) => {
    const [selected, setSelected] = useState(0);

    return (
        <>
        <ThemeProvider theme={listItem}>
        <Container maxWidth='xl'>
            <Box
            marginY={1}
            marginX={10}
            padding={3} 
            flexDirection={'column'}
            height={'20vh'}
            display={'flex'}
            justifyContent={'center'}
            sx={{
                backgroundColor : grey[300],
                borderRadius : 2
            }}>
                <Typography
                variant="h6"
                >
                    Title
                </Typography>
                <Typography variant="subtitle2">
                    Subtitle
                </Typography>
            </Box>
            <Box display={'flex'}>
                <Box
                flex={1}
                sx={{
                    display : {
                        xs : 'none',
                        md : 'flex'
                    }
                }}>
                    <List>
                        <Link href={'/board/announcement'}>
                            <ListItemButton
                            selected={selected === 0}
                            onClick={()=>setSelected(0)}
                            >
                                Announcement
                            </ListItemButton>
                        </Link>
                        <Link href={'/board/share'}>
                            <ListItemButton
                            selected={selected === 1}
                            onClick={()=>setSelected(1)}
                            >
                                Share
                            </ListItemButton>
                        </Link>
                    </List>
                </Box>
                <Box flex={9} height={'100vh'} padding={1}>
                    {children}
                </Box>
            </Box>
        </Container>
        </ThemeProvider>
        </>
    )
}