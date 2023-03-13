import Header from "../components/Header";
import Player from "../components/Player";
import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  return (
    <>
      <Header />
      <Component {...pageProps} setSelectedPodcast={setSelectedPodcast} />
      {selectedPodcast && (
        <Player
          audioSrc={selectedPodcast}
          setSelectedPodcast={setSelectedPodcast}
        />
      )}
    </>
  );
}

export default MyApp;
