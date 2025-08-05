import { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from '@/lib/firebase-admin'
import { collection, getDocs, addDoc, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { Product, CreateProductData, ProductFilters, ProductSort } from '@/types/product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const {
        page = '1',
        limit: limitParam = '12',
        category,
        minPrice,
        maxPrice,
        manufacturer,
        inStock,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query

      const pageNum = parseInt(page as string)
      const limitNum = parseInt(limitParam as string)
      const offset = (pageNum - 1) * limitNum

      // Build query
      let q = query(collection(adminDb, 'products'))

      // Apply filters
      if (category) {
        q = query(q, where('category', '==', category))
      }
      if (minPrice) {
        q = query(q, where('price', '>=', parseFloat(minPrice as string)))
      }
      if (maxPrice) {
        q = query(q, where('price', '<=', parseFloat(maxPrice as string)))
      }
      if (manufacturer) {
        q = query(q, where('manufacturer', '==', manufacturer))
      }
      if (inStock === 'true') {
        q = query(q, where('stock', '>', 0))
      }

      // Apply sorting
      q = query(q, orderBy(sortBy as string, sortOrder as 'asc' | 'desc'))

      // Apply pagination
      q = query(q, limit(limitNum))

      const snapshot = await getDocs(q)
      const products: Product[] = []

      snapshot.forEach((doc) => {
        const data = doc.data()
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Product)
      })

      // Apply search filter (client-side for now, can be optimized with Algolia)
      let filteredProducts = products
      if (search) {
        const searchLower = (search as string).toLowerCase()
        filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.manufacturer.toLowerCase().includes(searchLower)
        )
      }

      // Get total count for pagination
      const totalSnapshot = await getDocs(collection(adminDb, 'products'))
      const total = totalSnapshot.size

      res.status(200).json({
        products: filteredProducts,
        total,
        page: pageNum,
        limit: limitNum,
        hasMore: offset + filteredProducts.length < total
      })
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else if (req.method === 'POST') {
    try {
      const productData: CreateProductData = req.body

      // Validate required fields
      if (!productData.name || !productData.description || !productData.price) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      // Add timestamps
      const now = new Date()
      const newProduct = {
        ...productData,
        rating: 0,
        reviewCount: 0,
        discount: productData.originalPrice && productData.originalPrice > productData.price
          ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
          : undefined,
        createdAt: now,
        updatedAt: now,
      }

      const docRef = await addDoc(collection(adminDb, 'products'), newProduct)

      res.status(201).json({
        id: docRef.id,
        ...newProduct
      })
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ error: 'Failed to create product' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
} 