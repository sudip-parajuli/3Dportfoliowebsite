import { profile } from '@/data/portfolio'
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
  title: 'Sudip Parajuli — AI Product Builder & Software Developer',
  description: profile.description,
  keywords: ['Sudip Parajuli', 'Fullstack Developer', 'Django', 'Next.js', 'Techwired Solutions', 'Nepal', 'AI'],
  alternates: { canonical: '/' },
  authors: [{ name: 'Sudip Parajuli' }],
  openGraph: {
    title: 'Sudip Parajuli — AI Product Builder & Software Developer',
    description: profile.description,
    url: 'https://sudip-parajuli.com.np',
    images: [{ url: '/hero_frame.png', width: 1280, height: 720, alt: 'Sudip Parajuli' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Person', name: profile.name,
          url: 'https://sudip-parajuli.com.np/', description: profile.description,
          jobTitle: 'Director · Software and AI Product Builder · Business Growth and Digital Strategy Consultant',
          worksFor: { '@type': 'Organization', name: profile.business, url: 'https://www.techwiredsolutions.com.np/' },
          sameAs: ['https://github.com/sudip-parajuli', 'https://www.linkedin.com/in/sudip-parajuli-8073601a1', 'https://sudip-parajuli.linkypot.com/'],
          alumniOf: [{ '@type': 'CollegeOrUniversity', name: profile.college }, { '@type': 'CollegeOrUniversity', name: profile.university }],
          hasCredential: { '@type': 'EducationalOccupationalCredential', name: profile.education, credentialCategory: 'Bachelor degree' },
        }).replace(/</g, '\\u003c') }} />
        {children}
      </body>
    </html>
  )
}
