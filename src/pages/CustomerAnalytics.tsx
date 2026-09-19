import React from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Info,
  ShieldAlert,
  Percent,
  Wallet,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import {
  genderData,
  incomeBracketData,
  incomePriceScatterPoints,
} from '../data/demoData';

const GENDER_COLORS = ['#38bdf8', '#f472b6'];

export const CustomerAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Customer Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          id="customer-avg-income"
          title="Mean Annual Income"
          value="$830,840"
          subtitle="Customer average"
          badge="Sample Mean"
          badgeColor="cyan"
          icon={Wallet}
          trendText="Median: $735,000"
          isPositive={true}
        />
        <KPICard
          id="customer-income-range"
          title="Income Range"
          value="$10.1k - $11.2M"
          subtitle="Min to Max in dataset"
          badge="Distribution"
          badgeColor="blue"
          icon={DollarSign}
        />
        <KPICard
          id="customer-price-income-corr"
          title="Income vs Price Corr."
          value="r = +0.012"
          subtitle="Statistically near-zero"
          badge="Pearson r"
          badgeColor="amber"
          icon={Activity}
          trendText="No strong dependence"
          isPositive={true}
        />
        <KPICard
          id="customer-gender-split"
          title="Primary Demographics"
          value="78.6% M / 21.4% F"
          subtitle="18,798 Male vs 5,108 Female"
          badge="Gender Split"
          badgeColor="purple"
          icon={Users}
        />
      </div>

      {/* Primary Customer Demographic Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Sales & Avg Price by Gender */}
        <ChartCard
          id="gender-analytics-chart"
          title="Gender Volume & Average Transaction Price"
          subtitle="Sales count distribution and average vehicle prices ($28,277 Female vs $28,039 Male)"
          badge="Demographics"
        >
          <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-4">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="sales"
                  nameKey="gender"
                >
                  {genderData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} transactions`, 'Volume']} />
              </PieChart>
            </ResponsiveContainer>

            {/* Gender detail pills */}
            <div className="flex flex-col gap-3 min-w-[170px] text-xs font-mono">
              {genderData.map((item, idx) => (
                <div key={item.gender} className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: GENDER_COLORS[idx] }}
                      />
                      <span>{item.gender}</span>
                    </span>
                    <span className="text-cyan-400 font-bold">{item.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>Units: {item.sales.toLocaleString()}</span>
                    <span className="text-emerald-400 font-semibold">
                      ${Math.round(item.avgPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* 2. Annual Income Distribution Brackets */}
        <ChartCard
          id="income-distribution-chart"
          title="Customer Annual Income Distribution"
          subtitle="Customer counts and average vehicle price across income tiers"
          badge="Income Brackets"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={incomeBracketData} margin={{ top: 10, right: 30, left: 10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="bracket" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip formatter={(val: any) => [`${Number(val || 0).toLocaleString()} buyers`, 'Count']} />
              <Bar dataKey="customers" name="Buyers Count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Annual Income vs Car Price Scatter Plot (Full-width) */}
        <div className="lg:col-span-2">
          <ChartCard
            id="income-vs-price-scatter"
            title="Annual Income vs. Vehicle Price Dispersion"
            subtitle="Scatter analysis showing empirical distribution between customer annual income and vehicle selling price"
            badge="Correlation: r = 0.012"
          >
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  type="number"
                  dataKey="annualIncome"
                  name="Annual Income"
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  domain={[0, 2200000]}
                />
                <YAxis
                  type="number"
                  dataKey="carPrice"
                  name="Car Price"
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  domain={[0, 90000]}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-[#0f172a] border border-slate-800 rounded-lg shadow-xl text-xs font-mono space-y-1">
                        <p className="text-cyan-400 font-bold">{data.company} {data.model}</p>
                        <p className="text-slate-300">Vehicle Price: ${data.carPrice.toLocaleString()}</p>
                        <p className="text-slate-400">Buyer Annual Income: ${data.annualIncome.toLocaleString()}</p>
                      </div>
                    );
                  }}
                />
                <Scatter
                  name="Transactions"
                  data={incomePriceScatterPoints}
                  fill="#38bdf8"
                  stroke="#0284c7"
                  strokeWidth={1}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Scientific & Statistical Caveat Notice */}
      <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wide">
            Analytical Relationship & Causality Note
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Annual income and vehicle price can be explored to understand relationships within the historical dataset. Correlation does not imply causation. In fact, our regression permutation importance confirms that buyer income holds near-zero predictive weight (-0.0189) in determining vehicle selling price, which is instead fundamentally driven by vehicle model, brand prestige, and powertrain engineering.
          </p>
        </div>
      </div>
    </div>
  );
};
