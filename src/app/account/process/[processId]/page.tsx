'use client'
import { fetchProcessDetail } from "@/api/Api";
import { ExecuteMessage, ProcessDetail } from "@/interface/Interface";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Actions from "./Actions";
import { useAppSelector } from "@/redux/hooks";
import { getAction } from "@/redux/slices/process";
import Editor from "./Editor";

export default ({ params }: { params: { processId: string }}) => {
    const router = useRouter();
    const action = useAppSelector(getAction);
    const [processDetail, setProcessDetail] = useState<ProcessDetail>();
    useEffect(() => {
        fetchProcessDetail(params.processId).then(result => {
            if (result === null) return router.back();
            setProcessDetail(result);
        });
    }, []);
    return (
        <Box>
            <Typography variant="h6">
                {processDetail?.name}
            </Typography>
            {processDetail ? <Actions data={processDetail?.data as ExecuteMessage[]}/> : null}
            <Editor/>
        </Box>
    )
}