'use client'
import {SessionProvider} from 'next-auth/react';
import { store } from '@/redux/store';
import {ReactNode} from 'react'
import { Provider } from 'react-redux';

export default ({children}: {children: ReactNode}) => {

    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    )
}