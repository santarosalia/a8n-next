import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Header from './Header';
import Provider from '@/provider/Provider';

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
        <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      </head>
      <body className={notoSansKr.className}>
        <Provider>
          <Header/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
