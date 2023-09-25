'use client'
import { Post } from "@/interface/Interface";
import { Box, Container, Divider, Skeleton, Typography } from "@mui/material";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import DomPurify from 'dompurify';

export default () => {
    const params = useParams();
    const { postId } = params;
    const [post, setPost] = useState<Post>();
    const fetchData = async () => {
        const res = await fetch(`/api/view/${postId}`, {
            method : 'GET'
        });
        const result: Post = await res.json();
        setPost(result);
    }
    useEffect(() => {
        fetchData();
    },[]);
    const Title = () => {
        if (post) {
            return (
                <Typography
                variant="h5"
                >
                    {post.title}
                </Typography>
            )
        }
        return (
            <Skeleton></Skeleton>
        )
    }
    const Content = () => {
        
        if (post) {
            return (
                <div dangerouslySetInnerHTML={{
                    __html : DomPurify.sanitize(post.content)
                }}>
                </div>
            )
        }
        return (
            <Skeleton></Skeleton>
        )
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
                    <Title></Title>
                    <Divider></Divider>
                    <Content></Content>
                </Box>
            </Box>
        </Container>
    )
}
