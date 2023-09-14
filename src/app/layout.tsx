import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Header from './Header';
import AuthContext from '@/context/AuthContext';

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
      <body className={notoSansKr.className}>
        <AuthContext>
          <Header/>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
