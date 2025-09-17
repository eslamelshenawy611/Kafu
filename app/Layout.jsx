 import './globals.css'
import { Tajawal, Poppins } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: ' One Agency',
  description: 'Leading Digital Marketing Agency in Jordan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${tajawal.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}