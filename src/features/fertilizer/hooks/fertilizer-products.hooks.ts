import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fertilizerProductsApi } from '@/features/fertilizer/api';
import type {
  FertilizerProduct,
  CreateFertilizerProductDto,
  UpdateFertilizerProductDto,
  FertilizerType,
} from '@/models/fertilizer';
import type { ApiError } from '@/types/api-error.type';

/**
 * Query keys for fertilizer products
 */
export const FERTILIZER_PRODUCTS_KEYS = {
  all: ['fertilizer', 'products'] as const,
  lists: () => [...FERTILIZER_PRODUCTS_KEYS.all, 'list'] as const,
  list: () => [...FERTILIZER_PRODUCTS_KEYS.lists()] as const,
  byType: (type: FertilizerType) =>
    [...FERTILIZER_PRODUCTS_KEYS.lists(), 'by-type', type] as const,
  searches: () => [...FERTILIZER_PRODUCTS_KEYS.all, 'search'] as const,
  search: (query: string) =>
    [...FERTILIZER_PRODUCTS_KEYS.searches(), query] as const,
  details: () => [...FERTILIZER_PRODUCTS_KEYS.all, 'detail'] as const,
  detail: (productId: number) =>
    [...FERTILIZER_PRODUCTS_KEYS.details(), productId] as const,
};

/**
 * Hook to get all fertilizer products
 * @param enabled - Whether the query is enabled
 */
export const useAllProducts = (enabled: boolean = true) => {
  return useQuery<FertilizerProduct[], ApiError>({
    queryKey: FERTILIZER_PRODUCTS_KEYS.list(),
    queryFn: () => fertilizerProductsApi.getAllProducts(),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes - product list doesn't change often
  });
};

/**
 * Hook to get fertilizer products by type
 * @param type - Fertilizer type
 * @param enabled - Whether the query is enabled
 */
export const useProductsByType = (
  type: FertilizerType,
  enabled: boolean = true,
) => {
  return useQuery<FertilizerProduct[], ApiError>({
    queryKey: FERTILIZER_PRODUCTS_KEYS.byType(type),
    queryFn: () => fertilizerProductsApi.getProductsByType(type),
    enabled: enabled && !!type,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to search for fertilizer products
 * @param query - Search query
 * @param enabled - Whether the query is enabled
 */
export const useSearchProducts = (query: string, enabled: boolean = true) => {
  return useQuery<FertilizerProduct[], ApiError>({
    queryKey: FERTILIZER_PRODUCTS_KEYS.search(query),
    queryFn: () => fertilizerProductsApi.searchProducts(query),
    enabled: enabled && !!query && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get a specific fertilizer product by ID
 * @param productId - Product ID
 * @param enabled - Whether the query is enabled
 */
export const useProductById = (productId: number, enabled: boolean = true) => {
  return useQuery<FertilizerProduct, ApiError>({
    queryKey: FERTILIZER_PRODUCTS_KEYS.detail(productId),
    queryFn: () => fertilizerProductsApi.getProductById(productId),
    enabled: enabled && !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to create a new fertilizer product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, CreateFertilizerProductDto>({
    mutationFn: (data: CreateFertilizerProductDto) =>
      fertilizerProductsApi.createProduct(data),
    onSuccess: () => {
      // Invalidate all product lists
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.searches(),
      });
    },
  });
};

/**
 * Hook to update an existing fertilizer product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    { productId: number; data: UpdateFertilizerProductDto }
  >({
    mutationFn: ({ productId, data }) =>
      fertilizerProductsApi.updateProduct(productId, data),
    onSuccess: (_result, variables) => {
      // Invalidate the specific product and all lists
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.detail(variables.productId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.searches(),
      });
    },
  });
};

/**
 * Hook to delete a fertilizer product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (productId: number) =>
      fertilizerProductsApi.deleteProduct(productId),
    onSuccess: (_result, productId) => {
      // Invalidate the specific product and all lists
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.detail(productId),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: FERTILIZER_PRODUCTS_KEYS.searches(),
      });
    },
  });
};
