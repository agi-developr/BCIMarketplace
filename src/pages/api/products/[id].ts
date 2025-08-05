import { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from '@/lib/firebase-admin'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase-admin/firestore'
import { Product, UpdateProductData } from '@/types/product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' })
  }

  if (req.method === 'GET') {
    try {
      const docRef = doc(adminDb, 'products', id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        return res.status(404).json({ error: 'Product not found' })
      }

      const data = docSnap.data()
      const product: Product = {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Product

      res.status(200).json(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      res.status(500).json({ error: 'Failed to fetch product' })
    }
  } else if (req.method === 'PUT') {
    try {
      const updateData: UpdateProductData = req.body

      // Validate required fields
      if (!updateData.name && !updateData.description && !updateData.price) {
        return res.status(400).json({ error: 'At least one field must be provided for update' })
      }

      const docRef = doc(adminDb, 'products', id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        return res.status(404).json({ error: 'Product not found' })
      }

      // Calculate discount if price is being updated
      let discount = updateData.discount
      if (updateData.price && updateData.originalPrice && updateData.originalPrice > updateData.price) {
        discount = Math.round(((updateData.originalPrice - updateData.price) / updateData.originalPrice) * 100)
      }

      const updatePayload = {
        ...updateData,
        discount,
        updatedAt: new Date(),
      }

      await updateDoc(docRef, updatePayload)

      // Fetch updated product
      const updatedDocSnap = await getDoc(docRef)
      const data = updatedDocSnap.data()
      const updatedProduct: Product = {
        id: updatedDocSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Product

      res.status(200).json(updatedProduct)
    } catch (error) {
      console.error('Error updating product:', error)
      res.status(500).json({ error: 'Failed to update product' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const docRef = doc(adminDb, 'products', id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        return res.status(404).json({ error: 'Product not found' })
      }

      await deleteDoc(docRef)

      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
      console.error('Error deleting product:', error)
      res.status(500).json({ error: 'Failed to delete product' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
} 