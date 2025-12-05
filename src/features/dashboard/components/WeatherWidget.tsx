// filepath: f:\Laern\SmartAgroPlan-Client\src\features\dashboard\components\WeatherWidget.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
  Loader2,
  MapPin,
  Eye,
  Gauge,
} from 'lucide-react';
import { useFields } from '@/features/fields/hooks/fields.hooks';
import type Field from '@/models/field/field.model';

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
  pressure: number;
  visibility: number;
  cloudCover: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const WeatherWidget: React.FC = () => {
  const { data: fields, isLoading: fieldsLoading } = useFields();
  const [selectedFieldId, setSelectedFieldId] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate center coordinates from GeoJSON boundary
  const getFieldCoordinates = (field: Field): Coordinates | null => {
    try {
      const geoJson = JSON.parse(field.boundaryGeoJson);
      if (geoJson.type === 'Polygon' && geoJson.coordinates?.[0]) {
        const coords = geoJson.coordinates[0];
        const lats = coords.map((c: number[]) => c[1]);
        const lngs = coords.map((c: number[]) => c[0]);
        return {
          latitude:
            lats.reduce((a: number, b: number) => a + b, 0) / lats.length,
          longitude:
            lngs.reduce((a: number, b: number) => a + b, 0) / lngs.length,
        };
      }
    } catch (e) {
      console.error('Error parsing GeoJSON:', e);
    }
    return null;
  };

  // Fetch weather data from Open Meteo API
  const fetchWeatherData = async (coordinates: Coordinates) => {
    setIsLoadingWeather(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,visibility&timezone=auto`,
      );

      if (!response.ok) throw new Error('Не вдалося отримати дані погоди');

      const data = await response.json();
      const current = data.current;

      setWeatherData({
        temperature: Math.round(current.temperature_2m),
        apparentTemperature: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        windDirection: current.wind_direction_10m,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
        pressure: Math.round(current.surface_pressure),
        visibility: Math.round(current.visibility / 1000), // Convert to km
        cloudCover: current.cloud_cover,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Помилка завантаження погоди',
      );
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Auto-select first field if available
  useEffect(() => {
    if (fields && fields.length > 0 && !selectedFieldId) {
      setSelectedFieldId(fields[0].id.toString());
    }
  }, [fields, selectedFieldId]);

  // Fetch weather when field is selected
  useEffect(() => {
    if (selectedFieldId && fields) {
      const field = fields.find((f) => f.id.toString() === selectedFieldId);
      if (field) {
        const coords = getFieldCoordinates(field);
        if (coords) {
          fetchWeatherData(coords);
        }
      }
    }
  }, [selectedFieldId, fields]);

  // Get weather condition details based on WMO Weather interpretation codes
  const getWeatherCondition = (code: number) => {
    const conditions: Record<
      number,
      {
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        gradient: string;
      }
    > = {
      0: {
        label: 'Ясно',
        icon: Sun,
        gradient:
          'from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
      },
      1: {
        label: 'Переважно ясно',
        icon: Sun,
        gradient:
          'from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
      },
      2: {
        label: 'Хмарно',
        icon: Cloud,
        gradient:
          'from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20',
      },
      3: {
        label: 'Похмуро',
        icon: Cloud,
        gradient:
          'from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20',
      },
      45: {
        label: 'Туман',
        icon: CloudFog,
        gradient:
          'from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20',
      },
      48: {
        label: 'Туман з інеєм',
        icon: CloudFog,
        gradient:
          'from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20',
      },
      51: {
        label: 'Морось',
        icon: CloudDrizzle,
        gradient:
          'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      },
      53: {
        label: 'Морось',
        icon: CloudDrizzle,
        gradient:
          'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      },
      55: {
        label: 'Сильна морось',
        icon: CloudDrizzle,
        gradient:
          'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      },
      61: {
        label: 'Невеликий дощ',
        icon: CloudRain,
        gradient:
          'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      },
      63: {
        label: 'Дощ',
        icon: CloudRain,
        gradient:
          'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      },
      65: {
        label: 'Сильний дощ',
        icon: CloudRain,
        gradient:
          'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      },
      71: {
        label: 'Невеликий сніг',
        icon: CloudSnow,
        gradient:
          'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      },
      73: {
        label: 'Сніг',
        icon: CloudSnow,
        gradient:
          'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      },
      75: {
        label: 'Сильний сніг',
        icon: CloudSnow,
        gradient:
          'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      },
      80: {
        label: 'Злива',
        icon: CloudRain,
        gradient:
          'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      },
      81: {
        label: 'Злива',
        icon: CloudRain,
        gradient:
          'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      },
      82: {
        label: 'Сильна злива',
        icon: CloudRain,
        gradient:
          'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      },
      95: {
        label: 'Гроза',
        icon: CloudRain,
        gradient:
          'from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20',
      },
      96: {
        label: 'Гроза з градом',
        icon: CloudRain,
        gradient:
          'from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20',
      },
      99: {
        label: 'Гроза з градом',
        icon: CloudRain,
        gradient:
          'from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20',
      },
    };
    return conditions[code] || conditions[0];
  };

  const selectedField = fields?.find(
    (f) => f.id.toString() === selectedFieldId,
  );
  const weatherCondition = weatherData
    ? getWeatherCondition(weatherData.weatherCode)
    : null;
  const WeatherIcon = weatherCondition?.icon || Sun;

  return (
    <Card
      className={`border-2 shadow-xl bg-gradient-to-br ${weatherCondition?.gradient || 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20'} h-full flex flex-col transition-all duration-300`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <WeatherIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Погода
          </CardTitle>

          {/* Field Selector */}
          <Select value={selectedFieldId} onValueChange={setSelectedFieldId}>
            <SelectTrigger className="w-[180px] h-9 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Виберіть поле" />
            </SelectTrigger>
            <SelectContent>
              {fieldsLoading ? (
                <SelectItem value="loading" disabled>
                  Завантаження...
                </SelectItem>
              ) : fields && fields.length > 0 ? (
                fields.map((field) => (
                  <SelectItem key={field.id} value={field.id.toString()}>
                    {field.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-fields" disabled>
                  Немає полів
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Field Location */}
        {selectedField && (
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
            <MapPin className="h-3 w-3" />
            <span>{selectedField.location}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {isLoadingWeather ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500 text-sm">
            {error}
          </div>
        ) : weatherData && weatherCondition ? (
          <div className="flex flex-col h-full justify-between gap-3">
            {/* Main Temperature Display */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold text-gray-900 dark:text-white">
                  {weatherData.temperature}°C
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Відчувається як {weatherData.apparentTemperature}°C
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mt-1 font-medium">
                  {weatherCondition.label}
                </div>
              </div>
              <WeatherIcon className="h-20 w-20 text-yellow-500 dark:text-yellow-400" />
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <Droplets className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Вологість
                </div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">
                  {weatherData.humidity}%
                </div>
              </div>
              <div className="text-center">
                <Wind className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Вітер
                </div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">
                  {weatherData.windSpeed} км/г
                </div>
              </div>
              <div className="text-center">
                <CloudRain className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Опади
                </div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">
                  {weatherData.precipitation} мм
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <Gauge className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Тиск
                </div>
                <div className="font-semibold text-xs text-gray-900 dark:text-white">
                  {weatherData.pressure} гПа
                </div>
              </div>
              <div className="text-center">
                <Eye className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Видимість
                </div>
                <div className="font-semibold text-xs text-gray-900 dark:text-white">
                  {weatherData.visibility} км
                </div>
              </div>
              <div className="text-center">
                <Cloud className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Хмарність
                </div>
                <div className="font-semibold text-xs text-gray-900 dark:text-white">
                  {weatherData.cloudCover}%
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Виберіть поле для перегляду погоди
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
