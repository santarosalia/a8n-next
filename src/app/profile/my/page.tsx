'use client'
import { Container } from "@mui/material";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default () => {
    const session = useSession();
    const user = session.data?.user;
    return (
        <Container maxWidth='xl'>
            {user?.name}
        </Container>
    )
}