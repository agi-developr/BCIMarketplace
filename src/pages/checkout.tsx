import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    quantity: 1
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    quantity: 2
  }
]

export default function Checkout() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: shipping, 2: payment, 3: review, 4: confirmation
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: ''
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    // TODO: Implement actual order placement
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Checkout - BCI Marketplace</title>
        <meta name="description" content="Complete your purchase" />
      </Head>

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Cart
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNum ? (
                      <CheckCircleIcon className="h-5 w-5" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {stepNum === 1 && 'Shipping'}
                    {stepNum === 2 && 'Payment'}
                    {stepNum === 3 && 'Review'}
                    {stepNum === 4 && 'Confirmation'}
                  </span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    disabled={!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                <div className="mb-8">
                  <div className="flex items-center mb-6 p-4 border border-gray-200 rounded-lg">
                    <CreditCardIcon className="h-6 w-6 text-gray-600 mr-3" />
                    <span className="font-medium">Credit Card</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        className="input-field"
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        className="input-field"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        className="input-field"
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={handlePaymentChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    Back to Shipping
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-primary"
                    disabled={!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.nameOnCard}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Review</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                      <p className="text-gray-700">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                        {shippingInfo.email}<br />
                        {shippingInfo.phone}
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                      <div className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 text-gray-600 mr-2" />
                        <p className="text-gray-700">
                          Card ending in {paymentInfo.cardNumber.slice(-4)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                      
                      <div className="space-y-4 mb-6">
                        {mockCartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between">
                          <p className="text-gray-600">Subtotal</p>
                          <p className="text-gray-900">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-600">Shipping</p>
                          <p className="text-gray-900">
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-600">Tax</p>
                          <p className="text-gray-900">${tax.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-200">
                          <p>Total</p>
                          <p>${total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="btn-secondary"
                      >
                        Back to Payment
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="btn-primary"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for your purchase. Your order has been placed and will be processed shortly.
                  A confirmation email has been sent to {shippingInfo.email}.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => router.push('/products')}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => router.push('/account/orders')}
                    className="btn-secondary"
                  >
                    View Order Status
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
