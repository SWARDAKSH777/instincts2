"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import CountdownTimer from "./components/CountdownTimer"
import Image from "next/image"
import { useRef, useState } from "react"
import EventsGrid from "./components/EventsGrid"
import EventsWheel from "./components/EventsWheel"
import SocialWall from "./components/SocialWall"

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const [isGridView, setIsGridView] = useState(true)

  return (
    <div ref={targetRef}>
      <div className="relative h-screen flex items-center justify-center text-white">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold mb-4 font-poppins"
          >
            INSTINCTS
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl mb-8"
          >
            Where Creativity Meets Chaos
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <CountdownTimer targetDate="2024-02-15T00:00:00" showTimeUp={true} />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="/register"
              className="mt-8 inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Grab Your Spot!
            </Link>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Events</h2>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              {isGridView ? "Switch to Wheel View" : "Switch to Grid View"}
            </button>
          </div>
          {isGridView ? <EventsGrid /> : <EventsWheel />}
        </div>
      </section>

      <motion.section style={{ opacity, scale }} className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">INSTINCTS 2023 Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <Image src="/event1.jpg" alt="Event 1" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Hackathon</h3>
                <p>Our 24-hour coding marathon saw incredible innovations and collaborations.</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <Image src="/event2.jpg" alt="Event 2" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Battle of Bands</h3>
                <p>The music arena was set ablaze with electrifying performances from talented bands.</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <Image src="/event3.jpg" alt="Event 3" width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Robotics Showcase</h3>
                <p>Cutting-edge robots and AI systems were on display, pushing the boundaries of technology.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Social Wall</h2>
          <SocialWall />
        </div>
      </section>
    </div>
  )
}

