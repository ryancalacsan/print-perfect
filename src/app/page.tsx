import Image from "next/image"
import Link from "next/link"
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa"
import ProductShowcase from "@/components/ProductShowcase"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Main Grid */}
      <div className="flex flex-col gap-6 pb-8">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large Image - 75% width */}
          <div className="md:col-span-3 relative">
            <Link
              href="/stationery"
              className="block relative h-[400px] md:h-[500px]"
            >
              <Image
                src="https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/station.jpg"
                alt="Stationery collection"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute w-full bottom-6 flex justify-center md:justify-end md:right-6">
                <button className="bg-white hover:bg-black hover:text-white transition-colors px-8 py-3 rounded-sm">
                  20% OFF STATIONERY
                </button>
              </div>
            </Link>
          </div>

          {/* Second Image - 25% width */}
          <div className="relative">
            <Link
              href="/postcards"
              className="block relative h-[400px] md:h-[500px]"
            >
              <Image
                src="https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/post5-scaled.jpg"
                alt="Postcards"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-6 w-full flex justify-center">
                <button className="bg-white hover:bg-black hover:text-white transition-colors px-8 py-3 rounded-sm">
                  SHOP POSTCARDS
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Second Row - Three Equal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Cards */}
          <div className="relative">
            <Link
              href="/business-cards"
              className="block relative h-[300px] md:h-[400px]"
            >
              <Image
                src="https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/business3.jpg"
                alt="Business Cards"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-6 w-full flex justify-center">
                <button className="bg-white hover:bg-black hover:text-white transition-colors px-8 py-3 rounded-sm">
                  SHOP BUSINESS CARDS
                </button>
              </div>
            </Link>
          </div>

          {/* More Stationery */}
          <div className="relative">
            <Link
              href="/stationery"
              className="block relative h-[300px] md:h-[400px]"
            >
              <Image
                src="https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/statation2.jpg"
                alt="Premium Stationery"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-6 w-full flex justify-center">
                <button className="bg-white hover:bg-black hover:text-white transition-colors px-8 py-3 rounded-sm">
                  SHOP STATIONERY
                </button>
              </div>
            </Link>
          </div>

          {/* More Postcards */}
          <div className="relative">
            <Link
              href="/postcards"
              className="block relative h-[300px] md:h-[400px]"
            >
              <Image
                src="https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/post2.jpg"
                alt="Postcard Collection"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-6 w-full flex justify-center">
                <button className="bg-white hover:bg-black hover:text-white transition-colors px-8 py-3 rounded-sm">
                  SHOP POSTCARDS
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-2xl font-semibold">Lets Connect!</p>
        <p className="text-lg">To be inspired - and to inpire us, too.</p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/print_perfect_co/">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.facebook.com/printperfectco/">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://twitter.com/printperfectco/">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://www.youtube.com/channel/UC_9-kyTW8ZkZNDHQJ6FgpwQ">
            <FaYoutube className="text-2xl" />
          </a>
          <a href="https://www.pinterest.com/printperfectco/">
            <FaPinterest className="text-2xl" />
          </a>
        </div>
      </div>
      <ProductShowcase />

      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" p-4">
            <blockquote className="italic text-2xl pb-4">
              &quot;Superb product and customer service!&quot;
            </blockquote>
            <p className="text-sm">Jo Mulligan</p>
            <p className="text-sm">Atlanta, GA</p>
          </div>

          <div className=" p-4">
            <blockquote className="italic text-2xl pb-4">
              &quot;Amazing quality and care! I love all your products!&quot;
            </blockquote>
            <p className="text-sm">Jo Mulligan</p>
            <p className="text-sm">Atlanta, GA</p>
          </div>

          <div className=" p-4">
            <blockquote className="italic text-2xl pb-4">
              &quot;Super quick turnaround and great customer service!&quot;
            </blockquote>
            <p className="text-sm">Jo Mulligan</p>
            <p className="text-sm">Atlanta, GA</p>
          </div>
        </div>
      </div>

      <div className="text-center flex flex-col justify-center items-center bg-[url('https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/paper-scaled.jpg')] bg-cover bg-center h-64 md:bg-[url('https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/paper-scaled.jpg')]">
        <h2 className="text-black text-2xl">Order a Sample Pack</h2>
        <p className="text-black p-4">
          Order a sample pack to see our quality for yourself.
        </p>
        <button className="bg-black text-white px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors">
          ORDER A SAMPLE PACK
        </button>
      </div>
    </div>
  )
}
