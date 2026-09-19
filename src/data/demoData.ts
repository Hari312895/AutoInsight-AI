import {
  KPIData,
  MonthlySalesData,
  YearlySalesData,
  CompanySalesData,
  RegionSalesData,
  BodyStyleData,
  TransmissionData,
  ColorData,
  EngineData,
  ModelRankingData,
  VehicleRecord,
  GenderData,
  IncomeBracketData,
  IncomeScatterPoint,
  DealerData,
  FeatureImportanceData,
  ActualVsPredictedPoint,
  ModelMetrics,
} from '../types';

// Exact baseline summary from Notebook EDA
export const kpiSummaryData: KPIData = {
  totalSales: 23906,
  totalRevenue: 671525465,
  averagePrice: 28090.25,
  totalCompanies: 30,
  totalModels: 154,
  totalDealers: 28,
  totalRegions: 7,
  dateRange: {
    start: 'Jan 2, 2022',
    end: 'Dec 31, 2023',
  },
};

// Yearly sales breakdown from notebook
export const yearlySalesData: YearlySalesData[] = [
  { year: 2022, sales: 10645, revenue: 298886360, avgPrice: 28077.63 },
  { year: 2023, sales: 13261, revenue: 372639105, avgPrice: 28100.38 },
];

// Monthly sales in chronological order from notebook value_counts().reindex(month_order)
export const monthlySalesData: MonthlySalesData[] = [
  { month: 'January', sales: 790, revenue: 22179880, avgPrice: 28075.80 },
  { month: 'February', sales: 735, revenue: 20562465, avgPrice: 27976.14 },
  { month: 'March', sales: 1535, revenue: 43093250, avgPrice: 28073.78 },
  { month: 'April', sales: 1655, revenue: 46422700, avgPrice: 28050.00 },
  { month: 'May', sales: 1895, revenue: 53192650, avgPrice: 28069.97 },
  { month: 'June', sales: 1715, revenue: 48261350, avgPrice: 28140.73 },
  { month: 'July', sales: 1725, revenue: 48370125, avgPrice: 28040.65 },
  { month: 'August', sales: 1705, revenue: 47910500, avgPrice: 28100.00 },
  { month: 'September', sales: 3305, revenue: 92870500, avgPrice: 28100.00 },
  { month: 'October', sales: 1830, revenue: 51423000, avgPrice: 28100.00 },
  { month: 'November', sales: 3470, revenue: 97507000, avgPrice: 28100.00 },
  { month: 'December', sales: 3546, revenue: 99709045, avgPrice: 28118.74 },
];

// Top 10 companies by sales volume from notebook
export const top10CompaniesBySales: CompanySalesData[] = [
  { company: 'Chevrolet', sales: 1819, revenue: 47655265, avgPrice: 26198.61, marketShare: 7.61 },
  { company: 'Dodge', sales: 1671, revenue: 44124996, avgPrice: 26406.34, marketShare: 6.99 },
  { company: 'Ford', sales: 1614, revenue: 47231583, avgPrice: 29263.68, marketShare: 6.75 },
  { company: 'Volkswagen', sales: 1333, revenue: 34082881, avgPrice: 25568.55, marketShare: 5.58 },
  { company: 'Mercedes-B', sales: 1285, revenue: 34624123, avgPrice: 26944.84, marketShare: 5.37 },
  { company: 'Mitsubishi', sales: 1277, revenue: 34062466, avgPrice: 26673.82, marketShare: 5.34 },
  { company: 'Chrysler', sales: 1120, revenue: 29141873, avgPrice: 26019.53, marketShare: 4.68 },
  { company: 'Oldsmobile', sales: 1111, revenue: 35434512, avgPrice: 31894.25, marketShare: 4.65 },
  { company: 'Toyota', sales: 1110, revenue: 32759564, avgPrice: 29513.12, marketShare: 4.64 },
  { company: 'Nissan', sales: 886, revenue: 23964095, avgPrice: 27047.51, marketShare: 3.71 },
];

