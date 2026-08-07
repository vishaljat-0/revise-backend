import { useState } from "react";
import { initializeFaceLandmarker } from "../services/mediaPipe";
import { getMood } from "../utils/moodClassifier";

export default function useFaceDetection() {
  const [mood, setMood] = useState("Not Detected");
  const [loading, setLoading] = useState(false);

  const detectMood = async (videoRef) => {
    if (!videoRef.current) return;

    try {
      setLoading(true);

      const faceLandmarker = await initializeFaceLandmarker();

      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        performance.now(),
      );
      if (
  !results.faceBlendshapes ||
  results.faceBlendshapes.length === 0
) {
  setMood("No Face Detected");
  return null;
}

      const detectedMood = getMood(results.faceBlendshapes);
      setMood(detectedMood);
      return detectedMood;
    } catch (error) {
      console.error("Face Detection Error:", error);
      setMood("Detection Failed");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    mood,
    loading,
    detectMood,
  };
}
