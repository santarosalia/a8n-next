import { Box, Chip, Divider, List, ListItem, ListItemButton, Typography } from "@mui/material"

export default () => {
    enum Category {
        ANNOUNCEMNET,
        PROCESS,
        
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
        category: Category,
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
                title : `test${i}`,
                profile : {
                    id : `profile id ${i}`,
                    name : `name${i}`
                },
                createdAt : new Date(),
                updatedAt : new Date(),
                category : Category.PROCESS,
                hashtag : [`#hash${i}`],
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
                height:'80px'
            }}>
                <Box>
                    <Box>
                        {board.profile.name} {`${board.createdAt.getFullYear()}-${board.createdAt.getMonth()+1}-${board.createdAt.getDate()} ${board.createdAt.getHours()}:${board.createdAt.getMinutes()}` }
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            {board.title}
                        </Typography>
                    </Box>
                    <Box>
                        <Chip
                        label={board.category}
                        size="small"/>
                        
                        {board.hashtag}
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