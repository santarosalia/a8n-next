import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Provider from '@/provider/Provider';
import Footer from './Footer';
import { css } from '@emotion/react';
import { color } from '@mui/system';
import { colors } from '@mui/material';

const notoSansKr = Noto_Sans_KR({ 
  subsets : ['latin'],
  weight : ['100','400','700','900'] })

export const metadata: Metadata = {
  title: 'Lunatic Monster',
  description: '',
  openGraph : {
    title : 'Lunatic Monster',
    description : '',
    images : '',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
      </head>
      <body className={notoSansKr.className} style={{backgroundColor: 'black'}}>
        <Provider>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
