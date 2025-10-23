import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Google Cloud Study Jams 25-26 | GDGC APSIT",
  description: "Live leaderboard for Google Cloud Study Jams 2025-26. Track skill badges, arcade games, and participant progress at MLR Institute of Technology.",
  keywords: ["Google Cloud", "Study Jams", "GCCP", "GDGC APSIT", "Leaderboard", "Cloud Skills"],
  authors: [{ name: "GDGC APSIT" }],
  creator: "GDGC APSIT",
  publisher: "GDGC APSIT",
  robots: "index,follow",
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "Google Cloud Study Jams 25-26 | GDGC APSIT",
    description: "Live leaderboard for Google Cloud Study Jams 2025-26. Track skill badges, arcade games, and participant progress.",
    url: "https://cloud-jam-leaderboard-1114088229.asia-south1.run.app",
    siteName: "Cloud Jam APSIT Leaderboard",
    images: [
      {
        url: "https://raw.githubusercontent.com/fenilmodi00/GCCP-Jams/main/public/assets/Screenshot%202023-09-12%20191408.png",
        width: 1200,
        height: 630,
        alt: "Google Cloud Study Jams Leaderboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Google Cloud Study Jams 25-26 | GDGC APSIT",
    description: "Live leaderboard for Google Cloud Study Jams 2025-26. Track skill badges, arcade games, and participant progress.",
    images: ["https://raw.githubusercontent.com/fenilmodi00/GCCP-Jams/main/public/assets/Screenshot%202023-09-12%20191408.png"],
    creator: "@gdgcAPSIT",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <head>
        
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        
      </body>
    </html>
  )
}
