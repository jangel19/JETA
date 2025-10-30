from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import Annotated
from postgrest.exceptions import APIError

from app.deps.auth import require_roles, user_scoped_postgrest, CurrentUser

router = APIRouter(tags=["listings"])

class CreateListing(BaseModel):
    address: Annotated[str, Field(min_length=3)]
    city:    Annotated[str, Field(min_length=2)]
    state:   Annotated[str, Field(min_length=2, max_length=2)]  #sample for ma
    zip:     Annotated[str, Field(min_length=5, max_length=10)]
    price:   Annotated[int, Field(gt=0)]

@router.post("/add")
async def add_listing(
    payload: CreateListing,
    current: CurrentUser = Depends(require_roles("agent", "seller")),
):
    # RLS will enforce owner_id matches auth.uid() and role is allowed
    client = user_scoped_postgrest(current)
    to_insert = {
        "owner_id": current.user_id,
        "address": payload.address,
        "city": payload.city,
        "state": payload.state,
        "zip": payload.zip,
        "price": payload.price,
    }
    try:
        res = client.table("listings").insert(to_insert).execute()
        # Supabase returns the inserted rows when Prefer: return=representation (default)
        row = res.data[0] if isinstance(res.data, list) else res.data
        return row
    except APIError as e:
        code = getattr(e, "code", None)
        if code in (401, 403):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden by RLS")
        detail = getattr(e, "message", str(e))
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
