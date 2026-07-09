import { useEffect, useRef } from "react";
import useFaceDetection from "../hooks/useFaceDetection";



export default function Camera() {
    const { mood, detectMood, loading } = useFaceDetection();
    console.log("detectMood:", detectMood);
console.log("type:", typeof detectMood);
  const videoRef = useRef(null);
  //   const [mood, setMood] = useState("Not Detected");
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

  return (
    <div>
      <h1>Moodify</h1>

      <h2>Mood: {mood}</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={640}
        height={480}
      />

      <br />

<button
  onClick={() => {
    console.log("Button clicked");
    console.log(typeof detectMood);
    detectMood(videoRef);
  }}
>
  Detect Mood
</button>    </div>
  );
}
