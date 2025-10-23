import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { irrigationApi } from '@/features/irrigation/api/irrigation.api';
import type { IrrigationRecommendation } from '@/models/irrigation/recommendation.model';
import type { WeeklyIrrigationSchedule } from '@/models/irrigation/schedule.model';
import type { ApiError } from '@/types/api-error.type';

// Ключі для кешу
const IRRIGATION_KEYS = {
  all: ['irrigation'] as const,
  recommendations: () => [...IRRIGATION_KEYS.all, 'recommendations'] as const,
  recommendation: (fieldId: number) =>
    [...IRRIGATION_KEYS.recommendations(), fieldId] as const,
  batchRecommendations: (fieldIds: number[]) =>
    [...IRRIGATION_KEYS.recommendations(), 'batch', fieldIds] as const,
  schedules: () => [...IRRIGATION_KEYS.all, 'schedules'] as const,
  weeklySchedule: (fieldId: number) =>
    [...IRRIGATION_KEYS.schedules(), 'weekly', fieldId] as const,
};

// Хук для отримання рекомендації для одного поля
export const useIrrigationRecommendation = (
  fieldId: number,
  includeForecast: boolean = true,
  forecastDays: number = 7,
) =>
  useQuery<IrrigationRecommendation, ApiError>({
    queryKey: IRRIGATION_KEYS.recommendation(fieldId),
    queryFn: () =>
      irrigationApi.getRecommendation(fieldId, includeForecast, forecastDays),
    enabled: !!fieldId,
  });

// Хук для отримання пакетних рекомендацій (використовуємо useMutation, оскільки це POST)
export const useBatchIrrigationRecommendations = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IrrigationRecommendation[],
    ApiError,
    { fieldIds: number[]; date?: string | null }
  >({
    mutationFn: (data) => irrigationApi.getBatchRecommendations(data),
    onSuccess: (data) => {
      // Оновлюємо кеш для кожної окремої рекомендації
      data.forEach((rec) => {
        queryClient.setQueryData(
          IRRIGATION_KEYS.recommendation(rec.fieldId),
          rec,
        );
      });
    },
  });
};

// Хук для отримання тижневого розкладу
export const useWeeklyIrrigationSchedule = (
  fieldId: number,
  startDate?: string | null,
) =>
  useQuery<WeeklyIrrigationSchedule, ApiError>({
    queryKey: IRRIGATION_KEYS.weeklySchedule(fieldId),
    queryFn: () => irrigationApi.getWeeklySchedule(fieldId, startDate),
    enabled: !!fieldId,
  });
