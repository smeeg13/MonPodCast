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
      <button
        className={`${styles.arrowLeft} arrowLeft`}
        onClick={scrollLeft}
      ></button>
      <div className={styles.scrollWrapper} ref={scrollRef}>
        {children}
      </div>
      <button
        className={`${styles.arrowRight} arrowRight`}
        onClick={scrollRight}
      ></button>
    </div>
  );
};

export default HorizontalScrollContainer;
