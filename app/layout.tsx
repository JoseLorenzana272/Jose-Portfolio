import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/cursor'

export const metadata: Metadata = {
  title: 'Portfolio - JL',
  description: 'JL',
  generator: 'JL',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="cursor-none">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  )
}