import React, { useState } from 'react';
import { TrendingUp, Droplets } from 'lucide-react';
import { HourlyForecastData, TemperatureUnit } from '../types/weather';
import {
  formatHourTime,
  formatTemperature,
  formatTemperatureValue,
  getWeatherCondition,
} from '../utils/weatherUtils';

interface TemperatureChartProps {
  hourly: HourlyForecastData;
  unit: TemperatureUnit;
  timezone: string;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ hourly, unit, timezone }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Take 24 hours of data
  const now = new Date();
  const currentIsoPrefix = now.toISOString().slice(0, 13);
  let startIndex = hourly.time.findIndex((t) => t.startsWith(currentIsoPrefix));
  if (startIndex === -1) startIndex = 0;

  const points = hourly.time.slice(startIndex, startIndex + 24).map((time, idx) => {
    const rawIdx = startIndex + idx;
    const tempC = hourly.temperature_2m[rawIdx];
    const displayVal = formatTemperatureValue(tempC, unit);
    return {
      index: idx,
      time,
      tempC,
      displayVal,
      code: hourly.weather_code[rawIdx],
      precipitationProb: hourly.precipitation_probability[rawIdx] ?? 0,
    };
  });

  if (points.length < 2) return null;

  // Chart dimensions inside SVG viewBox
  const width = 800;
  const height = 220;
  const padX = 40;
  const padY = 35;

  const temps = points.map((p) => p.displayVal);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = Math.max(1, maxTemp - minTemp);

  // Map data point to (x, y)
  const getX = (index: number) => {
    return padX + (index / (points.length - 1)) * (width - 2 * padX);
  };

  const getY = (val: number) => {
    // leave room for labels top and bottom
    const plotHeight = height - 2 * padY;
    const normalized = (val - minTemp) / range;
    return height - padY - normalized * plotHeight;
  };

  // Generate smooth SVG curve path
  const coords = points.map((p, i) => ({ x: getX(i), y: getY(p.displayVal) }));

  // Catmull-Rom or Bezier smooth curve
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const cpX1 = curr.x + (next.x - curr.x) / 2;
    const cpY1 = curr.y;
    const cpX2 = curr.x + (next.x - curr.x) / 2;
    const cpY2 = next.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
  }

  // Area path closing at the bottom
  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - padY + 15} L ${coords[0].x} ${height - padY + 15} Z`;

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;
  const activeCoord = hoverIndex !== null ? coords[hoverIndex] : null;

  return (
    <div className="rounded-2xl bg-[#0f172a]/75 backdrop-blur-xl border border-white/10 p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
              Atmospheric Thermal Curve
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            24-hour diurnal temperature variation (°{unit})
          </p>
        </div>

        {/* Dynamic min/max indicators */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-300 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
          <span>
            Low: <strong className="text-sky-400">{minTemp}°{unit}</strong>
          </span>
          <span>·</span>
          <span>
            High: <strong className="text-amber-400">{maxTemp}°{unit}</strong>
          </span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseLeave={() => setHoverIndex(null)}
          onTouchEnd={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#0284c7" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="chart-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#8ed5ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line
            x1={padX}
            y1={getY(maxTemp)}
            x2={width - padX}
            y2={getY(maxTemp)}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 4"
          />
          <line
            x1={padX}
            y1={getY(minTemp)}
            x2={width - padX}
            y2={getY(minTemp)}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 4"
          />
          <line
            x1={padX}
            y1={height - padY + 15}
            x2={width - padX}
            y2={height - padY + 15}
            stroke="rgba(255,255,255,0.12)"
          />

          {/* Gradient Area Fill */}
          <path d={areaD} fill="url(#chart-area-grad)" />

          {/* Main Curve Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#chart-line-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Data Points */}
          {coords.map((c, i) => {
            const isHovered = hoverIndex === i;
            const isKeyNode = i % 3 === 0 || i === coords.length - 1;
            return (
              <g key={i}>
                {isKeyNode && (
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={isHovered ? 6 : 3.5}
                    fill={isHovered ? '#38bdf8' : '#0f172a'}
                    stroke="#38bdf8"
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all"
                  />
                )}
              </g>
            );
          })}

          {/* Time Labels on X axis */}
          {points.map((p, i) => {
            if (i % 3 !== 0 && i !== points.length - 1) return null;
            const x = getX(i);
            const timeStr = i === 0 ? 'Now' : formatHourTime(p.time, timezone);
            return (
              <text
                key={`label-${i}`}
                x={x}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fill="#94a3b8"
                fontWeight="500"
                className="font-mono tabular-nums"
              >
                {timeStr}
              </text>
            );
          })}

          {/* Interactive Hover Vertical Guide and Bubble */}
          {activeCoord && activePoint && (
            <g>
              <line
                x1={activeCoord.x}
                y1={padY - 10}
                x2={activeCoord.x}
                y2={height - padY + 15}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="7"
                fill="#38bdf8"
                stroke="#080e1d"
                strokeWidth="3"
                filter="url(#glow)"
              />
            </g>
          )}

          {/* Invisible hover capture hitboxes for easy touching and hovering */}
          {points.map((_, i) => {
            const x = getX(i);
            const w = (width - 2 * padX) / points.length;
            return (
              <rect
                key={`hitbox-${i}`}
                x={x - w / 2}
                y={0}
                width={w}
                height={height}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                onTouchStart={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {activePoint && activeCoord && (
          <div
            className="absolute top-2 pointer-events-none transform -translate-x-1/2 bg-[#080e1d]/95 backdrop-blur-xl border border-[#38bdf8]/40 px-3 py-1.5 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.8)] text-xs z-20 flex items-center gap-3"
            style={{
              left: `${(activeCoord.x / width) * 100}%`,
            }}
          >
            <div>
              <div className="font-semibold text-white font-mono tabular-nums">
                {hoverIndex === 0 ? 'Current Observation' : formatHourTime(activePoint.time, timezone)}
              </div>
              <div className="text-[11px] text-[#38bdf8] font-bold">
                {getWeatherCondition(activePoint.code, true).label}
              </div>
            </div>
            <div className="border-l border-white/10 pl-3">
              <div className="text-base font-bold text-white font-display tabular-nums">
                {activePoint.displayVal}°{unit}
              </div>
              {activePoint.precipitationProb > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-sky-400">
                  <Droplets className="w-2.5 h-2.5" />
                  <span className="tabular-nums">{activePoint.precipitationProb}% rain</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
