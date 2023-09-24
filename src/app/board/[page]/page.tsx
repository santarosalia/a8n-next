'use client'
import { Box, Button, ButtonGroup, Chip, Divider, List, ListItem, ListItemButton, Pagination, PaginationItem, Typography } from "@mui/material"
import { Post } from "@/interface/Interface";
import { CATEGORY } from "@/constants/Constants";
import { Category } from "@/interface/Interface";
import { Comment, Create, ThumbUp, Visibility } from "@mui/icons-material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
    const params = useParams();
    const { page } = params;
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const fetchData = async () => {
        
        const res = await fetch(`/api/board/${page}`, {
            method : 'GET'
        });
        const result: { count: number, posts: Post[] } = await res.json();
        
        const {count, posts} = result;
        setCount(count);
        setPosts(posts);
    }

    useEffect(() => {
        fetchData();
    },[]);
    
    const buttonBox = () => {
        return (
            <Box marginLeft={'auto'}>
                <ButtonGroup size="small">
                    <Link href="/board/write">
                        <Create fontSize="small"></Create>
                    </Link>
                </ButtonGroup>
            </Box>
        )
    }
    const BoardComponents = posts.map((post, i) => {
        const hashtag = post.hashtag.split(',').map((hash, i) => {
            return (
                <Typography key={i} component={'a'} variant="subtitle2">
                    {hash}
                </Typography>
            )
        })
        const date = new Date(post.createdAt);
        
        return (
            <div key={i}>
            <ListItem key={i} dense sx={{
                height:'70px'
            }}>
                <Box width={'100%'}>
                    <Box display={'flex'} overflow={'auto'} width={'100%'}>
                        <Typography variant="body2">
                            {post.user.name}
                        </Typography>
                        <Typography variant="body2" marginLeft={'auto'}>
                            {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
                        </Typography>
                    </Box>
                    <Box component={Link} href={`/board/view/${post.id}`}>
                        <Typography variant="body1" overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} sx={{width : {xs : '80vw', md : '100%'}}}>
                            {post.title}
                        </Typography>
                    </Box>
                    <Box display={'flex'}>
                        <Chip
                        label={post.category}
                        size="small"
                        sx={{
                            height : '18px',
                        }}
                        />
                        <Box display={'flex'}>
                            {hashtag}
                        </Box>
                        
                        <Box display={'flex'} marginLeft={'auto'}>
                            <Visibility fontSize="small"></Visibility>
                            <Typography variant="subtitle2">
                                {post.readCount}
                            </Typography>
                        </Box>
                        <Box display={'flex'}>
                            <Comment fontSize="small"></Comment>
                            <Typography variant="subtitle2">
                                {post.commentCount}
                            </Typography>
                        </Box>
                        <Box display={'flex'} marginRight={1}>
                            <ThumbUp fontSize="small"></ThumbUp>
                            <Typography variant="subtitle2">
                                {post.recommend}
                            </Typography>
                        </Box>

                        
                    </Box>
                </Box>
            </ListItem>
            <Divider></Divider>
            </div>
        )
    });

    return (
        <>
        
        <List>
            <Divider></Divider>
            { BoardComponents }
        </List>
        {buttonBox()}
        <Box display={'flex'} justifyContent={'center'}>
            <Pagination
            count={count}
            page={Number(page)}
            renderItem={(item) => (
                <PaginationItem
                key={item.page}
                component={Link}
                href={`/board/${item.page}`}
                {...item}/>
                
            )} ></Pagination>
        </Box>

        </>
    )
}


