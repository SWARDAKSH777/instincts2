"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const events = [
  "Dance Competition",
  "Hackathon",
  "Battle of Bands",
  "Robotics Challenge",
  "Debate Tournament",
  "Esports Tournament",
  "Fashion Show",
  "AI Workshop",
]

const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    if (error) {
      setError(error.message)
      setProcessing(false)
    } else {
      // Send paymentMethod.id to your server for processing
      // For demo purposes, we'll just simulate a successful payment
      setTimeout(() => {
        onSuccess(paymentMethod.id)
        setProcessing(false)
      }, 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="mb-4" />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  )
}

export default function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    selectedEvents: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEventToggle = (event) => {
    setFormData((prev) => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(event)
        ? prev.selectedEvents.filter((e) => e !== event)
        : [...prev.selectedEvents, event],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handlePaymentSuccess = (paymentMethodId) => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    console.log("Payment method ID:", paymentMethodId)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setStep(4)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center font-poppins">Register for INSTINCTS</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                College
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Select Events</h2>
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event} className="flex items-center">
                  <input
                    type="checkbox"
                    id={event}
                    checked={formData.selectedEvents.includes(event)}
                    onChange={() => handleEventToggle(event)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <label htmlFor={event} className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    {event}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Proceed to Payment
            </button>
          </form>
        )}
        {step === 3 && (
          <Elements stripe={stripePromise}>
            <PaymentForm onSuccess={handlePaymentSuccess} />
          </Elements>
        )}
        {step === 4 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
            <p className="mb-4">Thank you for registering for INSTINCTS. We can't wait to see you there!</p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-bold">Your Fest Pass</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  JSON.stringify(formData),
                )}`}
                alt="QR Code"
                className="mx-auto mt-4"
              />
              <p className="mt-4">Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>College: {formData.college}</p>
              <p>Events: {formData.selectedEvents.join(", ")}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

