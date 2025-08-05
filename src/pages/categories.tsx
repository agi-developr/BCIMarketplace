import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import { mockProducts } from '@/utils/mockData'

export default function Categories() {
  const router = useRouter()
  
  // Get unique categories with product counts
  const categories = Array.from(new Set(mockProducts.map(product => product.category)))
    .map(category => {
      const count = mockProducts.filter(product => product.category === category).length
      return { name: category, count }
    })

  // Category images (using.unsplash.com for demonstration)
  const categoryImages: Record<string, string> = {
    'Gaming BCIs': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    'Productivity BCIs': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    'Wellness BCIs': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    'Research BCIs': 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop',
    'Educational BCIs': 'https://images.unsplash.com/photo-1523580494860-f66e104786a7?w=400&h=300&fit=crop',
    'Accessibility BCIs': 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=400&h=300&fit=crop'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Categories - BCI Marketplace</title>
        <meta name="description" content="Browse products by category" />
      </Head>

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Shop by Category</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group block"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4 h-48">
                    <img 
                      src={categoryImages[category.name] || 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=400&h=300&fit=crop'}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl font-bold text-white">{category.name}</h2>
                      <p className="text-white/80">{category.count} items</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
