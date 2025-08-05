import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

interface NavigationProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  cartCount?: number
}

export default function Navigation({ searchQuery = '', onSearchChange, cartCount = 0 }: NavigationProps) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              BCI Marketplace
            </Link>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <HeartIcon className="h-6 w-6" />
            </button>
            
            {status === 'loading' ? (
              <div className="p-2">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900">
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <UserIcon className="h-6 w-6" />
                  )}
                  <span className="text-sm font-medium">{session.user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign in
              </Link>
            )}
            
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
} 