"use client"

import { useState } from "react"

// Types
type BindingType = "saddle" | "perfect"
type Size = "5.5x8.5" | "6x9" | "6.625x10.25" | "8.5x5.5" | "8.5x11" | "9x6"
type CoverMaterial = "coated" | "uncoated"
type PaperWeight =
  | "70lb-gloss"
  | "70lb-matte"
  | "80lb-gloss"
  | "80lb-matte"
  | "100lb-gloss"
  | "100lb-matte"
  | "80lb-cover-gloss"
  | "80lb-cover-matte"
  | "100lb-cover-gloss"
  | "100lb-cover-matte"
  | "10pt-c2s"
  | "12pt-c2s"
  | "14pt-c1s"
  | "14pt-c2s"
type CoverFinish = "matte" | "gloss"
type InsideMaterial = "full-color" | "black-white"

interface BookQuote {
  bindingType: BindingType
  size: Size
  quantity: number
  coverMaterial: CoverMaterial
  coverPaperWeight: PaperWeight
  coverFinish: CoverFinish
  insideMaterial: InsideMaterial
  insidePaperWeight: PaperWeight
  pageCount: number
}

export default function Calculator() {
  const [quote, setQuote] = useState<BookQuote>({
    bindingType: "saddle",
    size: "5.5x8.5",
    quantity: 5,
    coverMaterial: "coated",
    coverPaperWeight: "70lb-gloss",
    coverFinish: "matte",
    insideMaterial: "black-white",
    insidePaperWeight: "70lb-gloss",
    pageCount: 4,
  })

  const calculatePrice = (
    quote: BookQuote
  ): { perBook: number; total: number } => {
    let basePrice = quote.bindingType === "saddle" ? 3.0 : 5.0

    // Size multiplier
    const sizeMultipliers: Record<Size, number> = {
      "5.5x8.5": 1.0,
      "6x9": 1.1,
      "6.625x10.25": 1.2,
      "8.5x5.5": 1.0,
      "8.5x11": 1.3,
      "9x6": 1.1,
    }

    // Cover material and weight calculations
    basePrice += quote.coverMaterial === "coated" ? 0.5 : 0

    // Cover finish
    basePrice += quote.coverFinish === "matte" ? 0.5 : 0.75

    // Inside pages calculation
    const perPageCost = quote.insideMaterial === "full-color" ? 0.15 : 0.08

    // Paper weight multiplier
    let paperWeightMultiplier = 1.0
    if (quote.insidePaperWeight.includes("80lb")) paperWeightMultiplier = 1.2
    if (quote.insidePaperWeight.includes("100lb")) paperWeightMultiplier = 1.4
    if (quote.insidePaperWeight.includes("pt")) paperWeightMultiplier = 1.6

    const insidePagesCost =
      quote.pageCount *
      perPageCost *
      paperWeightMultiplier *
      sizeMultipliers[quote.size]

    let perBook = basePrice + insidePagesCost
    let total = perBook * quote.quantity

    // Quantity discount
    if (quote.quantity > 100) {
      total *= 0.95 // 5% discount
      perBook = total / quote.quantity
    }

    return {
      perBook: Number(perBook.toFixed(2)),
      total: Number(total.toFixed(2)),
    }
  }

  const handleChange = (field: keyof BookQuote, value: any) => {
    setQuote((prev) => {
      const newQuote = { ...prev, [field]: value }

      // Validate page count based on binding type
      if (field === "bindingType" || field === "pageCount") {
        const pageCount = Number(newQuote.pageCount)
        if (
          newQuote.bindingType === "saddle" &&
          (pageCount < 4 || pageCount > 48)
        ) {
          newQuote.pageCount =
            field === "bindingType" ? 4 : pageCount < 4 ? 4 : 48
        } else if (
          newQuote.bindingType === "perfect" &&
          (pageCount < 32 || pageCount > 800)
        ) {
          newQuote.pageCount =
            field === "bindingType" ? 32 : pageCount < 32 ? 32 : 800
        }
      }

      return newQuote
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book Printing Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Binding Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Binding Type
            </label>
            <select
              value={quote.bindingType}
              onChange={(e) => handleChange("bindingType", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="saddle">Saddle Stitching (4-48 pages)</option>
              <option value="perfect">Perfect Binding (32-800 pages)</option>
            </select>
          </div>

          {/* Page Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Count
            </label>
            <input
              type="number"
              min={quote.bindingType === "saddle" ? 4 : 32}
              max={quote.bindingType === "saddle" ? 48 : 800}
              value={quote.pageCount}
              onChange={(e) =>
                handleChange("pageCount", parseInt(e.target.value) || 4)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              {quote.bindingType === "saddle" ? "4-48 pages" : "32-800 pages"}
            </p>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              value={quote.size}
              onChange={(e) => handleChange("size", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="5.5x8.5">5.5" x 8.5"</option>
              <option value="6x9">6" x 9"</option>
              <option value="6.625x10.25">
                6.625" x 10.25" (Modern Comic)
              </option>
              <option value="8.5x5.5">8.5" x 5.5" (Landscape)</option>
              <option value="8.5x11">8.5" x 11"</option>
              <option value="9x6">9" x 6" (Landscape)</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="5"
              max="500"
              value={quote.quantity}
              onChange={(e) =>
                handleChange(
                  "quantity",
                  Math.min(500, Math.max(5, parseInt(e.target.value) || 5))
                )
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Cover Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Material
            </label>
            <select
              value={quote.coverMaterial}
              onChange={(e) => handleChange("coverMaterial", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="coated">Coated Papers</option>
              <option value="uncoated">Uncoated Papers</option>
            </select>
          </div>

          {/* Cover Paper Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Paper Weight
            </label>
            <select
              value={quote.coverPaperWeight}
              onChange={(e) => handleChange("coverPaperWeight", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="70lb-gloss">70lb Text Gloss</option>
              <option value="70lb-matte">70lb Text Matte</option>
              <option value="80lb-gloss">80lb Text Gloss</option>
              <option value="80lb-matte">80lb Text Matte</option>
              <option value="100lb-gloss">100lb Text Gloss</option>
              <option value="100lb-matte">100lb Text Matte</option>
              <option value="80lb-cover-gloss">80lb Cover Gloss</option>
              <option value="80lb-cover-matte">80lb Cover Matte</option>
              <option value="100lb-cover-gloss">100lb Cover Gloss</option>
              <option value="100lb-cover-matte">100lb Cover Matte</option>
              <option value="10pt-c2s">10pt C2S</option>
              <option value="12pt-c2s">12pt C2S</option>
              <option value="14pt-c1s">14pt C1S</option>
              <option value="14pt-c2s">14pt C2S</option>
            </select>
          </div>

          {/* Cover Finish */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Finish
            </label>
            <select
              value={quote.coverFinish}
              onChange={(e) => handleChange("coverFinish", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="matte">Matte</option>
              <option value="gloss">Gloss</option>
            </select>
          </div>

          {/* Inside Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inside Material
            </label>
            <select
              value={quote.insideMaterial}
              onChange={(e) => handleChange("insideMaterial", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="full-color">Full Color</option>
              <option value="black-white">Black and White</option>
            </select>
          </div>

          {/* Inside Paper Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inside Paper Weight
            </label>
            <select
              value={quote.insidePaperWeight}
              onChange={(e) =>
                handleChange("insidePaperWeight", e.target.value)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="70lb-gloss">70lb Text Gloss</option>
              <option value="70lb-matte">70lb Text Matte</option>
              <option value="80lb-gloss">80lb Text Gloss</option>
              <option value="80lb-matte">80lb Text Matte</option>
              <option value="100lb-gloss">100lb Text Gloss</option>
              <option value="100lb-matte">100lb Text Matte</option>
              <option value="80lb-cover-gloss">80lb Cover Gloss</option>
              <option value="80lb-cover-matte">80lb Cover Matte</option>
              <option value="100lb-cover-gloss">100lb Cover Gloss</option>
              <option value="100lb-cover-matte">100lb Cover Matte</option>
              <option value="10pt-c2s">10pt C2S</option>
              <option value="12pt-c2s">12pt C2S</option>
              <option value="14pt-c1s">14pt C1S</option>
              <option value="14pt-c2s">14pt C2S</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Price Quote</h2>
          <div className="space-y-2">
            <p className="text-lg">
              Per Book:{" "}
              <span className="font-semibold">
                ${calculatePrice(quote).perBook.toFixed(2)}
              </span>
            </p>
            <p className="text-lg">
              Total Price:{" "}
              <span className="font-semibold">
                ${calculatePrice(quote).total.toFixed(2)}
              </span>
            </p>
            {quote.quantity > 100 && (
              <p className="text-sm text-green-600">
                5% bulk discount applied!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
