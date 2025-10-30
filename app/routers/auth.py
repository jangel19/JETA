from fastapi import APIRouter, HTTPException
from postgrest import APIError
from app.database.supabase_client import supabase
from app.models.schemas import SignUp, Login, AuthResponse

router = APIRouter(tags = ["auth"])
from fastapi import APIRouter, Depends
from app.deps.auth import get_current_user, CurrentUser

router = APIRouter(tags=["auth"])

@router.get("/me")
async def me(current: CurrentUser = Depends(get_current_user)):
    return {"user_id": current.user_id, "email": current.email, "role": current.role}

@router.post("/signup", response_model=AuthResponse, status_code=201)
def signup(body: SignUp):
    #create aut user
    try:
        auth_res = supabase.auth.sign_up({"email": body.email, "password": body.password})
    except Exception as e:
        raise HTTPException(400, f"signup failed: {e}")

    user = auth_res.user
    session = auth_res.session

    #create teh profile with the role
    try:
        supabase.table("user_profiles").insert({
            "id":user.id, "email": body.email, "role": body.role
        }).execute()

    except APIError as e:
        raise HTTPException(400, f"profile insert failed {e.message}")

    #ensure token is returned
    if session and session.access_token:
        token = session.access_token
    else:
        try:
            login_res = supabase.auth.sign_in_with_password({"email": body.email, "password": body.password})
            token = login_res.session.access_token
        except Exception:
            raise HTTPException(202, "signup ok; verift email before login")

    return AuthResponse(access_token= token, role = body.role)

@router.post("/login", response_model=AuthResponse)

def login(body: Login):
    try:
        res = supabase.auth.sign_in_with_password({"email": body.email, "password": body.password})
    except Exception as e:
        raise HTTPException(401, f"invalid credentials: {e}")

    token = res.session.access_token
    uid = res.user.id
    prof = supabase.table("user_profiles").select("role").eq("id", uid).single().execute()
    return AuthResponse(access_token=token, role = prof.data["role"])
