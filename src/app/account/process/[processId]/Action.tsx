import { ExecuteMessage } from "@/interface/Interface"
import { useAppDispatch } from "@/redux/hooks"
import { setIsOpenEditor } from "@/redux/slices/dialog";
import { setAction } from "@/redux/slices/process";
import { Box, Card, CardContent, Typography } from "@mui/material"

export default ({msg}: {msg: ExecuteMessage}) => {
    const dispatch = useAppDispatch();
    const onClickAction = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setAction(msg));
        dispatch(setIsOpenEditor(true));
    }
    return (
        <Box sx={{flex : '0 0 24%', padding: 1}}>
            <Card variant="outlined" onClick={onClickAction}>
                <CardContent>
                    <Typography variant="body2">
                        {msg.object.action}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}