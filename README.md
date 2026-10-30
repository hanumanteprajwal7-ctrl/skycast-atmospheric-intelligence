# SkyCast — Smart Weather Forecast & Atmospheric Intelligence

A modern, high-precision atmospheric forecasting dashboard created as a mini-project for the **Let's Upgrade** curriculum. Built using React 19, TypeScript, Tailwind CSS v4, vector SVG data visualizations, and real-time meteorological data ingestion from the **Open-Meteo** public weather API.

---

## 🌤️ Project Overview

**SkyCast** provides real-time global weather conditions, hourly 24-hour horizon forecasts, synoptic 7-day extended forecasts, and high-fidelity sensor telemetry (wind vectors, UV radiation, barometric pressure, dew point, optical visibility, and celestial solar cycles).

Designed in accordance with the **Google Stitch** atmospheric glassmorphism design system, the interface emphasizes legibility, contrast, and dark-sky ambiance with electric cyan and solar amber accents.

---

## ✨ Features

1. **Active Severe Weather Warnings & Alerts Banner**:
   - Queries meteorological alerts for the selected city, probing the Open-Meteo alerts endpoint and consuming official National Weather Service (NWS) CAP alert feeds for US territories.
   - Computes real-time severe weather hazard thresholds directly from ingested Open-Meteo telemetry (Severe Convective Thunderstorms, Gale-Force Winds, Freezing Rain / Black Ice, Torrential Downpours, Dense Fog, and Extreme Solar UV Radiation).
   - High-priority banner placed above the dashboard with severity level badges (`Emergency`, `Warning`, `Watch`, `Advisory`), issuing authority attribution, and expandable safety guidance and protective actions.
   - Interactive "Simulate Test Alert" toggle for instant demonstration and UI inspection.

2. **Global City Search with Auto-Complete**:
   - Debounced search querying worldwide municipalities and administrative regions via the Open-Meteo Geocoding API.
   - Keyboard navigation with `Enter` and `Escape` support, input clear trigger, and popular preset cities (Tokyo, New York, London, Paris, Mumbai, Sydney).

2. **Current Conditions & Local Time Clock**:
   - Real-time temperature, apparent ("feels-like") temperature, daily minimum & maximum records.
   - Dynamic local time clock calibrated to the target municipality's actual timezone with minute-precision tick intervals.
   - Narrative atmospheric synopsis describing ground-level conditions.

3. **24-Hour Horizon Forecast Scroller**:
   - Horizontally scrollable timeline featuring weather condition glyphs, local hour timestamps, temperature readings, and precipitation likelihood percentages.
   - Highlighted active hour container with atmospheric glow.

4. **Atmospheric Thermal Curve (Temperature Trend Chart)**:
   - Interactive SVG spline chart rendering the 24-hour diurnal temperature cycle.
   - Smooth cubic bezier interpolation, gradient area fill, and responsive hover cursor with real-time tooltips.

5. **7-Day Synoptic Outlook**:
   - 7-day extended forecasts featuring condition icons, min/max metrics, and iOS-style relative temperature range bars.
   - Interactive accordion cards expandable to reveal sunrise, sunset, maximum UV index, and peak precipitation risk.

6. **Atmospheric Sensor Telemetry**:
   - **Wind Compass**: 16-point cardinal compass rose with animated rotating needle, speed in km/h or mph, and surface boundary vector.
   - **Humidity & Moisture**: Circular radial progress gauge with Magnus-Tetens dew point calculation.
   - **Solar Radiation (UV Index)**: Categorized UV exposure meter with WHO sun-safety recommendations.
   - **Barometric Pressure**: Atmospheric column pressure in hPa and inHg with elevation equilibrium indicators.
   - **Optical Visibility**: Unobstructed horizontal line-of-sight range.
   - **Precipitation Horizon**: Hourly accumulation rate and 24h probability.
   - **Celestial Solar Arc**: Half-circle sun trajectory diagram tracking current daylight progress and daylight remaining.

7. **Browser GPS Geolocation**:
   - One-touch "GPS Detect" button using `navigator.geolocation` with reverse geocoding to identify the user's current city.
   - Comprehensive error handling for permission denial, timeout, and device unavailability.

8. **Dynamic Metric & Imperial Unit Toggle**:
   - Instant conversion between Celsius (°C) and Fahrenheit (°F) across all cards, charts, and telemetry metrics.
   - State persisted in browser `localStorage`.

9. **Theme Toggle (Midnight Atmospheric & Daylight Troposphere)**:
   - Dual theme support built with Tailwind CSS v4 `@custom-variant dark`.

10. **Cloud & AWS Deployment Readiness**:
    - Built-in interactive AWS Cloud Deployment modal providing architecture diagrams, Amazon S3 bucket policies, and AWS CLI automation scripts.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript (Strict Type Checking) |
