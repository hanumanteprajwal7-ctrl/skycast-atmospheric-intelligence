import React from 'react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const iconSize = size ? { width: size, height: size } : {};

  switch (name) {
    case 'sun':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="10" fill="url(#sun-gradient)" />
          <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
            <line x1="24" y1="4" x2="24" y2="8" />
            <line x1="24" y1="40" x2="24" y2="44" />
            <line x1="4" y1="24" x2="8" y2="24" />
            <line x1="40" y1="24" x2="44" y2="24" />
            <line x1="9.8" y1="9.8" x2="12.7" y2="12.7" />
            <line x1="35.3" y1="35.3" x2="38.2" y2="38.2" />
            <line x1="9.8" y1="38.2" x2="12.7" y2="35.3" />
            <line x1="35.3" y1="12.7" x2="38.2" y2="9.8" />
          </g>
          <defs>
            <radialGradient id="sun-gradient" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
          </defs>
        </svg>
      );

    case 'moon':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M33 30.5C23.3 30.5 15.5 22.7 15.5 13C15.5 10.4 16.1 8 17.1 5.8C10.7 8.3 6 14.6 6 22C6 32 14.1 40 24.1 40C30.2 40 35.6 36.9 38.8 32.2C36.9 31.1 34.9 30.5 33 30.5Z"
            fill="url(#moon-gradient)"
            stroke="#93ccff"
            strokeWidth="1.5"
          />
          <circle cx="34" cy="14" r="1.5" fill="#8ed5ff" />
          <circle cx="38" cy="22" r="1" fill="#8ed5ff" />
          <defs>
            <linearGradient id="moon-gradient" x1="10" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c4e7ff" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'sun-cloud':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <circle cx="19" cy="18" r="8" fill="#f59e0b" />
          <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
            <line x1="19" y1="4" x2="19" y2="7" />
            <line x1="7" y1="18" x2="10" y2="18" />
            <line x1="9" y1="9" x2="11.5" y2="11.5" />
            <line x1="28" y1="9" x2="26" y2="11.5" />
          </g>
          <path
            d="M17 38C13.7 38 11 35.3 11 32C11 29 13.2 26.5 16.1 26.1C17.3 21.5 21.5 18 26.5 18C32.3 18 37 22.7 37 28.5C37 28.8 37 29.2 36.9 29.5C39.2 30.6 40.5 33 40.5 35.5C40.5 38.5 38 41 35 41L17 41C15 41 14 39.5 17 38Z"
            fill="url(#cloud-glass)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="cloud-glass" x1="15" y1="18" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'moon-cloud':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M26 22C19.5 22 14.5 16.5 14.5 10C14.5 8.2 15 6.6 15.6 5C11 6.8 8 11 8 16C8 23 13.5 28.5 20.5 28.5C24.5 28.5 28 26.5 30 23.5C28.7 22.5 27.4 22 26 22Z"
            fill="#93ccff"
          />
          <path
            d="M16 38C13.2 38 11 35.8 11 33C11 30.5 12.8 28.4 15.2 28C16.3 24 20 21 24.5 21C29.7 21 34 25.3 34 30.5C36.2 31.5 37.5 33.7 37.5 36C37.5 38.8 35.2 41 32.5 41L16 41Z"
            fill="#64748b"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'cloud':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M14 36C9.6 36 6 32.4 6 28C6 24 9 20.6 13 20.1C14.8 14.3 20.3 10 26.8 10C34.6 10 41 16.4 41 24.2C41 24.8 40.9 25.4 40.8 26C43.3 27.5 45 30.4 45 33.7C45 38.3 41.3 42 36.7 42L14 42C12.5 42 12.8 39.5 14 36Z"
            fill="url(#cloud-gradient-full)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="cloud-gradient-full" x1="12" y1="12" x2="38" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'fog':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M12 20C12 15 16 11 21 11C25 11 28.5 13.5 29.8 17.2C31.2 16.5 32.8 16 34.5 16C39.2 16 43 19.8 43 24.5C43 24.8 43 25.1 42.9 25.4"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="8" y1="28" x2="40" y2="28" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="34" x2="36" y2="34" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="40" x2="32" y2="40" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'drizzle':
    case 'rain-light':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M12 28C8.7 28 6 25.3 6 22C6 19 8.2 16.5 11.2 16.1C12.6 11.8 16.8 8.5 22 8.5C28.1 8.5 33 13.4 33 19.5C35 20.3 36.5 22.2 36.5 24.5C36.5 27.5 34.1 30 31.1 30L12 30Z"
            fill="#94a3b8"
          />
          <line x1="16" y1="34" x2="14" y2="40" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="34" x2="22" y2="40" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="34" x2="30" y2="40" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'rain':
    case 'rain-heavy':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M12 26C8.7 26 6 23.3 6 20C6 17 8.2 14.5 11.2 14.1C12.6 9.8 16.8 6.5 22 6.5C28.1 6.5 33 11.4 33 17.5C35.2 18.5 37 20.7 37 23.5C37 27 34 29 30.5 29L12 29Z"
            fill="#64748b"
          />
          <g stroke="#38bdf8" strokeWidth="3" strokeLinecap="round">
            <line x1="15" y1="33" x2="12" y2="43" />
            <line x1="23" y1="33" x2="20" y2="43" />
            <line x1="31" y1="33" x2="28" y2="43" />
          </g>
        </svg>
      );

    case 'thunderstorm':
    case 'thunderstorm-hail':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M12 25C8.7 25 6 22.3 6 19C6 16 8.2 13.5 11.2 13.1C12.6 8.8 16.8 5.5 22 5.5C28.1 5.5 33 10.4 33 16.5C35.2 17.5 37 19.7 37 22.5C37 26 34 28 30.5 28L12 28Z"
            fill="#334155"
          />
          <polygon
            points="24,24 16,35 23,35 19,45 32,32 25,32"
            fill="#f59e0b"
            stroke="#fbbf24"
            strokeWidth="1"
          />
        </svg>
      );

    case 'snow':
    case 'snow-light':
    case 'snow-heavy':
    case 'sleet':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M12 26C8.7 26 6 23.3 6 20C6 17 8.2 14.5 11.2 14.1C12.6 9.8 16.8 6.5 22 6.5C28.1 6.5 33 11.4 33 17.5C35 18.5 37 20.7 37 23.5C37 27 34 29 30.5 29L12 29Z"
            fill="#94a3b8"
          />
          <g fill="#c4e7ff">
            <circle cx="15" cy="36" r="2.5" />
            <circle cx="24" cy="38" r="2.5" />
            <circle cx="33" cy="36" r="2.5" />
            <circle cx="20" cy="44" r="2" />
            <circle cx="29" cy="44" r="2" />
          </g>
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          style={iconSize}
          aria-hidden="true"
        >
          <path
            d="M14 36C9.6 36 6 32.4 6 28C6 24 9 20.6 13 20.1C14.8 14.3 20.3 10 26.8 10C34.6 10 41 16.4 41 24.2C41 24.8 40.9 25.4 40.8 26C43.3 27.5 45 30.4 45 33.7C45 38.3 41.3 42 36.7 42L14 42Z"
            fill="#64748b"
          />
        </svg>
      );
  }
};
