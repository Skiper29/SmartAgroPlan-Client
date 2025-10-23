// src/features/fields/hooks/fieldConditions.hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fieldConditionsApi } from '@/features/fields/api/fieldConditions.api';
import type {
  FieldCondition,
  FieldConditionCreate,
} from '@/models/field/field-condition.model.ts';
import type { ApiError } from '@/types/api-error.type';

// Cache Keys
const FIELD_CONDITION_KEYS = {
  all: ['fieldConditions'] as const,
  lists: () => [...FIELD_CONDITION_KEYS.all, 'list'] as const,
  listByField: (fieldId: number) =>
    [...FIELD_CONDITION_KEYS.lists(), { fieldId }] as const,
  details: () => [...FIELD_CONDITION_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...FIELD_CONDITION_KEYS.details(), id] as const,
};

// Hook to get conditions for a specific field
export const useFieldConditions = (fieldId: number) =>
  useQuery<FieldCondition[], ApiError>({
    queryKey: FIELD_CONDITION_KEYS.listByField(fieldId),
    queryFn: () => fieldConditionsApi.getFieldConditions(fieldId),
    enabled: !!fieldId, // Only run if fieldId is valid
  });

// Hook to create a new field condition
export const useCreateFieldCondition = () => {
  const queryClient = useQueryClient();
  return useMutation<FieldCondition, ApiError, FieldConditionCreate>({
    mutationFn: (data: FieldConditionCreate) =>
      fieldConditionsApi.createFieldCondition(data),
    onSuccess: (newCondition) => {
      // Invalidate the list for the specific field to refetch
      queryClient.invalidateQueries({
        queryKey: FIELD_CONDITION_KEYS.listByField(newCondition.fieldId),
      });
      queryClient.setQueryData(
        FIELD_CONDITION_KEYS.listByField(newCondition.fieldId),
        (oldData: FieldCondition[] | undefined) => [
          ...(oldData || []),
          newCondition,
        ],
      );
    },
  });
};

// Add hooks for update/delete if you implement those API functions
export const useAllFieldConditions = () =>
  useQuery<FieldCondition[], ApiError>({
    queryKey: FIELD_CONDITION_KEYS.lists(),
    queryFn: () => fieldConditionsApi.getAllFieldConditions(),
  });

export const useFieldConditionById = (id: number) =>
  useQuery<FieldCondition, ApiError>({
    queryKey: ['fieldCondition', id],
    queryFn: () => fieldConditionsApi.getFieldConditionById(id),
    enabled: !!id,
  });

export const useDeleteFieldCondition = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, number>({
    mutationFn: (id: number) => fieldConditionsApi.deleteFieldCondition(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['fieldCondition', id] });

      queryClient.invalidateQueries({ queryKey: FIELD_CONDITION_KEYS.lists() });
    },
  });
};
