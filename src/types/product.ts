export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviewCount: number
  discount?: number
  stock: number
  features: string[]
  specifications: Record<string, string>
  manufacturer: string
  model: string
  compatibility: string[]
  warranty: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  stock: number
  features: string[]
  specifications: Record<string, string>
  manufacturer: string
  model: string
  compatibility: string[]
  warranty: string
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  manufacturer?: string
  inStock?: boolean
  search?: string
}

export interface ProductSort {
  field: 'price' | 'rating' | 'name' | 'createdAt'
  direction: 'asc' | 'desc'
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  hasMore: boolean
} 