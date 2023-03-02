import { Close, CloseFullscreen } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

const Index = (props) => {
  const { images } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  const handleCloseFullScreenImage = () => {
    setShowFullScreenImage(false);
  };

  return (
    <div className={styles.imageSlider}>
      <div className={styles.mainImageContainer}>
        <img
          src={images[activeIndex]}
          alt="Main"
          className={styles.mainImage}
          onClick={() => setShowFullScreenImage(true)}
        />
        {showFullScreenImage && (
          <div className={styles.fullScreenImageOverlay}>
            <div className={styles.fullScreenImageContainer}>
              <img
                src={images[activeIndex]}
                alt="Full screen"
                className={styles.fullScreenImage}
              />
              <div
                className={styles.closeButton}
                onClick={handleCloseFullScreenImage}
              >
                <Close />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.thumbnailsContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`${styles.thumbnail} ${
              index === activeIndex ? styles.activeThumbnail : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
