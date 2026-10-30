import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  Wind,
  CloudLightning,
  ChevronDown,
  ChevronUp,
  X,
  ShieldAlert,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsBannerProps {
  alerts: WeatherAlert[];
  cityName: string;
}

export const WeatherAlertsBanner: React.FC<WeatherAlertsBannerProps> = ({ alerts, cityName }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // If no alerts, return null or quiet nominal indicator
  if (!alerts || alerts.length === 0) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 text-xs text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            No active severe weather warnings for <strong className="text-white font-semibold">{cityName}</strong>. Atmospheric stability nominal.
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400/90 hidden sm:inline-block">
          Open-Meteo Ingestion Active
        </span>
      </div>
    );
  }

  // If user dismissed, show a compact re-open alert chip
  if (isDismissed) {
    return (
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>
            {alerts.length} active weather {alerts.length === 1 ? 'advisory' : 'advisories'} in effect for {cityName}
          </span>
        </div>
        <button
          onClick={() => setIsDismissed(false)}
          className="text-xs font-semibold text-amber-300 hover:text-white underline"
        >
          View Alert Banner
        </button>
      </div>
    );
  }

  const currentAlert = alerts[activeIndex] || alerts[0];
  const isExpanded = expandedIndex === activeIndex;

  // Visual severity tokens
  const isHighSeverity = currentAlert.severity === 'Emergency' || currentAlert.severity === 'Warning';
  const borderClass = isHighSeverity
    ? 'border-rose-500/50 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
    : 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)]';

  const bgGradient = isHighSeverity
    ? 'from-rose-950/80 via-[#151b2b]/95 to-[#0f172a]/95'
    : 'from-amber-950/75 via-[#151b2b]/95 to-[#0f172a]/95';

  const badgeColor = isHighSeverity
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  const iconColor = isHighSeverity ? 'text-rose-400' : 'text-amber-400';

  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${bgGradient} backdrop-blur-xl border ${borderClass} transition-all duration-300`}
    >
      {/* Ambient glow accent */}
      <div
        className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
          isHighSeverity ? 'bg-rose-500/15' : 'bg-amber-500/15'
        }`}
      />

      <div className="relative z-10 p-4 sm:p-5">
        {/* Banner Main Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Icon & Core Alert Details */}
          <div className="flex items-start gap-3 grow">
            <div
              className={`p-2.5 rounded-xl border shrink-0 ${
                isHighSeverity
                  ? 'bg-rose-500/20 border-rose-500/30'
                  : 'bg-amber-500/20 border-amber-500/30'
              }`}
            >
              <ShieldAlert className={`w-5 h-5 ${iconColor} animate-pulse`} />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}
                >
                  {currentAlert.severity}
                </span>

                <span className="text-xs font-mono text-slate-400">
                  {currentAlert.source}
                </span>

                {alerts.length > 1 && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    ({activeIndex + 1} of {alerts.length} alerts)
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-extrabold text-white font-display tracking-tight">
                {currentAlert.event}
              </h2>

              <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-3xl">
                {currentAlert.headline}
              </p>
            </div>
          </div>

          {/* Right: Actions & Pagination */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {/* Multi-alert switcher */}
            {alerts.length > 1 && (
              <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-white/10 text-xs">
                <button
                  onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : alerts.length - 1))}
                  className="px-2 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-800"
                  aria-label="Previous alert"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev < alerts.length - 1 ? prev + 1 : 0))}
                  className="px-2 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-800"
                  aria-label="Next alert"
                >
                  Next &rarr;
                </button>
              </div>
            )}

            {/* Expand / Collapse Details Button */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : activeIndex)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-white/15 transition-colors"
            >
              <span>{isExpanded ? 'Hide Details' : 'View Safety Guidance'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Dismiss banner"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Safety Guidance & Full Description */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs text-slate-200 animate-fadeIn">
            {/* Authority / Issuance Info */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono">
              <span>Issuing Agency: <strong className="text-slate-200">{currentAlert.senderName}</strong></span>
              {currentAlert.effective && (
                <span>Effective: <strong className="text-slate-200">{new Date(currentAlert.effective).toLocaleString()}</strong></span>
              )}
              {currentAlert.expires && (
                <span>Expires: <strong className="text-slate-200">{new Date(currentAlert.expires).toLocaleString()}</strong></span>
              )}
            </div>

            {/* Description */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Meteorological Synopsis
              </div>
              <p className="leading-relaxed text-slate-300">{currentAlert.description}</p>
            </div>

            {/* Protective Instruction */}
            {currentAlert.instruction && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-amber-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Recommended Protective Actions
                </div>
                <p className="leading-relaxed">{currentAlert.instruction}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
