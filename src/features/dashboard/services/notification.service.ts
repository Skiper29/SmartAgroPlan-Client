// filepath: f:\Laern\SmartAgroPlan-Client\src\features\dashboard\services\notification.service.ts
import type Field from '@/models/field/field.model';
import type { IrrigationRecommendation } from '@/models/irrigation/recommendation.model';
import type { FertilizerApplication } from '@/models/fertilizer';

export interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  fieldId?: number;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Generate notifications from irrigation recommendations
 */
export const generateIrrigationNotifications = (
  recommendations: IrrigationRecommendation[],
): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  recommendations.forEach((rec) => {
    // Critical irrigation needed (high requirement)
    if (rec.grossIrrigationRequirement > 30) {
      notifications.push({
        id: `irrigation-critical-${rec.fieldId}`,
        type: 'error',
        title: 'Терміново потрібен полив',
        message: `Поле "${rec.fieldName}" потребує негайного поливу: ${Math.round(rec.grossIrrigationRequirement)} мм води`,
        timestamp: now,
        fieldId: rec.fieldId,
        priority: 'high',
      });
    }
    // High irrigation needed
    else if (rec.grossIrrigationRequirement > 15) {
      notifications.push({
        id: `irrigation-high-${rec.fieldId}`,
        type: 'warning',
        title: 'Рекомендовано полив',
        message: `Поле "${rec.fieldName}" потребує поливу: ${Math.round(rec.grossIrrigationRequirement)} мм води`,
        timestamp: now,
        fieldId: rec.fieldId,
        priority: 'medium',
      });
    }
    // Low soil moisture warning
    else if (rec.currentSoilMoisture < 40) {
      notifications.push({
        id: `moisture-low-${rec.fieldId}`,
        type: 'warning',
        title: 'Низька вологість ґрунту',
        message: `Поле "${rec.fieldName}": вологість ${rec.currentSoilMoisture}%. Слідкуйте за станом`,
        timestamp: now,
        fieldId: rec.fieldId,
        priority: 'low',
      });
    }
    // Good conditions info
    else if (
      rec.currentSoilMoisture > 70 &&
      rec.grossIrrigationRequirement < 5
    ) {
      notifications.push({
        id: `conditions-good-${rec.fieldId}`,
        type: 'success',
        title: 'Оптимальні умови',
        message: `Поле "${rec.fieldName}": вологість ${rec.currentSoilMoisture}%. Полив не потрібен`,
        timestamp: now,
        fieldId: rec.fieldId,
        priority: 'low',
      });
    }

    // Weather-based alerts
    if (rec.forecast && rec.forecast.length > 0) {
      const upcomingRain = rec.forecast
        .slice(0, 3)
        .some((f) => f.expectedPrecipitation > 10);
      if (upcomingRain && rec.grossIrrigationRequirement > 10) {
        notifications.push({
          id: `weather-rain-${rec.fieldId}`,
          type: 'info',
          title: 'Очікуються опади',
          message: `Поле "${rec.fieldName}": прогнозується дощ найближчим часом. Можна відкласти полив`,
          timestamp: now,
          fieldId: rec.fieldId,
          priority: 'medium',
        });
      }
    }

    // Temperature extremes
    if (rec.weatherConditions.maxTemperature > 35) {
      notifications.push({
        id: `weather-heat-${rec.fieldId}`,
        type: 'warning',
        title: 'Висока температура',
        message: `Поле "${rec.fieldName}": очікується спека до ${Math.round(rec.weatherConditions.maxTemperature)}°C. Збільште полив`,
        timestamp: now,
        fieldId: rec.fieldId,
        priority: 'medium',
      });
    }
  });

  return notifications;
};

/**
 * Generate notifications from fertilizer applications
 */
