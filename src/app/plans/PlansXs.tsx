'use client'
import { Box, Button, ButtonGroup, Typography } from "@mui/material"
import Plan from "./Plan"
import { plans } from "@/constants/Constants"
import { useEffect, useState } from "react"
export default () => {
    const [showPlan, setShowPlan] = useState(0);
    const onClick = (i: number) => {
        setShowPlan(i);
    }
    const Buttons = () => {
        return plans.map((plan, i) => {
            return (
                <Button onClick={() => { onClick(i) }} key={i}>
                    {plan.title}
                </Button>
            )
        })
    }
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
                img={plan.img}
                >
                </Plan>
            )
        }).find((el, i) => i === showPlan)
    }
    return (
        <>
        <Box margin={10} textAlign={'center'}>
        <Typography variant='h6' display={{xs : 'flex', md : 'none'}} justifyContent={'center'} >
            Pick the plan that's right for you
        </Typography>
        </Box>
        <Box display={'flex'} textAlign={'center'} justifyContent={'center'}>
            <ButtonGroup>
                <Buttons></Buttons>
            </ButtonGroup>
        </Box>
        <Box display={'flex'} textAlign={'center'} justifyContent={'center'}>
        <Plans></Plans>
        </Box>
        </>
    )
}