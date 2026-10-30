export interface GeoLocationItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  uv_index: number;
}

export interface HourlyForecastData {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  visibility: number[];
}

export interface DailyForecastData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  severity: 'Warning' | 'Watch' | 'Advisory' | 'Emergency' | 'Information';
  description: string;
  instruction?: string;
  senderName: string;
  effective?: string;
  expires?: string;
  source: 'Open-Meteo Atmospheric Telemetry' | 'National Weather Service' | 'WMO Severe Weather Protocol';
}

export interface WeatherData {
  location: GeoLocationItem;
  timezone: string;
  utc_offset_seconds: number;
  current: CurrentWeather;
  hourly: HourlyForecastData;
  daily: DailyForecastData;
  alerts: WeatherAlert[];
  lastUpdated: string;
}

export type TemperatureUnit = 'C' | 'F';
export type AppTheme = 'dark' | 'light';
