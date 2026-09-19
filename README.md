# AutoInsight AI



Car Sales Analytics \& Machine Learning Price Prediction



AutoInsight AI is an end-to-end data analytics and machine learning application that analyzes historical car sales data and predicts vehicle prices through an interactive web dashboard.



The project combines Python-based machine learning, a FastAPI prediction service, and a React + TypeScript dashboard into a complete data-to-prediction workflow.



## Overview



The application analyzes 23,906 car sales records to understand sales performance, vehicle characteristics, customer patterns, dealer performance, regional trends, and pricing behavior.



A trained Random Forest Regression model is integrated with the dashboard through a REST API, allowing users to enter vehicle details and receive a predicted price.



### Workflow



Historical Car Sales Data

↓

Data Cleaning \& Preparation

↓

Exploratory Data Analysis

↓

Feature Preparation

↓

Random Forest Regression

↓

Trained ML Pipeline

↓

FastAPI REST API

↓

React + TypeScript Dashboard

↓

Interactive Analytics \& Price Prediction



## Key Features



#### Sales Analytics



Sales performance by company

Revenue analysis

Yearly and monthly sales trends

Regional sales distribution

Dealer performance analysis



#### Vehicle Analytics



Model-level analysis

Body style distribution

Transmission analysis

Color analysis

Vehicle price patterns



#### Customer Analytics



Customer gender analysis

Annual income analysis

Income vs. vehicle price relationship



#### Dealer \& Region



Dealer sales performance

Regional sales comparison

Regional revenue analysis



#### Price Prediction



Vehicle price prediction using Random Forest Regression

Real-time prediction through FastAPI

React frontend connected directly to the prediction API



#### Model Insights



Machine learning model information

Feature importance analysis

Model evaluation metrics

Prediction workflow



#### Dashboard



The AutoInsight AI dashboard contains the following modules:



Overview — Overall business and dataset summary



Sales Analytics — Sales and revenue trends



Vehicle Analytics — Vehicle and pricing analysis



Customer Analytics — Customer and income insights



Dealer \& Region — Dealer and regional performance



Price Prediction — Machine learning price prediction



Model Insights — ML model information and feature analysis



About Project — Project and technology information



## Technology Stack



### Frontend



React

TypeScript

Vite

Tailwind CSS

Recharts

Lucide React



#### Backend



Python

FastAPI

Uvicorn

Pandas

Joblib



#### Machine Learning



Scikit-learn

Random Forest Regression

One-Hot Encoding

ColumnTransformer

Permutation Feature Importance



#### Data Analysis



Pandas

NumPy

Matplotlib

Seaborn

Jupyter Notebook



#### Development Tools



Git

GitHub

VS Code

Jupyter Notebook



### Dataset



The project uses a historical car sales dataset containing:



23,906 records and 16 original attributes



The dataset includes information such as:



Customer information

Annual income

Vehicle company

Vehicle model

Engine

Transmission

Color

Vehicle price

Dealer information

Body style

Dealer region

Sales date



### Data Preparation



The analysis includes:



Missing-value handling

Duplicate detection

Datatype conversion

Exploratory data analysis

Statistical analysis

Data visualization

Feature preparation

Train/test splitting

Categorical encoding



API



The machine learning model is served using FastAPI.



Health Check



GET /



Response:



{

"message": "Car Price Prediction API is running"

}



Price Prediction



POST /predict



Example request:



{

"Annual Income": 800000,

"Company": "Toyota",

"Model": "Camry",

"Engine": "Double Overhead Camshaft",

"Transmission": "Automatic",

"Color": "Black",

"Body Style": "Sedan",

"Dealer\_Region": "Austin"

}



Example response:



{

"predicted\_price": 28500.00

}



The prediction value above is only an example of the API response format.



### Project Structure



#### Frontend



AutoInsight-AI/



src/

components/

pages/

services/

data/

types/



public/

index.html

package.json

package-lock.json

vite.config.ts

tsconfig.json

README.md



#### Backend



car-sales-api/



app.py

requirements.txt

.gitignore

car\_price\_model.pkl



The trained model file is kept outside the frontend repository because of its file size.



Running the Project



Clone the Repository



git clone https://github.com/Hari312895/AutoInsight-AI.git



cd AutoInsight-AI



Install Frontend Dependencies



npm install



Start the Frontend



npm run dev



The dashboard will run at:



http://localhost:3000



Start the Backend



Navigate to the backend project:



cd car-sales-api



Install the required Python packages:



pip install fastapi uvicorn pandas scikit-learn joblib



Start the API:



uvicorn app:app --reload



The API will run at:



http://127.0.0.1:8000



Both the frontend and backend should be running for live price prediction.



## Machine Learning Workflow



Dataset

↓

Data Cleaning

↓

EDA

↓

Feature Selection

↓

Train / Test Split

↓

One-Hot Encoding

↓

Random Forest Regression

↓

Model Evaluation

↓

Model Serialization

↓

FastAPI API

↓

React Price Prediction



### Project Highlights



End-to-end machine learning project

Interactive analytics dashboard

Real-time API-based prediction

Data preprocessing and exploratory analysis

Random Forest regression

Feature importance analysis

React frontend integration

FastAPI backend integration

GitHub-based project workflow



### Future Improvements



Hyperparameter optimization

Comparison with additional regression algorithms

Advanced feature engineering

Model monitoring

Cloud deployment

Production API deployment

Automated model retraining

Expanded vehicle and market features

