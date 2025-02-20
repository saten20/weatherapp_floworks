import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'Get real-time weather information for any city',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-sky-400 min-h-screen overflow-y-auto`}>
        <div className="sky">
          <div className="clouds">
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
          </div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
        <footer className="absolute bottom-0 w-full py-4 bg-gradient-to-t from-black/10 to-transparent backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-blue-100/80 text-sm sm:text-base font-medium">
                © {new Date().getFullYear()} Weather Dashboard. All rights reserved.
              </p>
              <p className="text-blue-100/80 text-sm sm:text-base font-medium mt-2 sm:mt-0">
                Designed by Satendra Yadav
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}