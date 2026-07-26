from pathlib import Path

class Settings:
    APP_NAME = "Student Photo System API"
    VERSION = "1.0.0"

    MAX_IMAGE_SIZE_MB = 10
    ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}

    PASSPORT_WIDTH = 413
    PASSPORT_HEIGHT = 531

    BACKGROUND_COLOR = (0, 102, 204)

    TEMP_FOLDER = Path("temp")

settings = Settings()