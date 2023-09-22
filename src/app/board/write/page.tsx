'use client'
import { CATEGORY } from "@/constants/Constants";
import { Category } from "@/interface/Interface";
import { Create } from "@mui/icons-material";
import { Box, Button, Container, Divider, MenuItem, Select, Skeleton, TextField, Typography } from "@mui/material";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr : false
})

export default () => {
    const modules = {
        toolbar: {
            container: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['image'],
            ],
        }
    }
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(1);
    const quillOnChange = (value: string) => {
        setContent(value);
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const quill = () => {
        if (loading) {
            return (
                <Skeleton height={'550px'} sx={{
                    marginTop : -14
                }}></Skeleton>
            )
        } else {
            return (
                <ReactQuill
                    onChange={quillOnChange}
                    style={{
                        height : '300px',
                    }}
                    modules={modules}
                ></ReactQuill>
            )
        }
    }

    const categorySelectItems = Object.entries(CATEGORY).map(entry => {
        const [key, value] = entry;
        if (Number(key) === Category.ALL) return;
        return (
            <MenuItem value={key} key={key}>
                { value }
            </MenuItem>
        )
    });
    return (
        <Container maxWidth='xl'>
            <Box display={'flex'} justifyContent={'center'}>
                
                <Box margin={3} sx={{
                    width : {
                        xs : '100%',
                        md : '50vw'
                    }
                }}>
                    <Typography variant="h6">
                        New Post
                    </Typography>
                    
                    <Divider sx={{ marginY : 2 }}></Divider>
                    <Select
                    sx={{marginY : 1}}
                    size="small"
                    value={category}
                    onChange={(e) => setCategory(Number(e.target.value))}
                    >
                        {categorySelectItems}
                    </Select>
                    <TextField
                    fullWidth
                    sx={{
                        marginBottom : 1
                    }}
                    ></TextField>
                    { quill() }
                    <Box marginTop={10} display={'flex'}>
                        <Box border={1} height={80} flex={1}>
                            File
                        </Box>
                        <Box flex={1} display={'flex'}>
                            <Button sx={{marginLeft : 'auto'}}>
                                <Create fontSize="small"></Create>
                            </Button>
                        </Box>
                    </Box>
                </Box>
                
            </Box>
        </Container>
    )
}