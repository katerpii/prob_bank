import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JJW Side Project",
  description: "JJW 사이드 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <Box 
            component="main" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh', 
              pt: '64px' // AppBar 높이만큼 상단 패딩
            }}
          >
            {children}
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
