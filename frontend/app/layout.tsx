import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zerofalse - Secure Multi-Agent Systems',
  description: 'Advanced security platform for multi-agent AI systems with zero-trust architecture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}