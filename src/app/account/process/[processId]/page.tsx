'use client'
import { fetchProcessDetail } from "@/api/Api";
import { ExecuteMessage, ProcessDetail } from "@/interface/Interface";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Editor from "./Editor";
import { purple } from "@mui/material/colors";
import { useAppSelector } from "@/redux/hooks";
import { getAction } from "@/redux/slices/process";

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
            {processDetail ? <Editor data={processDetail?.data as ExecuteMessage[]}/> : null}
            <Box position={'fixed'} borderRadius={'5px 5px 0 0'} bottom={0} left={'50% - 400px'} height={200} width={'400px'} sx={{backgroundColor : purple[50]}}>
                {action?.object.parameter?.locator}
            </Box>
        </Box>
    )
}