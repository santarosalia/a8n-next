'use client'
import { Box, Container, Divider, List, ListItem, ListItemButton, ThemeProvider, Typography } from "@mui/material"
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
        <Container maxWidth='xl'>
            <Box
            marginY={1}
            sx={{
                display : {
                    xs : 'flex',
                    md : 'none'
                }
            }}
            >
                <ThemeProvider theme={listItem}>
                <List sx={{
                    display : 'flex'
                }}>
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
                </ThemeProvider>

            </Box>
            <Box
            marginY={1}
            marginX={'auto'}
            padding={3}
            
            flexDirection={'column'}
            height={'60px'}
            display={'flex'}
            width={'60vw'}
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
                flex={2}
                sx={{
                    display : {
                        xs : 'none',
                        md : 'flex'
                    }
                }}>
                    <ThemeProvider theme={listItem}>
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
                    </ThemeProvider>
                </Box>
                <Box flex={9} height={'100vh'} padding={1}>
                    {children}
                </Box>
                <Box flex={2}
                sx={{
                    display : {
                        xs : 'none',
                        md : 'flex'
                    }
                }}>ad</Box>
            </Box>
        </Container>
        </>
    )
}