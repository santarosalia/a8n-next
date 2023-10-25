'use client'
import { ProcessInfo } from "@/interface/Interface";
import { useAppSelector } from "@/redux/hooks";
import { getProcessInfos } from "@/redux/slices/process";
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useState } from "react";

export default () => {
    const processInfos = useAppSelector(getProcessInfos);
    const [selected, setSelected] = useState<string[]>([]);
    const cardOnClick = (process: ProcessInfo) => {
        if (selected.includes(process.id)) {
            const index = selected.findIndex(id => id === process.id);
            selected.splice(index, 1);
            setSelected(selected);
        } else {
            setSelected([...selected, process.id]);
        }
    }
    const infos = processInfos.map((process, i) => {
        return (
            <Box sx={{flex : '0 0 33.333%', padding: 1}} key={i}>
                <Card variant="outlined" onClick={() => cardOnClick(process)} {...(selected.includes(process.id) ? {sx : {backgroundColor : "skyblue"}} : {sx : {backgroundColor : "white"}})}>
                    <CardContent sx={{display : 'flex'}}>
                        <Typography>{process.name}</Typography>
                    </CardContent>
                </Card>
            </Box>
        )
    });
    return (
        <Box display={'flex'} flexWrap={'wrap'}>
            
            {infos}
        </Box>
    )
}