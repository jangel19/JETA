from fastapi import FastAPI
from app.routers import auth, listings

app = FastAPI(title="JETA AI Backend", version="0.0.1",
              swagger_ui_parameters={"persistAuthorization": True})
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(listings.router, prefix="/listings", tags=["listings"])

@app.get("/healthz")
def health():
    return {"ok": True}
