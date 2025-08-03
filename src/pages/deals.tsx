import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  FireIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import ProductCard from '@/components/ProductCard'
import Navigation from '@/components/Navigation'
import { mockProducts } from '@/utils/mockData'

export default function Deals() {
  const router = useRouter()
  const [products, setProducts] = useState(mockProducts)
  const [deals, setDeals] = useState<any[]>([])
  const [sortBy, setSortBy] = useState('discount')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Filter products with discounts
    const discountedProducts = products.filter(product => product.discount)
    
    // Sort products
    const sortedProducts = [...discountedProducts].sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return (b.discount || 0) - (a.discount || 0)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })
    
    setDeals(sortedProducts)
  }, [products, sortBy])

  const handleToggleFavorite = (product: any) => {
    setFavorites(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    )
  }

  const handleAddToCart = (product: any) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product.name)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Deals - BCI Marketplace</title>
        <meta name="description" content="Check out our latest deals and discounts" />
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
            <div className="flex items-center mb-6">
              <FireIcon className="h-8 w-8 text-red-500 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Hot Deals</h1>
            </div>
            
            <p className="text-gray-600 mb-8">
              Don't miss out on these limited-time offers. Save big on popular products!
            </p>
            
            {/* Sort Options */}
            <div className="flex items-center justify-end mb-6">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 mr-4">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="discount">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            {/* Deals Grid */}
            {deals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {deals.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      isFavorite: favorites.includes(product.id)
                    }}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FireIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No deals available</h3>
                <p className="text-gray-500 mb-6">
                  Check back later for exciting discounts and offers!
                </p>
                <Link href="/products" className="btn-primary inline-flex items-center">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
