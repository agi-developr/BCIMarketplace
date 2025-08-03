import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { getProductById, getRelatedProducts } from '@/utils/mockData'
import ProductCard from '@/components/ProductCard'
import Navigation from '@/components/Navigation'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id as string)
      setProduct(foundProduct)
    }
  }, [id])

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAddToCart = (product: any) => {
    // TODO: Implement actual cart functionality
    setCartCount(prev => prev + quantity)
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product.category, product.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{product.name} - BCI Marketplace</title>
        <meta name="description" content={product.description} />
      </Head>

      <Navigation cartCount={cartCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <div className="mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFavorite(product.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  {favorites.includes(product.id) ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-600">
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={{
                    ...relatedProduct,
                    isFavorite: favorites.includes(relatedProduct.id)
                  }}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={() => handleToggleFavorite(relatedProduct.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
