import React, { useRef, useEffect } from "react";
import "../cssall/Ads.css";

function Ads() {
  const adCardsRef = useRef(null); // 카드 컨테이너 참조
  const bannerRef1 = useRef(null); // 첫 번째 배너 참조
  const bannerRef2 = useRef(null); // 두 번째 배너 참조

  const handlePrev = () => {
    if (adCardsRef.current) {
      // 이전 버튼 클릭 시 왼쪽으로 이동
      adCardsRef.current.scrollBy({
        left: -300, // 한 카드의 너비만큼 이동
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (adCardsRef.current) {
      // 다음 버튼 클릭 시 오른쪽으로 이동
      adCardsRef.current.scrollBy({
        left: 300, // 한 카드의 너비만큼 이동
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const options = {
      root: null, // viewport 기준
      rootMargin: "0px",
      threshold: 0.1, // 요소의 10%가 보이면 트리거
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // 화면에 보이면 클래스 추가
        } else {
          entry.target.classList.remove("visible"); // 화면 밖이면 클래스 제거
        }
      });
    }, options);

    if (bannerRef1.current) observer.observe(bannerRef1.current);
    if (bannerRef2.current) observer.observe(bannerRef2.current);

    return () => {
      if (bannerRef1.current) observer.unobserve(bannerRef1.current);
      if (bannerRef2.current) observer.unobserve(bannerRef2.current);
    };
  }, []);

  return (
    <div className="ad-section">
      <h1 className="ad-section-title">핫 딜!</h1>
      <div className="ad-slider">
        {/* 이전 버튼 */}
        <button className="prev" onClick={handlePrev}>
          ❮
        </button>
        <div className="ad-cards-container" ref={adCardsRef}>
          {/* 카드 리스트 */}
          <div className="ad-cards">
            <div className="ad-card"></div>
            <div className="ad-card"></div>
            <div className="ad-card"></div>
            <div className="ad-card"></div>
            <div className="ad-card"></div>
            <div className="ad-card"></div>
          </div>
        </div>
        {/* 다음 버튼 */}
        <button className="next" onClick={handleNext}>
          ❯
        </button>
      </div>

      <div className="ad-banner">
        <div className="ad-banner-item light-green" ref={bannerRef1}></div>
        <div className="ad-banner-item light-blue" ref={bannerRef2}></div>
      </div>
    </div>
  );
}

export default Ads;
