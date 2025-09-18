import { useQuery } from '@tanstack/react-query';
import { soilsApi } from '@/features/fields/api/soils.api';

// Ключі для кешу
const SOIL_KEYS = {
  all: ['soils'] as const,
  lists: () => [...SOIL_KEYS.all, 'list'] as const,
  list: (filters?: object) => [...SOIL_KEYS.lists(), { filters }] as const,
  details: () => [...SOIL_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...SOIL_KEYS.details(), id] as const,
};

export const useSoils = () =>
  useQuery({
    queryKey: SOIL_KEYS.lists(),
    queryFn: soilsApi.getSoils,
  });

export const useSoil = (id: number) =>
  useQuery({
    queryKey: SOIL_KEYS.detail(id),
    queryFn: () => soilsApi.getSoil(id),
    enabled: !!id, // виконується тільки якщо id існує
  });

export const useSoilByType = (type: string) =>
  useQuery({
    queryKey: [...SOIL_KEYS.lists(), 'type', type],
    queryFn: () => soilsApi.getSoilByType(type),
    enabled: !!type, // виконується тільки якщо type існує
  });
