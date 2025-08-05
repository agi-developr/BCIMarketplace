import { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from '@/lib/firebase-admin'
import { collection, getDocs } from 'firebase-admin/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    const snapshot = await getDocs(collection(adminDb, 'products'))
    const categories = new Set<string>()

    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data.category) {
        categories.add(data.category)
      }
    })

    const categoriesList = Array.from(categories).sort()

    res.status(200).json(categoriesList)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
} 