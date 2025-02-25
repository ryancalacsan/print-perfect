import * as cheerio from "cheerio"
import { WordPressPost } from "./types"

export async function getFAQPosts(): Promise<WordPressPost[]> {
  const res = await fetch(
    "http://print-perfect.local/wp-json/wp/v2/posts?categories=5&orderby=date&order=asc",
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch FAQ posts")
  }

  const posts = await res.json()

  // Decode HTML entities in titles
  return posts.map((post: WordPressPost) => ({
    ...post,
    title: {
      ...post.title,
      rendered: cheerio.load(post.title.rendered).text(),
    },
  }))
}

// Helper function to parse HTML content into FAQ items
export function parseFAQContent(
  content: string
): { question: string; answer: string }[] {
  const $ = cheerio.load(content)
  const faqs: { question: string; answer: string }[] = []

  // Find all strong tags that contain questions
  $("strong").each((_, el) => {
    const question = $(el).text().trim()
    let answer = ""

    // Get the parent paragraph
    const $parent = $(el).parent()

    if ($parent.length) {
      // Get all text nodes after the strong tag
      const $contents = $parent.contents()
      let foundStrong = false
      let textParts: string[] = []

      $contents.each((_, node) => {
        if (foundStrong) {
          if (node.type === "text") {
            textParts.push(node.data.trim())
          }
        }
        if (node === el) {
          foundStrong = true
        }
      })

      answer = textParts.join(" ").trim()

      // If there's a following list, add it to the answer
      const $nextList = $parent.next("ul, ol")
      if ($nextList.length) {
        const listItems = $nextList.find("li")
        const bulletPoints = listItems
          .map((_, item) => "• " + $(item).text().trim())
          .get()
          .join("\n")
        if (bulletPoints) {
          answer += "\n\n" + bulletPoints
        }
      }
    }

    if (question && answer) {
      faqs.push({ question, answer })
    }
  })

  return faqs
}
