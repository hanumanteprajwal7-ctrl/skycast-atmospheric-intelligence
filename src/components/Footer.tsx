import React from 'react';
import { CloudRain, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAwsModal: () => void;
  onOpenAboutModal: () => void;
  onSelectSection: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAwsModal,
  onOpenAboutModal,
  onSelectSection,
}) => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#080e1d] text-slate-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-[#080e1d]">
                <CloudRain className="w-4 h-4 text-[#080e1d]" strokeWidth={2.4} />
              </div>

              <span className="font-display font-bold text-lg text-white">
                SkyCast <span className="text-[#38bdf8] font-normal text-sm">Atmospheric Intelligence</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Precision weather monitoring and hyper-local atmospheric forecasting platform. Built with real-time data ingestion from the Open-Meteo meteorological cluster, engineered for client-side speed and AWS cloud deployment.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-display">
              Navigation
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectSection('home')}
                  className="hover:text-[#38bdf8] transition-colors"
                >
                  Current Conditions
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectSection('forecast')}
                  className="hover:text-[#38bdf8] transition-colors"
                >
                  7-Day Outlook
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectSection('sensors')}
                  className="hover:text-[#38bdf8] transition-colors"
                >
                  Atmospheric Telemetry
                </button>
              </li>

              <li>
                <button
                  onClick={onOpenAwsModal}
                  className="hover:text-amber-300 transition-colors"
                >
                  AWS Cloud Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Attribution & Data */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-display">
              Data & Attribution
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1"
                >
                  <span>Open-Meteo Weather API</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>

              <li>
                <span className="text-slate-500">License: CC BY 4.0</span>
              </li>

              <li>
                <button
                  onClick={onOpenAboutModal}
                  className="hover:text-white transition-colors"
                >
                  Project Specifications & Notes
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} SkyCast Atmospheric Intelligence. Designed by Hanumante Prajwal.
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted for high-fidelity meteorological monitoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
