import { motion } from 'framer-motion'
import { HeartIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  isFavorite?: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onToggleFavorite?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart, onToggleFavorite }: ProductCardProps) {
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    isFavorite = false,
    discount
  } = product

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        <button
          onClick={() => onToggleFavorite?.(product)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart?.(product)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <ShoppingBagIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
} 