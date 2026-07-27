from io import BytesIO

from PIL import Image
from rembg import remove, new_session


class BackgroundService:

    def __init__(self):
        # Use BiRefNet instead of U²Net
        self.session = new_session("birefnet-general")

    def replace_with_blue(self, input_path, output_path):

        image = Image.open(input_path).convert("RGBA")

        output = remove(
            image,
            session=self.session
        )

        if isinstance(output, bytes):
            output = Image.open(BytesIO(output)).convert("RGBA")

        blue = Image.new(
            "RGBA",
            output.size,
            (67, 142, 219, 255)
        )

        blue.paste(
            output,
            mask=output.getchannel("A")
        )

        blue.convert("RGB").save(
            output_path,
            quality=100
        )


background_service = BackgroundService()