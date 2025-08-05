import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Product, CreateProductData, UpdateProductData, ProductFilters, ProductSort } from '@/types/product'

// API functions
const fetchProducts = async (filters?: ProductFilters, sort?: ProductSort, page = 1, limit = 12) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters?.category && { category: filters.category }),
    ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
    ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
    ...(filters?.manufacturer && { manufacturer: filters.manufacturer }),
    ...(filters?.inStock && { inStock: filters.inStock.toString() }),
    ...(filters?.search && { search: filters.search }),
    ...(sort?.field && { sortBy: sort.field }),
    ...(sort?.direction && { sortOrder: sort.direction }),
  })

  const response = await fetch(`/api/products?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

const fetchProduct = async (id: string) => {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}

const createProduct = async (productData: CreateProductData) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
  if (!response.ok) {
    throw new Error('Failed to create product')
  }
  return response.json()
}

const updateProduct = async ({ id, ...updateData }: UpdateProductData) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
  if (!response.ok) {
    throw new Error('Failed to update product')
  }
  return response.json()
}

const deleteProduct = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete product')
  }
  return response.json()
}

// React Query hooks
export const useProducts = (
  filters?: ProductFilters,
  sort?: ProductSort,
  page = 1,
  limit = 12
) => {
  return useQuery(
    ['products', filters, sort, page, limit],
    () => fetchProducts(filters, sort, page, limit),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )
}

export const useProduct = (id: string) => {
  return useQuery(
    ['product', id],
    () => fetchProduct(id),
    {
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  )
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation(createProduct, {
    onSuccess: () => {
      // Invalidate and refetch products
      queryClient.invalidateQueries('products')
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation(updateProduct, {
    onSuccess: (updatedProduct) => {
      // Update the product in cache
      queryClient.setQueryData(['product', updatedProduct.id], updatedProduct)
      // Invalidate products list
      queryClient.invalidateQueries('products')
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteProduct, {
    onSuccess: () => {
      // Invalidate products queries
      queryClient.invalidateQueries('products')
    },
  })
}

// Utility hooks
export const useProductCategories = () => {
  return useQuery(
    ['product-categories'],
    async () => {
      const response = await fetch('/api/products/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    },
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  )
}

export const useProductManufacturers = () => {
  return useQuery(
    ['product-manufacturers'],
    async () => {
      const response = await fetch('/api/products/manufacturers')
      if (!response.ok) {
        throw new Error('Failed to fetch manufacturers')
      }
      return response.json()
    },
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  )
} 