'use client'
import { CATEGORY } from "@/constants/Constants";
import { Category, Post } from "@/interface/Interface";
import { Comment, ThumbUp, Visibility } from "@mui/icons-material";
import { Box, Chip, Divider, ListItem, Skeleton, Typography } from "@mui/material";
import Link from "next/link";

export default ({posts}: {posts: Post[]}) => {
    

    if (!posts) {
        return Array.from({length : 10}, (v, i) => i).map((i) => {
            return (
                <Skeleton height={'70px'} key={i} variant="rectangular" animation="wave" sx={{margin : 1}}></Skeleton>
            )
        })
    }
    return posts?.map((post, i) => {
        const hashtag = post.hashtag.split(',').map((hash, i) => {
            return (
                <Typography key={i} component={'a'} variant="subtitle2">
                    {hash}
                </Typography>
            )
        })
        const date = new Date(post.createdAt);
        const category = Number(post.category) as Category;
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
                    <Box component={Link} href={`/view/${post.id}`}>
                        <Typography variant="body1" overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} sx={{width : {xs : '80vw', md : '100%'}}}>
                            {post.title}
                        </Typography>
                    </Box>
                    <Box display={'flex'}>
                        <Chip
                        label={CATEGORY[category]}
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
}