import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">INSTINCTS</h3>
            <p>Where Creativity Meets Chaos</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul>
              {["Home", "About", "Events", "Schedule", "Register", "Sponsors", "Contact"].map((item) => (
                <li key={item} className="mb-2">
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-gray-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">{/* Add social media icons here */}</div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} INSTINCTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

