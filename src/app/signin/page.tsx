'use client';
import { isExistsCrx, signIn, signInCrx } from "@/api/Api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/user";
import { Box, Button, Card, CardContent, Container, InputLabel, TextField } from "@mui/material"
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { decodeJwt } from "../lib/jwt";

export default () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [inputs, setInputs] = useState({
        email : '',
        password : ''
    });
    const {email, password} = inputs;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setInputs({
            ...inputs,
            [id] : value
        });
    }

    const onClickSignIn = async () => {
        const accessToken = await signIn(inputs);
        if (accessToken) {
            const user = JSON.parse(JSON.stringify(decodeJwt(accessToken)));
            dispatch(setUser(user));
            const isExists = await isExistsCrx();
            if (isExists) {
                await signInCrx(user);
            }
            router.back();
        }
    }
    return (
        <Container maxWidth="sm" sx={{height : '100vh', display : 'flex' , alignItems : 'center', justifyContent : 'center'}}>
            <Card>
                <CardContent>
                    <Box>
                        <InputLabel htmlFor="email" size="normal">Email</InputLabel>
                        <TextField id="email" size="small" required value={email} type={"email"} onChange={onChange}></TextField>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <TextField id="password" size="small" required value={password} type={"password"} onChange={onChange}></TextField>
                    </Box>
                    <Box>
                        <Button fullWidth color="inherit" onClick={onClickSignIn}>Signin</Button>
                        <Button fullWidth color="info" onClick={() => router.push('/signup')}>Signup</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
        
            
       
    )
}