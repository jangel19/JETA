from supabase import create_client
from app.core.config import settings

#makes sure the service ket stays server side lol
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

