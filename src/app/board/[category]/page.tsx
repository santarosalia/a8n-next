'use client'
import { Box, Button, ButtonGroup, Divider, List } from "@mui/material"
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Posts from "./Posts";
import { Create } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getPosts } from "@/api/Api";
import { Post } from "@/interface/Interface";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/slices/user";

export default ({ params }: { params: { category: string}}) => {
    
    const searchParams = useSearchParams();
    const page = searchParams.get('page')!;
    const user = useAppSelector(getUser);
    const { category } = params;
    const router = useRouter();
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>();

    const createButtonOnClick = () => {
        if (!user) {
            router.push('/signin');
        } else {
            router.push('/board/write');
        }
    }

    useEffect(() => {
        getPosts(category, Number(page)).then(result => {
            setCount(result.count);
            setPosts(result.posts);
        });
    }, [page]);
    return (
        <>
        <List>
            <Divider></Divider>
            <Posts posts={posts!}/>
        </List>
        <Box marginLeft={'auto'}>
            <ButtonGroup size="small">
                <Button onClick={createButtonOnClick}>
                    <Create fontSize="small"></Create>
                </Button>
            </ButtonGroup>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
            <Pagination count={ count } page={ page } category={ category }/>
        </Box>

        </>
    )
}


