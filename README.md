# JETA AI - Backend Development

## Overview
JETA AI is a real estate intelligence platform built with FastAPI and Supabase.  
The backend handles authentication, role-based access control, and secure data management through Row Level Security (RLS).

---

## Day 1 - Backend Foundation
Day 1 focused on setting up the core backend architecture and authentication system.

### Summary
- Created FastAPI project structure (`core`, `database`, `models`, `routers`).
- Configured `.env` for Supabase keys and FastAPI secret.
- Linked Supabase with a working schema (`user_profiles`, `listings`, `subscriptions`).
- Enabled RLS and added basic table policies.
- Implemented `/auth/signup` and `/auth/login` routes using Supabase Auth.
- Tested endpoints successfully via `curl`.

**Result:** Authentication and database connection fully functional — users can sign up, log in, and get tokens.

---

## Day 2 - Role Management & Access Control (RBAC)
Day 2 focused on securing routes and enforcing roles both at the API and database level.

### What I Did
1. Implemented a full RBAC system where only specific roles can access certain routes.
2. Created a dependency system in `app/deps/auth.py`:
   - `get_current_user()` validates Supabase tokens and fetches the user role from `user_profiles`.
   - `require_roles()` enforces which roles can access specific routes.
   - Added a `user_scoped_postgrest()` client to enforce RLS automatically.
3. Added `/listings/add` route:
   - Only users with roles `seller` or `agent` can add listings.
   - Automatically sets `owner_id` to the authenticated user's ID.
   - Returns the created listing from the database.
4. Configured SQL RLS policy for `public.listings` to allow inserts only if:
   - `auth.uid() = owner_id`
   - The user’s role is either `seller` or `agent`.
5. Verified everything using Swagger (`/docs`) with real Supabase tokens.

**Result:**  
- Unauthorized users receive `401 Unauthorized`.  
- Authenticated users with the wrong role receive `403 Forbidden`.  
- Sellers and agents can successfully create listings.  
- RLS confirmed working correctly at the database layer.

---

## Next Steps
- might be pushed tn if im locked in 😈
- 
