'use client'
import { ProcessInfo } from "@/interface/Interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSelected, setSelected } from "@/redux/slices/process";
import { CheckCircle, Circle, CircleOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { purple } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default ({process}: {process: ProcessInfo}) => {
    const [showCircle, setShowCircle] = useState(false);
    const dispatch = useAppDispatch();
    const selected = useAppSelector(getSelected);
    const router = useRouter();
    const cardOnClick = (process: ProcessInfo) => {
        dispatch(setSelected({
            ...selected,
            [process.id] : !selected[process.id]
        }))
    }
    const showDetail = (process: ProcessInfo) => {
        router.push(`/account/process/${process.id}`);
    }

    return (
        <Box sx={{flex : '0 0 33.333%', padding: 1}}>
            <Card variant="outlined"  onMouseOver={() => setShowCircle(true)} onMouseOut={() => setShowCircle(false)} {...(selected[process.id] && {sx : {backgroundColor : purple[100]}})}>
                <Button fullWidth sx={{opacity : 0, transition : '0.5s'}} {...(showCircle && {sx : {opacity : 1, transition : '0.5s'}})} onClick={() => cardOnClick(process)}>Select</Button>
                <Typography sx={{marginX : 2}}>{process.name}</Typography>
                <Button fullWidth sx={{opacity : 0, transition : '0.5s'}} {...(showCircle && {sx : {opacity : 1, transition : '0.5s'}})} onClick={() => showDetail(process)}>Detail</Button>
            </Card>
        </Box>
    )
}