export const generateFertilizerNotifications = (
  applications: FertilizerApplication[],
): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  applications.forEach((app) => {
    if (!app.id || app.isCompleted) return;

    const scheduledDate = new Date(app.recommendedDate);
    const daysUntil = Math.ceil(
      (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Get product names
    const productNames = app.products.map((p) => p.product.name).join(', ');
    const totalQuantity = app.products.reduce(
      (sum, p) => sum + p.quantityKgPerHa,
      0,
    );

    // Overdue application
    if (daysUntil < 0) {
      notifications.push({
        id: `fertilizer-overdue-${app.id}`,
        type: 'error',
        title: 'Прострочене внесення добрив',
        message: `Внесення ${productNames} прострочено на ${Math.abs(daysUntil)} днів (${app.cropStage})`,
        timestamp: now,
        priority: 'high',
      });
    }
    // Today's application
    else if (daysUntil === 0) {
      notifications.push({
        id: `fertilizer-today-${app.id}`,
        type: 'warning',
        title: 'Внесення добрив сьогодні',
        message: `Заплановано внесення: ${productNames} (${Math.round(totalQuantity)} кг/га)`,
        timestamp: now,
        priority: 'high',
      });
    }
    // Tomorrow's application
    else if (daysUntil === 1) {
      notifications.push({
        id: `fertilizer-tomorrow-${app.id}`,
        type: 'warning',
        title: 'Внесення добрив завтра',
        message: `Завтра: ${productNames} (${Math.round(totalQuantity)} кг/га) - ${app.cropStage}`,
        timestamp: now,
        priority: 'medium',
      });
    }
    // Upcoming in 3 days
    else if (daysUntil <= 3) {
      notifications.push({
        id: `fertilizer-upcoming-${app.id}`,
        type: 'info',
        title: 'Найближче внесення добрив',
        message: `Через ${daysUntil} днів: ${productNames} (${Math.round(totalQuantity)} кг/га)`,
        timestamp: now,
        priority: 'low',
      });
    }
    // Upcoming in a week
    else if (daysUntil <= 7) {
      notifications.push({
        id: `fertilizer-week-${app.id}`,
        type: 'info',
        title: 'Заплановане внесення',
        message: `Через ${daysUntil} днів: ${productNames} - ${app.cropStage}`,
        timestamp: now,
        priority: 'low',
      });
    }
  });

  return notifications;
};

/**
 * Generate weather-based alerts
 */
export const generateWeatherAlerts = (weatherData?: {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
}): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  if (!weatherData) return notifications;

  // Frost warning
  if (weatherData.temperature < 0) {
    notifications.push({
      id: 'weather-frost',
      type: 'error',
      title: 'Попередження про заморозки',
      message: `Температура нижче 0°C (${Math.round(weatherData.temperature)}°C). Вживіть заходів захисту посівів`,
      timestamp: now,
      priority: 'high',
    });
  }

  // Heavy rain warning
  if (weatherData.precipitation > 20) {
    notifications.push({
      id: 'weather-rain-heavy',
      type: 'warning',
      title: 'Сильні опади',
      message: `Очікується ${Math.round(weatherData.precipitation)} мм опадів. Відкладіть польові роботи`,
      timestamp: now,
      priority: 'high',
    });
  }

  // Strong wind warning
  if (weatherData.windSpeed > 50) {
    notifications.push({
      id: 'weather-wind',
      type: 'warning',
      title: 'Сильний вітер',
      message: `Швидкість вітру ${Math.round(weatherData.windSpeed)} км/год. Обережно з обприскуванням`,
      timestamp: now,
      priority: 'medium',
    });
  }

  // Thunderstorm warning (weather codes 95-99)
  if (weatherData.weatherCode >= 95) {
    notifications.push({
      id: 'weather-storm',
      type: 'error',
      title: 'Попередження про грозу',
      message:
        'Очікується гроза. Припиніть польові роботи і забезпечте безпеку',
      timestamp: now,
      priority: 'high',
    });
  }

  return notifications;
};

/**
 * Generate crop-based notifications
 */
export const generateCropNotifications = (fields: Field[]): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  fields.forEach((field) => {
    if (!field.currentCrop || !field.sowingDate) return;

    const sowingDate = new Date(field.sowingDate);
    const daysFromSowing = Math.ceil(
      (now.getTime() - sowingDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Early growth stage notifications (first 2 weeks)
    if (daysFromSowing <= 14 && daysFromSowing > 0) {
      notifications.push({
        id: `crop-early-${field.id}`,
        type: 'info',
        title: 'Рання фаза розвитку',
        message: `Поле "${field.name}" (${field.currentCrop.name}): ${daysFromSowing} днів від сівби. Контролюйте вологість`,
        timestamp: now,
        fieldId: field.id,
        priority: 'low',
      });
    }

    // Critical growth period (3-6 weeks for most crops)
    if (daysFromSowing >= 21 && daysFromSowing <= 42) {
      notifications.push({
        id: `crop-critical-${field.id}`,
        type: 'warning',
        title: 'Критична фаза росту',
        message: `Поле "${field.name}" (${field.currentCrop.name}): критичний період розвитку. Забезпечте оптимальні умови`,
        timestamp: now,
        fieldId: field.id,
        priority: 'medium',
      });
    }

    const expectedDays = field.currentCrop.growingDuration;
    const daysToHarvest = expectedDays - daysFromSowing;

    if (daysToHarvest > 0 && daysToHarvest <= 14) {
      notifications.push({
        id: `crop-harvest-${field.id}`,
        type: 'info',
        title: 'Наближається збір урожаю',
        message: `Поле "${field.name}" (${field.currentCrop.name}): очікуваний збір через ~${daysToHarvest} днів`,
        timestamp: now,
        fieldId: field.id,
        priority: 'medium',
      });
    }
  });

  return notifications;
};

/**
 * Combine all notifications and sort by priority and timestamp
 */
export const combineAndSortNotifications = (
  ...notificationArrays: Notification[][]
): Notification[] => {
  const all = notificationArrays.flat();

  // Remove duplicates by id
  const unique = Array.from(new Map(all.map((n) => [n.id, n])).values());

  // Sort by priority and then by timestamp
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  return unique.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
};

/**
 * Format timestamp to human-readable format
 */
export const formatNotificationTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Щойно';
  if (diffMins < 60) return `${diffMins} хв тому`;
  if (diffHours < 24) return `${diffHours} год тому`;
  if (diffDays === 1) return 'Вчора';
  if (diffDays < 7) return `${diffDays} дн тому`;

  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
};
