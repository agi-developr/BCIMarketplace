import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

export default function Custom404() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const popularLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'My Account', href: '/account' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Page Not Found - BCI Marketplace</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>

      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved. 
            Let us help you find what you're looking for.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-field"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="mt-4 btn-primary w-full"
            >
              Search
            </button>
          </form>
          
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Or visit one of these pages:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {popularLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="btn-secondary py-2 px-4 text-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
