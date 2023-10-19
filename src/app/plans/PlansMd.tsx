import { Box, Typography } from "@mui/material"
import Plan from "./Plan"
import { PLANS } from "@/constants/Constants"

export default () => {
    const Plans = () => {
        return PLANS.map((plan, i) => {
            return (
                <Plan key={i}
                title={plan.title}
                subtitle={plan.subtitle}
                access={plan.access}
                buttonText={plan.buttonText}
                href={plan.href}
                price={plan.price}
                img={plan.img}
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