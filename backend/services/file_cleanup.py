from pathlib import Path

UPLOADS = Path("uploads")
PROCESSED = Path("processed")
FINAL = Path("final")


def delete_files(folder: Path):

    if not folder.exists():
        return

    for file in folder.glob("*"):

        if file.is_file():

            try:
                file.unlink()
            except Exception:
                pass


def cleanup_previous_files():

    delete_files(UPLOADS)
    delete_files(PROCESSED)
    delete_files(FINAL)