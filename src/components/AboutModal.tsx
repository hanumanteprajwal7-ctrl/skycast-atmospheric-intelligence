import React from 'react';
import { X, CloudRain, CheckCircle2, Code2, Award, ExternalLink, Cpu } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080e1d]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f172a] border border-white/15 p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-[#080e1d] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <CloudRain className="w-6 h-6 text-[#080e1d]" strokeWidth={2.4} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                SkyCast Atmospheric Intelligence
              </h2>
              <p className="text-xs text-[#38bdf8] font-medium mt-0.5">
                Let&apos;s Upgrade Weather App Mini-Project
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 mt-6 text-sm text-slate-300">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Project Objective
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              SkyCast is an atmospheric intelligence and forecast platform built as an engineering submission for the Let&apos;s Upgrade JavaScript & Cloud Deployment mini-project curriculum. It connects directly to live Open-Meteo meteorological endpoints to deliver zero-mock, real-time weather analytics.
            </p>
          </div>

          {/* Key Capabilities */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
              Core Implemented Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span>Real-time global weather API ingestion (Open-Meteo)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span>Debounced worldwide city search & GPS geolocation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span>Interactive 24-hour thermal spline chart</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span>7-Day extended synoptic outlook with range indicators</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span>Sensor telemetry (Wind Compass, Solar Arc, UV, Pressure)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2">
                <span className="text-[#38bdf8] font-bold">✓</span>
                <span>Celsius / Fahrenheit dynamic conversion system</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10 font-mono">
                TypeScript / React 19
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10 font-mono">
                Tailwind CSS v4
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10 font-mono">
                Google Stitch Design Tokens
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10 font-mono">
                Open-Meteo Weather API
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10 font-mono">
                Vector SVG Visualizations
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10 font-mono">
                AWS S3 + CloudFront Ready
              </span>
            </div>
          </div>

          {/* Attribution */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400">
            Weather telemetry provided by{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#38bdf8] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Open-Meteo.com <ExternalLink className="w-3 h-3" />
            </a>{' '}
            under Creative Commons Attribution 4.0 International (CC BY 4.0).
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
