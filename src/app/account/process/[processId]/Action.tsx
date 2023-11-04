import { ExecuteMessage } from "@/interface/Interface"
import { useAppDispatch } from "@/redux/hooks"
import { setAction } from "@/redux/slices/process";
import { Box, Card, CardContent, Typography } from "@mui/material"

export default ({msg}: {msg: ExecuteMessage}) => {
    const dispatch = useAppDispatch();
    return (
        <Box sx={{flex : '0 0 24%', padding: 1}}>
            <Card variant="outlined" onClick={() => dispatch(setAction(msg))}>
                <CardContent>
                    <Typography>
                        {msg.object.action}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}