import { useState } from "react";
import { initializeFaceLandmarker } from "../services/mediaPipe";
import { getMood } from "../utils/moodClassifier";

export default function useFaceDetection() {
  const [mood, setMood] = useState("Not Detected");
  const [loading, setLoading] = useState(false);

  const detectMood = async (videoRef) => {
      console.log("✅ Hook detectMood called");
    if (!videoRef.current) return;

    try {
      setLoading(true);

      const faceLandmarker = await initializeFaceLandmarker();

      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        performance.now(),
      );

      console.log(results);
console.log(results.faceBlendshapes);
console.log(results.faceLandmarks);

      const detectedMood = getMood(results.faceBlendshapes);
      setMood(detectedMood);
    } catch (error) {
      console.error("Face Detection Error:", error);
      setMood("Detection Failed");
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
