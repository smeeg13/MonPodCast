import 'bootstrap/dist/css/bootstrap.css'
import Header from "../components/Header";
import Player from "../components/player";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../utils/theme";
import createEmotionCache from "../../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";



const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component,
  emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>

    <>
      <Header />
      <Component {...pageProps} />

      <Player audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </>
    </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
