'use client'
import { Box, Button, ButtonGroup, Divider, List } from "@mui/material"
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import Posts from "./Posts";
import { open } from "@/redux/slices/signinModal";
import { Create } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getPosts } from "./fetch";
import { Post } from "@/interface/Interface";

export default ({ params }: { params: { category: string}}) => {
    
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const page = searchParams.get('page')!;
    const session = useSession();
    const { category } = params;
    const router = useRouter();
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>();

    const createButtonOnClick = () => {
        if (!session.data?.user) {
            dispatch(open(null));
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


