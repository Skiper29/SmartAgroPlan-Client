import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import { useBatchIrrigationRecommendations } from '@/features/irrigation/hooks/irrigation.hooks';
import { fertilizerApplicationsApi } from '@/features/fertilizer/api/fertilizer-applications.api';
import {
  generateIrrigationNotifications,
  generateFertilizerNotifications,
  generateWeatherAlerts,
  generateCropNotifications,
  combineAndSortNotifications,
  formatNotificationTime,
  type Notification,
} from '@/features/dashboard/services/notification.service';
import type { FertilizerApplication } from '@/models/fertilizer';

const AlertsNotificationsCard: React.FC = () => {
  const { data: fields, isLoading: fieldsLoading } = useFields();
  const {
    mutate: fetchIrrigationRecs,
    data: irrigationData,
    isPending: irrigationLoading,
  } = useBatchIrrigationRecommendations();

  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    precipitation: number;
    windSpeed: number;
    weatherCode: number;
  } | null>(null);
  const [upcomingFertilizer, setUpcomingFertilizer] = useState<
    FertilizerApplication[]
  >([]);
  const [fertilizerLoading, setFertilizerLoading] = useState(false);

  // Fetch irrigation recommendations when fields are loaded
  useEffect(() => {
    if (fields && fields.length > 0) {
      const fieldIds = fields.map((f) => f.id);
      fetchIrrigationRecs({ fieldIds });
    }
  }, [fields, fetchIrrigationRecs]);

  // Fetch upcoming fertilizer applications for all fields
  useEffect(() => {
    if (fields && fields.length > 0) {
      setFertilizerLoading(true);
      Promise.all(
        fields.map((field) =>
          fertilizerApplicationsApi
            .getUpcomingApplications(field.id, 7)
            .catch(() => []),
        ),
      )
        .then((results) => {
          const allApplications = results.flat();
          setUpcomingFertilizer(allApplications);
        })
        .catch((err) =>
          console.error('Error fetching fertilizer applications:', err),
        )
        .finally(() => setFertilizerLoading(false));
    }
  }, [fields]);

  // Generate all notifications
  const allNotifications = useMemo(() => {
    const notifications: Notification[] = [];

    // Irrigation notifications
    if (irrigationData) {
      notifications.push(...generateIrrigationNotifications(irrigationData));
    }

    // Fertilizer notifications
    if (upcomingFertilizer) {
      notifications.push(
        ...generateFertilizerNotifications(upcomingFertilizer),
      );
    }

    // Weather alerts
    if (weatherData) {
      notifications.push(...generateWeatherAlerts(weatherData));
    }

    // Crop notifications
    if (fields) {
      notifications.push(...generateCropNotifications(fields));
    }

    // Combine and sort
    const sorted = combineAndSortNotifications(notifications);

    // Filter out dismissed notifications
    return sorted.filter((n) => !dismissedIds.has(n.id));
  }, [irrigationData, upcomingFertilizer, fields, weatherData, dismissedIds]);

  // Take only first field's weather for alerts (you can modify this logic)
  useEffect(() => {
    if (fields && fields.length > 0) {
      const field = fields[0];
      try {
        const geoJson = JSON.parse(field.boundaryGeoJson);
        if (geoJson.type === 'Polygon' && geoJson.coordinates?.[0]) {
          const coords = geoJson.coordinates[0];
          const lats = coords.map((c: number[]) => c[1]);
          const lngs = coords.map((c: number[]) => c[0]);
          const lat =
            lats.reduce((a: number, b: number) => a + b, 0) / lats.length;
          const lng =
            lngs.reduce((a: number, b: number) => a + b, 0) / lngs.length;

          // Fetch weather for alerts
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`,
          )
            .then((res) => res.json())
            .then((data) => {
              setWeatherData({
                temperature: data.current.temperature_2m,
                precipitation: data.current.precipitation,
                windSpeed: data.current.wind_speed_10m,
                weatherCode: data.current.weather_code,
              });
            })
            .catch((err) => console.error('Weather fetch error:', err));
        }
      } catch (e) {
        console.error('Error parsing GeoJSON:', e);
      }
    }
  }, [fields]);

  const isLoading = fieldsLoading || irrigationLoading || fertilizerLoading;

  const getAlertIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
      case 'error':
        return AlertTriangle;
      case 'info':
        return Info;
      case 'success':
        return CheckCircle;
    }
  };

  const getAlertColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      case 'success':
        return 'text-green-600 dark:text-green-400';
    }
  };

  const dismissAlert = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id));
  };

  if (isLoading) {
    return (
      <Card className="border-2 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
            Сповіщення
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500 dark:text-gray-400">
              Завантаження сповіщень...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (allNotifications.length === 0) {
    return (
      <Card className="border-2 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
            Сповіщення
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-300 dark:text-green-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Немає нових сповіщень
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
            Сповіщення
            {allNotifications.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {allNotifications.length}
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {allNotifications.map((notification) => {
            const Icon = getAlertIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={cn(
                  'p-4 rounded-lg border-l-4 transition-all hover:shadow-md',
                  getAlertColor(notification.type),
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon
                      className={cn(
                        'h-5 w-5 mt-0.5 flex-shrink-0',
                        getIconColor(notification.type),
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {formatNotificationTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(notification.id)}
                    className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsNotificationsCard;