| **Styling** | Tailwind CSS v4 (`@import "tailwindcss"`) |
| **Design System** | Google Stitch Atmospheric Glassmorphism |
| **Icons** | Custom Atmospheric SVG Glyphs + Lucide React |
| **Data Visualizations** | Custom Responsive SVG Spline Charts & Dial Gauges |
| **Weather API** | Open-Meteo Weather Forecast & Geocoding APIs (No API key needed, CC BY 4.0) |
| **Build Tool** | Vite 8 + ESBuild |
| **Target Cloud** | Amazon Web Services (AWS S3 + CloudFront + ACM + Route 53) |

---

## 🌐 Weather API Specifications

SkyCast consumes live data from [Open-Meteo](https://open-meteo.com/):

1. **Geocoding API**:
   `https://geocoding-api.open-meteo.com/v1/search?name={query}&count=8&language=en&format=json`
2. **Forecast Telemetry API**:
   `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto`

WMO Weather Interpretation Codes (0–99) are mapped to human-readable condition classifications and custom atmospheric vector graphics.

---

## 📁 Project Folder Structure

```
skycast-weather-app/
├── index.html                     # HTML5 entry point with metadata & Google Fonts
├── metadata.json                  # AI Studio application metadata
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript compiler options
├── vite.config.ts                 # Vite build configuration
├── src/
│   ├── main.tsx                   # React root mount point
│   ├── index.css                  # Tailwind v4 directives, glass tokens & fonts
│   ├── App.tsx                    # Master dashboard controller & state manager
│   ├── types/
│   │   └── weather.ts             # TypeScript definitions for telemetry payloads
│   ├── services/
│   │   └── weatherApi.ts          # Open-Meteo API ingestion & reverse geocoding
│   ├── utils/
│   │   └── weatherUtils.ts        # WMO code maps, unit conversions, and calculations
│   └── components/
│       ├── TopNav.tsx             # 3-Zone navigation bar with units & theme toggles
│       ├── CitySearch.tsx         # Debounced search bar with autocomplete dropdown
│       ├── CurrentWeatherCard.tsx # Hero current weather overview & local time clock
│       ├── HourlyForecast.tsx     # 24-hour horizontal forecast scroller
│       ├── TemperatureChart.tsx   # Interactive SVG temperature trend spline chart
│       ├── SevenDayForecast.tsx   # 7-day extended forecast with range bars
│       ├── AtmosphericGauges.tsx  # Telemetry cards (Wind, UV, Pressure, Solar Arc)
│       ├── WeatherIcons.tsx       # Custom atmospheric SVG weather icons
│       ├── AwsDeploymentModal.tsx # AWS Cloud deployment guide & CLI scripts
│       ├── AboutModal.tsx         # Project specs & Let's Upgrade credit
│       └── Footer.tsx             # Footer attribution and quick navigation links
└── README.md                      # Comprehensive project documentation
```

---

## 🚀 Local Installation & Execution

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **pnpm** / **yarn**

### Step-by-Step Instructions

1. **Clone or Download the Repository**:
   ```bash
   git clone <repository-url>
   cd skycast-weather-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Local Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` (or the port specified in terminal).

5. **Type Check & Lint**:
   ```bash
   npm run lint
   ```

6. **Compile Static Production Bundle**:
   ```bash
   npm run build
   ```
   The compiled assets will be output in the `dist/` directory, ready for deployment.

---

## ☁️ AWS Cloud Deployment Guide

The compiled SkyCast application is fully static, making it an ideal candidate for AWS hosting:

### 1. Amazon S3 Static Hosting
- Build your project: `npm run build`.
- Create an Amazon S3 bucket (e.g., `skycast-weather-app`).
- Upload the contents of `dist/` into the root of the S3 bucket.

### 2. Amazon CloudFront (CDN) & HTTPS
- Create a CloudFront Distribution pointing to your S3 bucket as origin.
- Use **Origin Access Control (OAC)** to keep the S3 bucket private while CloudFront serves the content securely.
- Set the **Default Root Object** to `index.html`.
- Configure an Error Page redirecting HTTP 404/403 to `/index.html` with status 200 (for SPA routing).
- Request a free SSL certificate via **AWS Certificate Manager (ACM)** in `us-east-1` and attach it to CloudFront.

### 3. Automated Deployment via AWS CLI
```bash
# Sync local dist/ with S3 bucket
aws s3 sync dist/ s3://skycast-weather-app --delete

# Create cache invalidation on CloudFront
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

---

## ⚖️ License & Attribution

- **Weather Data**: Provided by [Open-Meteo.com](https://open-meteo.com/) under the [Creative Commons Attribution 4.0 International license (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
- **Curriculum**: Assigned as a Weather App mini-project by the **Let's Upgrade** platform.
- **Design System**: Based on Google Stitch design tokens.
