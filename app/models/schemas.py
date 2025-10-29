from pydantic import BaseModel, EmailStr, constr
from typing import Literal

Role = Literal["buyer", "seller", "agent", "investor"]

class SignUp(BaseModel):
    email : EmailStr
    password: constr(min_length=8)
    role : Role

class Login(BaseModel):
    email: EmailStr
    password : constr(min_length=8)

class AuthResponse(BaseModel):
    access_token : str
    token_type : str = "bearer"
    role: Role

    
