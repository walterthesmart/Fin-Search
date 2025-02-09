import { Navbar } from '@/components/ui/common/Navbar'
import { Sidebar } from '@/components/ui/common/Sidebar'
import './globals.css'
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  display: 'swap',
});


export const metadata = {
  title: 'FinSearch - AI-Powered Financial Research',
  description: 'Financial research tool using AI and real-time market data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={firaCode.className} suppressHydrationWarning={true}>
        <div className="min-h-screen bg-[#0F0F12]">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 ml-64">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}