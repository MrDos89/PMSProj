import React, { useState } from "react";
import "../cssall/Banner.css";

const images = [
  { src: "./image/CK_ti375a38706082843.jpg" },
  { src: "./image/ti155t001114.jpg" },
  { src: "./image/ta0169t000687.jpg" },
];

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="main-banner">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`banner-image ${index === currentIndex ? "active" : ""}`}
        />
      ))}
      <button className="prev" onClick={handlePrev}>
        ❮
      </button>
      <button className="next" onClick={handleNext}>
        ❯
      </button>

      <div className="slide-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
