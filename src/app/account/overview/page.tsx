'use client'
import { PLANS } from "@/constants/Constants";
import { useAppSelector } from "@/redux/hooks";
import { getProcessInfos } from "@/redux/slices/process";
import { getUser } from "@/redux/slices/user";
import { Backdrop, Box, Button, CircularProgress, Divider, LinearProgress, Typography,  } from "@mui/material";
import { green } from "@mui/material/colors";

export default () => {
    const user = useAppSelector(getUser);
    const userPlan = PLANS.find(plan => plan.level === user?.level);
    const processInfos = useAppSelector(getProcessInfos);
    const remainingCount = userPlan?.processMaxCount! - processInfos.length;
    const remainingValue = processInfos.length / userPlan?.processMaxCount! * 100;
    if (!user) {
        return (
            <Backdrop open>
                <CircularProgress color="inherit" size={50}/>
            </Backdrop>
        )
    }
    return (
        <Box display={'flex'} sx={{flexDirection : { md : 'row', xs : 'column'}}}>
            <Box flex={4}>
                <Typography variant="h5">
                    {userPlan?.title} Monster
                </Typography>
                <Typography marginY={1}>
                   {remainingCount} process remaining storage
                </Typography>
                <LinearProgress variant="determinate" value={remainingValue} sx={{height: 8, borderRadius : 5}}/>
                <Divider sx={{ my : 2}}/>
                <Box display={'flex'}>
                    <Box>
                        <Typography>
                            Email
                        </Typography>
                        <Typography>
                            {user.email}
                        </Typography>
                    </Box>
                    <Box marginLeft={'auto'} display={'flex'}>
                        <Button>Change</Button>
                    </Box>
                </Box>
                <Divider sx={{my : 2}}/>
                <Box display={'flex'}>
                    <Box>
                        <Typography>
                            Password
                        </Typography>
                        <Typography>
                            ********
                        </Typography>
                    </Box>
                    <Box marginLeft={'auto'} display={'flex'}>
                        <Button>Change</Button>
                    </Box>
                </Box>
                <Divider sx={{my : 2}} />
                <Box display={'flex'} justifyContent={'center'}>
                    <Button variant="outlined" sx={{color : green[600], borderRadius : 5, borderColor : green[300], ':hover' : {borderColor : green[300]}}} size="large">
                        Upgrade Plan
                    </Button>
                </Box>
            </Box>
            <Box flex={6}>
                <Box component={'img'} maxWidth={300} src={userPlan?.img!} margin={'auto'}></Box>
            </Box>
        </Box>
    )
}