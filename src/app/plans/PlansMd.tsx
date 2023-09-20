import { Box, Typography } from "@mui/material"
import Plan from "./Plan"
import { plans } from "./constants"

export default () => {
    const Plans = () => {
        return plans.map((plan, i) => {
            return (
                <Plan key={i}
                title={plan.title}
                subtitle={plan.subtitle}
                access={plan.access}
                buttonText={plan.buttonText}
                href={plan.href}
                price={plan.price}
                >
                </Plan>
            )
        })
    }
    return (
        <>
        <Box margin={10} textAlign={'center'}>
        <Typography variant='h3' justifyContent={'center'} >
            Pick the plan that's right for you
        </Typography>
        </Box>
        <Box display={'flex'} textAlign={'center'} justifyContent={'center'}>
        <Plans></Plans>
        </Box>
        </>
    )
}