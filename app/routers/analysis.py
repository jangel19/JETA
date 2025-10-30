#this will translate http to validated input then the call core logi and returns the "summart"
from fastapi import APIRouter, Depends
from app.analysis.model import AnalyzePropertyRequest, AnalysisResponse
from app.analysis.core_logic import gen_report
from app.deps.auth import get_curr_user

router = APIRouter(prefix="/analyze-prop", tags=["analysis"])

@router.post("", response_model=AnalysisResponse)
def analyze_prop(payload: AnalyzePropertyRequest, current_user = Depends(get_curr_user)):
    return gen_report(payload.model_dump())
