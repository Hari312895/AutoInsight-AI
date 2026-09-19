import React, { useState } from 'react';
import {
  Info,
  Terminal,
  FileCode2,
  GitBranch,
  Layers,
  Database,
  Cpu,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  Code2,
} from 'lucide-react';

const TECH_STACK = [
  { name: 'Python', role: 'Core Analytics Engine', tag: 'Data Science' },
  { name: 'Pandas', role: 'Data Manipulation & Aggregations', tag: 'Data Prep' },
  { name: 'NumPy', role: 'Vectorized Numerical Computations', tag: 'Numerics' },
  { name: 'Matplotlib', role: 'Exploratory Plot Generation', tag: 'Visualization' },
  { name: 'Seaborn', role: 'Statistical Visual Distributions', tag: 'Visualization' },
  { name: 'Scikit-learn', role: 'Random Forest & Preprocessing Pipelines', tag: 'Machine Learning' },
  { name: 'Jupyter Notebook', role: 'Interactive Experimentation & Analysis', tag: 'Environment' },
  { name: 'React 19', role: 'Component-Driven User Interface', tag: 'Frontend' },
  { name: 'TypeScript', role: 'Strict Structural Type Safety', tag: 'Language' },
  { name: 'Tailwind CSS', role: 'Modern Automotive Dark System', tag: 'Styling' },
  { name: 'Recharts', role: 'Composable SVG Data Visualizations', tag: 'Charting' },
  { name: 'Lucide React', role: 'Clean Vector System Iconography', tag: 'Icons' },
];

const ML_WORKFLOW_STEPS = [
  { step: '01', title: 'Data Collection', detail: '23,906 raw car sales records loaded from historical tabular repository.' },
  { step: '02', title: 'Data Cleaning', detail: 'Imputed missing customer name with "Unknown", parsed dates and phone string types.' },
  { step: '03', title: 'Exploratory Data Analysis', detail: 'Investigated sales volume, price summaries, correlation (r=0.012), and distributions.' },
  { step: '04', title: 'Visualization', detail: 'Plotted yearly & monthly trends, brand revenue bars, scatter plots, and regional charts.' },
  { step: '05', title: 'Feature Selection', detail: 'Isolated 8 predictive variables; separated Price ($) as continuous regression target.' },
  { step: '06', title: 'Preprocessing', detail: 'Applied ColumnTransformer with OneHotEncoder for 7 categorical features + numeric passthrough.' },
  { step: '07', title: 'Random Forest Regression', detail: 'Trained 100 decision tree estimators on 80% split (19,124 training instances).' },
  { step: '08', title: 'Model Evaluation', detail: 'Validated against 4,782 test samples yielding MAE: $4,564, RMSE: $9,217, R²: 0.5987.' },
  { step: '09', title: 'Price Prediction', detail: 'Real-time inference interface estimating prices on custom vehicle specifications.' },
];

const DATASET_FIELDS = [
  { field: 'Car_id', type: 'String', desc: 'Unique transaction identifier for each car sale record.' },
  { field: 'Date', type: 'DateTime', desc: 'Timestamp of sale (Jan 2, 2022 to Dec 31, 2023).' },
  { field: 'Customer Name', type: 'String', desc: 'Customer purchaser name (1 missing value cleaned to "Unknown").' },
  { field: 'Gender', type: 'Category', desc: 'Customer gender (18,798 Male vs 5,108 Female).' },
  { field: 'Annual Income', type: 'Numeric ($)', desc: 'Customer annual earnings ($10,080 to $11,200,000, mean $830,840).' },
  { field: 'Dealer_Name', type: 'String', desc: 'Name of the selling automotive dealership (28 distinct dealers).' },
  { field: 'Company', type: 'Category', desc: 'Automobile manufacturer (30 brands led by Chevrolet, Dodge, Ford).' },
  { field: 'Model', type: 'Category', desc: 'Specific car model (154 trims, e.g. Catera, DeVille, Camry).' },
  { field: 'Engine', type: 'Category', desc: 'Valvetrain configuration (Double Overhead Camshaft vs Overhead Camshaft).' },
  { field: 'Transmission', type: 'Category', desc: 'Transmission mechanism (Auto: 52.6% vs Manual: 47.4%).' },
  { field: 'Color', type: 'Category', desc: 'Exterior vehicle color (Pale White: 47.1%, Black: 32.9%, Red: 20.1%).' },
  { field: 'Price ($)', type: 'Numeric ($)', desc: 'Target selling price ($1,200 to $85,800, mean $28,090.25).' },
  { field: 'Dealer_No', type: 'String', desc: 'Dealership registration / postal routing identifier.' },
  { field: 'Body Style', type: 'Category', desc: 'Vehicle structural category (SUV, Hatchback, Sedan, Passenger, Hardtop).' },
  { field: 'Phone', type: 'String', desc: 'Customer contact phone number.' },
  { field: 'Dealer_Region', type: 'Category', desc: 'Geographic dealer zone (Austin, Janesville, Scottsdale, etc.).' },
];