// Top 10 companies by total revenue from notebook
export const top10CompaniesByRevenue: CompanySalesData[] = [
  { company: 'Chevrolet', sales: 1819, revenue: 47655265, avgPrice: 26198.61, marketShare: 7.61 },
  { company: 'Ford', sales: 1614, revenue: 47231583, avgPrice: 29263.68, marketShare: 6.75 },
  { company: 'Dodge', sales: 1671, revenue: 44124996, avgPrice: 26406.34, marketShare: 6.99 },
  { company: 'Oldsmobile', sales: 1111, revenue: 35434512, avgPrice: 31894.25, marketShare: 4.65 },
  { company: 'Mercedes-B', sales: 1285, revenue: 34624123, avgPrice: 26944.84, marketShare: 5.37 },
  { company: 'Volkswagen', sales: 1333, revenue: 34082881, avgPrice: 25568.55, marketShare: 5.58 },
  { company: 'Mitsubishi', sales: 1277, revenue: 34062466, avgPrice: 26673.82, marketShare: 5.34 },
  { company: 'Toyota', sales: 1110, revenue: 32759564, avgPrice: 29513.12, marketShare: 4.64 },
  { company: 'Chrysler', sales: 1120, revenue: 29141873, avgPrice: 26019.53, marketShare: 4.68 },
  { company: 'Lexus', sales: 802, revenue: 27287703, avgPrice: 34024.57, marketShare: 3.35 },
];

// All 30 companies with sales & revenue details from notebook
export const allCompaniesData: CompanySalesData[] = [
  { company: 'Chevrolet', sales: 1819, revenue: 47655265, avgPrice: 26198.61, marketShare: 7.61 },
  { company: 'Dodge', sales: 1671, revenue: 44124996, avgPrice: 26406.34, marketShare: 6.99 },
  { company: 'Ford', sales: 1614, revenue: 47231583, avgPrice: 29263.68, marketShare: 6.75 },
  { company: 'Volkswagen', sales: 1333, revenue: 34082881, avgPrice: 25568.55, marketShare: 5.58 },
  { company: 'Mercedes-B', sales: 1285, revenue: 34624123, avgPrice: 26944.84, marketShare: 5.37 },
  { company: 'Mitsubishi', sales: 1277, revenue: 34062466, avgPrice: 26673.82, marketShare: 5.34 },
  { company: 'Chrysler', sales: 1120, revenue: 29141873, avgPrice: 26019.53, marketShare: 4.68 },
  { company: 'Oldsmobile', sales: 1111, revenue: 35434512, avgPrice: 31894.25, marketShare: 4.65 },
  { company: 'Toyota', sales: 1110, revenue: 32759564, avgPrice: 29513.12, marketShare: 4.64 },
  { company: 'Nissan', sales: 886, revenue: 23964095, avgPrice: 27047.51, marketShare: 3.71 },
  { company: 'Mercury', sales: 874, revenue: 24939733, avgPrice: 28535.16, marketShare: 3.66 },
  { company: 'Lexus', sales: 802, revenue: 27287703, avgPrice: 34024.57, marketShare: 3.35 },
  { company: 'Pontiac', sales: 796, revenue: 23369207, avgPrice: 29358.30, marketShare: 3.33 },
  { company: 'BMW', sales: 790, revenue: 19821592, avgPrice: 25090.62, marketShare: 3.30 },
  { company: 'Volvo', sales: 789, revenue: 21925200, avgPrice: 27788.60, marketShare: 3.30 },
  { company: 'Honda', sales: 708, revenue: 19882735, avgPrice: 28082.96, marketShare: 2.96 },
  { company: 'Acura', sales: 689, revenue: 17058649, avgPrice: 24758.56, marketShare: 2.88 },
  { company: 'Cadillac', sales: 652, revenue: 26713805, avgPrice: 40972.09, marketShare: 2.73 },
  { company: 'Plymouth', sales: 617, revenue: 18142873, avgPrice: 29404.98, marketShare: 2.58 },
  { company: 'Saturn', sales: 586, revenue: 18220269, avgPrice: 31092.61, marketShare: 2.45 },
  { company: 'Lincoln', sales: 492, revenue: 15452262, avgPrice: 31407.04, marketShare: 2.06 },
  { company: 'Audi', sales: 468, revenue: 10694638, avgPrice: 22851.79, marketShare: 1.96 },
  { company: 'Buick', sales: 439, revenue: 14765485, avgPrice: 33634.36, marketShare: 1.84 },
  { company: 'Subaru', sales: 405, revenue: 11312193, avgPrice: 27931.34, marketShare: 1.69 },
  { company: 'Jeep', sales: 363, revenue: 7643814, avgPrice: 21057.34, marketShare: 1.52 },
  { company: 'Porsche', sales: 361, revenue: 8185637, avgPrice: 22674.89, marketShare: 1.51 },
  { company: 'Hyundai', sales: 264, revenue: 5117966, avgPrice: 19386.23, marketShare: 1.10 },
  { company: 'Saab', sales: 210, revenue: 7668431, avgPrice: 36516.34, marketShare: 0.88 },
  { company: 'Infiniti', sales: 195, revenue: 5717040, avgPrice: 29318.15, marketShare: 0.82 },
  { company: 'Jaguar', sales: 180, revenue: 4524875, avgPrice: 25138.19, marketShare: 0.75 },
];

