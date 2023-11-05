import { ExecuteMessage } from "@/interface/Interface"
import { Box } from "@mui/material"
import Action from "./Action"

export default ({ data }: { data: ExecuteMessage[]}) => {
    return (
        <Box display={'flex'} flexWrap={'wrap'}>
            {data.map((msg, i) => {
                return <Action key={i} msg={msg}/>
            })}
        </Box>
    )
}