'use client'
import { Box, Button, Container, List, ListItemButton, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from "@mui/material"
import { grey } from "@mui/material/colors"
import { ReactNode, useState } from "react"
import { listItem } from "@/theme/CommonTheme"
import { Search } from "@mui/icons-material"
import { CATEGORY } from "@/constants/Constants"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { Category } from "@/interface/Interface"
export default ({children} :
    { children: ReactNode }
) => {
    const router = useRouter();
    const pathName = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(0);
    if (
        pathName === '/board/write' ||
        pathName.startsWith('/board/view/')
        ) return (<>{children}</>)
    
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
        const category = CATEGORY[Number(categoryIndex) as Category];
        router.push(`${category}`);
    }

    const onChangeCategory = (e: SelectChangeEvent) => {
        setSelectedCategory(Number(e.target.value));
        const category = CATEGORY[Number(e.target.value) as Category];
        router.push(`${category}`);
    }

    const menus = Object.entries(CATEGORY).map(entry => {
        const [key, value] = entry;
        return (
            <ListItemButton
            selected={selectedCategory === Number(key)}
            onClick={() => onClickCategory(Number(key))}
            key={key}
            sx={{
                width : '100px',
                justifyContent : 'center'
            }}
            
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