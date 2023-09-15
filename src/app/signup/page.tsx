'use client'
import { Button } from "@mui/base";
import { Card, CardContent, Container, InputLabel, TextField } from "@mui/material"
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
    const {email, password, name} = inputs;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setInputs({
            ...inputs,
            [id] : value
        });
    }
    const onClickSignUp = async () => {
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
        <Container maxWidth="sm">
            <Card>
                <CardContent>
                <Box>
                    <InputLabel htmlFor="name" size="normal">이름</InputLabel>
                    <TextField id="name" size="small" required value={name} type={"email"} onChange={onChange}></TextField>
                    <InputLabel htmlFor="email" size="normal">이메일</InputLabel>
                    <TextField id="email" size="small" required value={email} type={"email"} onChange={onChange}></TextField>
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <TextField id="password" size="small" required value={password} type={"password"} onChange={onChange}></TextField>
                </Box>
                <Box>
                    <Button onClick={onClickSignUp}>회원가입</Button>
                </Box>
                </CardContent>
            </Card>
        </Container>
    )
}