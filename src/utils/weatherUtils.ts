import { TemperatureUnit } from '../types/weather';

export interface WeatherConditionInfo {
  label: string;
  icon: string;
  description: string;
  isDaytime?: boolean;
}

/**
 * Maps WMO Weather Interpretation Codes to human readable labels,
 * descriptions, and corresponding icons.
 */
export function getWeatherCondition(code: number, isDay: boolean = true): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Clear Sky' : 'Clear Night',
        icon: isDay ? 'sun' : 'moon',
        description: 'Atmospheric conditions are completely cloudless and clear.',
      };
    case 1:
      return {
        label: isDay ? 'Mainly Clear' : 'Mostly Clear',
        icon: isDay ? 'sun-cloud' : 'moon-cloud',
        description: 'Scattered high-altitude wisps with abundant sunshine.',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        icon: isDay ? 'sun-cloud' : 'moon-cloud',
        description: 'Variable cloud cover with intermittent sunlight.',
      };
    case 3:
      return {
        label: 'Overcast',
        icon: 'cloud',
        description: 'Dense stratocumulus cloud deck obscuring the sun.',
      };
    case 45:
      return {
        label: 'Foggy',
        icon: 'fog',
        description: 'Ground-level cloud creating low visibility conditions.',
      };
    case 48:
      return {
        label: 'Depositing Rime Fog',
        icon: 'fog',
        description: 'Supercooled fog droplets freezing onto cold exposed surfaces.',
      };
    case 51:
      return {
        label: 'Light Drizzle',
        icon: 'drizzle',
        description: 'Fine atmospheric misting and ultra-light precipitation.',
      };
    case 53:
      return {
        label: 'Moderate Drizzle',
        icon: 'drizzle',
        description: 'Persistent fine droplets creating slick pavement.',
      };
    case 55:
      return {
        label: 'Dense Drizzle',
        icon: 'drizzle',
        description: 'Heavy drizzle with reduced atmospheric visibility.',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        icon: 'sleet',
        description: 'Sub-freezing mist freezing instantaneously upon impact.',
      };
    case 61:
      return {
        label: 'Slight Rain',
        icon: 'rain-light',
        description: 'Light scattered rainfall showers.',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        icon: 'rain',
        description: 'Steady precipitative rainfall across the region.',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        icon: 'rain-heavy',
        description: 'Intense atmospheric downpour with rapid surface runoff.',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        icon: 'sleet',
        description: 'Dangerous freezing precipitation glazing outdoor surfaces.',
      };
    case 71:
      return {
        label: 'Slight Snowfall',
        icon: 'snow-light',
        description: 'Gentle flurries drifting through cold ambient air.',
      };
    case 73:
      return {
        label: 'Moderate Snowfall',
        icon: 'snow',
        description: 'Steady accumulation of crystalline snowflakes.',
      };
    case 75:
      return {
        label: 'Heavy Snowfall',
        icon: 'snow-heavy',
        description: 'Intense blizzard-like snow accumulation and drifting.',
      };
    case 77:
      return {
        label: 'Snow Grains',
        icon: 'snow',
        description: 'Opaque flat white pellets of ice falling gently.',
      };
    case 80:
      return {
        label: 'Light Showers',
        icon: 'rain-light',
        description: 'Passing brief convective rain showers.',
      };
    case 81:
      return {
        label: 'Moderate Showers',
        icon: 'rain',
        description: 'Gusty squall lines with intermittent heavy rainfall.',
      };
    case 82:
      return {
        label: 'Violent Showers',
        icon: 'rain-heavy',
        description: 'Torrential convective deluge with rapid accumulation.',
      };
    case 85:
      return {
        label: 'Slight Snow Showers',
        icon: 'snow-light',
        description: 'Passing cold showers transitioning into brief flurries.',
      };
    case 86:
      return {
        label: 'Heavy Snow Showers',
        icon: 'snow-heavy',
        description: 'Heavy squalls of wind-driven frozen precipitation.',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        icon: 'thunderstorm',
        description: 'Convective instability producing lightning, thunder, and rain.',
      };
    case 96:
    case 99:
      return {
        label: 'Severe Thunderstorm & Hail',
        icon: 'thunderstorm-hail',
        description: 'Intense supercell activity with lightning and damaging hail.',
      };
    default:
      return {
        label: 'Variable Conditions',
        icon: 'cloud',
        description: 'Localized atmospheric variations across the meteorological basin.',
      };
  }
}

/**
 * Temperature conversion functions
 */
export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function formatTemperature(c: number | undefined | null, unit: TemperatureUnit): string {
  if (c === undefined || c === null || isNaN(c)) return '--';
  const val = unit === 'F' ? celsiusToFahrenheit(c) : c;
  return `${Math.round(val)}°`;
}

export function formatTemperatureValue(c: number | undefined | null, unit: TemperatureUnit): number {
  if (c === undefined || c === null || isNaN(c)) return 0;
  const val = unit === 'F' ? celsiusToFahrenheit(c) : c;
  return Math.round(val);
}

/**
 * Wind calculations
 */
