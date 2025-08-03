import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import ProductCard from '../components/ProductCard'

// Mock data for demonstration
const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 128,
    discount: 31,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    rating: 4.2,
    reviewCount: 89,
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 256,
    discount: 29,
    category: 'Clothing'
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 342,
    category: 'Home'
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    rating: 4.3,
    reviewCount: 156,
    discount: 33,
    category: 'Electronics'
  },
  {
    id: '6',
    name: 'Leather Wallet',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 98,
    category: 'Accessories'
  }
]

const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Accessories']

export default function Products() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
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
        <title>Products - BCI Marketplace</title>
        <meta name="description" content="Browse our wide selection of products" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Categories:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
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

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
} 