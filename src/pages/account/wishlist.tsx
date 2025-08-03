import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import ProductCard from '@/components/ProductCard'
import { mockProducts } from '@/utils/mockData'

export default function Wishlist() {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // For demonstration, we'll add a few products to the wishlist
    const wishlistProductIds = ['1', '3', '5']
    const wishlistProducts = mockProducts.filter(product => 
      wishlistProductIds.includes(product.id)
    )
    setWishlistItems(wishlistProducts)
    setFavorites(wishlistProductIds)
  }, [])

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId))
    setFavorites(prev => prev.filter(id => id !== productId))
  }

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
    
    // If removing from favorites, also remove from wishlist items
    if (favorites.includes(productId)) {
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId))
    }
  }

  const handleAddToCart = (product: any) => {
    // TODO: Implement actual cart functionality
    console.log('Added to cart:', product.name)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Wishlist - BCI Marketplace</title>
        <meta name="description" content="Your saved items" />
      </Head>

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.push('/account')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Account
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Wishlist</h1>
            
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Save items that you like to your wishlist</p>
                <Link href="/products" className="btn-primary inline-flex items-center">
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlistItems.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard
                        product={{
                          ...product,
                          isFavorite: favorites.includes(product.id)
                        }}
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={() => handleToggleFavorite(product.id)}
                      />
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
