#server side admin lookups and user scoped postgrest client for data writes to do rls check
from fastapi import Depends, HTTPException, status, Header
from typing import Optional, Literal
from dataclasses import dataclass
from supabase import create_client, Client
from postgrest.exceptions import APIError
import os
from dotenv import load_dotenv
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Security

http_bearer = HTTPBearer(auto_error=False)

async def get_current_user(credentials: HTTPAuthorizationCredentials | None = Security(http_bearer)):
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = credentials.credentials
    user_res = service_supabase.auth.get_user(token)

load_dotenv()  # load .env in dev

SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "").strip()
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "").strip()

if not (SUPABASE_URL.startswith("https://") and SUPABASE_URL.endswith(".supabase.co")):
    raise RuntimeError(f"SUPABASE_URL looks wrong: {repr(SUPABASE_URL)}")
if not SUPABASE_SERVICE_KEY:
    raise RuntimeError("SUPABASE_SERVICE_KEY missing")

Role = Literal["buyer", "seller", "agent", "investor"]

service_supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
@dataclass
class CurrUser:
    user_id : str
    email : str
    role : Role
    access_token : str

def bearer_token(authorization: Optional[str])->str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = "missing header or invalid authorization")
    return authorization.split(" ", 1)[1].strip()

async def get_curr_user(credentials: HTTPAuthorizationCredentials | None = Security(http_bearer),):
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = credentials.credentials.strip()
    print("JWT len:", len(token), "prefix:", token[:12])

    #verify with Supabase
    try:
        user_resp = service_supabase.auth.get_user(token)
    except Exception:
        raise HTTPException(status_code=401, detail="invalid or expired token")

    if not user_resp or not user_resp.user:
        raise HTTPException(status_code=401, detail="invalid or expired token")

    user_id = user_resp.user.id
    email = user_resp.user.email or ""

    # 4) Lookup role via service client
    r = service_supabase.table("user_profiles").select("role").eq("id", user_id).single().execute()
    role = (r.data or {}).get("role")

    if role is None:
        raise HTTPException(status_code=403, detail="profile/role not found")

    return CurrUser(user_id=user_id, email=email, role=role, access_token=token)

def require_roles(*allowed: Role):
    def checker(current : CurrUser = Depends(get_curr_user))->CurrUser:
        if current.role not in allowed:
            raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "forbidden: please give me and mena more money")
        return current
    return checker

def user_scoped_postG(current : CurrUser)->Client:
    client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY or SUPABASE_SERVICE_KEY)
    client.postgrest.auth(current.access_token)
    return client

# server-side admin lookups and user-scoped PostgREST client (RLS enforced)
from dataclasses import dataclass
from typing import Literal
import os

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client

# --- Load environment early ---
load_dotenv()

# Support both names to avoid .env mismatches
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_SERVICE_KEY = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("SUPABASE_SERVICE_KEY")
    or ""
).strip()
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "").strip()

if not (SUPABASE_URL.startswith("https://") and SUPABASE_URL.endswith(".supabase.co")):
    raise RuntimeError(f"SUPABASE_URL looks wrong: {repr(SUPABASE_URL)}")
if not SUPABASE_SERVICE_KEY:
    raise RuntimeError("Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY)")
if not SUPABASE_ANON_KEY:
    raise RuntimeError("Missing SUPABASE_ANON_KEY")

# --- Types ---
Role = Literal["buyer", "seller", "agent", "investor"]

@dataclass
class CurrentUser:
    user_id: str
    email: str
    role: Role
    access_token: str

# --- Clients ---
service_supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
http_bearer = HTTPBearer(auto_error=False)

# --- Auth Dependencies ---
async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Security(http_bearer),
) -> CurrentUser:
    # 1) Validate header & extract token
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = credentials.credentials.strip()

    # 2) Verify token with Supabase Auth
    try:
        user_resp = service_supabase.auth.get_user(token)
    except Exception:
        raise HTTPException(status_code=401, detail="invalid or expired token")

    if not getattr(user_resp, "user", None):
        raise HTTPException(status_code=401, detail="invalid or expired token")

    user_id = user_resp.user.id
    email = user_resp.user.email or ""

    # 3) Lookup role in public.user_profiles using service role (always up-to-date)
    res = (
        service_supabase
        .table("user_profiles")
        .select("role")
        .eq("id", user_id)
        .single()
        .execute()
    )
    role = (res.data or {}).get("role")
    if role is None:
        raise HTTPException(status_code=403, detail="profile/role not found")

    return CurrentUser(user_id=user_id, email=email, role=role, access_token=token)


def require_roles(*allowed: Role):
    def checker(current: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if current.role not in allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="forbidden")
        return current
    return checker


def user_scoped_postgrest(current: CurrentUser) -> Client:
    """Return a client that uses the caller's JWT so RLS applies."""
    client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    client.postgrest.auth(current.access_token)
    return client
