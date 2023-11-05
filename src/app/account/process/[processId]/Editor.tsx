import { useAppSelector } from "@/redux/hooks";
import { getAction } from "@/redux/slices/process";
import { Box, Typography } from "@mui/material"
import { purple } from "@mui/material/colors";

export default () => {
    const action = useAppSelector(getAction);
    const params = action?.object.parameter;
    console.log(params)
    return (
        <Box position={'fixed'} borderRadius={'5px 5px 0 0'} bottom={0} left={'50% - 400px'} height={200} width={'400px'} sx={{backgroundColor : purple[50]}}>
            <Typography>
            </Typography>
        </Box>
    )
}