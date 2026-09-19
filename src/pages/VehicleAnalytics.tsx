import React from 'react';
import {
  Car,
  Tag,
  Palette,
  Layers,
  Settings2,
  DollarSign,
  Search,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DataTable, Column } from '../components/DataTable';
import {
  top10ModelsBySales,
  top10ExpensiveModels,
  bodyStyleData,
  transmissionData,
  colorData,
  engineData,
  sampleVehiclesCatalog,
} from '../data/demoData';
import { VehicleRecord } from '../types';

const COLOR_MAP: Record<string, string> = {
  'Pale White': '#e2e8f0',
  Black: '#334155',
  Red: '#ef4444',
};

const BODY_STYLE_PALETTE = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24'];

export const VehicleAnalytics: React.FC = () => {
  // Define columns for searchable vehicle model table
  const columns: Column<VehicleRecord>[] = [
    {
      key: 'company',
      header: 'Manufacturer',
      accessor: (item) => (
        <span className="font-semibold text-white">{item.company}</span>
      ),
      sortable: true,
      sortValue: (item) => item.company,
    },
    {
      key: 'model',
      header: 'Car Model',
      accessor: (item) => (
        <span className="font-mono text-cyan-300">{item.model}</span>
      ),
      sortable: true,
      sortValue: (item) => item.model,
    },
    {
      key: 'engine',
      header: 'Engine Specification',
      accessor: (item) => (
        <span className="text-slate-400 text-[11px] truncate max-w-[170px] block">
          {item.engine}
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.engine,
    },
    {
      key: 'transmission',
      header: 'Transmission',
      accessor: (item) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            item.transmission === 'Auto'
              ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/30'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          {item.transmission}
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.transmission,
    },
    {
      key: 'bodyStyle',
      header: 'Body Style',
      accessor: (item) => (
        <span className="text-slate-300">{item.bodyStyle}</span>
      ),
      sortable: true,
      sortValue: (item) => item.bodyStyle,
    },
    {
      key: 'color',
      header: 'Color',
      accessor: (item) => (
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full border border-slate-600"
            style={{ backgroundColor: COLOR_MAP[item.color] || '#94a3b8' }}
          />
          <span>{item.color}</span>
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.color,
    },
    {
      key: 'avgPrice',
      header: 'Average Price',
      accessor: (item) => (
        <span className="font-mono text-emerald-400 font-bold">
          ${item.avgPrice.toLocaleString()}
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.avgPrice,
    },
    {
      key: 'salesCount',
      header: 'Sales Count',
      accessor: (item) => (
        <span className="font-mono text-slate-200 font-semibold">
          {item.salesCount} units
        </span>
      ),
      sortable: true,
      sortValue: (item) => item.salesCount,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Models Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Top 10 Car Models by Sales */}
        <ChartCard
          id="top-models-sales"
          title="Top 10 Car Models by Sales Volume"
          subtitle="Highest selling trims in the dataset led by Diamante, Prizm, and Silhouette"
          badge="Volume Leaders"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={top10ModelsBySales}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis dataKey="model" type="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={75} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} units`, 'Sales Volume']} />
              <Bar dataKey="sales" name="Sales Units" fill="#38bdf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Top 10 Models by Average Price */}
        <ChartCard
          id="top-expensive-models"
          title="Top 10 Models by Average Price"
          subtitle="Highest valued luxury trims led by Cadillac Catera and DeVille"
          badge="Luxury Trims"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={top10ExpensiveModels}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 65, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <YAxis dataKey="model" type="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={80} />
              <Tooltip formatter={(val: any) => [`$${Math.round(Number(val || 0)).toLocaleString()}`, 'Average Price ($)']} />
              <Bar dataKey="avgPrice" name="Avg Price ($)" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Average Price by Body Style */}
        <ChartCard
          id="avg-price-by-bodystyle"
          title="Average Car Price by Body Style"
          subtitle="Sedan and Hardtop command top median pricing; SUV and Hatchback are volume anchors"
          badge="Style Valuation"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={bodyStyleData} margin={{ top: 10, right: 30, left: 15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="bodyStyle" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[24000, 31000]}
              />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Average Price ($)']} />
              <Bar dataKey="avgPrice" name="Avg Price" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Sales by Color & Engine Distribution */}
        <ChartCard
          id="color-engine-distribution"
          title="Color & Engine Configurations"
          subtitle="Color finish popularity (Pale White, Black, Red) and OHC vs DOHC engines"
          badge="Aesthetic & Engine"
        >
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Color Distribution */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  Color Distribution
                </span>
                <span className="text-[10px] font-mono text-slate-400">23,906 Cars</span>
              </div>
              <div className="space-y-2 pt-1">
                {colorData.map((c) => (
                  <div key={c.color} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-slate-600"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.color}</span>
                      </span>
                      <span className="text-slate-400 font-bold">{c.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${c.percentage}%`, backgroundColor: c.hex === '#e2e8f0' ? '#38bdf8' : c.hex }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engine Distribution */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
                  Engine Technology
                </span>
                <span className="text-[10px] font-mono text-slate-400">Valvetrain</span>
              </div>
              <div className="space-y-3 pt-2">
                {engineData.map((eng) => (
                  <div key={eng.engine} className="p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-200 font-semibold truncate max-w-[140px]">{eng.engine}</span>
                      <span className="text-emerald-400 font-bold">{eng.percentage.toFixed(1)}%</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      {eng.sales.toLocaleString()} units sold
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Searchable Vehicle / Model Table Section */}
      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]/70 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
              Vehicle Catalog & Trim Explorer
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive model records with powertrains, body styles, average prices, and volume counts.
            </p>
          </div>
        </div>

        <DataTable
          id="vehicles-catalog-table"
          data={sampleVehiclesCatalog}
          columns={columns}
          searchPlaceholder="Search by company, model, body style, color..."
          searchFilter={(item, q) =>
            item.company.toLowerCase().includes(q.toLowerCase()) ||
            item.model.toLowerCase().includes(q.toLowerCase()) ||
            item.bodyStyle.toLowerCase().includes(q.toLowerCase()) ||
            item.color.toLowerCase().includes(q.toLowerCase()) ||
            item.engine.toLowerCase().includes(q.toLowerCase())
          }
          pageSize={8}
        />
      </div>
    </div>
  );
};
