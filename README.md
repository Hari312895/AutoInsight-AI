AutoInsight AI

Car Sales Analytics \& Machine Learning Price Prediction



AutoInsight AI is an end-to-end analytics and machine learning application that transforms historical car sales data into interactive business insights and vehicle price predictions.



The project combines a React + TypeScript analytics dashboard, a FastAPI REST API, and a Random Forest Regression pipeline developed using Python and Scikit-learn.



Overview



The system analyzes 23,906 historical car sales records to identify patterns across:



Sales performance

Vehicle pricing

Customer demographics

Dealer performance

Regional distribution

Vehicle characteristics



The trained machine learning model is exposed through a REST API and consumed directly by the web application, creating a complete data-to-prediction pipeline.



System Architecture

&#x20;                   Historical Car Sales Data

&#x20;                             │

&#x20;                             ▼

&#x20;                   Data Cleaning \& EDA

&#x20;                             │

&#x20;                             ▼

&#x20;                Feature Engineering \& Encoding

&#x20;                             │

&#x20;                             ▼

&#x20;                Random Forest Regression

&#x20;                             │

&#x20;                             ▼

&#x20;                    Trained ML Pipeline

&#x20;                             │

&#x20;                             ▼

&#x20;                      FastAPI REST API

&#x20;                             │

&#x20;                             ▼

&#x20;                React + TypeScript Dashboard

&#x20;                             │

&#x20;                ┌────────────┴────────────┐

&#x20;                ▼                         ▼

&#x20;         Business Analytics        Price Prediction

Technology Stack

Layer	Technologies

Frontend	React, TypeScript, Vite

UI	Tailwind CSS, Lucide React

Visualization	Recharts

Backend	Python, FastAPI, Uvicorn

Machine Learning	Scikit-learn, Random Forest

Data Processing	Pandas, NumPy

Visualization / EDA	Matplotlib, Seaborn

Model Serialization	Joblib

Development	Jupyter Notebook, Git, GitHub

Machine Learning Pipeline

Target



Car Price (Price ($))



Features

Annual Income

Company

Model

Engine

Transmission

Color

Body Style

Dealer Region

Preprocessing



Categorical variables are processed using:



One-Hot Encoding

&#x20;       +

ColumnTransformer

&#x20;       +

Random Forest Regression



The complete preprocessing and prediction pipeline is serialized using Joblib and served through FastAPI.



Dashboard



The application provides dedicated analytics views for:



Overview



Dataset KPIs

Sales summary

Revenue overview



Sales Analytics



Company performance

Revenue distribution

Time-based sales trends



Vehicle Analytics



Models

Body styles

Transmission

Colors

Pricing patterns



Customer Analytics



Gender distribution

Income analysis

Income vs. vehicle price



Dealer \& Region



Dealer performance

Regional sales

Regional revenue



Price Prediction



Vehicle input form

Real-time API prediction

Model-generated estimated price



Model Insights



Model evaluation

Feature importance

Machine learning information

API



The prediction service is implemented using FastAPI.



Health Check

GET /



Response:



{

&#x20; "message": "Car Price Prediction API is running"

}

Price Prediction

POST /predict



Example request:



{

&#x20; "Annual Income": 800000,

&#x20; "Company": "Toyota",

&#x20; "Model": "Camry",

&#x20; "Engine": "Double Overhead Camshaft",

&#x20; "Transmission": "Automatic",

&#x20; "Color": "Black",

&#x20; "Body Style": "Sedan",

&#x20; "Dealer\_Region": "Austin"

}



The API returns the price predicted by the trained Random Forest pipeline.



Project Structure

AutoInsight-AI/

│

├── src/

│   ├── components/

│   ├── pages/

│   ├── services/

│   ├── data/

│   └── types/

│

├── index.html

├── package.json

├── package-lock.json

├── vite.config.ts

├── tsconfig.json

└── README.md



Backend:



car-sales-api/

│

├── app.py

├── car\_price\_model.pkl

└── requirements.txt

Dataset



The dataset contains 23,906 car sales records with information covering:



Customer details

Annual income

Vehicle company and model

Engine and transmission

Vehicle color

Vehicle price

Dealer information

Body style

Dealer region

Sales date



Data preparation included missing-value handling, duplicate checks, datatype conversion, exploratory analysis, and categorical preprocessing.



Key Data Science Work



The notebook covers:



Data Cleaning

Exploratory Data Analysis

Statistical Analysis

Data Visualization

Feature Preparation

Train/Test Split

One-Hot Encoding

Random Forest Regression

MAE / RMSE / R² evaluation

Permutation Feature Importance

Model Prediction

Running the Project

Frontend

git clone https://github.com/Hari312895/AutoInsight-AI.git



cd AutoInsight-AI



npm install



npm run dev



Frontend:



http://localhost:3000

Backend

cd car-sales-api



pip install fastapi uvicorn pandas scikit-learn joblib



uvicorn app:app --reload



API:



http://127.0.0.1:8000



Both services must be running for live price prediction.



Future Development



Planned extensions include:



Model comparison and hyperparameter optimization

Additional vehicle features

Improved feature engineering

Cloud deployment

Production API deployment

Interactive business intelligence dashboards

Real-time deployed prediction service

