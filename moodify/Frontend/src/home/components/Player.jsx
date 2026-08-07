import { useRef, useEffect, useState, useContext } from "react";
import "./player.scss";
import { Homecontext } from "../home.context";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from "react-icons/fa";

const Player = () => {
  const { song } = useContext(Homecontext);

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play automatically when song changes
  useEffect(() => {
    if (!audioRef.current || !song?.Songlink) return;

    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(console.error);
  }, [song]);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 10 sec backward
  const handleBackward = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
  };

  // 10 sec forward
  const handleForward = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + 10
    );
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="player">

      {/* Song Info */}
      <div className="player__info">
        <img
          src={song?.Songposter || "https://picsum.photos/80"}
          alt="cover"
          className="cover"
        />

        <div className="song-details">
          <h3>{song?.title || "Unknown Song"}</h3>
          <p>{song?.artist || "Unknown Artist"}</p>
          <span className="mood">
            {song?.mood || "Happy"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="player__controls">
        <button onClick={handleBackward}>
          <FaStepBackward />
        </button>

        <button
          className="play-btn"
          onClick={handlePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button onClick={handleForward}>
          <FaStepForward />
        </button>
      </div>

      {/* Progress */}
      <div className="player__progress">

        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
          }}
        />

        <span>{formatTime(duration)}</span>

      </div>

      {/* Volume */}
      <div className="player__volume">
        <FaVolumeUp />

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={(e) => {
            audioRef.current.volume = Number(e.target.value);
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={song?.Songlink}
      />
    </div>
  );
};

export default Player;