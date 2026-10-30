import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, MapPin, Globe, Compass } from 'lucide-react';
import { GeoLocationItem } from '../types/weather';
import { searchCities, PRESET_LOCATIONS } from '../services/weatherApi';

interface CitySearchProps {
  onSelectLocation: (location: GeoLocationItem) => void;
  selectedLocation: GeoLocationItem | null;
  isLoadingWeather: boolean;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  onSelectLocation,
  selectedLocation,
  isLoadingWeather,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<GeoLocationItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform debounced search
  const triggerSearch = (query: string) => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      setIsOpen(false);
      setHasSearched(false);
      setErrorMessage(null);
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);

    debounceTimerRef.current = window.setTimeout(async () => {
      abortControllerRef.current = new AbortController();
      try {
        const found = await searchCities(trimmed, abortControllerRef.current.signal);
        setResults(found);
        setHasSearched(true);
        setIsOpen(true);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setErrorMessage('Unable to connect to Open-Meteo Geocoding API. Check internet connection.');
          setResults([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    triggerSearch(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0) {
        handleSelectLocation(results[0]);
      } else {
        triggerSearch(searchTerm);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setIsOpen(false);
    setHasSearched(false);
    setErrorMessage(null);
  };

  const handleSelectLocation = (loc: GeoLocationItem) => {
    setSearchTerm(loc.name);
    setIsOpen(false);
    onSelectLocation(loc);
  };

  return (
    <div className="w-full space-y-3" ref={containerRef}>
      {/* Search Bar Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#38bdf8]" />
            ) : (
              <Search className="w-4 h-4 text-slate-400" />
            )}
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
            placeholder="Search worldwide city (e.g. Tokyo, London, San Francisco, Mumbai)..."
            className="w-full h-12 pl-10 pr-24 rounded-xl bg-[#0f172a]/90 text-slate-100 placeholder:text-slate-400 border border-white/15 focus:outline-none focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20 transition-all text-sm font-medium shadow-inner"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear input"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => triggerSearch(searchTerm)}
              className="px-3 py-1.5 bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#080e1d] font-semibold text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              Search
            </button>
          </div>
        </div>

        {/* Dropdown Results Card */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 z-50 bg-[#0f172a]/95 backdrop-blur-2xl rounded-xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden">
            {errorMessage ? (
              <div className="p-4 text-xs text-rose-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                {errorMessage}
              </div>
            ) : results.length > 0 ? (
              <ul className="divide-y divide-white/5 max-h-72 overflow-y-auto custom-scrollbar">
                {results.map((loc) => {
                  const isCurrent = selectedLocation?.name === loc.name && selectedLocation?.country === loc.country;
                  return (
                    <li key={`${loc.id}-${loc.latitude}-${loc.longitude}`}>
                      <button
                        type="button"
                        onClick={() => handleSelectLocation(loc)}
                        className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors hover:bg-slate-800/80 ${
                          isCurrent ? 'bg-slate-800/60 border-l-2 border-[#38bdf8]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                              <span>{loc.name}</span>
                              {loc.country_code && (
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-white/5">
                                  {loc.country_code}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">
                              {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                          {loc.latitude > 0 ? `${loc.latitude.toFixed(2)}°N` : `${Math.abs(loc.latitude).toFixed(2)}°S`},{' '}
                          {loc.longitude > 0 ? `${loc.longitude.toFixed(2)}°E` : `${Math.abs(loc.longitude).toFixed(2)}°W`}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : hasSearched ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching cities found for &ldquo;<span className="text-slate-200">{searchTerm}</span>&rdquo;. Check spelling or try a major metropolitan area.
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Preset Quick Cities */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Globe className="w-3 h-3 text-[#38bdf8]" />
          Popular:
        </span>
        <div className="flex items-center gap-1.5">
          {PRESET_LOCATIONS.map((city) => {
            const isSelected = selectedLocation?.name === city.name;
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => handleSelectLocation(city)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/40 shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                    : 'bg-slate-800/60 text-slate-300 border-white/10 hover:border-slate-500 hover:text-white'
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
