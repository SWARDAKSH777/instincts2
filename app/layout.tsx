"use client"

import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ThemeProvider } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-poppins" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ".loading-screen",
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    )
      .fromTo(
        ".loading-text",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
        },
      )
      .to(".loading-logo", {
        scale: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      })
      .to(".loading-screen", {
        yPercent: -100,
        opacity: 0,
        delay: 1,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setIsLoading(false),
      })
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {isLoading ? (
            <div className="loading-screen fixed inset-0 bg-gradient-to-b from-blue-500 to-purple-600 z-50 flex flex-col items-center justify-center">
              <div className="loading-logo text-white text-6xl font-bold mb-4">INSTINCTS</div>
              <div className="loading-text text-white text-2xl">Where Creativity Meets Chaos</div>
            </div>
          ) : (
            <>
              <Navbar />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.main>
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}

