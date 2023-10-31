'use client';
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/slices/user";
import { Box, Button, Card, CardContent, Container, InputLabel, TextField } from "@mui/material"
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

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

    const signIn = async () => {
        const res = await fetch(`/api/signin`, {
            method : 'POST',
            body : JSON.stringify(inputs)
        });
        const accessToken = await res.json();
        dispatch(setAccessToken(accessToken));
        router.back();
        // router.push('/');
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
                        <Button fullWidth color="inherit" onClick={signIn}>Signin</Button>
                        <Button fullWidth color="info" onClick={() => router.push('/signup')}>Signup</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
        
            
       
    )
}