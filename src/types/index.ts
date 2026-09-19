export type NavigationPage = 
  | 'overview'
  | 'sales'
  | 'vehicles'
  | 'customers'
  | 'dealers'
  | 'prediction'
  | 'insights'
  | 'about';

export interface KPIData {
  totalSales: number;
  totalRevenue: number;
  averagePrice: number;
  totalCompanies: number;
  totalModels: number;
  totalDealers: number;
  totalRegions: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface MonthlySalesData {
  month: string;
  sales: number;
  revenue: number;
  avgPrice: number;
}

export interface YearlySalesData {
  year: number;
  sales: number;
  revenue: number;
  avgPrice: number;
}

export interface CompanySalesData {
  company: string;
  sales: number;
  revenue: number;
  avgPrice: number;
  marketShare: number;
}

export interface RegionSalesData {
  region: string;
  sales: number;
  revenue: number;
  avgPrice: number;
}

export interface BodyStyleData {
  bodyStyle: string;
  sales: number;
  revenue: number;
  avgPrice: number;
  percentage: number;
}

export interface TransmissionData {
  type: string;
  sales: number;
  avgPrice: number;
  percentage: number;
}

export interface ColorData {
  color: string;
  sales: number;
  percentage: number;
  hex: string;
}

export interface EngineData {
  engine: string;
  sales: number;
  percentage: number;
}

export interface ModelRankingData {
  model: string;
  sales?: number;
  avgPrice: number;
  company?: string;
  bodyStyle?: string;
}

export interface VehicleRecord {
  company: string;
  model: string;
  engine: string;
  transmission: string;
  bodyStyle: string;
  color: string;
  avgPrice: number;
  salesCount: number;
}

export interface GenderData {
  gender: string;
  sales: number;
  avgPrice: number;
  percentage: number;
}

export interface IncomeBracketData {
  bracket: string;
  customers: number;
  avgPrice: number;
  medianIncome: number;
}

export interface IncomeScatterPoint {
  annualIncome: number;
  carPrice: number;
  company: string;
  model: string;
}

export interface DealerData {
  dealerName: string;
  region: string;
  sales: number;
  revenue: number;
  avgPrice: number;
}

export interface FeatureImportanceData {
  feature: string;
  importance: number;
  description: string;
}

export interface ActualVsPredictedPoint {
  id: number;
  actual: number;
  predicted: number;
  model: string;
  error: number;
}

export interface ModelMetrics {
  algorithm: string;
  nEstimators: number;
  testSetSize: number;
  mae: number;
  rmse: number;
  r2Score: number;
  featuresCount: number;
  status: 'connected' | 'notebook_baseline';
}

export interface PredictionInput {
  annualIncome: number;
  company: string;
  model: string;
  engine: string;
  transmission: string;
  color: string;
  bodyStyle: string;
  dealerRegion: string;
}

export interface PredictionResult {
  estimatedPrice: number;
  confidenceLower: number;
  confidenceUpper: number;
  mae: number;
  rmse: number;
  r2Score: number;
  algorithm: string;
  preprocessing: string;
  inputs: PredictionInput;
  segmentTier: 'Economy' | 'Mid-Range' | 'Premium' | 'Luxury Flagship';
  factors: {
    name: string;
    impact: 'positive' | 'neutral' | 'negative';
    detail: string;
  }[];
}
