export interface WeatherConditions {
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  solarRadiation: number;
  precipitation: number;
}

export interface IrrigationForecast {
  date: string;
  eT0: number;
  eTc: number;
  expectedPrecipitation: number;
  netIrrigationRequirement: number;
  grossIrrigationRequirement: number;
}

export interface IrrigationRecommendation {
  fieldId: number;
  fieldName: string;
  date: string;
  eT0: number;
  kc: number;
  eTc: number;
  precipitation: number;
  effectivePrecipitation: number;
  netIrrigationRequirement: number;
  grossIrrigationRequirement: number;
  currentSoilMoisture: number;
  recommendedAction: string;
  cropStage: string;
  notes: string;
  weatherConditions: WeatherConditions;
  forecast: IrrigationForecast[] | null;
}
