'use client'
import { Box, Container, List, MenuItem, Typography } from "@mui/material";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default () => {
    const session = useSession();
    const user = session.data?.user;
    return (
        <Box>
            <Typography variant="h5">
                LEVEL {user?.level}
            </Typography>
            
        </Box>
    )
}