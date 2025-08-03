import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import ProductCard from '@/components/ProductCard'
import Navigation from '@/components/Navigation'
import { mockProducts } from '@/utils/mockData'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (q) {
      setSearchQuery(q as string)
    }
  }, [q])

  useEffect(() => {
    // Filter products based on search query and category
    let results = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    results = [...results].sort((a, b) => {
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

    setFilteredProducts(results)
  }, [searchQuery, selectedCategory, sortBy, products])

  const categories = ['All', ...Array.from(new Set(mockProducts.map(product => product.category)))]

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
        <title>Search Results - BCI Marketplace</title>
        <meta name="description" content={`Search results for "${q}"`} />
      </Head>

      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results for "{q}"
            </h1>
            <p className="text-gray-600 mb-6">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <FunnelIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 mr-4">Filter by:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 mr-4">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any products matching "{searchQuery}"
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
