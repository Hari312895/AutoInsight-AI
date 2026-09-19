import React, { useState } from 'react';
import {
  Sparkles,
  DollarSign,
  Car,
  Cpu,
  Layers,
  Settings2,
  Palette,
  MapPin,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { PredictionInput, PredictionResult } from '../types';
import { predictCarPrice } from '../services/predictionService';
import { companyModelsMap, regionSalesData, bodyStyleData } from '../data/demoData';

export const PricePrediction: React.FC = () => {
  // Form input state with realistic baseline defaults matching notebook test sample (cell 411)
  const [inputs, setInputs] = useState<PredictionInput>({
    annualIncome: 800000,
    company: 'Toyota',
    model: 'Camry',
    engine: 'Double Overhead Camshaft',
    transmission: 'Auto',
    color: 'Black',
    bodyStyle: 'Sedan',
    dealerRegion: 'Austin',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>({
    estimatedPrice: 23650, // Matches notebook cell 411: $23,656.31
    confidenceLower: 19086,
    confidenceUpper: 28214,
    mae: 4564.04,
    rmse: 9216.69,
    r2Score: 0.5987,
    algorithm: 'Random Forest Regression (100 Trees)',
    preprocessing: 'One-Hot Encoding + ColumnTransformer',
    inputs: {
      annualIncome: 800000,
      company: 'Toyota',
      model: 'Camry',
      engine: 'Double Overhead Camshaft',
      transmission: 'Auto',
      color: 'Black',
      bodyStyle: 'Sedan',
      dealerRegion: 'Austin',
    },
    segmentTier: 'Mid-Range',
    factors: [
      {
        name: 'Model Specific Pricing',
        impact: 'neutral',
        detail: 'Toyota Camry accounts for baseline volume sedan pricing in historical data.',
      },
      {
        name: 'Powertrain Configuration',
        impact: 'positive',
        detail: 'Double Overhead Camshaft paired with Automatic transmission adds +$1,400 over base manual trim.',
      },
      {
        name: 'Exterior Color Valuation',
        impact: 'positive',
        detail: 'Black finish commands positive value differential relative to volume Pale White baseline.',
      },
      {
        name: 'Buyer Income Correlation',
        impact: 'neutral',
        detail: 'Empirical correlation in dataset is r = 0.012 (independent price elasticity).',
      },
    ],
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Available models based on selected company
  const availableModels = companyModelsMap[inputs.company] || [
    'Camry',
    'Taurus',
    'Malibu',
    'Passat',
    'Altima',
  ];

  const handleCompanyChange = (company: string) => {
    const models = companyModelsMap[company] || ['Base Trim'];
    setInputs((prev) => ({
      ...prev,
      company,
      model: models[0],
    }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!inputs.annualIncome || inputs.annualIncome < 1000) {
      setValidationError('Please specify a valid annual income greater than $1,000.');
      return;
    }
    if (!inputs.company || !inputs.model) {
      setValidationError('Please select both a car company and a specific model.');
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    try {
      const result = await predictCarPrice(inputs);
      setPrediction(result);
    } catch (err) {
      setValidationError('Prediction evaluation failed. Please verify form values.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (preset: Partial<PredictionInput>) => {
    setInputs((prev) => ({ ...prev, ...preset }));
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase text-cyan-300">
                Machine Learning Inference
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              AI Car Price Predictor
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Estimate a vehicle's price using a machine learning model trained on 23,906 historical car sales records with One-Hot encoded categorical features.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-slate-400">Presets:</span>
            <button
              onClick={() => {
                handleCompanyChange('Cadillac');
                setInputs((prev) => ({
                  ...prev,
                  model: 'Catera',
                  bodyStyle: 'Hardtop',
                  color: 'Black',
                  annualIncome: 1200000,
                }));
              }}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-cyan-500 transition-colors"
            >
              Luxury Catera
            </button>
            <button
              onClick={() => {
                handleCompanyChange('Ford');
                setInputs((prev) => ({
                  ...prev,
                  model: 'Expedition',
                  bodyStyle: 'SUV',
                  color: 'Black',
                  annualIncome: 650000,
                }));
              }}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-cyan-500 transition-colors"
            >
              Ford SUV
            </button>
            <button
              onClick={() => {
                handleCompanyChange('Toyota');
                setInputs((prev) => ({
                  ...prev,
                  model: 'Camry',
                  bodyStyle: 'Sedan',
                  color: 'Pale White',
                  annualIncome: 800000,
                }));
              }}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-cyan-500 transition-colors"
            >
              Notebook Test Car
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Form (Left) & Prediction Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl border border-slate-800 bg-[#0f172a]/70">
          <form onSubmit={handlePredict} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-cyan-400" />
                <span>Vehicle Specifications</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">8 Input Features</span>
            </div>

            {/* Error banner if any */}
            {validationError && (
              <div className="p-3 rounded-lg border border-rose-500/40 bg-rose-950/20 text-xs text-rose-300 flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* 1. Manufacturer */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Company / Brand *
                </label>
                <select
                  value={inputs.company}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {Object.keys(companyModelsMap).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Model Trim */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Car Model (Dynamic) *
                </label>
                <select
                  value={inputs.model}
                  onChange={(e) => setInputs({ ...inputs, model: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Engine Specification */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Engine Valvetrain *
                </label>
                <select
                  value={inputs.engine}
                  onChange={(e) => setInputs({ ...inputs, engine: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="Double Overhead Camshaft">Double Overhead Camshaft (DOHC)</option>
                  <option value="Overhead Camshaft">Overhead Camshaft (OHC)</option>
                </select>
              </div>

              {/* 4. Transmission */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Transmission *
                </label>
                <select
                  value={inputs.transmission}
                  onChange={(e) => setInputs({ ...inputs, transmission: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="Auto">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* 5. Body Style */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Body Style *
                </label>
                <select
                  value={inputs.bodyStyle}
                  onChange={(e) => setInputs({ ...inputs, bodyStyle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {bodyStyleData.map((b) => (
                    <option key={b.bodyStyle} value={b.bodyStyle}>
                      {b.bodyStyle}
                    </option>
                  ))}
                  <option value="Coupe">Coupe (Specialty)</option>
                  <option value="Wagon">Wagon (Specialty)</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>

              {/* 6. Exterior Color */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Color Finish *
                </label>
                <select
                  value={inputs.color}
                  onChange={(e) => setInputs({ ...inputs, color: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="Black">Black</option>
                  <option value="Pale White">Pale White</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Silver">Silver</option>
                  <option value="Gray">Gray</option>
                </select>
              </div>

              {/* 7. Dealer Region */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Dealer Region *
                </label>
                <select
                  value={inputs.dealerRegion}
                  onChange={(e) => setInputs({ ...inputs, dealerRegion: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {regionSalesData.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Annual Income */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono text-slate-400">
                    Annual Income ($) *
                  </label>
                  <span className="text-[11px] font-mono text-cyan-400">
                    ${Number(inputs.annualIncome).toLocaleString()}
                  </span>
                </div>
                <input
                  type="number"
                  min={10000}
                  max={10000000}
                  step={10000}
                  value={inputs.annualIncome}
                  onChange={(e) =>
                    setInputs({ ...inputs, annualIncome: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Submit Predict Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-mono tracking-wider"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating Random Forest Ensembles...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Predict Car Price</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Prediction Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {prediction ? (
            <div className="p-6 rounded-xl border border-cyan-500/40 bg-[#0f172a]/90 shadow-2xl relative overflow-hidden space-y-5">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full pointer-events-none" />

              {/* Price Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">
                    Estimated Selling Price
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                    {prediction.segmentTier}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-4xl font-extrabold font-mono text-white tracking-tight">
                    ${prediction.estimatedPrice.toLocaleString()}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">USD</span>
                </div>

                <p className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Confidence Range: ${prediction.confidenceLower.toLocaleString()} — $
                    {prediction.confidenceUpper.toLocaleString()} (±${prediction.mae.toLocaleString()})
                  </span>
                </p>
              </div>

              {/* Input Summary Grid */}
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Input Summary
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Brand & Model</span>
                    <span className="text-slate-200 font-bold">
                      {prediction.inputs.company} {prediction.inputs.model}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Body Style</span>
                    <span className="text-slate-200">{prediction.inputs.bodyStyle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Engine & Trans</span>
                    <span className="text-slate-200">
                      {prediction.inputs.transmission} • {prediction.inputs.engine.includes('Double') ? 'DOHC' : 'OHC'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Color & Region</span>
                    <span className="text-slate-200">
                      {prediction.inputs.color} • {prediction.inputs.dealerRegion}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Customer Annual Income</span>
                    <span className="text-cyan-300 font-bold">
                      ${Number(prediction.inputs.annualIncome).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Valuation Factors */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Model Valuation Breakdown
                </span>
                <div className="space-y-1.5">
                  {prediction.factors.map((f, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between font-mono text-[11px] mb-0.5">
                        <span className="text-slate-300 font-semibold">{f.name}</span>
                        <span
                          className={`text-[10px] uppercase ${
                            f.impact === 'positive'
                              ? 'text-emerald-400'
                              : f.impact === 'negative'
                              ? 'text-rose-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {f.impact}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{f.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-slate-800 bg-[#0f172a]/70 text-center text-slate-500 flex flex-col items-center justify-center min-h-[300px]">
              <Car className="w-10 h-10 text-slate-600 mb-2" />
              <p className="text-xs">
                Select vehicle attributes on the left and click &quot;Predict Car Price&quot; to compute estimate.
              </p>
            </div>
          )}

          {/* Model Information Box */}
          <div className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Model Information</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                Notebook Trained
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Algorithm:</span>
                <span className="text-slate-200 font-bold">Random Forest Regression</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Preprocessing:</span>
                <span className="text-slate-200">One-Hot Encoding</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Trees:</span>
                <span className="text-slate-200">100 Estimators (n_jobs=-1)</span>
              </div>
            </div>

            {/* Model Evaluation Metrics Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Evaluation Metrics
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Test Set (4,782 records)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">MAE</span>
                  <span className="text-xs font-bold text-cyan-300">$4,564</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">RMSE</span>
                  <span className="text-xs font-bold text-blue-300">$9,217</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">R² Score</span>
                  <span className="text-xs font-bold text-emerald-400">0.5987</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
