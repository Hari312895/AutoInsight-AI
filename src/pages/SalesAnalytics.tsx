import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  BarChart2,
  PieChart as PieIcon,
  RefreshCcw,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import {
  allCompaniesData,
  monthlySalesData,
  yearlySalesData,
  regionSalesData,
  bodyStyleData,
  companyModelsMap,
} from '../data/demoData';

export const SalesAnalytics: React.FC = () => {
  // Interactive filters
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>('all');

  // Filter multiplier simulation to reflect interactive recalculations
  const filterMultiplier = useMemo(() => {
    let factor = 1.0;
    if (selectedYear === '2022') factor *= 0.445;
    if (selectedYear === '2023') factor *= 0.555;

    if (selectedCompany !== 'all') {
      const comp = allCompaniesData.find((c) => c.company === selectedCompany);
      factor *= comp ? (comp.sales / 23906) * 7.5 : 0.08;
    }

    if (selectedRegion !== 'all') {
      const reg = regionSalesData.find((r) => r.region === selectedRegion);
      factor *= reg ? (reg.sales / 23906) * 3.5 : 0.2;
    }

    if (selectedBodyStyle !== 'all') {
      const b = bodyStyleData.find((style) => style.bodyStyle === selectedBodyStyle);
      factor *= b ? (b.sales / 23906) * 2.8 : 0.25;
    }

    return Math.max(0.04, Math.min(1.0, factor));
  }, [selectedYear, selectedCompany, selectedRegion, selectedBodyStyle]);

  // Dynamically recomputed performance summary
  const summaryMetrics = useMemo(() => {
    const isFiltered =
      selectedYear !== 'all' ||
      selectedCompany !== 'all' ||
      selectedRegion !== 'all' ||
      selectedBodyStyle !== 'all';

    const baseSales = 23906;
    const baseRevenue = 671525465;

    const currentSales = isFiltered ? Math.round(baseSales * filterMultiplier) : baseSales;
    const currentRevenue = isFiltered ? Math.round(baseRevenue * filterMultiplier) : baseRevenue;
    const currentAvgPrice = Math.round(currentRevenue / (currentSales || 1));

    // Dynamic highest sales period
    const highestMonth = monthlySalesData.reduce((prev, curr) => (curr.sales > prev.sales ? curr : prev), monthlySalesData[0]);
    const avgSalesPerMonth = Math.round(currentSales / 12);

    return {
      currentSales,
      currentRevenue,
      currentAvgPrice,
      highestPeriod: `${highestMonth.month} (${Math.round(highestMonth.sales * (isFiltered ? filterMultiplier : 1)).toLocaleString()} units)`,
      avgSalesPerPeriod: avgSalesPerMonth,
      isFiltered,
    };
  }, [filterMultiplier, selectedYear, selectedCompany, selectedRegion, selectedBodyStyle]);

  // Dynamically scaled chart datasets
  const dynamicMonthlyData = useMemo(() => {
    return monthlySalesData.map((d) => ({
      ...d,
      sales: Math.round(d.sales * filterMultiplier),
      revenue: Math.round(d.revenue * filterMultiplier),
    }));
  }, [filterMultiplier]);

  const dynamicYearlyData = useMemo(() => {
    return yearlySalesData.map((d) => {
      let yrMultiplier = filterMultiplier;
      if (selectedYear === '2022' && d.year === 2023) yrMultiplier = 0;
      if (selectedYear === '2023' && d.year === 2022) yrMultiplier = 0;
      return {
        ...d,
        sales: Math.round(d.sales * yrMultiplier),
        revenue: Math.round(d.revenue * yrMultiplier),
      };
    });
  }, [filterMultiplier, selectedYear]);

  const dynamicCompanySales = useMemo(() => {
    const top = allCompaniesData.slice(0, 10);
    return top.map((c) => ({
      ...c,
      sales: selectedCompany === 'all' || selectedCompany === c.company ? Math.round(c.sales * filterMultiplier) : Math.round(c.sales * 0.05),
      revenue: selectedCompany === 'all' || selectedCompany === c.company ? Math.round(c.revenue * filterMultiplier) : Math.round(c.revenue * 0.05),
    }));
  }, [filterMultiplier, selectedCompany]);

  const dynamicRegionData = useMemo(() => {
    return regionSalesData.map((r) => ({
      ...r,
      sales: selectedRegion === 'all' || selectedRegion === r.region ? Math.round(r.sales * filterMultiplier) : Math.round(r.sales * 0.1),
      revenue: selectedRegion === 'all' || selectedRegion === r.region ? Math.round(r.revenue * filterMultiplier) : Math.round(r.revenue * 0.1),
    }));
  }, [filterMultiplier, selectedRegion]);

  const resetFilters = () => {
    setSelectedYear('all');
    setSelectedCompany('all');
    setSelectedRegion('all');
    setSelectedBodyStyle('all');
  };

  return (
    <div className="space-y-6">
      {/* Top Interactive Filter Bar */}
      <div className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/80 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase font-mono">
              Live Interactive Filters
            </h3>
            {summaryMetrics.isFiltered && (
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded">
                Active Filtering
              </span>
            )}
          </div>

          {summaryMetrics.isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors font-mono"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* 4 Dropdown Filters (Year, Company, Region, Body Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Year Filter */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Sales Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">All Years (2022 & 2023)</option>
              <option value="2022">2022 (10,645 sales)</option>
              <option value="2023">2023 (13,261 sales)</option>
            </select>
          </div>

          {/* Company Filter */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Manufacturer
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">All 30 Companies</option>
              {allCompaniesData.map((c) => (
                <option key={c.company} value={c.company}>
                  {c.company} ({c.sales} sales)
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Dealer Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">All 7 Regions</option>
              {regionSalesData.map((r) => (
                <option key={r.region} value={r.region}>
                  {r.region} ({r.sales} sales)
                </option>
              ))}
            </select>
          </div>

          {/* Body Style Filter */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Body Style
            </label>
            <select
              value={selectedBodyStyle}
              onChange={(e) => setSelectedBodyStyle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">All Body Styles</option>
              {bodyStyleData.map((b) => (
                <option key={b.bodyStyle} value={b.bodyStyle}>
                  {b.bodyStyle} ({b.sales} sales)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sales Performance Summary Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
            Sales Performance Summary
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            id="summary-highest-period"
            title="Highest Sales Period"
            value={summaryMetrics.highestPeriod.split(' ')[0]}
            subtitle={summaryMetrics.highestPeriod}
            badge="Peak Cycle"
            badgeColor="amber"
            icon={Calendar}
          />
          <KPICard
            id="summary-total-sales"
            title="Active Subset Sales"
            value={summaryMetrics.currentSales.toLocaleString()}
            subtitle="Vehicle units sold"
            badge="Calculated"
            badgeColor="cyan"
            icon={TrendingUp}
          />
          <KPICard
            id="summary-total-revenue"
            title="Subset Revenue"
            value={`$${(summaryMetrics.currentRevenue / 1000000).toFixed(1)}M`}
            subtitle={`$${summaryMetrics.currentRevenue.toLocaleString()}`}
            badge="Gross Total"
            badgeColor="emerald"
            icon={DollarSign}
          />
          <KPICard
            id="summary-avg-period"
            title="Avg Sales Per Period"
            value={summaryMetrics.avgSalesPerPeriod.toLocaleString()}
            subtitle="Units / monthly run-rate"
            badge="Mean Velocity"
            badgeColor="blue"
            icon={BarChart2}
          />
        </div>
      </div>

      {/* 6 Core Sales Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Sales by Year */}
        <ChartCard
          id="sales-by-year"
          title="Sales Volume by Year"
          subtitle="Annual transaction count based on active filter scope"
          badge="Yearly"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dynamicYearlyData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} units`, 'Sales Volume']} />
              <Bar dataKey="sales" name="Sales Units" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Sales by Month */}
        <ChartCard
          id="sales-by-month"
          title="Sales Volume by Month"
          subtitle="Monthly progression highlighting seasonality peaks in Q3 and Q4"
          badge="Monthly Trend"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dynamicMonthlyData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => val.slice(0, 3)}
              />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} units`, 'Sales Volume']} />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales Volume"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#06b6d4' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Sales by Company */}
        <ChartCard
          id="sales-by-company"
          title="Sales Volume by Manufacturer"
          subtitle="Unit sales ranking across leading automotive brands"
          badge="Brand Volume"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={dynamicCompanySales}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis dataKey="company" type="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={75} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} units`, 'Units Sold']} />
              <Bar dataKey="sales" name="Sales" fill="#0284c7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Revenue by Company */}
        <ChartCard
          id="revenue-by-company"
          title="Total Revenue by Manufacturer"
          subtitle="Gross dollar receipts (Chevrolet, Ford, and Dodge lead revenue)"
          badge="Dollar Volume"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={dynamicCompanySales}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000000).toFixed(0)}M`}
              />
              <YAxis dataKey="company" type="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={75} />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Total Revenue']} />
              <Bar dataKey="revenue" name="Revenue ($)" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5. Sales by Dealer Region */}
        <ChartCard
          id="sales-by-region"
          title="Sales Volume by Region"
          subtitle="Unit counts distributed across Austin, Janesville, Scottsdale, etc."
          badge="Regional Units"
        >
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={dynamicRegionData} margin={{ top: 10, right: 20, left: 10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="region" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} angle={-20} textAnchor="end" />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} cars`, 'Sales']} />
              <Bar dataKey="sales" name="Sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 6. Revenue by Dealer Region */}
        <ChartCard
          id="revenue-by-region"
          title="Revenue by Dealer Region"
          subtitle="Aggregate financial turnover generated in each dealer territory"
          badge="Regional Revenue"
        >
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={dynamicRegionData} margin={{ top: 10, right: 20, left: 10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="region" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} angle={-20} textAnchor="end" />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000000).toFixed(0)}M`}
              />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Revenue ($)']} />
              <Bar dataKey="revenue" name="Revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
