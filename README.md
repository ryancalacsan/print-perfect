# Print Perfect - Headless WordPress E-commerce Site

Print Perfect is a modern e-commerce website for a printing company, built with Next.js and utilizing WordPress as a headless CMS. The site showcases various printing services including business cards, postcards, and stationery products.

🌎 Live Demo: [Print Perfect](https://print-perfect-3tjjfcadc-ryancalacsans-projects.vercel.app)

## 🚀 Features

- **Headless WordPress CMS Integration**

  - Dynamic content management through WordPress backend
  - WooCommerce integration for product management
  - Custom API endpoints for content delivery

- **Modern Frontend**

  - Built with Next.js 14 and TypeScript
  - Responsive design using Tailwind CSS
  - Server-side rendering for optimal performance
  - Client-side interactivity with React

- **E-commerce Functionality**
  - Product catalog with categories
  - Dynamic product pages
  - WooCommerce REST API integration

## 🛠️ Tech Stack

- **Frontend:**

  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - React Icons

- **Backend:**
  - WordPress (Headless CMS)
  - WooCommerce
  - REST API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- WordPress installation with WooCommerce
- PHP 7.4 or higher
- MySQL/MariaDB

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/print-perfect.git
   cd print-perfect
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   WP_API_URL=your_wordpress_url/wp-json/wp/v2
   WC_API_URL=your_wordpress_url/wp-json/wc/v3
   DB_WOOCONSUMER_KEY=your_woocommerce_consumer_key
   DB_WOOCONSUMER_SECRET=your_woocommerce_consumer_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🔑 WordPress Setup

1. Install WordPress and activate the following plugins:

   - WooCommerce
   - ACF (Advanced Custom Fields) if using custom fields

2. Configure WordPress REST API:
   - Enable pretty permalinks
   - Configure CORS if necessary
   - Generate WooCommerce REST API keys

## 🚀 Deployment

The project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## 📁 Project Structure

```
print-perfect/
├── src/
│ ├── app/ # Next.js app directory
│ ├── components/ # React components
│ ├── lib/ # Utility functions and API calls
│ └── types/ # TypeScript type definitions
├── public/ # Static assets
└── ...configuration files
```

## 📝 License

This project is licensed under the GNU General Public License 3.0. - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- Ryan Calacsan - Initial work - [Ryan Calacsan's Github](https://github.com/ryancalacsan)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- WordPress community
- WooCommerce team
