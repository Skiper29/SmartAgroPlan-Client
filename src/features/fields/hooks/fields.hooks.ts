import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fieldsApi } from '@/features/fields/api/fields.api';
import type Field from '@/models/field/field.model';
import type { FieldCreate, FieldUpdate } from '@/models/field/field.model';
import type { ApiError } from '@/types/api-error.type';

// Ключі для кешу
const FIELD_KEYS = {
  all: ['fields'] as const,
  lists: () => [...FIELD_KEYS.all, 'list'] as const,
  list: (filters?: object) => [...FIELD_KEYS.lists(), { filters }] as const,
  details: () => [...FIELD_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...FIELD_KEYS.details(), id] as const,
};

export const useFields = () =>
  useQuery<Field[], ApiError>({
    queryKey: FIELD_KEYS.lists(),
    queryFn: fieldsApi.getFields,
  });

export const useField = (id: number) =>
  useQuery<Field, ApiError>({
    queryKey: FIELD_KEYS.detail(id),
    queryFn: () => fieldsApi.getField(id),
    enabled: !!id, // виконується тільки якщо id існує
  });

export const useCreateField = () => {
  const queryClient = useQueryClient();
  return useMutation<Field, ApiError, FieldCreate>({
    mutationFn: (data: FieldCreate) => fieldsApi.createField(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FIELD_KEYS.lists() }); // оновлюємо список після створення
    },
  });
};

export const useUpdateField = () => {
  const queryClient = useQueryClient();
  return useMutation<Field, ApiError, FieldUpdate>({
    mutationFn: (data: FieldUpdate) => fieldsApi.updateField(data),
    onSuccess: (updatedField: Field) => {
      // Оновлюємо кеш конкретного поля
      queryClient.setQueryData(
        FIELD_KEYS.detail(updatedField.id),
        updatedField,
      );
      // А також оновлюємо список
      queryClient.invalidateQueries({ queryKey: FIELD_KEYS.lists() });
    },
  });
};

export const useDeleteField = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, number>({
    mutationFn: (id: number) => fieldsApi.deleteField(id),
    onSuccess: (_, id) => {
      // Видаляємо з кешу конкретне поле
      queryClient.removeQueries({ queryKey: FIELD_KEYS.detail(id) });
      // І оновлюємо список
      queryClient.invalidateQueries({ queryKey: FIELD_KEYS.lists() });
    },
  });
};
