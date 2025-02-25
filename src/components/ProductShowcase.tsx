"use client"

import { Product, PRODUCTS } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const CATEGORIES = ["Business Cards", "Postcards", "Stationery"] as const

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<
    (typeof CATEGORIES)[number]
  >(CATEGORIES[0])

  const filteredProducts = PRODUCTS.filter(
    (product) => product.category === activeCategory
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Category Navigation */}
      <nav className="mb-12">
        <ul className="flex justify-center gap-12">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <button
                className={`text-lg relative pb-2 ${
                  activeCategory === category
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={product.link} className="group">
      <div className="aspect-[3/4] relative mb-2 md:mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-base md:text-lg font-medium group-hover:text-primary">
        {product.name}
      </h3>
      <p className="text-sm md:text-base text-gray-600">{product.price}</p>
    </Link>
  )
}