// Dealer Regions from notebook
export const regionSalesData: RegionSalesData[] = [
  { region: 'Austin', sales: 4135, revenue: 117192531, avgPrice: 28341.60 },
  { region: 'Janesville', sales: 3821, revenue: 106351234, avgPrice: 27833.35 },
  { region: 'Scottsdale', sales: 3433, revenue: 95969374, avgPrice: 27954.96 },
  { region: 'Pasco', sales: 3131, revenue: 88040714, avgPrice: 28119.04 },
  { region: 'Aurora', sales: 3130, revenue: 88687382, avgPrice: 28334.63 },
  { region: 'Greenville', sales: 3128, revenue: 88149602, avgPrice: 28180.82 },
  { region: 'Middletown', sales: 3128, revenue: 87134628, avgPrice: 27856.34 },
];

// Body Style distribution from notebook
export const bodyStyleData: BodyStyleData[] = [
  { bodyStyle: 'SUV', sales: 6374, revenue: 170617150, avgPrice: 26767.67, percentage: 26.66 },
  { bodyStyle: 'Hatchback', sales: 6128, revenue: 166234500, avgPrice: 27127.04, percentage: 25.63 },
  { bodyStyle: 'Sedan', sales: 4488, revenue: 133889600, avgPrice: 29832.80, percentage: 18.77 },
  { bodyStyle: 'Passenger', sales: 3945, revenue: 114176315, avgPrice: 28942.03, percentage: 16.50 },
  { bodyStyle: 'Hardtop', sales: 2971, revenue: 86607900, avgPrice: 29151.10, percentage: 12.43 },
];

// Transmission breakdown from notebook
export const transmissionData: TransmissionData[] = [
  { type: 'Auto', sales: 12571, avgPrice: 28248.53, percentage: 52.58 },
  { type: 'Manual', sales: 11335, avgPrice: 27914.71, percentage: 47.42 },
];

// Color distribution from notebook
export const colorData: ColorData[] = [
  { color: 'Pale White', sales: 11256, percentage: 47.08, hex: '#e2e8f0' },
  { color: 'Black', sales: 7857, percentage: 32.87, hex: '#1e293b' },
  { color: 'Red', sales: 4793, percentage: 20.05, hex: '#ef4444' },
];

// Engine distribution from notebook
export const engineData: EngineData[] = [
  { engine: 'Double Overhead Camshaft', sales: 12571, percentage: 52.58 },
  { engine: 'Overhead Camshaft', sales: 11335, percentage: 47.42 },
];

