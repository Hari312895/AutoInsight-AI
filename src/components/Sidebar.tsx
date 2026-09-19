import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Car,
  Users,
  MapPin,
  Sparkles,
  Cpu,
  Info,
  ChevronRight,
  ShieldCheck,
  X,
  Gauge,
} from 'lucide-react';
import { NavigationPage } from '../types';

interface SidebarProps {
  activePage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  badge?: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
  { id: 'vehicles', label: 'Vehicle Analytics', icon: Car },
  { id: 'customers', label: 'Customer Analytics', icon: Users },
  { id: 'dealers', label: 'Dealer & Region', icon: MapPin },
  { id: 'prediction', label: 'Price Prediction', badge: 'AI Model', icon: Sparkles },
  { id: 'insights', label: 'Model Insights', icon: Cpu },
  { id: 'about', label: 'About Project', icon: Info },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col w-72 bg-[#0d121f] border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            {/* Custom Automotive AI Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-slate-900 border border-cyan-500/40 shadow-inner group">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-cyan-400 transform group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Modern Abstract High-Speed Vehicle Silhouette */}
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 11l1.5-3" />
                <path d="M14 8h-4" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white">
                  AutoInsight
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                Predictive Intelligence
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Status Pill */}
        <div className="px-6 py-3 border-b border-slate-800/40 bg-slate-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
              <span className="pl-3 text-[11px] text-slate-300">Dataset Active</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              23,906 Records
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono">
            Platform Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  onSelectPage(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-800 text-cyan-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom System Card */}
        <div className="p-4 m-3 border rounded-xl border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-200">
              RF Model Spec
            </span>
          </div>
          <div className="space-y-1 text-[11px] font-mono text-slate-400">
            <div className="flex justify-between">
              <span>Target:</span>
              <span className="text-slate-300">Price ($)</span>
            </div>
            <div className="flex justify-between">
              <span>R² Score:</span>
              <span className="text-emerald-400 font-bold">0.5987</span>
            </div>
            <div className="flex justify-between">
              <span>MAE:</span>
              <span className="text-cyan-300">$4,564</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-800/70 text-[10px] text-slate-500">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Trained Baseline: 100 Trees</span>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="px-6 py-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex justify-between items-center">
          <span>v2.4 Production</span>
          <span className="font-mono text-slate-400">AutoML v1.0</span>
        </div>
      </aside>
    </>
  );
};
