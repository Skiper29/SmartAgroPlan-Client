import Agent from '@/app/api/agent.api.ts';
import { API_ROUTES } from '@/app/constants/api-routes.constants.ts';
import type { Crop } from '@/models/crop/crop.model.ts';
import type { CropCreate, CropUpdate } from '@/models/crop/crop.model.ts';

export const cropsApi = {
  // Get all crops
  getCrops: async (): Promise<Crop[]> => {
    return await Agent.get<Crop[]>(`${API_ROUTES.CROPS.GET_ALL}`);
  },

  // Get crop by ID
  getCrop: async (id: number): Promise<Crop> => {
    return await Agent.get<Crop>(`${API_ROUTES.CROPS.GET_BY_ID}/${id}`);
  },

  // Get crops by crop type
  getCropsByType: async (type: string): Promise<Crop[]> => {
    return await Agent.get<Crop[]>(
      `${API_ROUTES.CROPS.GET_BY_CROP_TYPE}/${type}`,
    );
  },

  // Create new crop
  createCrop: async (data: CropCreate): Promise<Crop> => {
    return await Agent.post<Crop>(`${API_ROUTES.CROPS.CREATE}`, data);
  },

  // Update crop
  updateCrop: async (data: CropUpdate): Promise<Crop> => {
    return await Agent.put<Crop>(`${API_ROUTES.CROPS.UPDATE}`, data);
  },

  // Delete crop
  deleteCrop: async (id: number): Promise<void> => {
    await Agent.delete(`${API_ROUTES.CROPS.DELETE}/${id}`);
  },
};
