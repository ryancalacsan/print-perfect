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
    <div className="max-w-screen-md mx-auto px-4 py-12 max-w">
      <h1 className="text-3xl font-bold mb-8">Help & FAQs</h1>
      <h2 className="text-xl font-semibold mb-8">
        We're here to help! If you have any questions, please don't hesitate to
        contact us.
      </h2>
      <p className="mb-8">
        Have a question or need assistance with your order? You’re in the right
        place! Below you’ll find answers to some of our most frequently asked
        questions. If you can’t find what you’re looking for, feel free to reach
        out to our support team at help@printperfect.com, and we’ll be happy to
        help.
      </p>
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
      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-semibold mb-8">Additional Help</h2>
        <p className="mb-8">
          If you still have questions or need further assistance, don’t hesitate
          to reach out. We’re here to make sure your printing experience is
          smooth and successful!
        </p>
      </div>
    </div>
  )
}
