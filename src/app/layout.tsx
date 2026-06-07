import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sudip-parajuli.com.np'),
  title: 'Sudip Parajuli — Fullstack Dev & AI Builder',
  description: 'Co-founder of DigiLoop. Building scalable Django backends, Next.js frontends, and AI-powered products from Kathmandu, Nepal.',
  keywords: ['Sudip Parajuli', 'Fullstack Developer', 'Django', 'Next.js', 'DigiLoop', 'Nepal', 'AI'],
  authors: [{ name: 'Sudip Parajuli' }],
  openGraph: {
    title: 'Sudip Parajuli — Fullstack Dev & AI Builder',
    description: 'Co-founder of DigiLoop. Building scalable systems from Kathmandu.',
    url: 'https://sudip-parajuli.com.np',
    images: [{ url: '/hero_frame.png', width: 1280, height: 720, alt: 'Sudip Parajuli' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sudip_parajuli',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
