#goal of this is to train a regression model (price or investment_score) for JETA AI from clean_properties.csv

import argparse
import os
import joblib
import pandas as pd
import numpy as np
from pathlib import Path

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, root_mean_squared_error
import matplotlib.pyplot as plt


def build_parser():
    parser = argparse.ArgumentParser(description="regression model for jeta ai")
    parser.add_argument("--csv", type = str, default = "data/clean/clean_data.csv",
                        help="this is the path to clean_data")
    parser.add_argument("--target", type=str, default="price", choices=["price", "investment_score"],
                        help = "which target column to predict")
    parser.add_argument("--model", type=str, default="linear", choices=["linear", "ridge"],
                        help = "which model to train")
    parser.add_argument("--alpha", type=float, default=1.0, help="ridge regularization strength(for linear IGNOREEE)")
    parser.add_argument("--test_size", type=float, default=0.2,
                        help = "test split proportion (should be 80/20 def)")
    parser.add_argument("--random_state", type=int, default=42, help="random seed for reproducibility")
    parser.add_argument("--out_model", type=str, default="models.model.joblib",
                        help = "where to save the trained model")
    parser.add_argument("--plot_path", type=str, default="prediction_vs_actual.png",
                        help="where to save teh prediction scatter plot")
    return parser

def main():
    args = build_parser().parse_args()

    Path(os.path.dirname(args.out_model)).mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(args.csv)

    numeric_features = ["sqft_living", "bedrooms", "bathrooms", "yr_built", "sqft_lot"]
    categorical_features = ["zipcode"]

    #make sure we only keep the cols we actually care about
    needed_cols = set(numeric_features + categorical_features + [args.target])
    missing =needed_cols - set(df.columns)
    if missing :
        raise ValueError(f"missing required column in the csv file. MISSING {missing}")

    #drop the missing roles (since this is a beta we can afford to do so for now)
    df = df.dropna(subset=[args.target].copy())

    #split up the features x and the target y
    x = df[numeric_features + categorical_features]
    y = df[args.target]

    #preprocessing
    numeric_transformer = Pipeline(steps=[("scaler", StandardScaler())])

    categorical_transformer = Pipeline(steps=[("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))])

    preprocesser = ColumnTransformer(transformers = [
        ("numer", numeric_transformer, numeric_features),
        ("categ", categorical_transformer, categorical_features),
    ])

    if args.model == "linear":
        reg = LinearRegression()
    else:
        reg = Ridge(alpha=args.alpha, random_state=args.random_state)

    model = Pipeline(steps=[("preprocessing", preprocesser),
                            ( "regressor", reg),
                            ])
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=args.test_size, random_state=args.random_state
    )
    model.fit(x_train, y_train)

    y_prediction = model.predict(x_test)
    mae = mean_absolute_error(y_test, y_prediction)
    rmse = root_mean_squared_error(y_test, y_prediction)

    print("\n ---------eval going on--------------")
    print(f"taget: {args.target}")
    print(f"mdoel : {args.model}{'' if args.model == 'linear'else f'(alpha={args.alpha})'}")
    print(f"mae: {mae:,.2f}")
    print(f"rmse: {rmse:,.2f}")

    joblib.dump(model, args.out_model)
    print(f"saved trained model to {args.out_model}")

    #show a saple prediction only using the first row
    sample_x = x_test.iloc[[0]]
    sample_y_true = y_test.iloc[0]
    sample_y_pred = model.predict(sample_x)[0]
    print("\n--------- sample predictio -----------")
    print("Features:\n", sample_x.to_dict(orient="records")[0])
    print(f"True {args.target}: {sample_y_true:,.2f}")
    print(f"Pred {args.target}: {sample_y_pred:,.2f}")

    #plotting time
    # plt.figure()
    # plt.scatter(y_test, y_prediction)
    # plt.xlabel("actual")
    # plt.ylabel("predicted")
    # plt.title(f"predicted vs actual ({args.target})")
    #realized i wanted it prettier but js gonna comment out
    # #ref line
    # lims = [
    #     min(np.min(y_test), np.min(y_prediction)),
    #     max(np.max(y_test), np.min(y_prediction))
    # ]
    # plt.plot(lims, lims)
    plt.figure(figsize = (8,6))
    plt.scatter(y_test, y_prediction, alpha = 0.3, s=20, color="#2E86AB", edgecolor = "none")
    lims = [min(y_test.min(), y_prediction.min()), max(y_test.max(), y_prediction.max())]
    plt.plot(lims,lims, "--", color = "#E74C3C", linewidth = 2, label = "perfect prediction ")#😈🤫emojis didnt work lol
    plt.xlabel("Actual Price ($)", fontsize = 12)
    plt.ylabel("Predicted Price ($)", fontsize =12)
    plt.title(f"Predicted vs Actual - {args.model.title()} Model", fontsize = 14, weight = "bold")
    plt.xscale("log")
    plt.yscale("log")
    plt.grid(alpha = 0.3)
    plt.legend()
    plt.tight_layout()

    plt.savefig(args.plot_path, dpi=300, bbox_inches="tight")
    plt.show()
    print(f"\nsaved scatted plot to: {args.plot_path}\n")

if __name__ == "__main__":
    main()