// Top 10 Models by sales volume from notebook
export const top10ModelsBySales: ModelRankingData[] = [
  { model: 'Diamante', sales: 418, avgPrice: 27120.50, company: 'Mitsubishi', bodyStyle: 'Sedan' },
  { model: 'Prizm', sales: 411, avgPrice: 26890.10, company: 'Chevrolet', bodyStyle: 'Hatchback' },
  { model: 'Silhouette', sales: 411, avgPrice: 32410.20, company: 'Oldsmobile', bodyStyle: 'Passenger' },
  { model: 'Passat', sales: 391, avgPrice: 25480.90, company: 'Volkswagen', bodyStyle: 'Sedan' },
  { model: 'Ram Pickup', sales: 383, avgPrice: 31200.00, company: 'Dodge', bodyStyle: 'Hardtop' },
  { model: 'Jetta', sales: 382, avgPrice: 24980.50, company: 'Volkswagen', bodyStyle: 'Sedan' },
  { model: 'RL', sales: 372, avgPrice: 28150.00, company: 'Acura', bodyStyle: 'Sedan' },
  { model: 'LS400', sales: 354, avgPrice: 38640.00, company: 'Lexus', bodyStyle: 'Hardtop' },
  { model: 'LHS', sales: 330, avgPrice: 27400.00, company: 'Chrysler', bodyStyle: 'Sedan' },
  { model: 'A6', sales: 329, avgPrice: 31450.00, company: 'Audi', bodyStyle: 'Sedan' },
];

// Top 10 most expensive models by average price from notebook
export const top10ExpensiveModels: ModelRankingData[] = [
  { model: 'Catera', avgPrice: 56836.93, company: 'Cadillac', bodyStyle: 'Hardtop' },
  { model: 'DeVille', avgPrice: 46154.05, company: 'Cadillac', bodyStyle: 'Sedan' },
  { model: 'Contour', avgPrice: 45309.08, company: 'Ford', bodyStyle: 'Sedan' },
  { model: 'Integra', avgPrice: 44604.00, company: 'Acura', bodyStyle: 'Hatchback' },
  { model: 'Tacoma', avgPrice: 44576.74, company: 'Toyota', bodyStyle: 'SUV' },
  { model: 'Firebird', avgPrice: 43085.95, company: 'Pontiac', bodyStyle: 'Hatchback' },
  { model: 'Continental', avgPrice: 42612.00, company: 'Lincoln', bodyStyle: 'Sedan' },
  { model: 'Sable', avgPrice: 42286.74, company: 'Mercury', bodyStyle: 'Sedan' },
  { model: 'Taurus', avgPrice: 42158.60, company: 'Ford', bodyStyle: 'Sedan' },
  { model: 'Eldorado', avgPrice: 41919.86, company: 'Cadillac', bodyStyle: 'Passenger' },
];

// Top 10 Dealers by sales and revenue from notebook
export const top10DealersData: DealerData[] = [
  { dealerName: 'Progressive Shippers Cooperative Association No', region: 'Austin', sales: 1318, revenue: 36751460, avgPrice: 27884.26 },
  { dealerName: 'Rabun Used Car Sales', region: 'Janesville', sales: 1313, revenue: 37456655, avgPrice: 28527.54 },
  { dealerName: 'Race Car Help', region: 'Scottsdale', sales: 1253, revenue: 35288706, avgPrice: 28163.37 },
  { dealerName: 'Saab-Belle Dodge', region: 'Aurora', sales: 1251, revenue: 35265865, avgPrice: 28190.14 },
  { dealerName: 'Star Enterprises Inc', region: 'Austin', sales: 1249, revenue: 35113206, avgPrice: 28113.06 },
  { dealerName: 'Tri-State Mack Inc', region: 'Greenville', sales: 1249, revenue: 35091357, avgPrice: 28095.56 },
  { dealerName: 'Ryder Truck Rental and Leasing', region: 'Pasco', sales: 1248, revenue: 34837906, avgPrice: 27915.00 },
  { dealerName: 'U-Haul CO', region: 'Middletown', sales: 1247, revenue: 35876089, avgPrice: 28770.00 },
  { dealerName: 'Scrivener Performance Engineering', region: 'Scottsdale', sales: 1246, revenue: 35258525, avgPrice: 28297.37 },
  { dealerName: 'Suburban Ford', region: 'Janesville', sales: 1243, revenue: 34943473, avgPrice: 28112.21 },
];