export const About: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const pythonApiCode = `from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="AutoInsight Car Price API")

# Load trained Random Forest pipeline from Jupyter notebook
# pipeline = joblib.load("model_pipeline.joblib")

class CarFeatures(BaseModel):
    annual_income: float
    company: str
    model: str
    engine: str
    transmission: str
    color: str
    body_style: str
    dealer_region: str

@app.post("/predict")
def predict_price(car: CarFeatures):
    df_input = pd.DataFrame([{
        "Annual Income": car.annual_income,
        "Company": car.company,
        "Model": car.model,
        "Engine": car.engine,
        "Transmission": car.transmission,
        "Color": car.color,
        "Body Style": car.body_style,
        "Dealer_Region": car.dealer_region
    }])
    
    # predicted_price = model_pipeline.predict(df_input)[0]
    predicted_price = 28090.25 # Sample inference
    
    return {
        "estimated_price": round(predicted_price, 2),
        "mae": 4564.04,
        "rmse": 9216.69,
        "r2_score": 0.5987
    }`;

  return (
    <div className="space-y-6">
      {/* Project Objective Hero Banner */}
      <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase text-cyan-300">
            Portfolio Project Documentation
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          About AutoInsight AI
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          <strong className="text-cyan-300 font-semibold">Project Objective: </strong>
          Analyze historical car sales data to identify sales trends, customer characteristics, vehicle preferences, dealer performance, regional patterns and pricing factors, while applying machine learning for car price prediction.
        </p>
      </div>

      {/* Machine Learning Pipeline Flow */}
      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]/70 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span>End-to-End Machine Learning Workflow</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">9 Core Phases</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {ML_WORKFLOW_STEPS.map((s) => (
            <div
              key={s.step}
              className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all space-y-1"
            >
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-slate-200">{s.title}</span>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  {s.step}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]/70 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Technologies & Data Science Stack</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Full-Stack Data Science</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {TECH_STACK.map((t) => (
            <div
              key={t.name}
              className="p-3 rounded-lg border border-slate-800/80 bg-slate-900/40 space-y-1"
            >
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs font-bold text-white">{t.name}</span>
                <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {t.tag}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Dictionary */}
      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Dataset Schema & Features (23,906 Records)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">16 Attributes</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                <th className="px-4 py-2.5 font-semibold">Feature</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {DATASET_FIELDS.map((row) => (
                <tr key={row.field} className="hover:bg-slate-800/30">
                  <td className="px-4 py-2 text-cyan-300 font-bold">{row.field}</td>
                  <td className="px-4 py-2 text-slate-400">{row.type}</td>
                  <td className="px-4 py-2 text-slate-300 font-sans text-xs">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Limitations & Future Improvements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Limitations */}
        <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-amber-300 uppercase font-mono">
              Project Limitations
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
            <li>Historical data reflects specific 2022-2023 sales cycles and may not represent contemporary macroeconomic inflation or real-time market shifts.</li>
            <li>External price determinants such as odometer mileage, mechanical condition, fuel market prices, and vehicle damage history are absent from the dataset.</li>
            <li>Random Forest predictions rely purely on the available 8 input dimensions and should be treated as statistical estimates rather than guaranteed dealer quotes.</li>
            <li>Customer annual income exhibits near-zero empirical correlation (r = 0.012), proving that buyers across income tiers purchase across all vehicle segments.</li>
          </ul>
        </div>

        {/* Future Improvements */}
        <div className="p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/10 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-cyan-300 uppercase font-mono">
              Future Roadmap & Extensions
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
            <li>Advanced feature engineering: Extract seasonal cyclicality (quarter, day of week, holiday surge factors) from the transaction date.</li>
            <li>Ensemble comparisons: Benchmark Random Forest against XGBoost, LightGBM, CatBoost, and Deep Neural Networks.</li>
            <li>Hyperparameter optimization via Bayesian Search / Optuna to minimize RMSE below the $9,217 baseline.</li>
            <li>Production FastAPI / Flask backend containerization with Docker and real-time model serialization via ONNX or Joblib.</li>
          </ul>
        </div>
      </div>

      {/* Instructions for Connecting Real Python ML API & Running Application */}
      <div className="p-6 rounded-xl border border-slate-800 bg-[#0f172a]/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Developer Guide: Running Frontend & Connecting Python Model</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Integration Spec</span>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <p className="text-cyan-400 font-bold">1. Quick Local Execution:</p>
            <p className="text-slate-300">npm install</p>
            <p className="text-slate-300">npm run dev</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-cyan-400 font-bold">2. Connecting Python Random Forest API (predictionService.ts):</p>
              <button
                onClick={() => copyToClipboard(pythonApiCode, 'py-code')}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              >
                {copiedCode === 'py-code' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode === 'py-code' ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-3 rounded bg-[#080c14] border border-slate-800/80 text-[11px] text-slate-300 overflow-x-auto">
              {pythonApiCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
