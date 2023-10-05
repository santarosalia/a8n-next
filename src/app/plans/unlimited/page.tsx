'use client'
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { green } from "@mui/material/colors";
import { MouseEvent, useState } from "react";
import { plans } from "@/constants/Constants";
import { DetailPrice } from "@/interface/Interface";
import { useSession } from "next-auth/react";

export default () => {
    const session = useSession();
    const unlimitedPlan = plans.find(plan => plan.title === 'Unlimited');
    const detailPrices = unlimitedPlan!.detailPrices;
    const [selectedPice, setSelectedPrice] = useState<DetailPrice>(detailPrices![1]);
    const paperOnClick = (i: number) => {
        setSelectedPrice(detailPrices![i]);
    }
    
    const payment = async () => {
        const imp = window.IMP;
        imp.init('imp03655385');
        imp.request_pay({
            pg: "kcp.{store-367eb210-88e3-4b07-b163-e4a86c7f3cb7}",
            pay_method: "card",
            merchant_uid: "ORD20180131-0000011",   // 주문번호
            name: "Unlimited Plan",
            amount: selectedPice?.price.ko,                         // 숫자 타입
            buyer_email: session.data?.user.email,
            buyer_name: session.data?.user.name,
          }, (res: {
            error_msg: string,
            imp_uid: string,
            merchant_uid: string,
            pay_method: string,
            pg_provider: string,
            pg_type: string,
            success: boolean
          }) => { // callback
            //res.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
            if (res.success) {

            } else {

            }
          });
    }
    
    const papers = detailPrices!.map((detailPrice, i) => {
        return (
            <Paper
            component={'button'}
            variant="outlined"
            onClick={() => paperOnClick(i)}
            key={i}
            {...(selectedPice.index === i ? {
                sx :{
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
                    height : '120px',
                    borderColor : green[600],
                    backgroundColor : green[50],
                    boxShadow : 1
                }
            }
            :
            {
                sx :{
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
                    height : '120px',
                    boxShadow : 1
                }
            })}
            >
                <Box display={'flex'}>
                    {selectedPice.index === i ? 
                    <CheckCircleOutline fontSize="small" sx={{color : green[600]}}></CheckCircleOutline>
                    :
                    <RadioButtonUnchecked fontSize="small" sx={{color : green[600]}}></RadioButtonUnchecked>}
                    <Typography variant="h6" marginX={1}>
                        {detailPrice.period}
                    </Typography>
                </Box>
                <Box display={'flex'}>
                    {selectedPice.index === i ?
                    <Typography variant="h4" marginLeft={3} sx={{color : green[600]}}>
                        ${detailPrice.price.us}
                    </Typography>
                    :
                    <Typography variant="h4" marginLeft={3}>
                        ${detailPrice.price.us}
                    </Typography>
                }
                <Typography lineHeight={3.5}>
                    /month
                </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" marginX={3}>
                        {detailPrice.desc}
                    </Typography>
                </Box>
            </Paper>
        )
    })
    return (
        <Container maxWidth={'xl'}>
            <Box display={'flex'} justifyContent={'center'}>
                
                <Box display={'flex'} margin={3}
                flexDirection={'column'}
                sx={{
                    width : {
                        xs : '100%',
                        md : '80vw'
                    }
                }}>
                    <Box
                    margin={3}
                    textAlign={'center'}
                    height={'100px'}
                    >
                        <Typography sx={{fontSize : { xs : 20, md : 30}}}>
                            Get an unlimited LunaticMonster plan
                        </Typography>
                    </Box>
                   <Box
                   width={'100%'}
                   display={'flex'}
                   sx={{
                    flexDirection : {
                        xs : 'column',
                        md : 'row'
                    },
                    height : {
                        xs : '360px',
                        md : '150px'
                    }
                   }}
                   justifyContent={'center'}
                   >
                    {papers}
                    </Box>
                    <Box
                    display={'flex'}
                    justifyContent={'center'}
                    marginY={3}
                    >
                        <Box
                        component={Button}
                        onClick={payment}
                        width={'300px'}
                        height={'50px'}
                        borderRadius={5}
                        className="bg-green-100"
                        sx={{
                            color : 'green',
                            ":hover" : {backgroundColor : green[200]},
                            backgroundColor : green[100]
                        }}
                        >
                            Buy Now
                        </Box>
                    </Box>
                </Box>      
            </Box>  
        </Container>
        
    )
}