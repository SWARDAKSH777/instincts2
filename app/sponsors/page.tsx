"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const sponsors = [
  { name: "TechCorp", logo: "/techcorp-logo.png", tier: "Title" },
  { name: "InnovateCo", logo: "/innovateco-logo.png", tier: "Gold" },
  { name: "FutureTech", logo: "/futuretech-logo.png", tier: "Gold" },
  { name: "NextGen Systems", logo: "/nextgen-logo.png", tier: "Silver" },
  { name: "ByteWise", logo: "/bytewise-logo.png", tier: "Silver" },
  { name: "CodeCrafters", logo: "/codecrafters-logo.png", tier: "Silver" },
]

export default function Sponsors() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center font-poppins">Our Sponsors</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Title Sponsor</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {sponsors
            .filter((s) => s.tier === "Title")
            .map((sponsor) => (
              <div key={sponsor.name} className="flex items-center justify-between">
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  width={200}
                  height={100}
                  objectFit="contain"
                />
                <div>
                  <h3 className="text-xl font-bold">{sponsor.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Gold Sponsors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsors
            .filter((s) => s.tier === "Gold")
            .map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center"
              >
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  width={150}
                  height={75}
                  objectFit="contain"
                />
              </motion.div>
            ))}
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Silver Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sponsors
            .filter((s) => s.tier === "Silver")
            .map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center"
              >
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  width={100}
                  height={50}
                  objectFit="contain"
                />
              </motion.div>
            ))}
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Become a Sponsor</h2>
        <p className="mb-4">
          Interested in sponsoring INSTINCTS? We'd love to hear from you! Contact us at sponsors@instincts.com
        </p>
        <a
          href="mailto:sponsors@instincts.com"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}

