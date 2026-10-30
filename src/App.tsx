import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Loader2,
  MapPinOff,
  CloudRain,
  Compass,
  Calendar,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import {
  GeoLocationItem,
  WeatherData,
  TemperatureUnit,
  AppTheme,
  WeatherAlert,
} from './types/weather';
import {
  fetchWeatherData,
  reverseGeocodeCoordinates,
  PRESET_LOCATIONS,
} from './services/weatherApi';
import { TopNav } from './components/TopNav';
import { CitySearch } from './components/CitySearch';
import { WeatherAlertsBanner } from './components/WeatherAlertsBanner';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { TemperatureChart } from './components/TemperatureChart';
import { SevenDayForecast } from './components/SevenDayForecast';
import { AtmosphericGauges } from './components/AtmosphericGauges';
import { AwsDeploymentModal } from './components/AwsDeploymentModal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';

export default function App() {
  // Application State
  const [selectedLocation, setSelectedLocation] = useState<GeoLocationItem>(PRESET_LOCATIONS[0]); // Default Tokyo or London
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);

  // Preference State (with localStorage persistence)
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem('skycast_temp_unit');
    return saved === 'F' ? 'F' : 'C';
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('skycast_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Navigation State
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAwsModalOpen, setIsAwsModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('skycast_theme', theme);
  }, [theme]);

  // Unit persistence
  const toggleUnit = () => {
    const nextUnit: TemperatureUnit = unit === 'C' ? 'F' : 'C';
    setUnit(nextUnit);
    localStorage.setItem('skycast_temp_unit', nextUnit);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Primary Weather Fetch Handler
  const loadWeather = useCallback(
    async (location: GeoLocationItem, isBackgroundRefresh = false) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (!isBackgroundRefresh) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setErrorMessage(null);

      try {
        const data = await fetchWeatherData(location, abortControllerRef.current.signal);
        setWeatherData(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Weather load error:', err);
          setErrorMessage(
            err.message ||
              'Unable to fetch atmospheric forecast data from Open-Meteo. Please check your network and retry.'
          );
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Initial Load
  useEffect(() => {
    loadWeather(selectedLocation);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [selectedLocation, loadWeather]);

  // Handle Location Selection from Search or Presets
  const handleSelectLocation = (loc: GeoLocationItem) => {
    setSelectedLocation(loc);
    loadWeather(loc);
  };

  // Handle Current GPS Location
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation is not supported by your current browser.');
      return;
    }

    setIsLocating(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const detectedLoc = await reverseGeocodeCoordinates(latitude, longitude);
          setSelectedLocation(detectedLoc);
          await loadWeather(detectedLoc);
          setGeoNotice(null);
        } catch (e) {
          console.error('Reverse geocode error:', e);
          const fallbackLoc: GeoLocationItem = {
            id: 999999,
            name: 'Current Location',
            latitude,
            longitude,
            admin1: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
          };
          setSelectedLocation(fallbackLoc);
          loadWeather(fallbackLoc);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        let msg = 'Unable to retrieve your current location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. You can still search for any city manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'The location request timed out. Please try again.';
        }
        setGeoNotice(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Navigation scroll helper
  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [demoAlertEnabled, setDemoAlertEnabled] = useState(false);

  // Compute combined alerts (real alerts from API + optional demonstration alert)
  const activeAlerts: WeatherAlert[] = [...(weatherData?.alerts || [])];
  if (demoAlertEnabled) {
    activeAlerts.unshift({
      id: 'demo-supercell-warning',
      event: 'Severe Convective Thunderstorm & Hail Warning',
      headline: `Intense squall line with wind gusts up to 90 km/h and torrential rainfall active around ${selectedLocation.name}.`,
      severity: 'Warning',
      description: `Meteorological doppler observation indicates strong convective updrafts producing severe lightning, hazardous wind shear, and torrential localized downpours across the ${selectedLocation.name} basin.`,
      instruction: 'Take shelter inside a sturdy structure immediately. Stay clear of windows, exterior walls, and electrical equipment. Avoid driving through flooded underpasses.',
      senderName: 'National Meteorological Hazard Center',
      effective: new Date().toISOString(),
      expires: new Date(Date.now() + 3 * 3600000).toISOString(),
      source: 'Open-Meteo Atmospheric Telemetry',
    });
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'atmospheric-bg text-[#dde2f8]'
          : 'atmospheric-bg-light text-slate-800'
      }`}
    >
      {/* Top Bar Contract (1-line wordmark, links, functional controls) */}
      <TopNav
        unit={unit}
        onToggleUnit={toggleUnit}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLocateMe={handleLocateMe}
        isLocating={isLocating}
        onRefresh={() => loadWeather(selectedLocation, true)}
        isRefreshing={isRefreshing}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-8">
        {/* Geolocation Notice Toast */}
        {geoNotice && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <MapPinOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{geoNotice}</span>
            </div>
            <button
              onClick={() => setGeoNotice(null)}
              className="px-2 py-1 text-[11px] font-semibold rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Location Bar */}
        <section id="search-section" className="space-y-3">
          <CitySearch
            onSelectLocation={handleSelectLocation}
            selectedLocation={selectedLocation}
            isLoadingWeather={isLoading}
          />

          {/* Test Warning Simulation Pill */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="text-[11px]">
              Querying Open-Meteo & Meteorological Alert feeds for <strong className="text-slate-200">{selectedLocation.name}</strong>
            </span>
            <button
              onClick={() => setDemoAlertEnabled((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                demoAlertEnabled
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                  : 'bg-slate-800/40 border-white/10 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{demoAlertEnabled ? 'Disable Test Alert' : 'Simulate Test Alert'}</span>
            </button>
          </div>
        </section>

        {/* Error State with Retry Button */}
        {errorMessage && !isLoading && (
          <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-3">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h2 className="text-base font-bold text-white">Weather Ingestion Interrupted</h2>
            <p className="text-xs text-rose-200/90 max-w-md mx-auto">{errorMessage}</p>
            <button
              onClick={() => loadWeather(selectedLocation)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#080e1d] font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Query</span>
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-72 rounded-2xl bg-slate-800/40 border border-white/5 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-[#38bdf8] animate-spin" />
                <span className="text-xs font-mono text-slate-400">
                  Ingesting real-time Open-Meteo telemetry & active alerts for {selectedLocation.name}...
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-slate-800/30 border border-white/5" />
              ))}
            </div>
          </div>
        )}

        {/* Populated Dashboard */}
        {!isLoading && weatherData && (
          <div className="space-y-8">
            {/* High-Priority Active Weather Warnings / Alerts Banner */}
            <section id="alerts">
              <WeatherAlertsBanner
                alerts={activeAlerts}
                cityName={selectedLocation.name}
              />
            </section>

            {/* 1. Hero Current Weather Section */}
            <section id="home">
              <CurrentWeatherCard weather={weatherData} unit={unit} />
            </section>

            {/* 2. 24-Hour Horizon Forecast Scroller */}
            <section id="hourly">
              <HourlyForecast
                hourly={weatherData.hourly}
                unit={unit}
                timezone={weatherData.timezone}
              />
            </section>

            {/* 3. 24-Hour Thermal Curve Chart */}
            <section id="chart">
              <TemperatureChart
                hourly={weatherData.hourly}
                unit={unit}
                timezone={weatherData.timezone}
              />
            </section>

            {/* 4. 7-Day Synoptic Outlook */}
            <section id="forecast">
              <SevenDayForecast
                daily={weatherData.daily}
                unit={unit}
                timezone={weatherData.timezone}
              />
            </section>

            {/* 5. Atmospheric Sensors & Telemetry Gauges */}
            <section id="sensors">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-4 h-4 text-[#38bdf8]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
                  Atmospheric Environmental Telemetry
                </h2>
              </div>
              <AtmosphericGauges weather={weatherData} unit={unit} />
            </section>
          </div>
        )}
      </main>

      {/* Modals */}
      <AwsDeploymentModal
        isOpen={isAwsModalOpen}
        onClose={() => setIsAwsModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onSelectSection={handleSelectSection}
      />
    </div>
  );
}
