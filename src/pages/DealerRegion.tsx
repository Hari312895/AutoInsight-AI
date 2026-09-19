import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Building2,
  DollarSign,
  TrendingUp,
  Store,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import { DataTable, Column } from '../components/DataTable';
import {
  top10DealersData,
  regionSalesData,
} from '../data/demoData';
import { DealerData } from '../types';

export const DealerRegion: React.FC = () => {
  // Region filter for the interactive table
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  // Filtered dealers table data
  const filteredDealers = useMemo(() => {
    if (selectedRegionFilter === 'all') return top10DealersData;
    return top10DealersData.filter((d) => d.region === selectedRegionFilter);
  }, [selectedRegionFilter]);

  // Columns for the interactive dealer table
  const columns: Column<DealerData>[] = [
    {
      key: 'dealerName',
      header: 'Dealership Name',
      accessor: (item) => (
        <span className="font-semibold text-white flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{item.dealerName}</span>
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.dealerName,
    },
    {
      key: 'region',
      header: 'Region',
      accessor: (item) => (
        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
          {item.region}
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.region,
    },
    {
      key: 'sales',
      header: 'Total Sales',
      accessor: (item) => (
        <span className="font-mono text-slate-200 font-semibold">
          {item.sales.toLocaleString()} cars
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.sales,
    },
    {
      key: 'revenue',
      header: 'Gross Revenue',
      accessor: (item) => (
        <span className="font-mono text-emerald-400 font-bold">
          ${item.revenue.toLocaleString()}
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.revenue,
    },
    {
      key: 'avgPrice',
      header: 'Average Price',
      accessor: (item) => (
        <span className="font-mono text-cyan-300 font-semibold">
          ${Math.round(item.avgPrice).toLocaleString()}
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.avgPrice,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Regional Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          id="dealer-top-region"
          title="Leading Region (Volume)"
          value="Austin"
          subtitle="4,135 sales (17.3% share)"
          badge="Zone Leader"
          badgeColor="cyan"
          icon={MapPin}
        />
        <KPICard
          id="dealer-top-revenue"
          title="Leading Region (Revenue)"
          value="$117.2M"
          subtitle="Austin territory turnover"
          badge="Financial Lead"
          badgeColor="emerald"
          icon={DollarSign}
        />
        <KPICard
          id="dealer-highest-avg"
          title="Highest Regional Avg"
          value="$28,342"
          subtitle="Austin average car price"
          badge="Top Valuation"
          badgeColor="blue"
          icon={TrendingUp}
        />
        <KPICard
          id="dealer-active-dealers"
          title="Dealership Network"
          value="28 Dealers"
          subtitle="Across 7 regions"
          badge="Network"
          badgeColor="purple"
          icon={Building2}
        />
      </div>

      {/* Top 10 Dealers & Regional Breakdown Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Top 10 Dealers by Sales */}
        <ChartCard
          id="dealers-by-sales-chart"
          title="Top 10 Dealerships by Sales Volume"
          subtitle="Unit sales ranking led by Progressive Shippers (1,318) and Rabun Used Cars (1,313)"
          badge="Volume Leaderboard"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={top10DealersData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 110, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis
                dataKey="dealerName"
                type="category"
                stroke="#94a3b8"
                tick={{ fill: '#cbd5e1', fontSize: 10 }}
                tickFormatter={(val) => (val.length > 16 ? `${val.slice(0, 16)}...` : val)}
                width={110}
              />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} cars`, 'Sales']} />
              <Bar dataKey="sales" name="Sales Units" fill="#38bdf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Top 10 Dealers by Revenue */}
        <ChartCard
          id="dealers-by-revenue-chart"
          title="Top 10 Dealerships by Gross Revenue"
          subtitle="Dollar revenue ranking led by Rabun Used Cars ($37.5M) and Progressive Shippers ($36.8M)"
          badge="Revenue Leaders"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={top10DealersData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 110, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000000).toFixed(0)}M`}
              />
              <YAxis
                dataKey="dealerName"
                type="category"
                stroke="#94a3b8"
                tick={{ fill: '#cbd5e1', fontSize: 10 }}
                tickFormatter={(val) => (val.length > 16 ? `${val.slice(0, 16)}...` : val)}
                width={110}
              />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" name="Revenue ($)" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Sales & Revenue by Region */}
        <ChartCard
          id="region-volume-chart"
          title="Sales Volume by Region"
          subtitle="Austin (4,135) and Janesville (3,821) account for 33.3% of total vehicle transactions"
          badge="Territories"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionSalesData} margin={{ top: 10, right: 20, left: 10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="region" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} units`, 'Units Sold']} />
              <Bar dataKey="sales" name="Sales Units" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Average Price by Region */}
        <ChartCard
          id="avg-price-by-region-chart"
          title="Average Vehicle Price by Region"
          subtitle="Remarkable uniformity ($27,833 - $28,342) highlighting nationwide baseline consistency"
          badge="Price Parity"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionSalesData} margin={{ top: 10, right: 20, left: 10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="region" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                domain={[26000, 29000]}
                tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
              />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Average Price ($)']} />
              <Bar dataKey="avgPrice" name="Avg Price ($)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Interactive Dealer Table Section */}
      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
              Dealership Directory & Performance Tracker
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore individual dealerships, localized territories, transaction volumes, and revenues.
            </p>
          </div>
        </div>

        <DataTable
          id="dealers-directory-table"
          data={filteredDealers}
          columns={columns}
          searchPlaceholder="Search by dealer name or region..."
          searchFilter={(item, q) =>
            item.dealerName.toLowerCase().includes(q.toLowerCase()) ||
            item.region.toLowerCase().includes(q.toLowerCase())
          }
          extraFilters={
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">Region:</span>
              <select
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Regions</option>
                {regionSalesData.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region}
                  </option>
                ))}
              </select>
            </div>
          }
          pageSize={10}
        />
      </div>
    </div>
  );
};
