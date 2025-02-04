import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const dummyPosts = [
  { id: 1, username: "@johndoe", content: "Can't wait for INSTINCTS 2024! #Excited", platform: "Twitter" },
  {
    id: 2,
    username: "@janedoe",
    content: "Just registered for the Hackathon! Who else is in? #INSTINCTS2024",
    platform: "Instagram",
  },
  {
    id: 3,
    username: "@techguru",
    content: "Preparing for the Robotics Challenge at INSTINCTS. It's going to be epic!",
    platform: "Twitter",
  },
  {
    id: 4,
    username: "@musiclover",
    content: "Battle of Bands is my favorite event at INSTINCTS. See you there!",
    platform: "Instagram",
  },
  {
    id: 5,
    username: "@dancequeen",
    content: "Rehearsing for the dance competition. INSTINCTS, here we come!",
    platform: "Twitter",
  },
]

const SocialWall = () => {
  const [posts, setPosts] = useState(dummyPosts)

  useEffect(() => {
    // In a real application, you would fetch live social media posts here
    // For now, we'll just use the dummy data
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
            <div>
              <p className="font-bold">{post.username}</p>
              <p className="text-sm text-gray-500">{post.platform}</p>
            </div>
          </div>
          <p>{post.content}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default SocialWall

