"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const events = [
  {
    name: "Dance Competition",
    category: "Cultural",
    details: "Show off your moves in our annual dance showdown!",
    image: "/dance.jpg",
    rules: "Solo and group performances allowed. 5 minutes per performance.",
    prizes: "1st: ₹10,000, 2nd: ₹5,000, 3rd: ₹3,000",
    timing: "15th Feb, 2-5 PM",
    venue: "Main Auditorium",
  },
  {
    name: "Hackathon",
    category: "Tech",
    details: "Code your way to victory in our 24-hour hackathon.",
    image: "/hackathon.jpg",
    rules: "Teams of 2-4 members. Bring your own laptops.",
    prizes: "1st: ₹50,000, 2nd: ₹30,000, 3rd: ₹20,000",
    timing: "15th-16th Feb, 9 AM - 9 AM",
    venue: "CS Department",
  },
  {
    name: "Battle of Bands",
    category: "Cultural",
    details: "Rock the stage with your band and win amazing prizes!",
    image: "/band.jpg",
    rules: "15-20 minute set per band. All genres welcome.",
    prizes: "1st: ₹20,000, 2nd: ₹10,000, 3rd: ₹5,000",
    timing: "16th Feb, 6-10 PM",
    venue: "Open Air Theater",
  },
  {
    name: "Robotics Challenge",
    category: "Tech",
    details: "Build and program robots to complete exciting tasks.",
    image: "/robotics.jpg",
    rules: "Teams of 3-5 members. Robot must fit within 30x30x30 cm box.",
    prizes: "1st: ₹30,000, 2nd: ₹20,000, 3rd: ₹10,000",
    timing: "17th Feb, 10 AM - 4 PM",
    venue: "Robotics Lab",
  },
  {
    name: "Debate Tournament",
    category: "Cultural",
    details: "Argue your point and convince the judges in our debate competition.",
    image: "/debate.jpg",
    rules: "Teams of 2. Topics provided 30 minutes before each round.",
    prizes: "1st: ₹15,000, 2nd: ₹10,000, 3rd: ₹5,000",
    timing: "16th Feb, 10 AM - 5 PM",
    venue: "Seminar Hall",
  },
  {
    name: "Esports Tournament",
    category: "Tech",
    details: "Compete in popular video games and become the campus champion.",
    image: "/esports.jpg",
    rules: "Games: CS:GO, DOTA 2, FIFA. Bring your own peripherals.",
    prizes: "1st: ₹25,000, 2nd: ₹15,000, 3rd: ₹10,000",
    timing: "15th-17th Feb, 10 AM - 8 PM daily",
    venue: "Gaming Arena",
  },
  {
    name: "Fashion Show",
    category: "Cultural",
    details: "Strut your stuff on the runway in our glamorous fashion event.",
    image: "/fashion.jpg",
    rules: "Teams of 8-12 members. Theme: Futuristic Fusion.",
    prizes: "1st: ₹30,000, 2nd: ₹20,000, 3rd: ₹10,000",
    timing: "17th Feb, 7-10 PM",
    venue: "Main Stage",
  },
  {
    name: "AI Workshop",
    category: "Tech",
    details: "Learn about artificial intelligence and its applications in this hands-on workshop.",
    image: "/ai.jpg",
    rules: "Limited to 50 participants. Basic programming knowledge required.",
    prizes: "Certificates for all participants",
    timing: "16th Feb, 9 AM - 1 PM",
    venue: "AI Lab",
  },
]

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isGridView, setIsGridView] = useState(true)

  const toggleView = () => setIsGridView(!isGridView)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center font-poppins">Events</h1>
      <div className="mb-4 flex justify-end">
        <button
          onClick={toggleView}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {isGridView ? "Switch to Wheel View" : "Switch to Grid View"}
        </button>
      </div>
      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedEvent(event)}
            >
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-[600px] mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-gray-700"></div>
          {events.map((event, index) => {
            const angle = (index / events.length) * 2 * Math.PI
            const x = Math.cos(angle) * 45 + 50
            const y = Math.sin(angle) * 45 + 50
            return (
              <motion.button
                key={event.name}
                className="absolute w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden"
                style={{ left: `${x}%`, top: `${y}%` }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedEvent(event)}
              >
                <Image src={event.image || "/placeholder.svg"} alt={event.name} layout="fill" objectFit="cover" />
              </motion.button>
            )
          })}
        </div>
      )}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Category: {selectedEvent.category}</p>
              <p className="mb-4">{selectedEvent.details}</p>
              <div className="mb-4">
                <h3 className="font-bold">Rules:</h3>
                <p>{selectedEvent.rules}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold">Prizes:</h3>
                <p>{selectedEvent.prizes}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold">Timing:</h3>
                <p>{selectedEvent.timing}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold">Venue:</h3>
                <p>{selectedEvent.venue}</p>
              </div>
              <Link
                href="/register"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Register for This Event
              </Link>
              <button
                onClick={() => setSelectedEvent(null)}
                className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

