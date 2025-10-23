import Agent from '@/app/api/agent.api.ts';
import { API_ROUTES } from '@/app/constants/api-routes.constants';
import type {
  FieldCondition,
  FieldConditionCreate,
} from '@/models/field/field-condition.model.ts';

export const fieldConditionsApi = {
  // Get conditions for a specific field
  getFieldConditions: async (fieldId: number): Promise<FieldCondition[]> => {
    return await Agent.get<FieldCondition[]>(
      `${API_ROUTES.FIELD_CONDITIONS.GET_BY_FIELD_ID}/${fieldId}`,
    );
  },

  // Create new field condition record
  createFieldCondition: async (
    data: FieldConditionCreate,
  ): Promise<FieldCondition> => {
    const payload = {
      ...data,
      recordedAt: data.recordedAt
        ? new Date(data.recordedAt).toISOString()
        : null,
    };
    return await Agent.post<FieldCondition>(
      API_ROUTES.FIELD_CONDITIONS.CREATE,
      payload,
    );
  },

  getAllFieldConditions: async (): Promise<FieldCondition[]> => {
    return await Agent.get<FieldCondition[]>(
      API_ROUTES.FIELD_CONDITIONS.GET_ALL,
    );
  },

  getFieldConditionById: async (id: number): Promise<FieldCondition> => {
    return await Agent.get<FieldCondition>(
      `${API_ROUTES.FIELD_CONDITIONS.GET_BY_ID}/${id}`,
    );
  },

  deleteFieldCondition: async (id: number): Promise<void> => {
    return await Agent.delete<void>(
      `${API_ROUTES.FIELD_CONDITIONS.DELETE}/${id}`,
    );
  },

  // Add getById, update, delete functions here if needed
};
