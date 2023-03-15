import 'bootstrap/dist/css/bootstrap.css'
import Header from "../components/Header";
import Player from "../components/Player";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../utils/theme";
import createEmotionCache from "../../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";



const clientSideEmotionCache = createEmotionCache();
import React, { useState } from "react";

function MyApp({ Component,
  emotionCache = clientSideEmotionCache, pageProps }) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedPodcastName, setSelectedPodcastName] = useState("");

  const handlePlayClick = async (audioSrc, podcastName) => {
    setSelectedPodcast(audioSrc);
    setSelectedPodcastName(podcastName);
  };

  return (
    <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>

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
    </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
