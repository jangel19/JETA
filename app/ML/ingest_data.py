import pandas as pd
import numpy as np
from pathlib import Path
from supabase import create_client
import os
from dotenv import load_dotenv
import math


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "").strip()

#first lets load the dataaaa
dataPath = Path("data/raw/kc_house_data.csv")
df = pd.read_csv(dataPath)

print(df.info())
print(df.head())

#standarize the col names
df.columns = (df.columns.str.strip().str.lower().str.replace(" ", "_").str.replace("_", "_"))

#makew sure we onlt get the info we need
columns = ["id", "date", "price", "bedrooms", "bathrooms", "sqft_living", "sqft_lot", "floors", "zipcode",
           "yr_built", "lat", "long"]
df = df[columns]

#drop the row if its missing critical info
df = df.dropna(subset=["price", "sqft_living"])
#for stuff like bed just fill in vals
df["bedrooms"].fillna(math.floor(df["bedrooms"].median()), inplace=True)
df["bathrooms"].fillna(math.floor(df["bathrooms"].median()), inplace=True)
#convert the data types
df["zipcode"] = df["zipcode"].astype(str)
df["yr_built"] = df["yr_built"].astype(int)
df["date"] = pd.to_datetime(df["date"], errors="coerce")

#get teh price p sqft
df["price_per_sqft"] = df["price"] / df["sqft_living"]

#remove unrealistic data
df = df[(df["price"] > 50000) & (df["price"] < 5_000_000)]
df = df[(df["sqft_living"] > 300) & (df["sqft_living"] < 10000)]

int_cols   = ["id", "bedrooms", "sqft_living", "sqft_lot", "yr_built"]
float_cols = ["price", "bathrooms", "floors", "lat", "long", "price_per_sqft"]

df[int_cols] = df[int_cols].round(0).astype("int64")
df[float_cols] = df[float_cols].astype("float64")

out_path = Path("data/clean/clean_data.csv")
out_path.parent.mkdir(parents=True, exist_ok=True)
df.to_csv(out_path, index=False)
print(f"cleaned data saved to {out_path}")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Make a serialization-friendly copy
df_ser = df.copy()

if "date" in df_ser.columns:
    df_ser["date"] = pd.to_datetime(df_ser["date"], errors="coerce").dt.strftime("%Y-%m-%dT%H:%M:%S")

df_ser = df_ser.where(pd.notnull(df_ser), None)

#scalars
def _to_py(x):
    if isinstance(x, (np.integer,)):  return int(x)
    if isinstance(x, (np.floating,)): return float(x) if x is not None else None
    return x

df_ser = df_ser.sort_values("date").drop_duplicates(subset=["id"], keep="last")

#consistent set of columns for the table
upload_cols = ["id", "date", "price", "bedrooms", "bathrooms", "sqft_living", "sqft_lot",
               "floors", "zipcode", "yr_built", "lat", "long", "price_per_sqft"]
data = df_ser[upload_cols].to_dict(orient="records")

# small first
# small first
resp = supabase.table("clean_properties").upsert(data[:100], on_conflict="id").execute()
print("Supabase insert status:", getattr(resp, "status_code", "ok"))
