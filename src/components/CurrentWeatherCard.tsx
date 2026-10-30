import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowUp, ArrowDown, Droplets, Wind, ShieldAlert } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import {
  getWeatherCondition,
  formatTemperature,
  formatTemperatureValue,
  formatWindSpeed,
  formatLocalDateTime,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcons';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, unit }) => {
  const { current, daily, location, timezone } = weather;
  const [currentLocalTime, setCurrentLocalTime] = useState<{
    timeStr: string;
    dateStr: string;
    dayStr: string;
  }>(() => formatLocalDateTime(new Date().toISOString(), timezone));

  // Keep the local clock updating every 30 seconds
  useEffect(() => {
    const updateTime = () => {
      setCurrentLocalTime(formatLocalDateTime(new Date().toISOString(), timezone));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [timezone]);

  const condition = getWeatherCondition(current.weather_code, true);
  const maxTemp = daily.temperature_2m_max[0];
  const minTemp = daily.temperature_2m_min[0];
  const rainProb = daily.precipitation_probability_max[0] ?? 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a]/90 via-[#151b2b]/95 to-[#080e1d]/90 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)]">
      {/* Ambient Atmospheric Bloom */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#38bdf8]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#f59e0b]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
        {/* Top Header: Location & Local Clock */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38bdf8]">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {[location.name, location.admin1].filter(Boolean).join(', ')}
              </span>
              {location.country_code && (
                <span className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded border border-white/10">
                  {location.country_code}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 font-display">
              {location.name}
              {location.country ? `, ${location.country}` : ''}
            </h1>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
              <span className="font-mono tabular-nums">
                {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E
              </span>
              <span>·</span>
              <span>{timezone}</span>
            </div>
          </div>

          {/* Local Time Tile */}
          <div className="flex items-center gap-2.5 sm:self-start bg-slate-800/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-right">
            <Clock className="w-4 h-4 text-[#38bdf8]" />
            <div>
              <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                {currentLocalTime.timeStr}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentLocalTime.dayStr}, {currentLocalTime.dateStr}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Main Meteorological Reading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Temperature Hero (7 cols) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-white/10 shrink-0 shadow-lg">
              <WeatherIcon name={condition.icon} className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_16px_rgba(56,189,248,0.3)]" />
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-6xl sm:text-7xl font-bold tracking-tighter text-white tabular-nums drop-shadow-md">
                  {formatTemperatureValue(current.temperature_2m, unit)}
                </span>
                <span className="text-3xl sm:text-4xl font-semibold text-[#38bdf8]">
                  °{unit}
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-semibold text-slate-100 mt-1">
                {condition.label}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                <span>
                  Feels like{' '}
                  <strong className="text-slate-200 font-semibold tabular-nums">
                    {formatTemperature(current.apparent_temperature, unit)}
                  </strong>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
                  <span className="tabular-nums font-semibold">{formatTemperature(maxTemp, unit)}</span>
                  <ArrowDown className="w-3.5 h-3.5 text-sky-400 ml-1" />
                  <span className="tabular-nums font-semibold">{formatTemperature(minTemp, unit)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {/* Humidity */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8]">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Humidity
                </div>
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {Math.round(current.relative_humidity_2m)}%
                </div>
              </div>
            </div>

            {/* Wind */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#93ccff]/15 text-[#93ccff]">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Wind Flow
                </div>
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {formatWindSpeed(current.wind_speed_10m, unit)}
                </div>
              </div>
            </div>

            {/* Rain Chance */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Precipitation
                </div>
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {rainProb}%
                </div>
              </div>
            </div>

            {/* UV Index */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  UV Index
                </div>
                <div className="text-lg font-bold text-white font-mono tabular-nums">
                  {current.uv_index.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Condition Narrative */}
        <div className="px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-xs text-slate-300">
          <p className="line-clamp-2">
            <strong className="text-[#38bdf8] font-semibold mr-1.5">Atmospheric Synopsis:</strong>
            {condition.description}
          </p>
        </div>
      </div>
    </div>
  );
};