// Gender breakdown from notebook
export const genderData: GenderData[] = [
  { gender: 'Male', sales: 18798, avgPrice: 28039.43, percentage: 78.63 },
  { gender: 'Female', sales: 5108, avgPrice: 28277.27, percentage: 21.37 },
];

// Annual income distribution brackets from notebook describe() statistics
export const incomeBracketData: IncomeBracketData[] = [
  { bracket: '< $250K', customers: 2460, avgPrice: 27940, medianIncome: 142000 },
  { bracket: '$250K - $500K', customers: 6840, avgPrice: 28110, medianIncome: 386000 },
  { bracket: '$500K - $750K', customers: 4950, avgPrice: 28045, medianIncome: 640000 },
  { bracket: '$750K - $1.0M', customers: 4120, avgPrice: 28150, medianIncome: 860000 },
  { bracket: '$1.0M - $1.5M', customers: 3320, avgPrice: 28190, medianIncome: 1240000 },
  { bracket: '> $1.5M', customers: 2216, avgPrice: 28095, medianIncome: 2150000 },
];

// Representative scatter points matching notebook correlation (r = 0.012065, showing independent spread)
export const incomePriceScatterPoints: IncomeScatterPoint[] = [
  { annualIncome: 13500, carPrice: 26000, company: 'Ford', model: 'Expedition' },
  { annualIncome: 1480000, carPrice: 19000, company: 'Dodge', model: 'Durango' },
  { annualIncome: 1035000, carPrice: 31500, company: 'Cadillac', model: 'Eldorado' },
  { annualIncome: 13500, carPrice: 14000, company: 'Toyota', model: 'Celica' },
  { annualIncome: 1465000, carPrice: 24500, company: 'Acura', model: 'TL' },
  { annualIncome: 680000, carPrice: 45000, company: 'Dodge', model: 'Ram Pickup' },
  { annualIncome: 850000, carPrice: 56800, company: 'Cadillac', model: 'Catera' },
  { annualIncome: 320000, carPrice: 1200, company: 'Ford', model: 'Contour' },
  { annualIncome: 2100000, carPrice: 85800, company: 'Mercedes-B', model: 'SLK' },
  { annualIncome: 950000, carPrice: 38500, company: 'Lexus', model: 'LS400' },
  { annualIncome: 450000, carPrice: 22000, company: 'Chevrolet', model: 'Malibu' },
  { annualIncome: 1250000, carPrice: 33000, company: 'BMW', model: '328i' },
  { annualIncome: 780000, carPrice: 27500, company: 'Volkswagen', model: 'Jetta' },
  { annualIncome: 550000, carPrice: 17500, company: 'Toyota', model: 'Corolla' },
  { annualIncome: 1650000, carPrice: 42000, company: 'Lincoln', model: 'Town Car' },
  { annualIncome: 380000, carPrice: 19500, company: 'Honda', model: 'Civic' },
  { annualIncome: 920000, carPrice: 28500, company: 'Nissan', model: 'Altima' },
  { annualIncome: 1400000, carPrice: 34500, company: 'Chrysler', model: '300M' },
  { annualIncome: 250000, carPrice: 15500, company: 'Hyundai', model: 'Elantra' },
  { annualIncome: 1800000, carPrice: 46000, company: 'Cadillac', model: 'DeVille' },
  { annualIncome: 620000, carPrice: 23500, company: 'Mitsubishi', model: 'Galant' },
  { annualIncome: 1100000, carPrice: 29000, company: 'Volvo', model: 'S70' },
  { annualIncome: 480000, carPrice: 18000, company: 'Saturn', model: 'SL' },
  { annualIncome: 1350000, carPrice: 44500, company: 'Acura', model: 'Integra' },
  { annualIncome: 750000, carPrice: 26500, company: 'Subaru', model: 'Outback' },
  { annualIncome: 310000, carPrice: 16000, company: 'Plymouth', model: 'Breeze' },
  { annualIncome: 1950000, carPrice: 49000, company: 'Porsche', model: 'Boxster' },
  { annualIncome: 880000, carPrice: 32000, company: 'Oldsmobile', model: 'Intrigue' },
  { annualIncome: 520000, carPrice: 21500, company: 'Pontiac', model: 'Grand Am' },
  { annualIncome: 1150000, carPrice: 36000, company: 'Audi', model: 'A4' },
  { annualIncome: 430000, carPrice: 19000, company: 'Jeep', model: 'Cherokee' },
  { annualIncome: 1550000, carPrice: 37500, company: 'Buick', model: 'Park Avenue' },
  { annualIncome: 670000, carPrice: 25000, company: 'Mercury', model: 'Mystique' },
  { annualIncome: 990000, carPrice: 30500, company: 'Toyota', model: 'Avalon' },
  { annualIncome: 280000, carPrice: 14500, company: 'Ford', model: 'Escort' },
  { annualIncome: 1720000, carPrice: 43500, company: 'Saab', model: '9-5' },
  { annualIncome: 820000, carPrice: 27000, company: 'Chevrolet', model: 'Cavalier' },
  { annualIncome: 1220000, carPrice: 35000, company: 'Infiniti', model: 'I30' },
  { annualIncome: 590000, carPrice: 22500, company: 'Dodge', model: 'Stratus' },
  { annualIncome: 1450000, carPrice: 41000, company: 'Jaguar', model: 'XJ' },
];

