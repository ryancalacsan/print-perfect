import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Newsletter Signup */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create your best photo album, ever.
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Get insider photo tips, exclusive offers, new product
              announcements, and more in your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="md:col-span-1"></div>
          {/* Help Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold uppercase mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-black"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/business-orders"
                  className="text-gray-600 hover:text-black"
                >
                  Business Orders
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/order-status"
                  className="text-gray-600 hover:text-black"
                >
                  Order Status
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-black"
                >
                  Shipping Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/materials"
                  className="text-gray-600 hover:text-black"
                >
                  Materials Matter
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-black"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-600 hover:text-black"
                >
                  All Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold uppercase mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/refer" className="text-gray-600 hover:text-black">
                  Refer a Friend
                </Link>
              </li>
              <li>
                <Link
                  href="/ambassador"
                  className="text-gray-600 hover:text-black"
                >
                  Ambassador Program
                </Link>
              </li>
              <li>
                <Link href="/app" className="text-gray-600 hover:text-black">
                  iPhone App
                </Link>
              </li>
              <li>
                <Link
                  href="/instagram"
                  className="text-gray-600 hover:text-black"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="/pinterest"
                  className="text-gray-600 hover:text-black"
                >
                  Pinterest
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2025 Print Perfect. All Rights Reserved
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/terms" className="text-gray-600 hover:text-black">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-600 hover:text-black">
              Site Map
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-black">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
