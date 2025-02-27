"use client"

import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import React from "react"

type PaperWeightOption = {
  id: string
  label: string
  value: string
}

const PAPER_WEIGHT_OPTIONS: PaperWeightOption[] = [
  { id: "70lb-text-gloss", label: "70lb Text Gloss", value: "70lb-gloss" },
  { id: "70lb-text-matte", label: "70lb Text Matte", value: "70lb-matte" },
  { id: "80lb-text-gloss", label: "80lb Text Gloss", value: "80lb-gloss" },
  { id: "80lb-text-matte", label: "80lb Text Matte", value: "80lb-matte" },
  { id: "100lb-text-gloss", label: "100lb Text Gloss", value: "100lb-gloss" },
  { id: "100lb-text-matte", label: "100lb Text Matte", value: "100lb-matte" },
  {
    id: "80lb-cover-gloss",
    label: "80lb Cover Gloss",
    value: "80lb-cover-gloss",
  },
  {
    id: "80lb-cover-matte",
    label: "80lb Cover Matte",
    value: "80lb-cover-matte",
  },
  {
    id: "100lb-cover-gloss",
    label: "100lb Cover Gloss",
    value: "100lb-cover-gloss",
  },
  {
    id: "100lb-cover-matte",
    label: "100lb Cover Matte",
    value: "100lb-cover-matte",
  },
  { id: "10pt-c2s", label: "10pt C2S", value: "10pt-c2s" },
  { id: "12pt-c2s", label: "12pt C2S", value: "12pt-c2s" },
  { id: "14pt-c1s", label: "14pt C1S", value: "14pt-c1s" },
  { id: "14pt-c2s", label: "14pt C2S", value: "14pt-c2s" },
]

const PAPER_WEIGHT_VALUES = PAPER_WEIGHT_OPTIONS.map((opt) => opt.value) as [
  string,
  ...string[]
]

// Types and Schema
const bookQuoteSchema = z.object({
  bindingType: z.enum(["saddle", "perfect"]),
  pageCount: z
    .number()
    .min(4)
    .max(800)
    .refine(
      (val) => {
        return (
          (val >= 4 && val <= 48) || // Saddle stitch range
          (val >= 32 && val <= 800) // Perfect binding range
        )
      },
      {
        message: "Page count must be valid for the selected binding type",
      }
    ),
  size: z.enum([
    "5.5 in x 8.5 in",
    "6 in x 9 in",
    "6.625 in x 10.25 in",
    "8.5 in x 5.5 in",
    "8.5 in x 11 in",
    "9 in x 6 in",
  ]),
  quantity: z.number().min(5).max(500),
  coverMaterial: z.enum(["coated", "uncoated"]),
  coverPaperWeight: z.enum(PAPER_WEIGHT_VALUES),
  coverFinish: z.enum(["matte", "gloss"]),
  insideMaterial: z.enum(["full-color", "black-white"]),
  insidePaperWeight: z.enum(PAPER_WEIGHT_VALUES),
})

type BookQuote = z.infer<typeof bookQuoteSchema>

