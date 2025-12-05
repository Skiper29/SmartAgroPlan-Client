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

// Хук для отримання пакетних рекомендацій (тепер використовуємо useQuery з кешуванням)
export const useBatchIrrigationRecommendations = (
  fieldIds: number[],
  date?: string | null,
  enabled: boolean = true,
) => {
  const queryClient = useQueryClient();

  return useQuery<IrrigationRecommendation[], ApiError>({
    queryKey: IRRIGATION_KEYS.batchRecommendations(fieldIds),
    queryFn: async () => {
      const data = await irrigationApi.getBatchRecommendations({
        fieldIds,
        date,
      });

      // Оновлюємо кеш для кожної окремої рекомендації після отримання даних
      data.forEach((rec) => {
        queryClient.setQueryData(
          IRRIGATION_KEYS.recommendation(rec.fieldId),
          rec,
        );
      });

      return data;
    },
    enabled: enabled && fieldIds.length > 0,
    staleTime: 30 * 1000, // 30 seconds - data stays fresh for 30 seconds
    gcTime: 30 * 1000, // 30 seconds - cache persists for 5 minutes (formerly cacheTime)
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });
};

// Хук для отримання пакетних рекомендацій як мутація (для випадків, коли потрібно викликати вручну)
export const useBatchIrrigationRecommendationsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IrrigationRecommendation[],
    ApiError,
    { fieldIds: number[]; date?: string | null }
  >({
    mutationFn: (data) => irrigationApi.getBatchRecommendations(data),
    onSuccess: (data, variables) => {
      // Оновлюємо кеш для batch запиту
      queryClient.setQueryData(
        IRRIGATION_KEYS.batchRecommendations(variables.fieldIds),
        data,
      );
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
