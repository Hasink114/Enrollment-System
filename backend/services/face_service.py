from pathlib import Path

import cv2
import mediapipe as mp

from mediapipe.tasks.python import vision
from mediapipe.tasks.python import BaseOptions


MODEL_PATH = (
    Path(__file__).parent.parent /
    "models" /
    "blaze_face_short_range.tflite"
)


class FaceService:

    def __init__(self):

        options = vision.FaceDetectorOptions(
            base_options=BaseOptions(
                model_asset_path=str(MODEL_PATH)
            ),
            min_detection_confidence=0.7
        )

        self.detector = vision.FaceDetector.create_from_options(
            options
        )

    def detect_face(self, image_path: str):

        image = mp.Image.create_from_file(image_path)

        result = self.detector.detect(image)

        faces = []

        for detection in result.detections:

            box = detection.bounding_box

            faces.append({
                "x": box.origin_x,
                "y": box.origin_y,
                "width": box.width,
                "height": box.height,
                "confidence": float(
                    detection.categories[0].score
                )
            })

        return {
            "success": True,
            "count": len(faces),
            "faces": faces
        }


face_service = FaceService()