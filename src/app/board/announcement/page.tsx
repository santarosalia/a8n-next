import { Box, Chip, Divider, List, ListItem, ListItemButton, Typography } from "@mui/material"

export default () => {
    enum Category {
        ANNOUNCEMNET,
        PROCESS,
    }
    const CATEGORY = {
        0 : 'Announcement',
        1 : 'Share'
    }
    interface Board {
        index: number,
        id: string
        title: string,
        profile: {
            id: string,
            name: string
        },
        createdAt: Date,
        updatedAt: Date,
        category: string,
        hashtag: string[],
        readCount: number,
        commentCount: number,
        recommendation: number
    }
    
    const boards: Board[] = [];
    for (let i = 0; i < 9; i++) {
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
    const BoardComponents = boards.map(board => {
        
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
                        <Typography variant="body1" overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} sx={{width : {xs : '100vw',md : '100%'}}}>
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
                        <Typography variant="body2">
                            {board.hashtag}
                        </Typography>
                        
                        {board.readCount}
                        {board.commentCount}
                        {board.recommendation}
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
        </>
    )
}