const steps = [
  {
    id: 1,
    name: "Binding",
    description:
      "Choose your book's binding method. This affects the minimum and maximum page count.",
  },
  {
    id: 2,
    name: "Pages",
    description: "Set the number of pages for your book.",
  },
  {
    id: 3,
    name: "Size",
    description:
      "Select the physical dimensions of your book. This affects the final cost.",
  },
  {
    id: 4,
    name: "Cover",
    description:
      "Choose your cover options including material, weight, and finish.",
  },
  {
    id: 5,
    name: "Interior",
    description:
      "Select options for the inside pages including color and paper weight.",
  },
  {
    id: 6,
    name: "Quantity",
    description:
      "Choose how many books to print (minimum 5). Orders over 100 receive a 5% discount.",
  },
  {
    id: 7,
    name: "Quote",
    description: "Review your final quote and book specifications.",
  },
] as const

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [maxVisitedStep, setMaxVisitedStep] = useState(1)
  const [quote, setQuote] = useState<Partial<BookQuote>>({})

  const form = useForm<BookQuote>({
    resolver: zodResolver(bookQuoteSchema),
    defaultValues: {
      bindingType: "saddle",
      pageCount: 4,
      size: "5.5 in x 8.5 in",
      quantity: 5,
      coverMaterial: "coated",
      coverPaperWeight: "70lb-gloss",
      coverFinish: "matte",
      insideMaterial: "black-white",
      insidePaperWeight: "70lb-gloss",
    },
    mode: "onChange", // Enable real-time validation
  })

  // Watch for binding type changes to update page count validation
  const bindingType = form.watch("bindingType")
  const pageCount = form.watch("pageCount")

  // Get min/max page counts based on binding type
  const getPageLimits = (type: BookQuote["bindingType"]) => {
    return type === "saddle" ? { min: 4, max: 48 } : { min: 32, max: 800 }
  }

  const { min: minPages, max: maxPages } = getPageLimits(bindingType)

  // Update page count when binding type changes
  React.useEffect(() => {
    const currentCount = form.getValues("pageCount")
    if (currentCount < minPages) {
      form.setValue("pageCount", minPages)
    } else if (currentCount > maxPages) {
      form.setValue("pageCount", maxPages)
    }
  }, [bindingType])

  const calculatePrice = (
    quote: BookQuote
  ): { perBook: number; total: number } => {
    let basePrice = quote.bindingType === "saddle" ? 3.0 : 5.0

    const sizeMultipliers: Record<BookQuote["size"], number> = {
      "5.5 in x 8.5 in": 1.0,
      "6 in x 9 in": 1.1,
      "6.625 in x 10.25 in": 1.2,
      "8.5 in x 5.5 in": 1.0,
      "8.5 in x 11 in": 1.3,
      "9 in x 6 in": 1.1,
    }

    basePrice += quote.coverMaterial === "coated" ? 0.5 : 0
    basePrice += quote.coverFinish === "matte" ? 0.5 : 0.75
    const perPageCost = quote.insideMaterial === "full-color" ? 0.15 : 0.08

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

    if (quote.quantity > 100) {
      total *= 0.95
      perBook = total / quote.quantity
    }

    return {
      perBook: Number(perBook.toFixed(2)),
      total: Number(total.toFixed(2)),
    }
  }

  const onSubmit = (data: BookQuote) => {
    setQuote(data)
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      setMaxVisitedStep(Math.max(maxVisitedStep, currentStep + 1))
    }
  }

  const goToStep = (step: number) => {
    if (step <= maxVisitedStep) {
      setCurrentStep(step)
    }
  }

  const renderStepContent = () => {
    const currentStepData = steps[currentStep - 1]

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{currentStepData.name}</h2>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        {currentStep === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="bindingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Binding Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select binding type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="saddle">Saddle Stitching</SelectItem>
                      <SelectItem value="perfect">Perfect Binding</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">
                    {bindingType === "saddle"
                      ? "Suitable for 4-48 pages. Best for magazines, catalogs, and thin books."
                      : "Suitable for 32-800 pages. Professional finish for books and manuals."}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Count</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min={minPages}
                        max={maxPages}
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || minPages
                          field.onChange(
                            Math.min(maxPages, Math.max(minPages, value))
                          )
                        }}
                      />
                      <span className="text-sm text-gray-600">pages</span>
                    </div>
                  </FormControl>
                  <p className="text-sm text-gray-600 mt-1">
                    {`Must be between ${minPages} and ${maxPages} pages for ${
                      bindingType === "saddle"
                        ? "saddle stitching"
                        : "perfect binding"
                    }`}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select book size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5.5 in x 8.5 in">
                        5.5 in x 8.5 in
                      </SelectItem>
                      <SelectItem value="6 in x 9 in">6 in x 9 in</SelectItem>
                      <SelectItem value="6.625 in x 10.25 in">
                        6.625 in x 10.25 in (Modern Comic)
                      </SelectItem>
                      <SelectItem value="8.5 in x 5.5 in">
                        8.5 in x 5.5 in (Landscape)
                      </SelectItem>
                      <SelectItem value="8.5 in x 11 in">
                        8.5 in x 11 in
                      </SelectItem>
                      <SelectItem value="9 in x 6 in">
                        9 in x 6 in (Landscape)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="coverMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Material</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cover material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="coated">Coated Papers</SelectItem>
                      <SelectItem value="uncoated">Uncoated Papers</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverPaperWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Paper Weight</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select paper weight" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAPER_WEIGHT_OPTIONS.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverFinish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Finish</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cover finish" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="matte">Matte</SelectItem>
                      <SelectItem value="gloss">Gloss</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="insideMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interior Pages</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interior type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-color">Full Color</SelectItem>
                      <SelectItem value="black-white">
                        Black and White
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insidePaperWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interior Paper Weight</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select paper weight" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAPER_WEIGHT_OPTIONS.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={5}
                      max={500}
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          Math.min(
                            500,
                            Math.max(5, parseInt(e.target.value) || 5)
                          )
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Book Specifications</h3>
                <dl className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Binding Type</dt>
                    <dd className="font-medium capitalize">
                      {form.getValues("bindingType")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Page Count</dt>
                    <dd className="font-medium">
                      {form.getValues("pageCount")} pages
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Size</dt>
                    <dd className="font-medium">{form.getValues("size")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Quantity</dt>
                    <dd className="font-medium">
                      {form.getValues("quantity")} books
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Cover Material</dt>
                    <dd className="font-medium capitalize">
                      {form.getValues("coverMaterial")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Cover Paper Weight</dt>
                    <dd className="font-medium">
                      {
                        PAPER_WEIGHT_OPTIONS.find(
                          (opt) =>
                            opt.value === form.getValues("coverPaperWeight")
                        )?.label
                      }
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Cover Finish</dt>
                    <dd className="font-medium capitalize">
                      {form.getValues("coverFinish")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Interior Pages</dt>
                    <dd className="font-medium capitalize">
                      {form.getValues("insideMaterial").replace("-", " ")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Interior Paper Weight</dt>
                    <dd className="font-medium">
                      {
                        PAPER_WEIGHT_OPTIONS.find(
                          (opt) =>
                            opt.value === form.getValues("insidePaperWeight")
                        )?.label
                      }
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Quote Summary</h3>
                <dl className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Per Book</dt>
                    <dd className="font-semibold">
                      ${calculatePrice(form.getValues()).perBook.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Total Price</dt>
                    <dd className="font-semibold">
                      ${calculatePrice(form.getValues()).total.toFixed(2)}
                    </dd>
                  </div>
                  {form.getValues("quantity") > 100 && (
                    <div className="text-sm text-green-600">
                      5% bulk discount applied!
                    </div>
                  )}
                </dl>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <Button type="button" className="w-full max-w-sm">
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Custom Book Calculator</h1>

      {/* Progress Navigation */}
      <div className="mb-8">
        <div className="flex justify-around mb-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => goToStep(step.id)}
              className={`
                relative px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  step.id <= maxVisitedStep
                    ? step.id === currentStep
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                    : "text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <span className="hidden md:inline">{step.name}</span>
              <span className="md:hidden">{step.id}</span>
            </button>
          ))}
        </div>
        <div className="relative pt-2 pb-8">
          <Progress
            value={(currentStep / steps.length) * 100}
            className="h-2"
          />
          <div className="absolute bottom-0 left-0 right-0 flex">
            {steps.map((step, index) => (
              <div
                key={`step-${step.id}`}
                className={`
                  flex-1 flex items-center justify-center
                  ${index === 0 ? "justify-start" : ""}
                  ${index === steps.length - 1 ? "justify-end" : ""}
                `}
              >
                <div
                  className={`
                    flex items-center justify-center w-6 h-6
                    text-xs font-medium rounded-full
                    ${
                      step.id <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                >
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="min-h-[400px] flex flex-col">
              <div className="flex-1">{renderStepContent()}</div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length && (
                <Button type="submit" className="ml-auto">
                  {currentStep === steps.length - 1 ? "Get Quote" : "Next"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
