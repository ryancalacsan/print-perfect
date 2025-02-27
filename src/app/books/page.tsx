import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Books() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className=" text-primary text-center py-6">
        <h1 className="text-3xl font-bold">Custom Book Printing Services</h1>
      </header>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl text-gray-800 mt-6">
            Bring Your Ideas to Life with High-Quality Custom Book Printing
          </h2>
          <p className="mt-4 text-gray-700">
            At Print Perfect, we understand the value of creating a book that’s
            as unique as your story. Whether you're an author, a business
            professional, or an artist, our custom book printing services allow
            you to transform your vision into a tangible, beautifully crafted
            product. From hardcover to paperback, black-and-white to full-color,
            we’ve got the tools and expertise to meet your needs.
          </p>
        </section>
        <div className="text-center flex flex-col justify-center items-center bg-[url('https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/paper-scaled.jpg')] bg-cover bg-center h-64 md:bg-[url('https://wordpress-1420028-5294304.cloudwaysapps.com/wp-content/uploads/2025/02/paper-scaled.jpg')]">
          <h2 className="text-black text-2xl">Custom Book Calculator</h2>
          <p className="text-black p-4">
            See what your custom book pricing would be.
          </p>
          <Link href="/books/calculator">
            <button className="bg-black text-white px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors">
              Get an Instant Quote
            </button>
          </Link>
        </div>

        <section>
          <h2 className="text-2xl text-gray-800 mt-6">
            Why Choose Our Custom Book Printing Services?
          </h2>
          <ul className="mt-4 text-gray-700 list-disc pl-5">
            <li>
              <strong>Tailored to Your Needs:</strong> We offer a wide variety
              of customizations, including size, paper type, binding, cover
              finishes, and more. No matter your project's requirements, we’ll
              make sure your book looks exactly how you envision it.
            </li>
            <li>
              <strong>High-Quality Materials:</strong> We use premium materials
              to ensure that every book we print is of the highest quality. From
              durable hardcovers to vibrant, crisp pages, your book will have
              the lasting impact you desire.
            </li>
            <li>
              <strong>Affordable Options:</strong> Our pricing is designed to be
              competitive without compromising on quality. Whether you need a
              short print run or a bulk order, we can provide the most
              cost-effective solutions for your project.
            </li>
            <li>
              <strong>Fast Turnaround Time:</strong> Need your books printed
              quickly? We offer expedited services without sacrificing the
              quality you expect. Get your custom book on time and on budget.
            </li>
            <li>
              <strong>Expert Support:</strong> Our dedicated team is here to
              guide you through every step of the printing process. We’ll help
              with file preparation, design tips, and any questions you might
              have along the way.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-gray-800 mt-6">
            Custom Book Printing Options
          </h2>
          <p className="mt-4 text-gray-700">
            We offer a variety of printing options to suit your specific needs.
            Here are some of the key features we can customize:
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-5">
            <li>
              <strong>Book Size & Layout:</strong> Choose from standard sizes or
              go with a custom size that fits your vision. We’ll ensure your
              layout is perfectly formatted for printing.
            </li>
            <li>
              <strong>Cover Styles:</strong> Select from a range of cover
              options, including hardcover, paperback, soft-touch matte, glossy,
              or even custom designs with foil stamping or embossing.
            </li>
            <li>
              <strong>Binding Options:</strong> We offer a range of binding
              choices, from perfect binding and saddle stitch to spiral and case
              binding. Choose what best fits the look and feel of your book.
            </li>
            <li>
              <strong>Paper Types:</strong> Choose from high-quality,
              eco-friendly paper options, including matte, glossy, uncoated, and
              textured finishes. The right paper can elevate your book's design
              and presentation.
            </li>
            <li>
              <strong>Printing Formats:</strong> Whether you need
              black-and-white or full-color printing, we have you covered. Our
              advanced printing technology ensures crisp, vibrant results every
              time.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-gray-800 mt-6">
            Perfect for Every Project
          </h2>
          <ul className="mt-4 text-gray-700 list-disc pl-5">
            <li>
              <strong>Self-Published Authors:</strong> Turn your manuscript into
              a professional, polished book with our custom printing services.
              Whether you're printing a small batch for family and friends or
              preparing for a large launch, we’ll support you through the entire
              process.
            </li>
            <li>
              <strong>Corporate & Marketing Materials:</strong> Custom books can
              serve as powerful marketing tools. Create high-quality business
              brochures, annual reports, catalogs, and more that represent your
              brand in the best light.
            </li>
            <li>
              <strong>Photographers & Artists:</strong> Showcase your work with
              custom photography books or art portfolios that display your
              images with vibrant clarity and fine craftsmanship.
            </li>
            <li>
              <strong>Educational & Instructional Books:</strong> Print
              textbooks, study guides, workbooks, and more with options for
              clear typography and durable binding for repeated use.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-gray-800 mt-6">How It Works</h2>
          <ol className="mt-4 text-gray-700 list-decimal pl-5">
            <li>
              <strong>Submit Your Files:</strong> Upload your manuscript or
              design files through our easy-to-use online portal. Need help with
              formatting? Our team is here to assist you.
            </li>
            <li>
              <strong>Choose Your Options:</strong> Select your customizations
              for size, paper, binding, and cover finish. If you’re not sure,
              we’re happy to recommend the best options based on your project.
            </li>
            <li>
              <strong>Proofing:</strong> We’ll provide a digital proof for your
              approval before printing to ensure everything looks perfect. Any
              adjustments needed? We’ll make them right away.
            </li>
            <li>
              <strong>Printing & Delivery:</strong> Once you approve the proof,
              we’ll print your books and deliver them directly to you. You can
              count on a fast, reliable turnaround.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl text-gray-800 mt-6">Get Started Today</h2>
          <p className="mt-4 text-gray-700">
            Ready to bring your book to life? Request a free quote today, or
            contact our team for personalized advice on your custom book
            printing project. Let’s make your vision a reality!
          </p>
        </section>
      </div>
      <div className="flex justify-center">
        <Link href="/books/calculator">
          <Button className="bg-primary text-white hover:bg-accent/90">
            Get an instant quote
          </Button>
        </Link>
      </div>
    </div>
  )
}
