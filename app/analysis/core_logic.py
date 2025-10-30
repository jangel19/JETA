#this is just a simple brain have not started any training smh idk if need a gpu or js wingit
from datetime import datetime
from typing import Dict, Any

def gen_report(data:Dict[str, Any]) -> Dict[str, Any]:
    #this is gonna make a mock report
    bedrooms = int(data.get("bedrooms", 0) or 0)
    bathrooms = int(data.get("bathrooms", 0) or 0)
    sqft = int(data.get("sqft", 0) or 0)
    year_built = int(data.get("year_built", 0) or 0)

    #simple score since frontend is not fully developed
    age = max(0, datetime.now().year - year_built) if year_built else 40
    size_factor = min(1.0, sqft / 2000.0)
    bed_bath_factor = min(1.0, (bedrooms + bathrooms) / 6.0)

    #adjust by crude factors
    base_score = 70
    score = base_score + 15 * size_factor + 10 * bed_bath_factor - min(15, age/ 5.0)
    investment_score = int(max(0, min(100, round(score))))

    #placeholder estimate
    rehab_estimate = round(15000 + (age * 500) + (sqft * 10))

    zoning_notes = [ "Verify zoning use aligns with intended occupancy.",
        "Permit required for major structural changes.",
        "Check local parking minimums for multi-unit conversions."
        ]

    #risk factors

    risk_factors = []
    if age > 50:
        risk_factors.append("likely has original plumbing and electrical in sections since it is older than 50 yrs.")
    if sqft > 2500:
        risk_factors.append("high living costs due to the size")
    if bathrooms < 2:
        risk_factors.append("below market for number of bathrooms relative to area.")
    if year_built and year_built < 1978:
        risk_factors.append("there is a risk of lead paint")
    if not risk_factors:
        risk_factors.append("no major imediate risks identified, please validate with inspection")

    #dummy char json so the frontend can render bars and lines(mena get ready)
    charts = {
        "price per sqft": {
            "subject" : round(325 + (investment_score - 70)), #all fake btw
        "market avg": 350,
        "neighborhood_quartiles" : {"p25": 300, "p50": 340, "p75": 390}
        },
        "estimated_rehab_breakdown": [
            {"category": "exterior", "estimate" : round(rehab_estimate *0.35)},
            {"category": "mechanical and systems", "estimate": round(rehab_estimate *0.30)},
            {"category": "interior", "estimate": round(rehab_estimate *0.35)}
        ]
    }

    #summary so that the ui can show at the top of the mock report
    summary = (
        f"{data.get('address', 'Subject property')}: approx. {sqft} sqft, "
        f"{bedrooms} bd / {bathrooms} ba, built {year_built or 'N/A'}. "
        f"Mock investment score: {investment_score}/100. "
        f"Estimated rehab: ${rehab_estimate:,}."
    )

    return{
         "summary": summary,
        "investment_score": investment_score,
        "rehab_estimate": rehab_estimate,
        "zoning_notes": zoning_notes,
        "risk_factors": risk_factors,
        "charts": charts
    }
