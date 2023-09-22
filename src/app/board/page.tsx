import { Box, Button, ButtonGroup, Chip, Divider, List, ListItem, ListItemButton, Pagination, Typography } from "@mui/material"
import { Board } from "@/interface/Interface";
import { CATEGORY } from "@/constants/Constants";
import { Category } from "@/interface/Interface";
import { Comment, Create, ThumbUp, Visibility } from "@mui/icons-material";
import Link from "next/link";

export default () => {
    const boards: Board[] = [];
    for (let i = 0; i < 10; i++) {
        boards.push(
            {
                index : i,
                id : `id${i}`,
                title : `titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle${i}`,
                profile : {
                    id : `profile id ${i}`,
                    name : `name${i}`
                },
                createdAt : new Date(),
                updatedAt : new Date(),
                category : CATEGORY[Category.PROCESS],
                hashtag : [`#hash${i}`,`#hash${i}`],
                readCount : i,
                commentCount : i,
                recommendation : i
            }
        );
    }
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
    const BoardComponents = boards.map(board => {
        const hashtag = board.hashtag.map(hash => {
            return (
                <>
                    <Typography component={'a'} variant="subtitle2">
                        {hash}
                    </Typography>
                </>
            )
        })
        return (
            <>
            <ListItem dense sx={{
                height:'70px'
            }}>
                <Box width={'100%'}>
                    <Box display={'flex'} overflow={'auto'} width={'100%'}>
                        <Typography variant="body2">
                            {board.profile.name}
                        </Typography>
                        <Typography variant="body2" marginLeft={'auto'}>
                            {`${board.createdAt.getFullYear()}-${board.createdAt.getMonth()+1}-${board.createdAt.getDate()} ${board.createdAt.getHours()}:${board.createdAt.getMinutes()}`}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} sx={{width : {xs : '80vw', md : '100%'}}}>
                            {board.title}
                        </Typography>
                    </Box>
                    <Box display={'flex'}>
                        <Chip
                        label={board.category}
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
                                {board.readCount}
                            </Typography>
                        </Box>
                        <Box display={'flex'}>
                            <Comment fontSize="small"></Comment>
                            <Typography variant="subtitle2">
                                {board.commentCount}
                            </Typography>
                        </Box>
                        <Box display={'flex'} marginRight={1}>
                            <ThumbUp fontSize="small"></ThumbUp>
                            <Typography variant="subtitle2">
                                {board.recommendation}
                            </Typography>
                        </Box>

                        
                    </Box>
                </Box>
            </ListItem>
            <Divider></Divider>
            </>
        )
    });

    return (
        <>
        
        <List>
            <Divider></Divider>
            {BoardComponents}
        </List>
        {buttonBox()}
        <Box display={'flex'} justifyContent={'center'}>
            <Pagination count={10}></Pagination>
        </Box>

        </>
    )
}