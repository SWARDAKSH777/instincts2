"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

const scheduleData = {
  "Day 1": [
    { time: "09:00 AM", event: "Opening Ceremony", venue: "Main Auditorium" },
    { time: "10:30 AM", event: "Hackathon Kickoff", venue: "Tech Lab" },
    { time: "02:00 PM", event: "Dance Competition", venue: "Open Air Theater" },
  ],
  "Day 2": [
    { time: "10:00 AM", event: "Debate Tournament", venue: "Seminar Hall" },
    { time: "01:00 PM", event: "Robotics Challenge", venue: "Engineering Block" },
    { time: "04:00 PM", event: "Battle of Bands", venue: "Music Arena" },
  ],
  "Day 3": [
    { time: "11:00 AM", event: "Fashion Show", venue: "Central Quad" },
    { time: "02:00 PM", event: "Esports Finals", venue: "Gaming Zone" },
    { time: "06:00 PM", event: "Closing Ceremony", venue: "Main Auditorium" },
  ],
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Day 1")

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center font-poppins">Event Schedule</h1>
      <div className="flex justify-center mb-8">
        {Object.keys(scheduleData).map((day) => (
          <button
            key={day}
            className={`mx-2 px-4 py-2 rounded ${
              activeDay === day ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="max-w-2xl mx-auto">
        {scheduleData[activeDay].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6 flex items-start"
          >
            <div className="bg-blue-500 text-white rounded-full p-2 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{item.event}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.time}</p>
              <p className="text-gray-600 dark:text-gray-400">{item.venue}</p>
              <button className="mt-2 text-blue-500 hover:underline">Add to Calendar</button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="/schedule.pdf"
          download
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Download Full Schedule (PDF)
        </a>
      </div>
    </div>
  )
}

