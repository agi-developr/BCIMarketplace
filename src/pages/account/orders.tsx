import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  ShoppingBagIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

// Mock order data
const mockOrders = [
  {
    id: '1001',
    date: '2024-05-15',
    status: 'delivered',
    total: 89.99,
    items: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '1002',
    date: '2024-04-22',
    status: 'shipped',
    total: 124.97,
    items: [
      {
        id: '3',
        name: 'Organic Cotton T-Shirt',
        price: 24.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
      },
      {
        id: '4',
        name: 'Stainless Steel Water Bottle',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop'
      },
      {
        id: '6',
        name: 'Leather Wallet',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: '1003',
    date: '2024-03-10',
    status: 'processing',
    total: 239.98,
    items: [
      {
        id: '2',
        name: 'Smart Fitness Watch',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
      },
      {
        id: '5',
        name: 'Wireless Charging Pad',
        price: 39.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop'
      }
    ]
  }
]

const statusConfig = {
  processing: {
    icon: ClockIcon,
    text: 'Processing',
    color: 'text-yellow-500',
    bg: 'bg-yellow-100'
  },
  shipped: {
    icon: TruckIcon,
    text: 'Shipped',
    color: 'text-blue-500',
    bg: 'bg-blue-100'
  },
  delivered: {
    icon: CheckCircleIcon,
    text: 'Delivered',
    color: 'text-green-500',
    bg: 'bg-green-100'
  },
  cancelled: {
    icon: XCircleIcon,
    text: 'Cancelled',
    color: 'text-red-500',
    bg: 'bg-red-100'
  }
}

export default function OrderHistory() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Order History - BCI Marketplace</title>
        <meta name="description" content="View your past orders" />
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Order History</h1>
            
            {mockOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">Your order history will appear here once you make a purchase</p>
                <Link href="/products" className="btn-primary inline-flex items-center">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {mockOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                          <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {status.text}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={item.id} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                +{order.items.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
