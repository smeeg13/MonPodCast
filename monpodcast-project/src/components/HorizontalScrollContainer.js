import React from "react";
import styles from "../styles/HorizontalScrollContainer.module.css";

const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = React.useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft - 1000,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + 1000,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.horizontalScrollContainer}>
      <button className={styles.arrowLeft} onClick={scrollLeft}>
        &larr;
      </button>
      <div className={styles.scrollWrapper} ref={scrollRef}>
        {children}
      </div>
      <button className={styles.arrowRight} onClick={scrollRight}>
        &rarr;
      </button>
    </div>
  );
};

export default HorizontalScrollContainer;