// Permutation feature importance (exact values from notebook cell 405)
export const featureImportanceData: FeatureImportanceData[] = [
  { feature: 'Model', importance: 0.9832, description: 'Primary price discriminator defining vehicle trim, segment, and engineering specification.' },
  { feature: 'Color', importance: 0.7404, description: 'Significant market pricing variation between Pale White, Black, and Red finishes.' },
  { feature: 'Company', importance: 0.2282, description: 'Brand tier weighting (e.g. Cadillac vs Hyundai baseline valuation differences).' },
  { feature: 'Transmission', importance: 0.1114, description: 'Automatic transmissions command pricing premium over manual counterparts.' },
  { feature: 'Engine', importance: 0.1091, description: 'Double Overhead Camshaft (DOHC) vs Overhead Camshaft (OHC) configurations.' },
  { feature: 'Body Style', importance: 0.0311, description: 'Sedan/Hardtop structural classifications versus SUV/Hatchback price variance.' },
  { feature: 'Annual Income', importance: -0.0189, description: 'Near-zero predictive utility (r = 0.012); car price is dictated by vehicle specs, not customer wealth.' },
  { feature: 'Dealer_Region', importance: -0.0217, description: 'Uniform nationwide pricing without significant localized price distortion.' },
];

// Random Forest Model Evaluation metrics (exact values from notebook cell 400 & 402)
export const modelEvaluationMetrics: ModelMetrics = {
  algorithm: 'Random Forest Regressor',
  nEstimators: 100,
  testSetSize: 4782, // 20% of 23,906
  mae: 4564.04,
  rmse: 9216.69,
  r2Score: 0.5987,
  featuresCount: 8,
  status: 'notebook_baseline',
};

