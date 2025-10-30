from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

#validates the input and document the api this is just a little safe model
class AnalyzePropertyRequest(BaseModel):
    address : str = Field(..., example="274 Donahue Ave, Lowell, MA")
    bedrooms: int = Field(..., ge =0, example=3)
    bathrooms: int = Field(..., ge = 0, example=2)
    sqft: int = Field(..., get= 0, example = 1400)
    year_built: Optional[int] = Field(None, ge=1800, le=2100, example = 1985)

class PricePerSqftChart(BaseModel):
    subject: float
    market_avg :float
    neighborhood_quartiles : Dict[str,float]

class RehabCategory(BaseModel):
    category:str
    estimate: int

class AnalysisResponse(BaseModel):
    summary: str
    investment_score: int
    rehab_estimate: int
    zoning_notes: List[str]
    risk_factors: List[str]
    charts: Dict[str, Any]
