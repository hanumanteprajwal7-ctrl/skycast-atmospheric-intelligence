import React from 'react';
import {
  Compass,
  Droplets,
  Eye,
  Gauge,
  SunMedium,
  CloudRain,
  Sunrise,
  Sunset,
  Wind,
} from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import {
  formatWindSpeed,
  getWindDirectionCompass,
  getUvCategory,
  calculateDewPoint,
  formatVisibility,
  formatPressure,
  calculateSunProgress,
} from '../utils/weatherUtils';

interface AtmosphericGaugesProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export const AtmosphericGauges: React.FC<AtmosphericGaugesProps> = ({ weather, unit }) => {
  const { current, daily, hourly } = weather;

  // Hourly visibility from current hour
  const currentVisibilityMeters = hourly.visibility?.[0] ?? 10000;
  const visibilityInfo = formatVisibility(currentVisibilityMeters, unit);

  // Pressure
  const pressureInfo = formatPressure(current.surface_pressure, unit);

  // Dew point
  const dewPointC = calculateDewPoint(current.temperature_2m, current.relative_humidity_2m);
  const dewPointDisplay = unit === 'F' ? Math.round((dewPointC * 9) / 5 + 32) : dewPointC;

  // UV
  const uvInfo = getUvCategory(current.uv_index);

  // Solar progress
  const sunriseIso = daily.sunrise?.[0];
  const sunsetIso = daily.sunset?.[0];
  const solarData = calculateSunProgress(sunriseIso, sunsetIso, current.time);

