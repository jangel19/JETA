# JETA AI - Backend Development

## Overview
JETA AI is a real estate intelligence platform built with FastAPI and Supabase.  
The backend manages authentication, role-based access control (RBAC), and secure data handling using Row Level Security (RLS).

---

## Day 1 - Backend Foundation
**Focus:** Setting up the initial backend structure and authentication system.

**Summary:**
- Built the FastAPI project structure (`core`, `database`, `models`, `routers`).
- Configured `.env` for Supabase keys and FastAPI secret key.
- Connected Supabase and created base tables: `user_profiles`, `listings`, and `subscriptions`.
- Enabled RLS and added basic table policies.
- Implemented `/auth/signup` and `/auth/login` routes with Supabase Auth.
- Tested routes successfully using `curl`.

**Result:**  
Authentication and Supabase connection fully functional. Users can sign up, log in, and receive JWT tokens.

---

## Day 2 - Role Management & Access Control (RBAC)
**Focus:** Implementing and enforcing user roles both at the API and database levels.

**Summary:**
- Added token and role validation in `app/deps/auth.py` through `get_current_user()`.
- Created `require_roles()` dependency to restrict endpoint access by user role.
- Added `/listings/add` route for `seller` and `agent` roles only.
- Implemented Supabase RLS policy on `public.listings`:
  - Allows inserts only when `auth.uid() = owner_id` and the user’s role is `seller` or `agent`.
- Fixed Swagger token persistence and verified all role logic through `/docs`.

**Result:**  
Unauthorized users get `401 Unauthorized`.  
Users with invalid roles get `403 Forbidden`.  
Sellers and agents can add listings securely through Supabase RLS.

---

## Day 3 - Property Analysis Engine (Core MVP)
**Focus:** Implementing the core property intelligence route.

**Summary:**
- Added `/analyze-prop` POST route for generating property intelligence reports.
- Created `core_logic.py` to return a mock AI-generated analysis with:
  - Summary
  - Investment score
  - Rehab estimate
  - Zoning notes
  - Risk factors
  - Charts (mocked data for now)
- Used Pydantic models for request and response validation.
- Made the endpoint protected using JWT authentication.
- Debugged Swagger token consistency issues from Day 2.

**Notes:**  
Day 3 was quick since most of the core logic already existed from an earlier version of JETA.  
After Mena’s frontend updates, the next goal is to integrate an actual ML model to power real property analysis.  
The hardest part today was dealing with the Swagger setup and ensuring token persistence finally worked properly.

**Result:**  
The analysis engine is now live and functional(only on my machine when its running lol), producing full mock reports ready for ML integration.

---

## Next Steps
- tmrw stay tuned 😈
- 
