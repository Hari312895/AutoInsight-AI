import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { SalesAnalytics } from './pages/SalesAnalytics';
import { VehicleAnalytics } from './pages/VehicleAnalytics';
import { CustomerAnalytics } from './pages/CustomerAnalytics';
import { DealerRegion } from './pages/DealerRegion';
import { PricePrediction } from './pages/PricePrediction';
import { ModelInsights } from './pages/ModelInsights';
import { About } from './pages/About';
import { NavigationPage } from './types';
import { Sparkles, ShieldCheck, Database, GitBranch } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<NavigationPage>('overview');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderActivePage = () => {
    switch (activePage) {
      case 'overview':
        return <Dashboard onNavigate={setActivePage} />;
      case 'sales':
        return <SalesAnalytics />;
      case 'vehicles':
        return <VehicleAnalytics />;
      case 'customers':
        return <CustomerAnalytics />;
      case 'dealers':
        return <DealerRegion />;
      case 'prediction':
        return <PricePrediction />;
      case 'insights':
        return <ModelInsights />;
      case 'about':
        return <About />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex">
      {/* Responsive Navigation Sidebar */}
      <Sidebar
        activePage={activePage}
        onSelectPage={setActivePage}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Sticky Header */}
        <Header
          activePage={activePage}
          onSelectPage={setActivePage}
          onOpenMobile={() => setIsOpenMobile(true)}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            // If user searches while on another page, guide them to relevant analytics
            if (query.trim().length > 1 && activePage === 'overview') {
              setActivePage('vehicles');
            }
          }}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>

        {/* Standardized Platform Footer */}
        <footer className="px-6 py-6 border-t border-slate-800/80 bg-[#080c14] text-xs text-slate-500 font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-slate-300 font-bold">AutoInsight AI</span>
              <span>•</span>
              <span className="text-slate-400">Car Sales Analytics & Predictive Intelligence</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>23,906 Records</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Random Forest Regressor</span>
              </span>
              <span>•</span>
              <span className="hover:text-slate-200 cursor-pointer" onClick={() => setActivePage('about')}>
                Project Docs
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
