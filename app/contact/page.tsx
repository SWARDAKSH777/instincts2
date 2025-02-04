"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Linkedin, MessageCircle } from "lucide-react"
import { sendEmail } from "@/lib/email"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await sendEmail({
        to: "info@instincts.com",
        subject: `New message from ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      })
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Failed to send email:", error)
      setSubmitStatus("error")
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center font-poppins">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submitStatus === "success" && (
              <p className="mt-4 text-green-500">Your message has been sent successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="mt-4 text-red-500">There was an error sending your message. Please try again later.</p>
            )}
          </form>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="https://instagram.com/instincts2024"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-green-500"
            >
              <MessageCircle size={24} />
            </a>
            <a
              href="https://linkedin.com/company/instincts2024"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:w-1/2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-2 text-blue-500" />
                <p>123 University Ave, City, State 12345</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-blue-500" />
                <p>+1 (123) 456-7890</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-blue-500" />
                <p>info@instincts.com</p>
              </div>
            </div>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2167046557!2d-73.98823668459471!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1621538241539!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <summary className="font-semibold cursor-pointer">How do I reach the venue?</summary>
                <p className="mt-2">
                  Our venue is easily accessible by public transport. The nearest metro station is University Station,
                  and several bus lines stop nearby. If you're driving, paid parking is available on campus.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <summary className="font-semibold cursor-pointer">What should I bring to the event?</summary>
                <p className="mt-2">
                  Don't forget to bring your student ID, a valid government-issued photo ID, and your registration
                  confirmation. For specific events, additional materials may be required - check the event details for
                  more information.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <summary className="font-semibold cursor-pointer">Is food provided during the event?</summary>
                <p className="mt-2">
                  Yes, we provide meals and refreshments throughout the event. If you have any dietary restrictions,
                  please let us know in advance so we can accommodate your needs.
                </p>
              </details>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

