import React from 'react';
import { CloudRain, Compass, Sun, Moon, MapPin, RefreshCw, Layers, Info } from 'lucide-react';
import { TemperatureUnit, AppTheme } from '../types/weather';

interface TopNavProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  theme: AppTheme;
  onToggleTheme: () => void;
  onLocateMe: () => void;
  isLocating: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenAwsModal: () => void;
  onOpenAboutModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  unit,
  onToggleUnit,
  theme,
  onToggleTheme,
  onLocateMe,
  isLocating,
  onRefresh,
  isRefreshing,
  activeSection,
  onSelectSection,
  onOpenAwsModal,
  onOpenAboutModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-200 bg-[#080e1d]/85 dark:bg-[#080e1d]/85 border-white/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-[#080e1d] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <CloudRain className="w-5 h-5 text-[#080e1d]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
              SkyCast <span className="text-[#38bdf8] font-normal text-xs sm:text-sm tracking-normal">Atmospheric</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectSection('home')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeSection === 'home' ? 'text-[#38bdf8] font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectSection('forecast')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeSection === 'forecast' ? 'text-[#38bdf8] font-semibold' : ''
            }`}
          >
            7-Day Forecast
          </button>
          <button
            onClick={() => onSelectSection('sensors')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeSection === 'sensors' ? 'text-[#38bdf8] font-semibold' : ''
            }`}
          >
            Telemetry
          </button>
          <button
            onClick={onOpenAwsModal}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap text-amber-300/90 hover:text-amber-200"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>AWS Cloud</span>
          </button>
          <button
            onClick={onOpenAboutModal}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white"
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </nav>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh current meteorological observation"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 transition-colors disabled:opacity-50"
            aria-label="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#38bdf8]' : ''}`} />
          </button>

          {/* Current GPS Geolocation */}
          <button
            onClick={onLocateMe}
            disabled={isLocating}
            title="Detect atmospheric data for my current GPS location"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-white/10 transition-all hover:border-[#38bdf8]/40"
          >
            <MapPin className={`w-3.5 h-3.5 text-[#38bdf8] ${isLocating ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'GPS Detect'}</span>
          </button>

          {/* Celsius / Fahrenheit Segmented Switch */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => unit !== 'C' && onToggleUnit()}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === 'C'
                  ? 'bg-[#38bdf8] text-[#080e1d] shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => unit !== 'F' && onToggleUnit()}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === 'F'
                  ? 'bg-[#38bdf8] text-[#080e1d] shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °F
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to daylight theme' : 'Switch to midnight atmospheric theme'}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-sky-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Secondary Bar */}
      <div className="flex md:hidden items-center justify-around py-2 border-t border-white/5 bg-[#080e1d]/90 text-xs text-slate-300">
        <button
          onClick={() => onSelectSection('home')}
          className={`px-2 py-1 ${activeSection === 'home' ? 'text-[#38bdf8] font-bold' : ''}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSelectSection('forecast')}
          className={`px-2 py-1 ${activeSection === 'forecast' ? 'text-[#38bdf8] font-bold' : ''}`}
        >
          7-Day
        </button>
        <button
          onClick={() => onSelectSection('sensors')}
          className={`px-2 py-1 ${activeSection === 'sensors' ? 'text-[#38bdf8] font-bold' : ''}`}
        >
          Telemetry
        </button>
        <button
          onClick={onOpenAwsModal}
          className="px-2 py-1 text-amber-300 font-medium"
        >
          AWS Guide
        </button>
        <button
          onClick={onOpenAboutModal}
          className="px-2 py-1 text-slate-300 font-medium"
        >
          About
        </button>
      </div>
    </header>
  );
};
