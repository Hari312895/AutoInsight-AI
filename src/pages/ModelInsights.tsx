import React from 'react';
import {
  Cpu,
  BarChart3,
  Target,
  Sparkles,
  ScatterChart as ScatterIcon,
  CheckCircle2,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ComposedChart,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import {
  featureImportanceData,
  actualVsPredictedPoints,
  modelEvaluationMetrics,
} from '../data/demoData';

export const ModelInsights: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Model Metric Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          id="insight-mae-kpi"
          title="Mean Absolute Error (MAE)"
          value={`$${Math.round(modelEvaluationMetrics.mae).toLocaleString()}`}
          subtitle="Avg absolute dollar error"
          badge="MAE Metric"
          badgeColor="cyan"
          icon={Target}
        />
        <KPICard
          id="insight-rmse-kpi"
          title="Root Mean Squared Error"
          value={`$${Math.round(modelEvaluationMetrics.rmse).toLocaleString()}`}
          subtitle="Penalizes large outliers"
          badge="RMSE Metric"
          badgeColor="blue"
          icon={Cpu}
        />
        <KPICard
          id="insight-r2-kpi"
          title="R² Coefficient of Det."
          value="0.5987"
          subtitle="Explains ~60% price variance"
          badge="R² Score"
          badgeColor="emerald"
          icon={Sparkles}
        />
        <KPICard
          id="insight-test-size-kpi"
          title="Validation Test Records"
          value="4,782"
          subtitle="20% unseen test split"
          badge="Test Sample"
          badgeColor="purple"
          icon={BarChart3}
        />
      </div>

      {/* Model Spec & Architecture Overview Card */}
      <div className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Random Forest Regression Architecture</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervised ensemble trained on 19,124 training instances and validated on 4,782 test samples.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-lg">
              Target: Price ($)
            </span>
          </div>
        </div>

        {/* 8 Feature List pills */}
        <div className="pt-4 space-y-2">
          <span className="text-xs font-mono font-semibold text-slate-400">
            Selected Model Features (8 Inputs):
          </span>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            {[
              'Model',
              'Color',
              'Company',
              'Transmission',
              'Engine',
              'Body Style',
              'Annual Income',
              'Dealer_Region',
            ].map((feat, idx) => (
              <span
                key={feat}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{feat}</span>
                {idx < 3 && (
                  <span className="text-[10px] text-cyan-400 font-bold">★ Top</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2 Primary ML Diagnostic Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Horizontal Feature Importance Chart */}
        <ChartCard
          id="feature-importance-chart"
          title="Permutation Feature Importance"
          subtitle="Demonstration baseline values from Jupyter Notebook cell 405"
          badge="Importance Score"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[...featureImportanceData].reverse()}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
              />
              <YAxis
                dataKey="feature"
                type="category"
                stroke="#94a3b8"
                tick={{ fill: '#cbd5e1', fontSize: 11 }}
                width={85}
              />
              <Tooltip
                formatter={(val: any) => [`${Number(val || 0).toFixed(4)}`, 'Importance Score']}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar dataKey="importance" name="Score" fill="#38bdf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Actual vs Predicted Scatter Plot */}
        <ChartCard
          id="actual-vs-predicted-chart"
          title="Actual vs. Predicted Price Fit"
          subtitle="Validation test scatter plot comparing ground truth prices against RF estimates"
          badge="y = x Regression Line"
        >
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                dataKey="actual"
                name="Actual Price"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[0, 65000]}
              />
              <YAxis
                type="number"
                dataKey="predicted"
                name="Predicted Price"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[0, 65000]}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-[#0f172a] border border-slate-800 rounded-lg shadow-xl text-xs font-mono space-y-1">
                      <p className="text-cyan-400 font-bold">{data.model}</p>
                      <p className="text-slate-300">Actual: ${data.actual?.toLocaleString()}</p>
                      <p className="text-emerald-400">Predicted: ${Math.round(data.predicted || 0).toLocaleString()}</p>
                      <p className="text-slate-400">Residual Error: ${Math.abs(Math.round(data.error || 0)).toLocaleString()}</p>
                    </div>
                  );
                }}
              />
              {/* Actual vs predicted scatter points */}
              <Scatter
                name="Predictions"
                data={actualVsPredictedPoints}
                fill="#34d399"
                stroke="#059669"
                strokeWidth={1}
              />
              {/* 45-degree reference line */}
              <Line
                type="monotone"
                dataKey="actual"
                data={[
                  { actual: 5000, predicted: 5000 },
                  { actual: 60000, predicted: 60000 },
                ]}
                stroke="#64748b"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
                activeDot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Metric Explanation Cards (Explicitly required by prompt #7) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
            Model Evaluation Metrics Defined
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: MAE */}
          <div className="p-5 rounded-xl border border-cyan-500/30 bg-[#0f172a]/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-cyan-300 uppercase">
                MAE (Mean Absolute Error)
              </span>
              <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                $4,564
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Average absolute prediction error.&quot;
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Reflects the average magnitude of prediction errors in dollar terms without considering directionality.
            </p>
          </div>

          {/* Card 2: RMSE */}
          <div className="p-5 rounded-xl border border-blue-500/30 bg-[#0f172a]/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-blue-300 uppercase">
                RMSE (Root Mean Squared Error)
              </span>
              <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                $9,217
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Measures prediction error while giving greater weight to larger errors.&quot;
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Because residuals are squared before averaging, RMSE penalizes large pricing mistakes on luxury trims.
            </p>
          </div>

          {/* Card 3: R² Score */}
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-[#0f172a]/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-emerald-300 uppercase">
                R² Score (Coefficient of Determination)
              </span>
              <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                0.5987
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Indicates how well the model explains variation in the target variable.&quot;
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Demonstrates that approximately 60% of vehicle pricing variance is explained by the 8 dataset features alone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
