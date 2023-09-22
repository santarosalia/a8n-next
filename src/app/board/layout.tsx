'use client'
import { Box, Button, Container, Divider, List, ListItem, ListItemButton, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider, Typography } from "@mui/material"
import { grey, purple } from "@mui/material/colors"
import { ReactNode, useState } from "react"
import { listItem } from "@/theme/CommonTheme"
import { Search } from "@mui/icons-material"
import { CATEGORY } from "@/constants/Constants"
import { usePathname } from "next/navigation"
export default ({children} :
    { children: ReactNode }
) => {
    const pathName = usePathname();
    if (pathName === '/board/write') return (<>{children}</>)
    const [selectedCategory, setSelectedCategory] = useState(0);
    
    const searchBoxSelectCategory = Object.entries(CATEGORY).map(entry => {
        const [key, value] = entry;
        return (
            <MenuItem value={key} key={key}>
            {value}
            </MenuItem>
        )
    });

    const onClickCategory = (categoryIndex: number) => {
        setSelectedCategory(categoryIndex);
    }

    const onChangeCategory = (e: SelectChangeEvent) => {
        setSelectedCategory(Number(e.target.value));
    }

    const menus = Object.entries(CATEGORY).map(entry => {
        const [key, value] = entry;
        return (
            <ListItemButton
            selected={selectedCategory === Number(key)}
            onClick={() => onClickCategory(Number(key))}
            >
                {value}
            </ListItemButton>
        )
    });
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
                    {menus}
                </List>
                </ThemeProvider>

            </Box>
            <Box
            marginY={1}
            marginX={'auto'}
            padding={1}
            
            height={'60px'}
            display={'flex'}
            width={'60vw'}
            justifyContent={'center'}
            sx={{
                backgroundColor : grey[300],
                borderRadius : 2
            }}>
                <Select sx={{
                    height:'40px',
                    fontSize : '5px',
                    width : '80px'
                }}
                displayEmpty
                value={selectedCategory.toString()}
                onChange={onChangeCategory}
                >
                    {searchBoxSelectCategory}
                </Select>
                <TextField size="small"></TextField>
                <Button color="secondary">
                    <Search fontSize="small"></Search>
                </Button>
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
                        {menus}
                    </List>
                    </ThemeProvider>
                </Box>
                <Box flex={9} height={'100vh'} padding={1} display={'flex'} flexDirection={'column'}>
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