"use client"

import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { useState } from "react"

// Types and Schema
const businessCardQuoteSchema = z.object({
  finish: z.enum(["gloss", "matte"]),
  corners: z.enum(["rounded", "square"]),
  quantity: z.number().min(50).max(1000),
  sides: z.enum(["single", "double"]),
})

type BusinessCardQuote = z.infer<typeof businessCardQuoteSchema>

const images = [
  "https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/business4.jpg",
  "https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/business2.jpg",
  "https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/business3.jpg",
  "https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/business5.jpg",
]

const quantityOptions = [
  { quantity: 50, pricePerCard: 0.44, totalPrice: 22.0 },
  { quantity: 100, pricePerCard: 0.43, totalPrice: 43.0 },
  { quantity: 200, pricePerCard: 0.37, totalPrice: 74.0 },
  { quantity: 400, pricePerCard: 0.32, totalPrice: 129.0 },
  { quantity: 600, pricePerCard: 0.27, totalPrice: 163.0 },
  { quantity: 800, pricePerCard: 0.27, totalPrice: 217.0 },
  { quantity: 1000, pricePerCard: 0.25, totalPrice: 250.0 },
]

export default function BusinessCards() {
  const [selectedImage, setSelectedImage] = useState(0)

  const form = useForm<BusinessCardQuote>({
    resolver: zodResolver(businessCardQuoteSchema),
    defaultValues: {
      finish: "gloss",
      corners: "square",
      quantity: 50,
      sides: "single",
    },
  })

  function onSubmit(data: BusinessCardQuote) {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image Gallery */}
        <div className="space-y-4">
          <div className="lg:sticky lg:top-4 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={images[selectedImage]}
                alt="Business Card Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Business Card View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details & Form */}
        <div className="lg:sticky lg:top-4 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Custom Business Cards</h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">234 reviews</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Premium 16pt (400gsm) cardstock</li>
              <li>Standard size: 3.5&quot; x 2&quot;</li>
              <li>Full color printing</li>
              <li>Professional finish options</li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="sides"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Printing Sides</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <FormControl>
                          <div
                            className={`cursor-pointer p-4 border rounded-lg text-center ${
                              field.value === "single"
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => field.onChange("single")}
                          >
                            <div className="font-medium">Single Sided</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Front only
                            </div>
                          </div>
                        </FormControl>
                        <FormControl>
                          <div
                            className={`cursor-pointer p-4 border rounded-lg text-center ${
                              field.value === "double"
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => field.onChange("double")}
                          >
                            <div className="font-medium">Double Sided</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Front & Back
                            </div>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="finish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Finish</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <FormControl>
                          <div
                            className={`cursor-pointer p-4 border rounded-lg text-center ${
                              field.value === "gloss"
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => field.onChange("gloss")}
                          >
                            <div className="font-medium">Gloss</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Shiny finish
                            </div>
                          </div>
                        </FormControl>
                        <FormControl>
                          <div
                            className={`cursor-pointer p-4 border rounded-lg text-center ${
                              field.value === "matte"
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => field.onChange("matte")}
                          >
                            <div className="font-medium">Matte</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Smooth finish
                            </div>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="corners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Corner Style</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <FormControl>
                          <div
                            className={`cursor-pointer p-4 border rounded-lg text-center ${
                              field.value === "square"
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => field.onChange("square")}
                          >
                            <div className="font-medium">Square</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Classic look
                            </div>
                          </div>
                        </FormControl>
                        <FormControl>
                          <div
                            className={`cursor-pointer p-4 border rounded-lg text-center ${
                              field.value === "rounded"
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-400"
                            }`}
                            onClick={() => field.onChange("rounded")}
                          >
                            <div className="font-medium">Rounded</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Modern style
                            </div>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {quantityOptions.map((option) => (
                          <FormControl key={option.quantity}>
                            <div
                              className={`cursor-pointer p-4 border rounded-lg text-center ${
                                field.value === option.quantity
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-gray-400"
                              }`}
                              onClick={() => field.onChange(option.quantity)}
                            >
                              <div className="font-medium">
                                {option.quantity}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                ${option.pricePerCard.toFixed(2)}/card
                              </div>
                              <div className="text-sm font-medium text-primary mt-1">
                                ${option.totalPrice.toFixed(2)} total
                              </div>
                            </div>
                          </FormControl>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Card className="p-6 bg-gray-50">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Printing Sides</span>
                    <span className="font-medium capitalize">
                      {form.watch("sides")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Card Finish</span>
                    <span className="font-medium capitalize">
                      {form.watch("finish")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Corner Style</span>
                    <span className="font-medium capitalize">
                      {form.watch("corners")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Quantity</span>
                    <div className="text-right">
                      <span className="font-medium">
                        {form.watch("quantity")} cards
                      </span>
                      <div className="text-sm text-gray-600">
                        $
                        {quantityOptions
                          .find(
                            (opt) => opt.quantity === form.watch("quantity")
                          )
                          ?.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Button type="submit" className="w-full py-6 text-lg">
                Add to Cart
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
