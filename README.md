# JETA AI - Backend Development Day 1

### Overview
Day 1 was focused on setting up the backend foundation for JETA AI using FastAPI and Supabase.  
The goal was to establish authentication, connect to the database, and have a working signup and login system.

### What I Did
1. Set up the FastAPI project structure with folders for `core`, `database`, `models`, and `routers`.
2. Configured environment variables in a `.env` file for Supabase and the FastAPI app.
   - SUPABASE_URL  
   - SUPABASE_ANON_KEY  
   - SUPABASE_SERVICE_KEY  
   - APP_SECRET_KEY
3. Connected Supabase to the backend using the service key for server-side access.
4. Created the database schema in Supabase:
   - Tables: `user_profiles`, `listings`, `subscriptions`
   - Enum: `user_role` with values `buyer`, `seller`, `agent`, `investor`
   - Enabled Row Level Security and created basic policies for each table.
5. Implemented authentication routes:
   - `/auth/signup` creates a Supabase Auth user and inserts a user profile with a role.
   - `/auth/login` verifies the user and returns an access token and role.
6. Tested both endpoints using `curl` and verified responses.
7. Created a `.gitignore` to exclude `.env` and virtual environment files.
8. Created a new branch called `jordi-backend` and pushed the working code to GitHub.

### Results
- FastAPI successfully connected to Supabase.
- User signup and login are fully working.
- Each user profile is stored in the database with a specific role.
- The backend can now authenticate users and return session tokens.

### Next Steps
- Coming Soon (probably tmrw if i dont have too much hw lol)
