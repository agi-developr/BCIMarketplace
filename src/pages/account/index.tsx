import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: 'January 2024',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
}

const accountSections = [
  { 
    id: 'orders', 
    title: 'My Orders', 
    description: 'View your order history and track packages',
    icon: ShoppingBagIcon,
    href: '/account/orders'
  },
  { 
    id: 'wishlist', 
    title: 'Wishlist', 
    description: 'Your saved items and favorites',
    icon: HeartIcon,
    href: '/account/wishlist'
  },
  { 
    id: 'addresses', 
    title: 'Addresses', 
    description: 'Manage your shipping addresses',
    icon: MapPinIcon,
    href: '/account/addresses'
  },
  { 
    id: 'payment', 
    title: 'Payment Methods', 
    description: 'Manage your payment options',
    icon: CreditCardIcon,
    href: '/account/payment'
  },
  { 
    id: 'security', 
    title: 'Security', 
    description: 'Update your password and security settings',
    icon: ShieldCheckIcon,
    href: '/account/security'
  },
  { 
    id: 'notifications', 
    title: 'Notifications', 
    description: 'Manage your notification preferences',
    icon: BellIcon,
    href: '/account/notifications'
  }
]

export default function Account() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Account - BCI Marketplace</title>
        <meta name="description" content="Manage your account settings and preferences" />
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Account</h1>
            
            {/* Profile Header */}
            <div className="flex items-center mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-6">
                <img 
                  src={mockUser.avatar} 
                  alt={mockUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{mockUser.name}</h2>
                <p className="text-gray-600">Member since {mockUser.joinDate}</p>
              </div>
            </div>
            
            {/* Account Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accountSections.map((section) => (
                <Link 
                  key={section.id}
                  href={section.href}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex items-start"
                >
                  <section.icon className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
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
