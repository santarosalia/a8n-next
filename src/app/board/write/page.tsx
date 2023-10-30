'use client'
import { BOARD_CATEGORY } from "@/constants/Constants";
import { BoardCategory } from "@/interface/Interface";
import { Create } from "@mui/icons-material";
import { Box, Button, Container, Divider, MenuItem, Select, Skeleton, TextField, Typography } from "@mui/material";
import dynamic from "next/dynamic"
import { ChangeEvent, useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/slices/user";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr : false
});

export default () => {
    const user = useAppSelector(getUser);
    const router = useRouter();
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
    const [title, setTitle] = useState('');
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

    const categorySelectItems = Object.entries(BOARD_CATEGORY).map(entry => {
        const [key, value] = entry;
        if (Number(key) === BoardCategory.ALL) return;
        return (
            <MenuItem value={key} key={key}>
                { value }
            </MenuItem>
        )
    });
    
    const createButtonOnClick = async () => {
        const accessToken = 'accessToken';
        const res = await fetch('/api/board', {
            method : 'PUT',
            body : JSON.stringify({
                userId : user?.id,
                title : title,
                content : content,
                category : category,
                hashtag : ['#a','#b'],
            }),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : accessToken
            }
        });
        if (res.ok) {
            router.push('/board?cat=0&page=1');
        }
    }
    const titleOnChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) => {
        setTitle(e.target.value);
    }
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
                    onChange={titleOnChange}
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
                            <Button
                            sx={{marginLeft : 'auto'}}
                            onClick={createButtonOnClick}>
                                <Create fontSize="small"></Create>
                            </Button>
                        </Box>
                    </Box>
                </Box>
                
            </Box>
        </Container>
    )
}