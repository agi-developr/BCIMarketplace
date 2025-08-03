import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  ShoppingBagIcon,
  TruckIcon, 
  ShieldCheckIcon, 
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

export default function About() {
  const router = useRouter()

  const features = [
    {
      icon: ShoppingBagIcon,
      title: 'Wide Selection',
      description: 'Browse thousands of products from trusted sellers'
    },
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and safely'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Shopping',
      description: 'Your data and payments are protected with bank-level security'
    },
    {
      icon: StarIcon,
      title: 'Quality Guarantee',
      description: 'All products are quality-checked before shipping'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us - BCI Marketplace</title>
        <meta name="description" content="Learn more about BCI Marketplace" />
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
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About BCI Marketplace</h1>
            <p className="text-gray-600 mb-8">Your trusted e-commerce platform since 2024</p>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At BCI Marketplace, we're dedicated to providing an exceptional shopping experience 
                that connects buyers with quality products from trusted sellers. Our mission is to make 
                online shopping simple, secure, and enjoyable for everyone.
              </p>
              <p className="text-gray-700">
                We believe in fostering a community of sellers and buyers where transparency, 
                reliability, and customer satisfaction are at the core of everything we do. 
                By leveraging cutting-edge technology and maintaining high standards for product 
                quality and service, we aim to become your go-to marketplace for all shopping needs.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={feature.title} className="text-center p-6 rounded-lg bg-gray-50">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-700 mb-4">
                BCI Marketplace is built by a passionate team of developers, designers, 
                and e-commerce experts who are committed to creating the best possible 
                shopping experience for our customers.
              </p>
              <p className="text-gray-700">
                With backgrounds in technology and retail, our team combines expertise 
                to deliver innovative solutions that meet the evolving needs of modern 
                shoppers and sellers.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">support@bcimarketplace.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Commerce Street<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
