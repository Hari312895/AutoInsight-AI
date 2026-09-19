import { PredictionInput, PredictionResult } from '../types';

export async function predictCarPrice(
  data: PredictionInput
): Promise<PredictionResult> {

  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "Annual Income": data.annualIncome,
      "Company": data.company,
      "Model": data.model,
      "Engine": data.engine,
      "Transmission": data.transmission,
      "Color": data.color,
      "Body Style": data.bodyStyle,
      "Dealer_Region": data.dealerRegion,
    }),
  });

  if (!response.ok) {
    throw new Error("Prediction API request failed");
  }

  const result = await response.json();

  return {
    estimatedPrice: result.predicted_price,
    confidenceLower: result.predicted_price,
    confidenceUpper: result.predicted_price,
    mae: 0,
    rmse: 0,
    r2Score: 0,
    algorithm: "Random Forest Regression (100 Trees)",
    preprocessing: "One-Hot Encoding + ColumnTransformer",
    inputs: data,
    segmentTier: "Mid-Range",
    factors: [],
  };
}