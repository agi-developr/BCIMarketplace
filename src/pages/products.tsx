import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import ProductCard from '../components/ProductCard'
import { useProducts, useProductCategories, useProductManufacturers } from '../hooks/useProducts'
import { ProductFilters, ProductSort } from '../types/product'

// Mock data for demonstration
const mockProducts = [
  {
    id: '1',
    name: 'NeuroGamer Pro - EEG Gaming Headset',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 128,
    discount: 25,
    category: 'Gaming BCIs'
  },
  {
    id: '2',
    name: 'MindFlow Productivity BCI',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    rating: 4.2,
    reviewCount: 89,
    category: 'Productivity BCIs'
  },
  {
    id: '3',
    name: 'NeuroFit Wellness BCI',
    price: 249.99,
    originalPrice: 329.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 256,
    discount: 24,
    category: 'Wellness BCIs'
  },
  {
    id: '4',
    name: 'BrainWave Research Interface',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 342,
    category: 'Research BCIs'
  },
  {
    id: '5',
    name: 'NeuroLearn Educational BCI',
    price: 179.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    rating: 4.3,
    reviewCount: 156,
    discount: 28,
    category: 'Educational BCIs'
  },
  {
    id: '6',
    name: 'MindControl Accessibility BCI',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 98,
    category: 'Accessibility BCIs'
  }
]

const categories = ['All', 'Gaming BCIs', 'Productivity BCIs', 'Wellness BCIs', 'Research BCIs', 'Educational BCIs', 'Accessibility BCIs']

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [favorites, setFavorites] = useState<string[]>([])
  const [page, setPage] = useState(1)

  // Build filters and sort
  const filters: ProductFilters = {
    ...(selectedCategory !== 'All' && { category: selectedCategory }),
    ...(searchQuery && { search: searchQuery }),
  }

  const sort: ProductSort = {
    field: sortBy === 'price-low' ? 'price' : 
           sortBy === 'price-high' ? 'price' : 
           sortBy === 'rating' ? 'rating' : 'createdAt',
    direction: sortBy === 'price-low' ? 'asc' : 'desc'
  }

  // Fetch products using React Query
  const { data: productsData, isLoading, error } = useProducts(filters, sort, page, 12)
  const { data: categoriesData } = useProductCategories()
  const { data: manufacturersData } = useProductManufacturers()

  const products = productsData?.products || []
  const totalProducts = productsData?.total || 0
  const hasMore = productsData?.hasMore || false

  const handleToggleFavorite = (product: { id: string }) => {
    setFavorites(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    )
  }

  const handleAddToCart = (product: { id: string; name: string }) => {
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

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading products. Please try again.</p>
          </div>
        )}

        {/* Results count */}
        {!isLoading && !error && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {products.length} of {totalProducts} products
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
        )}

        {/* Pagination */}
        {!isLoading && !error && hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setPage(page + 1)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
