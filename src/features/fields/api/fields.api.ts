import Agent from '@/app/api/agent.api.ts';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type Field from '@/models/field/field.model.ts';
import type { FieldCreate, FieldUpdate } from '@/models/field/field.model.ts';

export const fieldsApi = {
  // Get all fields
  getFields: async (): Promise<Field[]> => {
    return await Agent.get<Field[]>(`${API_ROUTES.FIELDS.GET_ALL}`);
  },

  // Get field by ID
  getField: async (id: number): Promise<Field> => {
    return await Agent.get<Field>(`${API_ROUTES.FIELDS.GET_BY_ID}/${id}`);
  },

  // Create new field
  createField: async (data: FieldCreate): Promise<Field> => {
    return await Agent.post<Field>(`${API_ROUTES.FIELDS.CREATE}`, data);
  },

  // Update field
  updateField: async (data: FieldUpdate): Promise<Field> => {
    return await Agent.put<Field>(`${API_ROUTES.FIELDS.UPDATE}`, data);
  },

  // Delete field
  deleteField: async (id: number): Promise<void> => {
    await Agent.delete(`${API_ROUTES.FIELDS.DELETE}/${id}`);
  },
};
