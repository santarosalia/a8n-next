'use client'
import { useAppSelector } from "@/redux/hooks";
import { getProcessInfos, getSelected, setSelected } from "@/redux/slices/process";
import { Box, Button, Card, CardContent, Icon, IconButton, Typography } from "@mui/material"
import Process from "./Process";
import { Delete } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default () => {
    const router = useRouter();
    const session = useSession();
    const dispatch = useDispatch();
    const processInfos = useAppSelector(getProcessInfos);
    const seleted = useAppSelector(getSelected);
    const isSelected = Object.values(seleted).find(value => value === true);
    const deleteProcess = async () => {
        const accessToken = session!.data!.user.accessToken;
        const selectedProcessIds = Object.entries(seleted).filter(([key, value]) => value === true).map(([key]) => key);
        const res = await fetch('/api/process', {
            method : 'DELETE',
            body : JSON.stringify({
               selected : selectedProcessIds,
               userId : session!.data!.user.id
            }),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : accessToken
            }
        });
        if (res.ok) {
            router.refresh();
            dispatch(setSelected({}));
        }
    }
    return (
        <Box>
            <Box marginX={2}>
                <Button onClick={deleteProcess} sx={{opacity : 0, transition : '0.5s'}} {...(isSelected && {sx : {opacity : 1, transition : '0.5s'}})} size="small"><Delete></Delete></Button>
            </Box>
            <Box display={'flex'} flexWrap={'wrap'}>
                {processInfos.map((process, i) => <Process process={process} key={i} />)}
            </Box>
        </Box>
    )
}