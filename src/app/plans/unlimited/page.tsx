'use client'
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { green } from "@mui/material/colors";
import { MouseEvent, useState } from "react";

export default () => {
    const [checkedPlan, setCheckedPlan] = useState(1);
    const unlimitedPlan = [0,1,2];
    const paperOnClick = (i: number) => {
        setCheckedPlan(i);
    }
    const papers = unlimitedPlan.map(i => {
        return (
            <Paper
            component={'button'}
            variant="outlined"
            onClick={() => paperOnClick(i)}
            key={i}
            sx={{
                display : 'flex',
                flexDirection : 'column',
                flex : 1,
                margin : 1,
                marginX : {
                    xs : 'auto',
                    md : 1
                },
                padding : 1,
                ':hover' : {
                    scale : '1.03'
                },
                width : {
                    xs : '70vw',
                    md : '100%'
                },
                height : '120px'

            }}
            >
                <Box display={'flex'}>
                    {checkedPlan === i ? 
                    <CheckCircleOutline fontSize="small" sx={{color : green[600]}}></CheckCircleOutline>
                    :
                    <RadioButtonUnchecked fontSize="small" sx={{color : green[600]}}></RadioButtonUnchecked>}
                    <Typography variant="h6" marginX={1}>
                        period
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h4" marginX={3}>
                        price
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" marginX={3}>
                        desc
                    </Typography>
                </Box>
            </Paper>
        )
    })
    return (
        <Container maxWidth={'xl'}>
            <Box display={'flex'} justifyContent={'center'}>
                <Box display={'flex'} margin={3}
                sx={{
                    width : {
                        xs : '100%',
                        md : '80vw'
                    }
                }}>
                   <Box
                   width={'100%'}
                   height={'360px'}
                   display={'flex'}
                   sx={{
                    flexDirection : {
                        xs : 'column',
                        md : 'row'
                    }
                   }}
                   justifyContent={'center'}
                   >
                    {papers}
                    </Box> 
                </Box>      
            </Box>  
        </Container>
        
    )
}