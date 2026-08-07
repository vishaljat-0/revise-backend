import { useEffect, useRef } from "react";
import useFaceDetection from "../hooks/useFaceDetection";
import './camerastyle.scss'
import { useHome } from "../../home/hooks/useHome";
export default function Camera() {
  const { mood, detectMood, loading } = useFaceDetection();
  const videoRef = useRef(null);
  const { handlegetme } = useHome();

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleclick =() => {
    detectMood(videoRef);
  }
   return (
  <div className="camera">
    <h1>Moodify</h1>

    <p className="subtitle">
      Detect your mood and play matching music
    </p>

    <div className="camera__frame">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
      />
    </div>

    <div className="camera__mood">
      Mood: <span>{mood}</span>
    </div>

    <button
      disabled={loading}
      onClick={async () => {
    const mood = await detectMood(videoRef);
  if (!mood || mood === "Neutral") {
    return;
  }

    await handlegetme({ mood });
}}
    >
      {loading ? "Detecting..." : "Detect Mood"}
    </button>
  </div>
)}