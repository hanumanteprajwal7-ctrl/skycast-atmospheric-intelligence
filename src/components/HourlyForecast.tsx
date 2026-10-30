import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Droplets } from 'lucide-react';
import { HourlyForecastData, TemperatureUnit } from '../types/weather';
import {
  formatHourTime,
  formatTemperature,
  getWeatherCondition,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcons';

interface HourlyForecastProps {
  hourly: HourlyForecastData;
  unit: TemperatureUnit;
  timezone: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, unit, timezone }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // We want the next 24 hourly periods starting from current local hour
  // Find index of current hour or closest hour
  const now = new Date();
  const currentIsoPrefix = now.toISOString().slice(0, 13); // 'YYYY-MM-DDTHH'

  let startIndex = hourly.time.findIndex((t) => t.startsWith(currentIsoPrefix));
  if (startIndex === -1) startIndex = 0;

  const next24Hours = hourly.time.slice(startIndex, startIndex + 24).map((time, idx) => {
    const originalIdx = startIndex + idx;
    return {
      time,
      temp: hourly.temperature_2m[originalIdx],
      weatherCode: hourly.weather_code[originalIdx],
      precipitationProb: hourly.precipitation_probability[originalIdx] ?? 0,
      windSpeed: hourly.wind_speed_10m[originalIdx],
      isFirst: idx === 0,
    };
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
            24-Hour Horizon Forecast
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hourly temperature progression & precipitative likelihood
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2.5 overflow-x-auto pb-3 custom-scrollbar scroll-smooth"
      >
        {next24Hours.map((item, idx) => {
          const condition = getWeatherCondition(item.weatherCode, true);
          const timeLabel = item.isFirst ? 'Now' : formatHourTime(item.time, timezone);

          return (
            <div
              key={item.time}
              className={`flex flex-col items-center justify-between min-w-[72px] sm:min-w-[80px] py-3.5 px-2 rounded-xl transition-all select-none ${
                item.isFirst
                  ? 'bg-gradient-to-b from-[#38bdf8]/20 to-[#0f172a] border border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-800/40 border border-white/5 hover:border-white/15 hover:bg-slate-800/60'
              }`}
            >
              {/* Time */}
              <span
                className={`text-xs font-semibold whitespace-nowrap tabular-nums ${
                  item.isFirst ? 'text-[#38bdf8]' : 'text-slate-300'
                }`}
              >
                {timeLabel}
              </span>

              {/* Weather Icon */}
              <div className="my-2.5">
                <WeatherIcon name={condition.icon} className="w-8 h-8 drop-shadow" />
              </div>

              {/* Precipitation Chance */}
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#38bdf8] min-h-[16px]">
                {item.precipitationProb > 0 ? (
                  <>
                    <Droplets className="w-2.5 h-2.5" />
                    <span className="tabular-nums">{item.precipitationProb}%</span>
                  </>
                ) : (
                  <span className="text-slate-600">--</span>
                )}
              </div>

              {/* Temperature */}
              <span className="text-sm font-bold text-white mt-1.5 font-display tabular-nums">
                {formatTemperature(item.temp, unit)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
