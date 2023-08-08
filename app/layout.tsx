
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './components/Providers'
import AppBar from './components/AppBar'
import { useSession } from 'next-auth/react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sskru',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
           <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