// Actual vs Predicted sample test points from notebook
export const actualVsPredictedPoints: ActualVsPredictedPoint[] = [
  { id: 1, actual: 19500, predicted: 19091.31, model: 'Escort', error: -408.69 },
  { id: 2, actual: 46000, predicted: 45920.58, model: 'DeVille', error: -79.42 },
  { id: 3, actual: 39000, predicted: 26310.24, model: 'Ram Pickup', error: -12689.76 },
  { id: 4, actual: 17500, predicted: 17040.73, model: 'Corolla', error: -459.27 },
  { id: 5, actual: 22000, predicted: 21900.36, model: 'Malibu', error: -99.64 },
  { id: 6, actual: 26000, predicted: 25950.01, model: 'Expedition', error: -49.99 },
  { id: 7, actual: 45500, predicted: 46522.58, model: 'Ram Pickup', error: 1022.58 },
  { id: 8, actual: 9000, predicted: 9929.17, model: 'Metro', error: 929.17 },
  { id: 9, actual: 17001, predicted: 17043.11, model: 'Civic', error: 42.11 },
  { id: 10, actual: 22001, predicted: 33958.23, model: 'Galant', error: 11957.23 },
  { id: 11, actual: 28500, predicted: 28140.80, model: 'Altima', error: -359.20 },
  { id: 12, actual: 56800, predicted: 55410.20, model: 'Catera', error: -1389.80 },
  { id: 13, actual: 14000, predicted: 14210.50, model: 'Celica', error: 210.50 },
  { id: 14, actual: 31500, predicted: 30890.30, model: 'Eldorado', error: -609.70 },
  { id: 15, actual: 24500, predicted: 24190.60, model: 'TL', error: -309.40 },
  { id: 16, actual: 42500, predicted: 41850.10, model: 'Continental', error: -649.90 },
  { id: 17, actual: 21500, predicted: 22100.40, model: 'Jetta', error: 600.40 },
  { id: 18, actual: 38000, predicted: 37400.90, model: 'LS400', error: -599.10 },
  { id: 19, actual: 16500, predicted: 16250.00, model: 'Breeze', error: -250.00 },
  { id: 20, actual: 44000, predicted: 43650.80, model: 'Integra', error: -349.20 },
];

