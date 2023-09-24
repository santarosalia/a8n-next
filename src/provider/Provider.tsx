'use client'
import {SessionProvider} from 'next-auth/react';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
type Props = {
    children:React.ReactNode;
}

export default ({children}: Props) => {
    // const [queryClient] = useState(() => new QueryClient());
    return (
    // <QueryClientProvider client={queryClient}>
        <SessionProvider>
            {children}
        </SessionProvider>
    // </QueryClientProvider>
    )
}