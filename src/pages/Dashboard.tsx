import React from 'react';
import {
  ShoppingBag,
  DollarSign,
  Tag,
  Building2,
  Car,
  MapPin,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { InsightCard } from '../components/InsightCard';
import {
  kpiSummaryData,
  yearlySalesData,
  monthlySalesData,
  top10CompaniesBySales,
  regionSalesData,
  bodyStyleData,
  transmissionData,
} from '../data/demoData';
import { NavigationPage } from '../types';

interface DashboardProps {
  onNavigate: (page: NavigationPage) => void;
}

const BODY_STYLE_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24'];
const TRANSMISSION_COLORS = ['#06b6d4', '#64748b'];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Overview Top KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          id="kpi-total-sales"
          title="Total Sales"
          value={kpiSummaryData.totalSales.toLocaleString()}
          subtitle="All transactions"
          badge="Verified"
          badgeColor="cyan"
          icon={ShoppingBag}
          trendText="+24.6% in 2023"
          isPositive={true}
        />
        <KPICard
          id="kpi-total-revenue"
          title="Total Revenue"
          value={`$${(kpiSummaryData.totalRevenue / 1000000).toFixed(1)}M`}
          subtitle={`$${kpiSummaryData.totalRevenue.toLocaleString()}`}
          badge="Gross Vol"
          badgeColor="emerald"
          icon={DollarSign}
          trendText="+24.7% YoY"
          isPositive={true}
        />
        <KPICard
          id="kpi-avg-price"
          title="Average Price"
          value={`$${Math.round(kpiSummaryData.averagePrice).toLocaleString()}`}
          subtitle="Per vehicle transaction"
          badge="Mean"
          badgeColor="blue"
          icon={Tag}
          trendText="Stable across years"
          isPositive={true}
        />
        <KPICard
          id="kpi-companies"
          title="Manufacturers"
          value={kpiSummaryData.totalCompanies}
          subtitle="Active automakers"
          badge="30 Brands"
          badgeColor="purple"
          icon={Building2}
        />
        <KPICard
          id="kpi-models"
          title="Distinct Models"
          value={kpiSummaryData.totalModels}
          subtitle="Catalog diversity"
          badge="154 Trims"
          badgeColor="cyan"
          icon={Car}
        />
        <KPICard
          id="kpi-regions"
          title="Dealer Regions"
          value={kpiSummaryData.totalRegions}
          subtitle="Regional clusters"
          badge="7 Territories"
          badgeColor="amber"
          icon={MapPin}
        />
      </div>

      {/* Primary Analytics Charts Grid (Charts A, B, C, D, E, F) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A. Yearly Sales Trend */}
        <ChartCard
          id="chart-yearly-trend"
          title="Yearly Sales Trend"
          subtitle="Transaction volume comparison across 2022 and 2023"
          badge="YoY Growth"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={yearlySalesData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }}
                domain={[9000, 14000]}
                tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
              />
              <Tooltip
                formatter={(value: any) => [`${Number(value || 0).toLocaleString()} units`, 'Units Sold']}
                labelFormatter={(label) => `Calendar Year: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales Volume"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 6, fill: '#0284c7', stroke: '#38bdf8', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#38bdf8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* B. Monthly Sales Trend */}
        <ChartCard
          id="chart-monthly-trend"
          title="Monthly Sales Trend"
          subtitle="Chronological seasonal volume curve across all 12 calendar months"
          badge="Seasonality"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlySalesData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => val.slice(0, 3)}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                tickFormatter={(val) => `${val}`}
              />
              <Tooltip
                formatter={(value: any) => [`${Number(value || 0).toLocaleString()} cars`, 'Sales Volume']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="sales"
                name="Monthly Sales"
                stroke="#38bdf8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#monthlyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* C. Sales by Company (Top 10) */}
        <ChartCard
          id="chart-company-sales"
          title="Sales by Manufacturer"
          subtitle="Top 10 automotive brands ranked by total unit volume"
          badge="Top 10 Brands"
        >
          <ResponsiveContainer width="100%" height={290}>
            <BarChart
              data={top10CompaniesBySales}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              />
              <YAxis
                dataKey="company"
                type="category"
                stroke="#94a3b8"
                tick={{ fill: '#cbd5e1', fontSize: 11 }}
                width={75}
              />
              <Tooltip
                formatter={(val: any) => [`${Number(val || 0).toLocaleString()} units`, 'Units Sold']}
                labelFormatter={(label) => `Manufacturer: ${label}`}
              />
              <Bar dataKey="sales" name="Sales Units" fill="#0284c7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* D. Sales by Dealer Region */}
        <ChartCard
          id="chart-region-sales"
          title="Sales by Dealer Region"
          subtitle="Geographic territory distribution across 7 dealer zones"
          badge="Regional Spread"
        >
          <ResponsiveContainer width="100%" height={290}>
            <BarChart data={regionSalesData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="region"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                angle={-20}
                textAnchor="end"
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                tickFormatter={(val) => `${val}`}
              />
              <Tooltip
                formatter={(val: any) => [`${Number(val || 0).toLocaleString()} vehicles`, 'Units Sold']}
                labelFormatter={(label) => `Region: ${label}`}
              />
              <Bar dataKey="sales" name="Sales" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* E. Sales by Body Style (Donut/Pie) */}
        <ChartCard
          id="chart-bodystyle-distribution"
          title="Sales by Body Style"
          subtitle="Volume share breakdown between SUV, Hatchback, Sedan, Passenger & Hardtop"
          badge="5 Styles"
        >
          <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-4">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={bodyStyleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="sales"
                  nameKey="bodyStyle"
                >
                  {bodyStyleData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BODY_STYLE_COLORS[index % BODY_STYLE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} vehicles`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend breakdown */}
            <div className="flex flex-col gap-2 min-w-[140px] text-xs font-mono">
              {bodyStyleData.map((item, idx) => (
                <div key={item.bodyStyle} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: BODY_STYLE_COLORS[idx] }}
                    />
                    <span>{item.bodyStyle}</span>
                  </span>
                  <span className="text-slate-400 font-bold">{item.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* F. Transmission Distribution */}
        <ChartCard
          id="chart-transmission-distribution"
          title="Transmission Distribution"
          subtitle="Automatic vs Manual transmission market balance in historical records"
          badge="Powertrain"
        >
          <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-4">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={transmissionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="sales"
                  nameKey="type"
                >
                  {transmissionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={TRANSMISSION_COLORS[index % TRANSMISSION_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} cars`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend breakdown */}
            <div className="flex flex-col gap-3 min-w-[160px] text-xs font-mono">
              {transmissionData.map((item, idx) => (
                <div key={item.type} className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: TRANSMISSION_COLORS[idx] }}
                      />
                      <span>{item.type}</span>
                    </span>
                    <span className="text-cyan-400 font-bold">{item.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Units: {item.sales.toLocaleString()}</span>
                    <span>Avg: ${Math.round(item.avgPrice).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Key Analytical Insights Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold tracking-tight text-white uppercase font-mono">
              Key Project Insights & Empirical Findings
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Derived from 23,906 Records</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InsightCard
            id="insight-card-1"
            icon={BarChart3}
            category="Brand Dynamics"
            title="Manufacturer Variance"
            description="Sales volume varies considerably across 30 manufacturers. High sales volume does not guarantee the highest revenue due to unit pricing differences."
            metricLabel="Top Volume Brand"
            metricValue="Chevrolet (1,819 units)"
            accent="cyan"
          />

          <InsightCard
            id="insight-card-2"
            icon={MapPin}
            category="Territories"
            title="Regional Activity"
            description="Austin and Janesville lead in gross activity, but car prices remain relatively uniform across all 7 dealer regions, indicating centralized pricing policies."
            metricLabel="Top Region Share"
            metricValue="Austin ($117.2M)"
            accent="emerald"
          />

          <InsightCard
            id="insight-card-3"
            icon={Layers}
            category="Specifications"
            title="Pricing Patterns"
            description="Vehicle attributes—specifically car model, body style, and powertrain—show clear structural pricing tiers ranging from $1,200 to $85,800."
            metricLabel="Model Importance"
            metricValue="0.9832 (Top Predictor)"
            accent="blue"
          />

          <InsightCard
            id="insight-card-4"
            icon={CheckCircle2}
            category="Machine Learning"
            title="Predictive Modeling"
            description="Historical sales features successfully power a Random Forest Regressor, capturing multi-variable non-linear pricing factors with low residual error."
            metricLabel="Baseline R² Score"
            metricValue="0.5987 (100 Trees)"
            accent="amber"
          />
        </div>
      </div>

      {/* Quick Launch CTA to Prediction */}
      <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded">
              Machine Learning Module
            </span>
            <span className="text-xs text-slate-400 font-mono">Random Forest Regressor</span>
          </div>
          <h4 className="text-base font-bold text-white">
            Ready to test price estimation on custom vehicle specifications?
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            Input manufacturer, trim, engine type, transmission, color, and buyer income to receive an instant machine learning valuation.
          </p>
        </div>

        <button
          onClick={() => onNavigate('prediction')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch AI Price Predictor</span>
        </button>
      </div>
    </div>
  );
};