  // Compass degrees
  const windDegrees = current.wind_direction_10m ?? 0;
  const windDirLabel = getWindDirectionCompass(windDegrees);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* 1. Wind & Compass Rose Card */}
      <div className="p-5 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Wind className="w-4 h-4 text-[#38bdf8]" />
            <span>Wind Telemetry</span>
          </div>
          <span className="text-xs font-mono font-semibold text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">
            {windDirLabel} ({windDegrees}°)
          </span>
        </div>

        <div className="flex items-center justify-between my-4 gap-4">
          <div>
            <div className="text-3xl font-extrabold text-white font-display tabular-nums">
              {formatWindSpeed(current.wind_speed_10m, unit)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Atmospheric vector: <span className="text-slate-200 font-semibold">{windDirLabel}</span>
            </div>
          </div>

          {/* Animated Compass Rose SVG */}
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Outer dial */}
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle cx="50" cy="50" r="38" fill="rgba(15, 23, 42, 0.8)" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
              {/* Cardinal markings */}
              <text x="50" y="20" textAnchor="middle" fontSize="10" fill="#38bdf8" fontWeight="bold">N</text>
              <text x="83" y="53" textAnchor="middle" fontSize="9" fill="#94a3b8">E</text>
              <text x="50" y="86" textAnchor="middle" fontSize="9" fill="#94a3b8">S</text>
              <text x="17" y="53" textAnchor="middle" fontSize="9" fill="#94a3b8">W</text>
              {/* Rotating Compass Needle */}
              <g transform={`rotate(${windDegrees} 50 50)`} className="transition-transform duration-700 ease-out">
                {/* North pointer (Cyan) */}
                <polygon points="50,18 45,50 55,50" fill="#38bdf8" />
                {/* South pointer (Slate) */}
                <polygon points="50,82 45,50 55,50" fill="#64748b" />
                <circle cx="50" cy="50" r="4" fill="#080e1d" stroke="#38bdf8" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
          Surface boundary layer measured at 10m altitude
        </div>
      </div>

      {/* 2. Humidity & Dew Point Card */}
      <div className="p-5 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Droplets className="w-4 h-4 text-[#38bdf8]" />
            <span>Humidity & Moisture</span>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {current.relative_humidity_2m > 65 ? 'Humid' : current.relative_humidity_2m < 35 ? 'Dry' : 'Optimal'}
          </span>
        </div>

        <div className="flex items-center justify-between my-4 gap-4">
          <div>
            <div className="text-3xl font-extrabold text-white font-display tabular-nums">
              {Math.round(current.relative_humidity_2m)}%
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Dew point:{' '}
              <strong className="text-slate-200 tabular-nums">
                {dewPointDisplay}°{unit}
              </strong>
            </div>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#38bdf8"
                strokeDasharray={`${current.relative_humidity_2m}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold font-mono text-white">
              {Math.round(current.relative_humidity_2m)}%
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
          The dew point of {dewPointDisplay}°{unit} indicates current atmospheric comfort
        </div>
      </div>

      {/* 3. UV Index Gauge */}
      <div className="p-5 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <SunMedium className="w-4 h-4 text-amber-400" />
            <span>Solar Radiation / UV</span>
          </div>
          <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${uvInfo.color} bg-amber-500/10 border-amber-500/20`}>
            {uvInfo.level}
          </span>
        </div>

        <div className="my-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-display tabular-nums">
              {current.uv_index.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 12 index</span>
          </div>

          {/* UV Meter Bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full mt-3 overflow-hidden border border-white/5 relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (current.uv_index / 12) * 100)}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300">
          {uvInfo.desc}
        </div>
      </div>

      {/* 4. Atmospheric Pressure */}
      <div className="p-5 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Gauge className="w-4 h-4 text-sky-400" />
            <span>Barometric Pressure</span>
          </div>
          <span className="text-xs font-mono font-semibold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            {pressureInfo.status}
          </span>
        </div>

        <div className="my-4">
          <div className="text-3xl font-extrabold text-white font-display tabular-nums">
            {pressureInfo.text}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Mean sea-level atmospheric column equilibrium
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
          Standard reference is 1013.25 hPa (29.92 inHg)
        </div>
      </div>

      {/* 5. Visibility Card */}
      <div className="p-5 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Optical Visibility</span>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {visibilityInfo.status}
          </span>
        </div>

        <div className="my-4">
          <div className="text-3xl font-extrabold text-white font-display tabular-nums">
            {visibilityInfo.text}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Unobstructed horizontal line-of-sight range
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
          Aerosol extinction and particulate suspension index
        </div>
      </div>

      {/* 6. Precipitation Telemetry */}
      <div className="p-5 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <CloudRain className="w-4 h-4 text-[#38bdf8]" />
            <span>Precipitation Horizon</span>
          </div>
          <span className="text-xs font-mono font-semibold text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">
            {current.precipitation > 0 ? 'Active Rain' : 'No Rain'}
          </span>
        </div>

        <div className="my-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-display tabular-nums">
              {current.precipitation.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-mono">mm/hr</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Accumulation rate across current observation window
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
          Next 24h probability peak:{' '}
          <strong className="text-slate-200">
            {daily.precipitation_probability_max[0] ?? 0}%
          </strong>
        </div>
      </div>

      {/* 7. Celestial Solar Arc Card (Spans across all cols on lg) */}
      <div className="md:col-span-2 lg:col-span-3 p-5 sm:p-6 rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <SunMedium className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
              Celestial Solar Arc & Daycycle
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {solarData.remainingText}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Half-Circle Sun Arc Visual */}
          <div className="md:col-span-7 relative h-28 flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-full max-w-sm h-full overflow-visible">
              {/* Horizon baseline */}
              <line x1="10" y1="95" x2="190" y2="95" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              {/* Sky arc */}
              <path
                d="M 20 95 A 80 80 0 0 1 180 95"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Illuminated sun arc */}
              {solarData.progress > 0 && (
                <path
                  d="M 20 95 A 80 80 0 0 1 180 95"
                  fill="none"
                  stroke="url(#solar-gradient)"
                  strokeWidth="3.5"
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 - (251.3 * solarData.progress) / 100}
                  strokeLinecap="round"
                />
              )}
              {/* Sun Position Node on Arc */}
              {(() => {
                const angle = Math.PI - (solarData.progress / 100) * Math.PI;
                const cx = 100 + 80 * Math.cos(angle);
                const cy = 95 - 80 * Math.sin(angle);
                return (
                  <g>
                    <circle cx={cx} cy={cy} r="6" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)" />
                    <circle cx={cx} cy={cy} r="9" fill="none" stroke="#fde047" strokeWidth="1.5" opacity="0.6" />
                  </g>
                );
              })()}
              <defs>
                <linearGradient id="solar-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Timings */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
                <Sunrise className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Sunrise</div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  {solarData.sunriseTime}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400">
                <Sunset className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Sunset</div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  {solarData.sunsetTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
