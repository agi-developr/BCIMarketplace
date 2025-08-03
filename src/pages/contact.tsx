import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'

export default function Contact() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1000)
  }

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. There you'll find all your orders with their current status."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on most items. Products must be in their original condition with all packaging and tags. Please visit our Returns & Refunds page for detailed information."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by destination. Contact our support team for specific information about your country."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us - BCI Marketplace</title>
        <meta name="description" content="Get in touch with BCI Marketplace support" />
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-gray-600 mb-8">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a message</h2>
                  
                  {submitSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                      <p>Thank you for your message! We'll get back to you within 24 hours.</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
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
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="input-field"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-gray-200 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <PhoneIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <EnvelopeIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600">support@bcimarketplace.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPinIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Office</h3>
                        <p className="text-gray-600">
                          123 Commerce Street<br />
                          San Francisco, CA 94103<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="text-gray-900">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="text-gray-900">Closed</span>
                    </div>
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
