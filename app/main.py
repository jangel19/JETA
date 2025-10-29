from fastapi import FastAPI
from app.routers import auth

app = FastAPI(title = "Jeta ai backend", version="0.0.1")
app.include_router(auth.router)

@app.get("/healthz")
def health():
    return{"ok": True}
