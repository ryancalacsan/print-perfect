import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Print Perfect
          </Link>

          <div className="flex gap-6">
            <Link href="/business-cards" className="hover:text-blue-600">
              Business Cards
            </Link>
            <Link href="/postcards" className="hover:text-blue-600">
              Postcards
            </Link>
            <Link href="/stationery" className="hover:text-blue-600">
              Stationery
            </Link>
            <Link href="/faq" className="hover:text-blue-600">
              Help & FAQs
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
