from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_SECRET_KEY: str
    SUPABASE_URL : str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_KEY: str
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

settings = Settings()


