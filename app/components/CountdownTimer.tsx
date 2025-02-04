"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface CountdownTimerProps {
  targetDate: string
  showTimeUp?: boolean
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, showTimeUp = false }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <motion.div
        key={interval}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mx-2"
      >
        <span className="text-4xl font-bold">{timeLeft[interval]}</span>
        <span className="text-sm uppercase">{interval}</span>
      </motion.div>,
    )
  })

  return (
    <div className="flex flex-col items-center">
      {timerComponents.length ? (
        <div className="flex justify-center items-center">{timerComponents}</div>
      ) : (
        showTimeUp && (
          <>
            <span className="text-4xl font-bold mb-4">Time's up!</span>
            <div className="text-2xl">
              INSTINCTS 2024 is here! Join us for an incredible journey of creativity and innovation.
            </div>
          </>
        )
      )}
      {!timerComponents.length && showTimeUp && (
        <div className="mt-8">
          <Link
            href="/register"
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Register Now
          </Link>
        </div>
      )}
    </div>
  )
}

export default CountdownTimer

