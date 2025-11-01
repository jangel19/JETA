# JETA AI - Backend Development (Jordi’s Branch)

## Overview
JETA AI is a real estate intelligence platform built with FastAPI and Supabase.  
The backend handles authentication, role-based access control (RBAC), and secure data management using Row Level Security (RLS).  
This branch documents my day-by-day backend and ML progress — showing how I’m learning, building, and experimenting as I go.

Even though I’m not doing every equation by hand, I’ve been learning the theory behind it all through **Google’s Machine Learning Crash Course** and **StatQuest on YouTube**.  
Those two resources have really helped me understand the math and logic behind what’s happening in the models I’m building.

---

## Day 1 - Backend Foundation
**Focus:** Setting up the initial backend structure and authentication system.

**Summary:**
- Built the FastAPI project structure (`core`, `database`, `models`, `routers`).
- Configured `.env` for Supabase keys and FastAPI secret key.
- Connected Supabase and created base tables: `user_profiles`, `listings`, and `subscriptions`.
- Enabled RLS and added basic table policies.
- Implemented `/auth/signup` and `/auth/login` routes using Supabase Auth.
- Tested routes successfully with `curl`.

**Result:**  
Authentication and Supabase connection are fully functional.  
Users can sign up, log in, and receive JWT tokens.

---

## Day 2 - Role Management & Access Control (RBAC)
**Focus:** Implementing and enforcing user roles both at the API and database levels.

**Summary:**
- Added token and role validation in `app/deps/auth.py` through `get_current_user()`.
- Created `require_roles()` dependency to restrict endpoint access by user role.
- Added `/listings/add` route for `seller` and `agent` roles only.
- Implemented Supabase RLS policy on `public.listings`:
  - Allows inserts only when `auth.uid() = owner_id` and the user’s role is `seller` or `agent`.
- Fixed Swagger token persistence and verified all role logic through `/docs`.

**Result:**  
Unauthorized users now get `401 Unauthorized`.  
Users with invalid roles get `403 Forbidden`.  
Sellers and agents can securely add listings through Supabase RLS.

---

## Day 3 - Property Analysis Engine (Core MVP)
**Focus:** Creating the first version of the property intelligence engine.

**Summary:**
- Added `/analyze-prop` POST route for generating property analysis reports.
- Built `core_logic.py` to return a mock AI-generated report containing:
  - Summary  
  - Investment score  
  - Rehab estimate  
  - Zoning notes  
  - Risk factors  
  - Mock chart data
- Secured the route with JWT authentication.
- Debugged Swagger token issues that persisted from Day 2.

**Notes:**  
This day was smoother because most of the logic existed from a previous version of JETA.  
After Mena’s frontend updates, the next step is integrating a real ML model to power this endpoint.  
The hardest part today was getting Swagger tokens to persist properly, but I finally nailed it.

**Result:**  
The mock property analysis engine is live and functional locally — ready to connect to a trained model once available.

---

## Day 4 - Data Pipeline & Public Dataset Ingestion
**Focus:** Building the data ingestion and cleaning pipeline to prepare for model training.

**Summary:**
- Created `ingest_data.py` inside `app/ML/` for end-to-end data processing.
- Imported and cleaned the **King County House Sales** dataset.
- Standardized column names, removed missing or unrealistic values, and computed new metrics like `price_per_sqft`.
- Applied type conversions, handled missing values, and ensured numeric consistency.
- Exported a clean dataset as `clean_data.csv` in `data/clean/`.
- Added Supabase integration to upload the cleaned dataset directly to the `clean_properties` table with service role permissions.
- Fixed serialization and deduplication issues (`NaN`, `float64`, timestamps, primary key conflicts).
- Finalized an automated ingestion script that pushes cleaned data to Supabase.

**Notes:**  
This is where all the ML theory I’ve been learning started to make sense in practice.  
Between **Google’s ML Crash Course** and **StatQuest**, I’ve been able to actually understand *why* we normalize data, how missing values impact models, and why consistent types matter.  
Supabase was the hardest part here — juggling schemas, RLS, and upserts took a lot of trial and error, but it’s now running smoothly.

**Result:**  
The ingestion pipeline is fully automated and live.  
`clean_data.csv` is now the foundation for JETA’s model training and stored safely in Supabase.

---

## Day 5 - Model Training (Linear Regression)
**Focus:** Training the first ML model for property price prediction.

**Summary:**
- Wrote `train_model.py` under `app/ML/` using pandas, scikit-learn, and joblib.
- Trained a baseline **Linear Regression** model on key features (`sqft_living`, `bedrooms`, `bathrooms`, `year_built`, `sqft_lot`, `zipcode`).
- Evaluated results using **MAE** and **RMSE**.
- Achieved strong performance:
  - **MAE:** ~109k  
  - **RMSE:** ~186k  
- Visualized results with a `Predicted vs Actual` scatter plot using log scale for clarity.
- Saved trained model to `models/model.joblib`.

**Notes:**  
This was a really fun one — quick, clean, and satisfying.  
Even though it’s a simple linear model, it performs surprisingly well.  
Getting to visualize the predictions and actually see the pattern align with the real prices made the work feel real.  
It also made all the lessons from the ML Crash Course and StatQuest click — especially around bias, variance, and overfitting.  
The hardest part was fine-tuning the preprocessing pipeline (encoding, scaling, etc.), but once it clicked, the entire pipeline just worked.

**Result:**  
The backend can now train, evaluate, and save a working price prediction model.  
Next step is connecting it to the `/analyze-prop` route so predictions appear in real-time reports.

---

## Next Steps
- **Day 6:** Integrate the trained model into FastAPI (`/predict-price` and `/analyze-prop`).
- Experiment with tree-based models (XGBoost, Random Forest) to handle non-linear price behavior.
- Add richer features like `price_per_sqft`, renovation flags, and neighborhood clustering.
- Begin evaluating R², cross-validation, and residual plots to improve accuracy.
- Continue combining backend work with ML learning — applying everything from Google ML Crash Course and StatQuest to real code.

---

**Reflection:**  
Even though I’m just getting started with machine learning, this project has helped me understand how the theory connects to actual development.  
Each “Day” in this branch feels like a small research sprint — learning a concept, building something real with it, and seeing it come to life in the backend.  
It’s been a perfect balance between software engineering and applied data science, and it’s honestly made me more confident about pursuing AI and data-driven development going forward.
