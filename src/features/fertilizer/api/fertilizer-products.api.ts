import Agent from '@/app/api/agent.api';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type {
  FertilizerProduct,
  CreateFertilizerProductDto,
  UpdateFertilizerProductDto,
  FertilizerType,
} from '@/models/fertilizer';

/**
 * Fertilizer Products API
 * Handles product management and queries
 */
export const fertilizerProductsApi = {
  /**
   * Get all fertilizer products
   * GET /fertilizer/products
   */
  getAllProducts: async (): Promise<FertilizerProduct[]> => {
    return await Agent.get<FertilizerProduct[]>(
      API_ROUTES.FERTILIZER.PRODUCTS.GET_ALL,
    );
  },

  /**
   * Get fertilizer products by type
   * GET /fertilizer/products/by-type
   */
  getProductsByType: async (
    type: FertilizerType,
  ): Promise<FertilizerProduct[]> => {
    return await Agent.get<FertilizerProduct[]>(
      API_ROUTES.FERTILIZER.PRODUCTS.GET_BY_TYPE,
      new URLSearchParams({ type }),
    );
  },

  /**
   * Search for fertilizer products
   * GET /fertilizer/products/search
   */
  searchProducts: async (query: string): Promise<FertilizerProduct[]> => {
    return await Agent.get<FertilizerProduct[]>(
      API_ROUTES.FERTILIZER.PRODUCTS.SEARCH,
      new URLSearchParams({ query }),
    );
  },

  /**
   * Get a specific fertilizer product by ID
   * GET /fertilizer/products/{productId}
   */
  getProductById: async (productId: number): Promise<FertilizerProduct> => {
    return await Agent.get<FertilizerProduct>(
      `${API_ROUTES.FERTILIZER.PRODUCTS.GET_BY_ID}/${productId}`,
    );
  },

  /**
   * Create a new fertilizer product
   * POST /fertilizer/products
   */
  createProduct: async (data: CreateFertilizerProductDto): Promise<number> => {
    return await Agent.post<number>(
      API_ROUTES.FERTILIZER.PRODUCTS.CREATE,
      data,
    );
  },

  /**
   * Update an existing fertilizer product
   * PUT /fertilizer/products/{productId}
   */
  updateProduct: async (
    productId: number,
    data: UpdateFertilizerProductDto,
  ): Promise<void> => {
    return await Agent.put<void>(
      `${API_ROUTES.FERTILIZER.PRODUCTS.UPDATE}/${productId}`,
      data,
    );
  },

  /**
   * Delete a fertilizer product
   * DELETE /fertilizer/products/{productId}
   */
  deleteProduct: async (productId: number): Promise<void> => {
    return await Agent.delete<void>(
      `${API_ROUTES.FERTILIZER.PRODUCTS.DELETE}/${productId}`,
    );
  },
};
