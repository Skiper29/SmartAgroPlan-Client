import Agent from '@/app/api/agent.api.ts';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type Soil from '@/models/field/soil.model.ts';

export const soilsApi = {
  // Get all soils
  getSoils: async (): Promise<Soil[]> => {
    return await Agent.get<Soil[]>(`${API_ROUTES.SOILS.GET_ALL}`);
  },

  // Get soil by ID
  getSoil: async (id: number): Promise<Soil> => {
    return await Agent.get<Soil>(`${API_ROUTES.SOILS.GET_BY_ID}/${id}`);
  },

  // Get soil by soil type
  getSoilByType: async (type: string): Promise<Soil[]> => {
    return await Agent.get<Soil[]>(
      `${API_ROUTES.SOILS.GET_BY_SOIL_TYPE}/${type}`,
    );
  },
};
