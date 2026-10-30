import React, { useState } from 'react';
import { Calendar, Droplets, Sun, Moon, Wind, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { DailyForecastData, TemperatureUnit } from '../types/weather';
import {
  formatDayCard,
  formatTemperature,
  formatTemperatureValue,
  getWeatherCondition,
  getUvCategory,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcons';

interface SevenDayForecastProps {
  daily: DailyForecastData;
  unit: TemperatureUnit;
  timezone: string;
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({ daily, unit, timezone }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Overall min and max across all 7 days to calibrate relative temperature bars
  const allMins = daily.temperature_2m_min.map((t) => formatTemperatureValue(t, unit));
  const allMaxs = daily.temperature_2m_max.map((t) => formatTemperatureValue(t, unit));
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const globalRange = Math.max(1, globalMax - globalMin);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#38bdf8]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
            7-Day Synoptic Outlook
          </h2>
        </div>
        <span className="text-xs text-slate-400">Click day for full breakdown</span>
      </div>

      <div className="space-y-2">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const { dayName, formattedDate } = formatDayCard(dateStr, idx, timezone);
          const weatherCode = daily.weather_code[idx];
          const condition = getWeatherCondition(weatherCode, true);
          const maxVal = formatTemperatureValue(daily.temperature_2m_max[idx], unit);
          const minVal = formatTemperatureValue(daily.temperature_2m_min[idx], unit);
          const rainProb = daily.precipitation_probability_max[idx] ?? 0;
          const uvMax = daily.uv_index_max?.[idx] ?? 0;
          const sunrise = daily.sunrise?.[idx]?.split('T')[1] || '--:--';
          const sunset = daily.sunset?.[idx]?.split('T')[1] || '--:--';

          const isExpanded = expandedIndex === idx;

          // Bar positioning percentage
          const leftPercent = Math.max(0, Math.min(100, ((minVal - globalMin) / globalRange) * 100));
          const widthPercent = Math.max(6, Math.min(100 - leftPercent, ((maxVal - minVal) / globalRange) * 100));

          return (
            <div
              key={dateStr}
              className={`rounded-xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-800/80 border-[#38bdf8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/15 hover:bg-slate-800/40'
              }`}
            >
              {/* Row Header */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left transition-colors"
              >
                {/* Day & Date + Condition */}
                <div className="flex items-center gap-3 min-w-[150px]">
                  <WeatherIcon name={condition.icon} className="w-7 h-7 shrink-0 drop-shadow" />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{dayName}</span>
                      {idx === 0 && (
                        <span className="text-[10px] font-semibold text-[#38bdf8] bg-[#38bdf8]/10 px-1.5 py-0.2 rounded border border-[#38bdf8]/20">
                          TODAY
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{formattedDate}</div>
                  </div>
                </div>

                {/* Condition Label & Rain */}
                <div className="flex items-center gap-3 sm:w-44">
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {condition.label}
                  </span>
                  {rainProb > 0 ? (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-[#38bdf8] shrink-0 font-mono tabular-nums">
                      <Droplets className="w-3 h-3" />
                      {rainProb}%
                    </span>
                  ) : null}
                </div>

                {/* Temperature Range Bar */}
                <div className="flex items-center gap-3 grow max-w-xs">
                  <span className="text-xs font-mono font-medium text-sky-300 w-8 text-right tabular-nums">
                    {minVal}°
                  </span>

                  <div className="relative h-2 grow bg-slate-800 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-[#38bdf8] to-amber-400"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs font-mono font-bold text-white w-8 tabular-nums">
                    {maxVal}°
                  </span>
                </div>

                {/* Expand Indicator */}
                <div className="text-slate-400 hidden sm:block">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Details Drawer */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-white/10 bg-slate-950/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                    <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      Sunrise
                    </div>
                    <div className="text-white font-mono font-bold mt-1 tabular-nums">{sunrise}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                    <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      Sunset
                    </div>
                    <div className="text-white font-mono font-bold mt-1 tabular-nums">{sunset}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                    <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      Max UV Index
                    </div>
                    <div className="text-white font-mono font-bold mt-1 tabular-nums">
                      {uvMax.toFixed(1)}{' '}
                      <span className={`text-[10px] font-normal ${getUvCategory(uvMax).color}`}>
                        ({getUvCategory(uvMax).level})
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                    <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
                      <Droplets className="w-3.5 h-3.5 text-[#38bdf8]" />
                      Precipitation Peak
                    </div>
                    <div className="text-white font-mono font-bold mt-1 tabular-nums">
                      {rainProb}% chance
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