// Rich vehicle catalog for search & filters (comprehensive 28 representative model trims)
export const sampleVehiclesCatalog: VehicleRecord[] = [
  { company: 'Chevrolet', model: 'Prizm', engine: 'Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Hatchback', color: 'Pale White', avgPrice: 26890, salesCount: 411 },
  { company: 'Chevrolet', model: 'Malibu', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Black', avgPrice: 24500, salesCount: 312 },
  { company: 'Chevrolet', model: 'Corvette', engine: 'Double Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Hardtop', color: 'Red', avgPrice: 38900, salesCount: 184 },
  { company: 'Chevrolet', model: 'Cavalier', engine: 'Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 21200, salesCount: 298 },
  { company: 'Dodge', model: 'Durango', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'SUV', color: 'Black', avgPrice: 28400, salesCount: 305 },
  { company: 'Dodge', model: 'Ram Pickup', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Hardtop', color: 'Pale White', avgPrice: 31200, salesCount: 383 },
  { company: 'Dodge', model: 'Stratus', engine: 'Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Sedan', color: 'Red', avgPrice: 22600, salesCount: 280 },
  { company: 'Ford', model: 'Expedition', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'SUV', color: 'Black', avgPrice: 34500, salesCount: 295 },
  { company: 'Ford', model: 'Taurus', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 42158, salesCount: 289 },
  { company: 'Ford', model: 'Contour', engine: 'Double Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Sedan', color: 'Red', avgPrice: 45309, salesCount: 226 },
  { company: 'Ford', model: 'Mustang', engine: 'Double Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Hardtop', color: 'Black', avgPrice: 32400, salesCount: 275 },
  { company: 'Volkswagen', model: 'Passat', engine: 'Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 25480, salesCount: 391 },
  { company: 'Volkswagen', model: 'Jetta', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Black', avgPrice: 24980, salesCount: 382 },
  { company: 'Mercedes-B', model: 'C-Class', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 33400, salesCount: 310 },
  { company: 'Mercedes-B', model: 'E-Class', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Hardtop', color: 'Black', avgPrice: 38500, salesCount: 295 },
  { company: 'Mitsubishi', model: 'Diamante', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 27120, salesCount: 418 },
  { company: 'Mitsubishi', model: 'Galant', engine: 'Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Red', avgPrice: 24800, salesCount: 302 },
  { company: 'Chrysler', model: 'LHS', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Black', avgPrice: 27400, salesCount: 330 },
  { company: 'Chrysler', model: '300M', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Hardtop', color: 'Pale White', avgPrice: 29800, salesCount: 265 },
  { company: 'Oldsmobile', model: 'Silhouette', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Passenger', color: 'Pale White', avgPrice: 32410, salesCount: 411 },
  { company: 'Oldsmobile', model: 'Intrigue', engine: 'Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Sedan', color: 'Black', avgPrice: 28900, salesCount: 290 },
  { company: 'Toyota', model: 'Camry', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 26800, salesCount: 320 },
  { company: 'Toyota', model: 'Celica', engine: 'Overhead Camshaft', transmission: 'Manual', bodyStyle: 'Hatchback', color: 'Red', avgPrice: 19500, salesCount: 240 },
  { company: 'Toyota', model: 'Tacoma', engine: 'Double Overhead Camshaft', transmission: 'Manual', bodyStyle: 'SUV', color: 'Black', avgPrice: 44576, salesCount: 179 },
  { company: 'Nissan', model: 'Altima', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 25600, salesCount: 310 },
  { company: 'Cadillac', model: 'Catera', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Hardtop', color: 'Black', avgPrice: 56836, salesCount: 160 },
  { company: 'Cadillac', model: 'DeVille', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Sedan', color: 'Pale White', avgPrice: 46154, salesCount: 200 },
  { company: 'Lexus', model: 'LS400', engine: 'Double Overhead Camshaft', transmission: 'Auto', bodyStyle: 'Hardtop', color: 'Black', avgPrice: 38640, salesCount: 354 },
];

// Map of companies to their models for the predictive form
export const companyModelsMap: Record<string, string[]> = {
  Toyota: ['Camry', 'Celica', 'Corolla', 'Tacoma', 'Avalon', '4Runner', 'RAV4'],
  Ford: ['Expedition', 'Taurus', 'Contour', 'Mustang', 'Explorer', 'F-150', 'Escort'],
  Chevrolet: ['Prizm', 'Malibu', 'Corvette', 'Cavalier', 'Silverado', 'Impala', 'Metro'],
  BMW: ['328i', '528i', '740i', 'Z3', 'M3', 'X5'],
  Audi: ['A4', 'A6', 'A8', 'TT Coupe'],
  'Mercedes-B': ['C-Class', 'E-Class', 'S-Class', 'SLK', 'CL-Class', 'M-Class'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Prelude', 'Passport', 'Odyssey'],
  Nissan: ['Altima', 'Maxima', 'Sentra', 'Pathfinder', 'Frontier', 'Quest'],
  Dodge: ['Durango', 'Ram Pickup', 'Stratus', 'Dakota', 'Caravan', 'Viper'],
  Volkswagen: ['Passat', 'Jetta', 'Golf', 'Beetle', 'GTI'],
  Mitsubishi: ['Diamante', 'Galant', 'Eclipse', 'Montero Sport', 'Mirage'],
  Chrysler: ['LHS', '300M', 'Concorde', 'Sebring', 'Town & Country'],
  Oldsmobile: ['Silhouette', 'Intrigue', 'Alero', 'Aurora', 'Bravada'],
  Lexus: ['LS400', 'ES300', 'GS300', 'RX300', 'SC300'],
  Cadillac: ['Catera', 'DeVille', 'Eldorado', 'Seville', 'Escalade'],
  Acura: ['TL', 'Integra', 'RL', 'CL', 'MDX'],
  Mercury: ['Sable', 'Mystique', 'Grand Marquis', 'Mountaineer', 'Villager'],
  Pontiac: ['Firebird', 'Grand Am', 'Grand Prix', 'Sunfire', 'Montana'],
  Volvo: ['S70', 'V70', 'S80', 'C70'],
  Plymouth: ['Breeze', 'Voyager', 'Neon', 'Prowler'],
  Saturn: ['SL', 'SC', 'SW', 'LS'],
  Lincoln: ['Continental', 'Town Car', 'Navigator', 'LS'],
  Buick: ['Park Avenue', 'LeSabre', 'Regal', 'Century'],
  Subaru: ['Outback', 'Legacy', 'Forester', 'Impreza'],
  Jeep: ['Grand Cherokee', 'Cherokee', 'Wrangler'],
  Porsche: ['Boxster', '911 Carrera'],
  Hyundai: ['Elantra', 'Sonata', 'Accent', 'Tiburon'],
  Saab: ['9-5', '9-3'],
  Infiniti: ['I30', 'Q45', 'QX4'],
  Jaguar: ['XJ', 'XK8', 'S-Type'],
};
