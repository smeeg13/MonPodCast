import Header from "../components/Header";
import Player from "../components/player";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />

      <Player audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </>
  );
}

export default MyApp;
