import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cropsApi } from '@/features/crops/api/crops.api.ts';
import type { Crop } from '@/models/crop/crop.model.ts';
import type { CropCreate, CropUpdate } from '@/models/crop/crop.model.ts';
import type { ApiError } from '@/types/api-error.type';

// Ключі для кешу
const CROP_KEYS = {
  all: ['crops'] as const,
  lists: () => [...CROP_KEYS.all, 'list'] as const,
  list: (filters?: object) => [...CROP_KEYS.lists(), { filters }] as const,
  details: () => [...CROP_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...CROP_KEYS.details(), id] as const,
};

export const useCrops = () =>
  useQuery<Crop[], ApiError>({
    queryKey: CROP_KEYS.lists(),
    queryFn: cropsApi.getCrops,
  });

export const useCrop = (id: number) =>
  useQuery<Crop, ApiError>({
    queryKey: CROP_KEYS.detail(id),
    queryFn: () => cropsApi.getCrop(id),
    enabled: !!id, // виконується тільки якщо id існує
  });

export const useCropByType = (type: string) =>
  useQuery<Crop[], ApiError>({
    queryKey: [...CROP_KEYS.lists(), 'type', type],
    queryFn: () => cropsApi.getCropsByType(type),
    enabled: !!type, // виконується тільки якщо type існує
  });

export const useCreateCrop = () => {
  const queryClient = useQueryClient();
  return useMutation<Crop, ApiError, CropCreate>({
    mutationFn: (data: CropCreate) => cropsApi.createCrop(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CROP_KEYS.lists() }); // оновлюємо список після створення
    },
  });
};

export const useUpdateCrop = () => {
  const queryClient = useQueryClient();
  return useMutation<Crop, ApiError, CropUpdate>({
    mutationFn: (data: CropUpdate) => cropsApi.updateCrop(data),
    onSuccess: (updatedCrop: Crop) => {
      // Оновлюємо кеш конкретного поля
      queryClient.setQueryData(CROP_KEYS.detail(updatedCrop.id), updatedCrop);
      // А також оновлюємо список
      queryClient.invalidateQueries({ queryKey: CROP_KEYS.lists() });
    },
  });
};

export const useDeleteCrop = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, number>({
    mutationFn: (id: number) => cropsApi.deleteCrop(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CROP_KEYS.lists() }); // оновлюємо список після видалення
      queryClient.removeQueries({ queryKey: CROP_KEYS.detail(id) }); // видаляємо кеш конкретного поля
    },
  });
};
