import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../utils/theme";
import createEmotionCache from "../../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import React, { useState } from "react";
import Player from "../components/Player";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedPodcastName, setSelectedPodcastName] = useState("");

  const handlePlayClick = async (audioSrc, podcastName) => {
    console.log("MyApp handlePlayClick podcastName:", podcastName);
    setSelectedPodcast(audioSrc);
    setSelectedPodcastName(podcastName);
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <>
          <Header handlePlayClick={handlePlayClick} />
          <Component {...pageProps} handlePlayClick={handlePlayClick} />
          {selectedPodcast && (
            <Player
              audioSrc={selectedPodcast}
              podcastName={selectedPodcastName}
            />
          )}
        </>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
