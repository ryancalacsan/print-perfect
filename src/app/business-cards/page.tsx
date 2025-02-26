import Woo from "@/lib/woo"

export default async function BusinessCards() {
  const products = await Woo()
  console.log(products, "products")

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Business Cards</h1>
      <p>
        Create your perfect business card with our premium printing services.
      </p>
    </div>
  )
}
