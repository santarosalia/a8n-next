'use client'
import { Box, Button, Container, List, ListItemButton, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from "@mui/material"
import { grey } from "@mui/material/colors"
import { ReactNode, useState } from "react"
import { Search } from "@mui/icons-material"
import { BOARD_CATEGORY } from "@/constants/Constants"
import { usePathname, useRouter } from "next/navigation"
import { BoardCategory } from "@/interface/Interface"
import { SideMenuItem } from "@/components/styled"
export default ({children} :
    { children: ReactNode }
) => {
    const router = useRouter();
    const pathName = usePathname();
    const [selectedCategory, setSelectedCategory] = useState(0);
    if (
        pathName === '/board/write' ||
        pathName.startsWith('/board/view/')
        ) return (<>{children}</>)
    
    const searchBoxSelectCategory = Object.entries(BOARD_CATEGORY).map(entry => {
        const [key, value] = entry;
        return (
            <MenuItem value={key} key={key}>
                {value}
            </MenuItem>
        )
    });

    const onClickCategory = (categoryIndex: number) => {
        setSelectedCategory(categoryIndex);
        const category = BOARD_CATEGORY[Number(categoryIndex) as BoardCategory];
        router.push(`${category}?page=1`);
    }

    const onChangeCategory = (e: SelectChangeEvent) => {
        setSelectedCategory(Number(e.target.value));
        const category = BOARD_CATEGORY[Number(e.target.value) as BoardCategory];
        router.push(`${category}?page=1`);
    }

    const menus = Object.entries(BOARD_CATEGORY).map(entry => {
        const [key, value] = entry;
        return (
            <SideMenuItem
            selected={selectedCategory === Number(key)}
            onClick={() => onClickCategory(Number(key))}
            key={key}
            sx={{
                width : '100px',
                justifyContent : 'center'
            }}
            
            >
                {value}
            </SideMenuItem>
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
                <List sx={{
                    display : 'flex'
                }}>
                    {menus}
                </List>
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
                    <List>
                        {menus}
                    </List>
                </Box>
                <Box flex={9} padding={1} display={'flex'} flexDirection={'column'}>
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