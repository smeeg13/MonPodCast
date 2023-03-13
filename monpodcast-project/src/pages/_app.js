import Header from "../components/Header";
import Player from "../components/Player";
import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedPodcastName, setSelectedPodcastName] = useState("");

  const handlePlayClick = async (audioSrc, podcastName) => {
    setSelectedPodcast(audioSrc);
    setSelectedPodcastName(podcastName);
  };

  return (
    <>
      <Header />
      <Component {...pageProps} handlePlayClick={handlePlayClick} />
      {selectedPodcast && (
        <Player
          audioSrc={selectedPodcast}
          podcastName={selectedPodcastName}
          setSelectedPodcast={setSelectedPodcast}
        />
      )}
    </>
  );
}

export default MyApp;
