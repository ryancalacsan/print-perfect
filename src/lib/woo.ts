export default async function Woo() {
  try {
    console.log("Making WooCommerce API request...")
    const res = await fetch(`${process.env.WC_API_URL}/products`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.DB_WOOCONSUMER_KEY +
            ":" +
            process.env.DB_WOOCONSUMER_SECRET
        ).toString("base64")}`,
      },
    })

    console.log("Response status:", res.status)
    console.log("Response headers:", Object.fromEntries(res.headers.entries()))

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Error response:", errorText)
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      )
    }

    const data = await res.json()
    console.log("Received data:", data)
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}
