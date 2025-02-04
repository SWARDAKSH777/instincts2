"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const highlights = [
  {
    image: "/highlight1.jpg",
    stat: "5000+ Participants",
    quote: '"INSTINCTS was an unforgettable experience. Can\'t wait for next year!" - Past Attendee',
  },
  {
    image: "/highlight2.jpg",
    stat: "50+ Events",
    quote: '"The variety of events at INSTINCTS is mind-blowing!" - Event Organizer',
  },
  {
    image: "/highlight3.jpg",
    stat: "100+ Colleges",
    quote: '"INSTINCTS brings together talent from across the country." - College Representative',
  },
]

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % highlights.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h2 className="text-4xl font-bold mb-4 font-poppins">About INSTINCTS</h2>
          <p className="mb-4">
            INSTINCTS is the annual cultural extravaganza that has been igniting creativity and fostering talent for
            over a decade. Born from the passion of students and nurtured by the spirit of innovation, our fest has
            grown to become one of the most anticipated events in the collegiate calendar.
          </p>
          <p className="mb-4">
            Each year, we bring together thousands of participants from across the country, uniting them in a
            celebration of art, culture, and technology. INSTINCTS is more than just a fest; it's a platform where ideas
            collide, friendships form, and memories are crafted.
          </p>
          <p>
            Our mission is simple: to provide a stage where young minds can showcase their talents, push their
            boundaries, and discover the power of their instincts. Join us as we continue to redefine the boundaries of
            what a college fest can be!
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2"
        >
          <div className="relative h-96 w-full">
            <Image
              src={highlights[currentSlide].image || "/placeholder.svg"}
              alt="Past Highlights"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-between">
              <button onClick={prevSlide} className="p-2 bg-black bg-opacity-50 text-white rounded-full">
                <ChevronLeft />
              </button>
              <button onClick={nextSlide} className="p-2 bg-black bg-opacity-50 text-white rounded-full">
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">{highlights[currentSlide].stat}</p>
            <p className="italic mt-2">{highlights[currentSlide].quote}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

