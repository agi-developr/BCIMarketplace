import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ShoppingBagIcon,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    quantity: 1,
    stock: 15
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    quantity: 2,
    stock: 42
  }
]

export default function Cart() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>(mockCartItems)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Calculate total cart count
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(total)
  }, [cartItems])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(item.stock, newQuantity) } 
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Shopping Cart - BCI Marketplace</title>
        <meta name="description" content="Your shopping cart" />
      </Head>

      <Navigation cartCount={cartCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Continue Shopping
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
                <Link href="/products" className="btn-primary inline-flex items-center">
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-gray-200 pb-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden mr-6">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-lg mr-4">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-600 hover:text-gray-900"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-600 hover:text-gray-900"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-500 flex items-center"
                          >
                            <XMarkIcon className="h-5 w-5 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-lg font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <button
                      onClick={() => router.push('/products')}
                      className="btn-secondary flex-1"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => router.push('/checkout')}
                      className="btn-primary flex-1"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