export function formatWindSpeed(kmh: number | undefined | null, unit: TemperatureUnit): string {
  if (kmh === undefined || kmh === null || isNaN(kmh)) return '--';
  if (unit === 'F') {
    const mph = kmh * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function getWindDirectionCompass(degrees: number | undefined | null): string {
  if (degrees === undefined || degrees === null || isNaN(degrees)) return 'N';
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ];
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return directions[index];
}

/**
 * UV index evaluation
 */
export function getUvCategory(uv: number | undefined | null): { level: string; color: string; desc: string } {
  if (uv === undefined || uv === null || isNaN(uv)) {
    return { level: 'Unavailable', color: 'text-slate-400', desc: 'No UV data available' };
  }
  if (uv < 3) {
    return { level: 'Low', color: 'text-emerald-400', desc: 'No protection needed. Safe for outdoor exposure.' };
  }
  if (uv < 6) {
    return { level: 'Moderate', color: 'text-amber-400', desc: 'Take precautions. Wear sunglasses and SPF 30+.' };
  }
  if (uv < 8) {
    return { level: 'High', color: 'text-orange-400', desc: 'Protection essential. Seek shade during midday hours.' };
  }
  if (uv < 11) {
    return { level: 'Very High', color: 'text-rose-400', desc: 'Extra precautions needed. Minimize direct midday sun.' };
  }
  return { level: 'Extreme', color: 'text-purple-400', desc: 'Avoid midday sun! Skin and eyes can burn in minutes.' };
}

/**
 * Dew Point estimation using the Magnus-Tetens approximation formula
 */
export function calculateDewPoint(tempC: number, rh: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * tempC) / (b + tempC)) + Math.log(Math.max(1, rh) / 100.0);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint);
}

/**
 * Visibility formatting
 */
export function formatVisibility(meters: number | undefined | null, unit: TemperatureUnit): { text: string; status: string } {
  if (meters === undefined || meters === null || isNaN(meters)) {
    return { text: '--', status: 'Standard' };
  }
  if (unit === 'F') {
    const miles = meters / 1609.34;
    const text = miles >= 10 ? '10+ mi' : `${miles.toFixed(1)} mi`;
    const status = miles >= 6 ? 'Excellent' : miles >= 3 ? 'Moderate' : 'Poor';
    return { text, status };
  }
  const km = meters / 1000;
  const text = km >= 16 ? '16+ km' : `${km.toFixed(1)} km`;
  const status = km >= 10 ? 'Optimal' : km >= 5 ? 'Moderate' : 'Reduced';
  return { text, status };
}

/**
 * Pressure formatting
 */
export function formatPressure(hPa: number | undefined | null, unit: TemperatureUnit): { text: string; status: string } {
  if (hPa === undefined || hPa === null || isNaN(hPa)) {
    return { text: '--', status: 'Normal' };
  }
  const status = hPa > 1020 ? 'High Pressure' : hPa < 1005 ? 'Low Depression' : 'Barometric Normal';
  if (unit === 'F') {
    const inHg = hPa * 0.02953;
    return { text: `${inHg.toFixed(2)} inHg`, status };
  }
  return { text: `${Math.round(hPa)} hPa`, status };
}

/**
 * Local Date & Time formatter with timezone support
 */
export function formatLocalDateTime(isoString: string | undefined, timezone?: string): {
  timeStr: string;
  dateStr: string;
  dayStr: string;
} {
  try {
    const date = isoString ? new Date(isoString) : new Date();
    const tz = timezone || 'UTC';

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const dayFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'long',
    });

    return {
      timeStr: timeFormatter.format(date),
      dateStr: dateFormatter.format(date),
      dayStr: dayFormatter.format(date),
    };
  } catch {
    return {
      timeStr: '--:--',
      dateStr: 'Current Date',
      dayStr: 'Today',
    };
  }
}

/**
 * Format hourly time string (e.g., '14:00' or '2 PM')
 */
export function formatHourTime(isoString: string, timezone?: string): string {
  try {
    const date = new Date(isoString);
    const tz = timezone || 'UTC';
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  } catch {
    return isoString.split('T')[1]?.slice(0, 5) || isoString;
  }
}

/**
 * Format daily forecast date (e.g., 'Wed, Oct 30')
 */
export function formatDayCard(isoDateStr: string, index: number, timezone?: string): { dayName: string; formattedDate: string } {
  if (index === 0) {
    return { dayName: 'Today', formattedDate: 'Current' };
  }
  try {
    const date = new Date(isoDateStr + 'T12:00:00');
    const tz = timezone || 'UTC';
    const dayName = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'short', day: 'numeric' }).format(date);
    return { dayName, formattedDate };
  } catch {
    return { dayName: `Day ${index + 1}`, formattedDate: isoDateStr };
  }
}

/**
 * Calculate Daylight Progress (0 to 100%)
 */
export function calculateSunProgress(
  sunriseIso: string | undefined,
  sunsetIso: string | undefined,
  currentTimeIso?: string
): { progress: number; isNight: boolean; sunriseTime: string; sunsetTime: string; remainingText: string } {
  if (!sunriseIso || !sunsetIso) {
    return { progress: 50, isNight: false, sunriseTime: '--:--', sunsetTime: '--:--', remainingText: 'Atmospheric telemetry' };
  }

  const sunrise = new Date(sunriseIso).getTime();
  const sunset = new Date(sunsetIso).getTime();
  const now = currentTimeIso ? new Date(currentTimeIso).getTime() : Date.now();

  const sunriseTime = new Date(sunriseIso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const sunsetTime = new Date(sunsetIso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (now < sunrise) {
    const diffHours = ((sunrise - now) / (1000 * 60 * 60)).toFixed(1);
    return { progress: 0, isNight: true, sunriseTime, sunsetTime, remainingText: `Sunrise in ${diffHours} hrs` };
  }

  if (now > sunset) {
    return { progress: 100, isNight: true, sunriseTime, sunsetTime, remainingText: 'Dusk concluded' };
  }

  const totalDaylight = sunset - sunrise;
  const elapsed = now - sunrise;
  const progress = Math.min(100, Math.max(0, Math.round((elapsed / totalDaylight) * 100)));
  const diffHours = ((sunset - now) / (1000 * 60 * 60)).toFixed(1);

  return {
    progress,
    isNight: false,
    sunriseTime,
    sunsetTime,
    remainingText: `${diffHours} hrs of daylight remaining`,
  };
}
