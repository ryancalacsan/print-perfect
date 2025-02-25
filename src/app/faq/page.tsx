import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getFAQPosts, parseFAQContent } from "@/lib/wordpress"

export default async function FAQ() {
  const posts = await getFAQPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Help & FAQs</h1>
      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.id} className="space-y-6">
            <h2 className="text-2xl font-semibold">{post.title.rendered}</h2>
            <Accordion type="single" collapsible>
              {parseFAQContent(post.content.rendered).map((faq, index) => (
                <AccordionItem
                  key={`${post.id}-${index}`}
                  value={`${post.id}-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground whitespace-pre-wrap">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}
