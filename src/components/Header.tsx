import React from 'react';
import {
  Menu,
  Search,
  Calendar,
  Database,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { NavigationPage } from '../types';

interface HeaderProps {
  activePage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
  onOpenMobile: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const pageTitles: Record<NavigationPage, { title: string; subtitle: string }> = {
  overview: {
    title: 'Car Sales Analytics',
    subtitle: 'Explore sales performance, pricing patterns and machine learning insights.',
  },
  sales: {
    title: 'Sales & Revenue Analytics',
    subtitle: 'Temporal trends, brand volume distributions, and regional sales performance.',
  },
  vehicles: {
    title: 'Vehicle & Model Intelligence',
    subtitle: 'Model sales volume, luxury trim valuations, powertrains, and body styles.',
  },
  customers: {
    title: 'Customer & Income Demographics',
    subtitle: 'Purchasing behavior by gender, income distributions, and pricing correlation.',
  },
  dealers: {
    title: 'Dealer & Regional Performance',
    subtitle: 'Top performing dealerships, regional revenue velocity, and average prices.',
  },
  prediction: {
    title: 'AI Car Price Predictor',
    subtitle: 'Estimate a vehicle’s price using a machine learning model trained on historical car sales data.',
  },
  insights: {
    title: 'Machine Learning Model Insights',
    subtitle: 'Random Forest diagnostic metrics, feature importances, and residual dispersion.',
  },
  about: {
    title: 'About AutoInsight AI',
    subtitle: 'Comprehensive project architecture, data science pipeline, and API integration.',
  },
};

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onSelectPage,
  onOpenMobile,
  searchQuery,
  onSearchChange,
}) => {
  const currentMeta = pageTitles[activePage] || pageTitles.overview;

  return (
    <header className="sticky top-0 z-30 flex flex-col justify-between px-4 sm:px-8 py-4 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile toggle & Titles */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-trigger"
            onClick={onOpenMobile}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                {currentMeta.title}
              </h1>
              {activePage === 'prediction' && (
                <span className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-full">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Live Estimator
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-xl">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Search */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block w-56 lg:w-72">
            <Search className="absolute w-4 h-4 text-slate-500 left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search companies, models, regions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-200 bg-slate-900/90 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-xs text-slate-500 hover:text-slate-300"
              >
                ×
              </button>
            )}
          </div>

          {/* Quick Date Range Tag */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-300 font-mono">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>2022 - 2023</span>
          </div>

          {/* Quick Test Prediction Button (if not on prediction page) */}
          {activePage !== 'prediction' && (
            <button
              onClick={() => onSelectPage('prediction')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Predict Price</span>
            </button>
          )}

          {/* Dataset Info Chip */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 bg-slate-900/40">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">23,906</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (displayed on small screens) */}
      <div className="mt-3 md:hidden">
        <div className="relative w-full">
          <Search className="absolute w-4 h-4 text-slate-500 left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search dataset..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs text-slate-200 bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
    </header>
  );
};
