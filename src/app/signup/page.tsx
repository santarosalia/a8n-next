'use client'
import { Button } from "@mui/base";
import { SentimentSatisfiedAlt } from "@mui/icons-material";
import { Card, CardContent, Container, InputLabel, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
export default () => {
    const router = useRouter();
    const [inputs, setInputs] = useState({
        email : '',
        name : '',
        password : ''
    });
    const [inputsVerify, setInputsVerify] = useState({
        name : false,
        email : false,
        password : false,
    });
    const {email, password, name} = inputs;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        switch (id) {
            case 'name' : {
                const result = value !== '';
                setInputsVerify({
                    ...inputsVerify,
                    [id] : result
                });
                break;
            }
            case 'email': {
                const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                const result = reg.test(value);
                setInputsVerify({
                    ...inputsVerify,
                    [id] : result
                });
                break;
            }
            case 'password' : {
                const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
                const result = reg.test(value);
                setInputsVerify({
                    ...inputsVerify,
                    [id] : result
                });
                break;
            }
        }
        setInputs({
            ...inputs,
            [id] : value
        });
    }
    const onClickSignUp = async () => {
        if (!inputsVerify.email || !inputsVerify.name || !inputsVerify.password) return;

        const res = await fetch('api/signup', {
            method : 'POST',
            body : JSON.stringify(inputs),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        if (res.ok) {
            router.push('/');
        }
    }
    return (
        <Container maxWidth="sm" sx={{height : '100vh', display : 'flex' , alignItems : 'center', justifyContent : 'center'}}>
            <Card>
                <CardContent>
                <Box height={'300px'} width={'300px'}>
                    <InputLabel htmlFor="name" size="normal">이름</InputLabel>
                    <TextField id="name" size="small" fullWidth required value={name} type={"email"} onChange={onChange}></TextField>
                    <InputLabel htmlFor="email" size="normal" sx={{mt : 1}}>이메일 {inputsVerify.email ? <SentimentSatisfiedAlt color="success" fontSize="small"/> : null}</InputLabel>
                    <TextField id="email" size="small" fullWidth required value={email} type={"email"} onChange={onChange}></TextField>
                    <InputLabel htmlFor="password" size="normal" sx={{mt : 1}}>비밀번호 {inputsVerify.password ? <SentimentSatisfiedAlt color="success" fontSize="small"/> : <Typography variant="caption">영문 + 숫자 8자리 이상</Typography>}</InputLabel>
                    <TextField id="password" size="small" fullWidth required value={password} type={"password"} onChange={onChange}></TextField>
                </Box>
                <Box>
                    <Button onClick={onClickSignUp}>계정 생성</Button>
                </Box>
                </CardContent>
            </Card>
        </Container>
    )
}