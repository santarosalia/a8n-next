import { Box, Divider, List, ListItem, ListItemButton, Typography } from "@mui/material"

export default () => {
    return (
        <>
        
        <List>
            <Divider></Divider>
            <ListItem dense sx={{
                height:'80px'
            }}>
                <Box>
                    <Box>profile , name , createdate, </Box>
                    <Box>title</Box>
                    <Box>category, hashtag , readcount, comment , reco</Box>
                </Box>
            </ListItem>
            <Divider></Divider>
            <ListItem dense sx={{
                height:'80px'
            }}>
                <Box>
                    <Box>d</Box>
                    <Box>a</Box>
                    <Box>c</Box>
                </Box>
            </ListItem>
            <Divider></Divider>
        </List>
        </>
    )
}