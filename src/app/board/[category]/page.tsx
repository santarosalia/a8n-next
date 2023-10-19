'use client'
import { Box, Button, ButtonGroup, Divider, List } from "@mui/material"
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Posts from "./Posts";
import { setIsOpenSigninDialog } from "@/redux/slices/dialog";
import { Create } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getPosts } from "./fetch";
import { Post } from "@/interface/Interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

export default ({ params }: { params: { category: string}}) => {
    
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const page = searchParams.get('page')!;
    const session = useSession();
    const user = session.data?.user;
    const { category } = params;
    const router = useRouter();
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>();

    const createButtonOnClick = () => {
        if (!user) {
            dispatch(setIsOpenSigninDialog(true));
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


