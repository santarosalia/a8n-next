'use client'
import { useAppSelector } from "@/redux/hooks";
import { getProcessInfos, getSelected, setProcessInfos, setSelected } from "@/redux/slices/process";
import { Box, Button } from "@mui/material"
import Process from "./Process";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser } from "@/redux/slices/user";
import { useEffect } from "react";
import { fetchProcesseInfos } from "@/api/Api";

export default () => {
    const router = useRouter();
    const user = useAppSelector(getUser);
    const dispatch = useDispatch();
    const processInfos = useAppSelector(getProcessInfos);
    const seleted = useAppSelector(getSelected);
    const isSelected = Object.values(seleted).find(value => value === true);
    const deleteProcess = async () => {
        const selectedProcessIds = Object.entries(seleted).filter(([key, value]) => value === true).map(([key]) => key);
        const res = await fetch('/api/process', {
            method : 'DELETE',
            body : JSON.stringify({
               selected : selectedProcessIds,
               userId : user?.id
            })
        });
        if (res.ok) {
            router.refresh();
            dispatch(setSelected({}));
        }
    }
    useEffect(() => {
        fetchProcesseInfos().then(result => {
            dispatch(setProcessInfos(result));
        })

    });
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