from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Annotated

Role = Literal["buyer", "seller", "agent", "investor"]

class SignUp(BaseModel):
    email : EmailStr
    password: Annotated[str, Field(min_length=8)]
    role : Role

class Login(BaseModel):
    email: EmailStr
    password : Annotated[str, Field(min_length=8)]

class AuthResponse(BaseModel):
    access_token : str
    token_type : str = "bearer"
    role: Role
