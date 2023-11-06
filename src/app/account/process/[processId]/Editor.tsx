import { EDITOR_KEY, EditorKey } from "@/constants/Constants";
import { useAppSelector } from "@/redux/hooks";
import { getIsOpenEditor } from "@/redux/slices/dialog";
import { getAction } from "@/redux/slices/process";
import { ArrowUpward, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fade, IconButton, Slide, TextField, Typography } from "@mui/material"
import { purple } from "@mui/material/colors";
import { useState } from 'react';
export default () => {

    const [height, setHeight] = useState(200);
    const isOpenEditor = useAppSelector(getIsOpenEditor);
    const action = useAppSelector(getAction);
    const params = action?.object.parameter ?? {};
    const paramComponent = Object.entries(params).map(([key, value], i)=> {
        return (
            <Box key={i}>
                <Typography>
                    {EDITOR_KEY[key as EditorKey]}
                </Typography>
                <TextField value={value} size="small"></TextField>        
            </Box>
        )
    });

    const onClickArrowButton = () => {
        height === 200 ? setHeight(400) : setHeight(200);
    }
    return (
        <Slide direction="up" in={isOpenEditor}>
            <Box display={'flex'} flexDirection={'column'} position={'fixed'} overflow={'auto'} borderRadius={'5px 5px 0 0'} bottom={0} height={height} sx={{backgroundColor : purple[50], width : { xs : '80vw', md : '30vw'}}}>
                <Box justifyContent={'center'} display={'flex'}>
                    <IconButton size="small" onClick={onClickArrowButton}>{height === 200 ? <KeyboardArrowUp fontSize="large"/> : <KeyboardArrowDown fontSize="large"/>}</IconButton>
                </Box>
                <Box padding={2}>
                    {paramComponent}
                </Box>
            </Box>
        </Slide>
    )
}