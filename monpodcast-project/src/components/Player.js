import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Player.module.css";

const playIcon = "https://cdn-icons-png.flaticon.com/512/5577/5577228.png";
const pauseIcon = "https://cdn-icons-png.flaticon.com/512/2920/2920686.png";
const volumeIcon = "https://cdn-icons-png.flaticon.com/512/25/25695.png";
const songPicture =
  "https://www.shutterstock.com/image-vector/vector-cartoon-music-note-icon-260nw-1165584241.jpg";

const Player = ({ audioSrc, podcastName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSongName, setCurrentSongName] = useState(podcastName || "");
  const audioRef = useRef();

  useEffect(() => {
    console.log("Player useEffect podcastName:", podcastName);
    setCurrentSongName(podcastName || "There's no title");

    if (audioSrc && audioRef.current.src !== audioSrc) {
      audioRef.current.src = audioSrc;
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [podcastName, audioSrc]);

  useEffect(() => {
    setCurrentSongName(podcastName || "There's no title");
    console.log(podcastName);
  }, [podcastName]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
    audioRef.current.volume = parseFloat(event.target.value);
  };

  const handleSkipTenSeconds = () => {
    audioRef.current.currentTime += 10;
  };

  const handleGoBackTenSeconds = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleAnimationEnd = (event) => {
    event.target.style.animation = "none";
    void event.target.offsetWidth;
    event.target.style.animation = "marquee 5s linear infinite";
  };

  return (
    <div className={styles.player}>
      <div className={styles.songInfo}>
        <div className={styles.songPicture}>
          <Image src={songPicture} alt="Song Picture" width={64} height={64} />
        </div>
        <div className={styles.songName}>
          <marquee onAnimationEnd={handleAnimationEnd}>
            {currentSongName}
          </marquee>
        </div>
      </div>
      <button className={styles.playButton} onClick={handlePlayPause}>
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? "Pause" : "Play"}
        />
      </button>
      <div className={styles.volumeContainer}>
        <img className={styles.volumeIcon} src={volumeIcon} alt="Volume" />
        <input
          className={styles.volumeSlider}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <button className={styles.goBackButton} onClick={handleGoBackTenSeconds}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/254/254437.png"
          alt="Go back 10s"
        />
      </button>

      <button className={styles.skipButton} onClick={handleSkipTenSeconds}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/254/254428.png"
          alt="Skip 10s"
        />
      </button>
      <audio ref={audioRef} src={audioSrc} volume={volume} />
    </div>
  );
};

export default Player;
