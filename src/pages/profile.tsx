import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import ProtectedRoute from '../components/ProtectedRoute'
import Navigation from '../components/Navigation'

export default function Profile() {
  const { data: session } = useSession()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Profile - BCI Marketplace</title>
          <meta name="description" content="Your BCI Marketplace profile" />
        </Head>

        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Profile Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {session?.user?.name || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {session?.user?.email || 'Not provided'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {session?.user?.role || 'User'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Member Since
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Order History
              </h3>
              
              <div className="text-center py-8">
                <p className="text-gray-500">No orders yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Start shopping to see your order history here
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Favorite BCIs
              </h3>
              
              <div className="text-center py-8">
                <p className="text-gray-500">No favorites yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Add BCIs to your favorites to see them here
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 