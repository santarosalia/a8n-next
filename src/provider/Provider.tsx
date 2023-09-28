'use client'
import {SessionProvider} from 'next-auth/react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { useState } from 'react';
type Props = {
    children:React.ReactNode;
}

export default ({children}: Props) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
    // <QueryClientProvider client={queryClient}>
        <SessionProvider>
            <Provider store={store}>
               {children}
            </Provider>
        </SessionProvider>
    // </QueryClientProvider>
    )
}