import React, { useRef, useEffect } from "react";
import "../cssall/Ads.css";

import image1 from "../../image/ads/mini-ads3.png";
import image2 from "../../image/ads/mini-ads4.png";
import image3 from "../../image/ads/mini-ads6.png";
import image4 from "../../image/ads/mini-ads8.png";
import image5 from "../../image/ads/mini-ads9.png";
import image6 from "../../image/ads/mini-ads13.png";
import image7 from "../../image/ads/mini-ads14.png";
import image8 from "../../image/ads/mini-ads15.png";
import image9 from "../../image/ads/mini-ads16.jpg";
import image10 from "../../image/ads/big-ads01.png";
import image11 from "../../image/ads/big-ads02.png";

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
      <div className="ad-section-title-wrapper">
  <h1 className="ad-section-title">HOT 뜨거 Deal</h1>
</div>
      <div className="ad-slider">
        {/* 이전 버튼 */}
        <button className="prev" onClick={handlePrev}>
          ❮
        </button>
        <div className="ad-cards-container" ref={adCardsRef}>
          {/* 카드 리스트 */}
          <div className="ad-cards">
        <div className="ad-card" onClick={() => alert("선착순 탈락!")}>
          <img src={image6} alt="광고 이미지 1" />
        </div>
            <div className="ad-card" onClick={() => alert("하나 못 됨!")}>
            <img src={image8} alt="광고 이미지 2" />
            </div>
            <div className="ad-card" onClick={() => alert("풍향고")}>
            <img src={image9} alt="광고 이미지 3" />
            </div>
            <div className="ad-card" onClick={() => alert("링딩동 링딩동")}>
            <img src={image3} alt="광고 이미지 4" />
            </div>
            <div className="ad-card" onClick={() => alert("괜히 했다 해지가 힘들어짐")}>
            <img src={image2} alt="광고 이미지 5" />
            </div>
            <div className="ad-card"onClick={() => alert("고생했다")}>
            <img src={image1} alt="광고 이미지 6" />
            </div>
            <div className="ad-card" onClick={() => alert("제 4의 조원")}>
            <img src={image7} alt="광고 이미지 7" />
            </div>
            <div className="ad-card" onClick={() => alert("선착순 탈락!")}>
            <img src={image5} alt="광고 이미지 8" />
            </div>
            <div className="ad-card" onClick={() => alert("중요함")}>
            <img src={image4} alt="광고 이미지 9" />
            </div>
          </div>
        </div>
        {/* 다음 버튼 */}
        <button className="next" onClick={handleNext}>
          ❯
        </button>
      </div>


      <div className="ad-banner">
  <div className="ad-banner-item light-green" ref={bannerRef1}>
    <img src={image10} alt="광고 이미지10" />
    {/* 이미지 위 텍스트와 버튼 */}
    <div className="banner-content">
      <h2 className="banner-title">지루하지 않은 통신사♫ ♪</h2>
      <p className="banner-description">근데 이제 대박 할인을 곁들인.....</p>
      <button className="banner-button" onClick={() => alert("더 보기")}>더 보기</button>
    </div>
  </div>
  <div className="ad-banner-item light-blue" ref={bannerRef2}>
    <img src={image11} alt="광고 이미지11" />
    <div className="banner-content2">
      <h2 className="banner-title2">GDH에서만 만날 수 있는 혜택?! <br />놓치지 마세요!</h2>
      <p className="banner-description2">20분 동안만 제공되는 혜택입니다.</p>
      <button className="banner-button2" onClick={() => alert("지금 구매")}>지금 구매</button>
    </div>
  </div>
</div>

      {/* <div className="ad-banner">
        <div className="ad-banner-item light-green" ref={bannerRef1} onClick={() => alert("선착순 탈락!")}>
          <img src={image10} alt="광고 이미지10" />
        </div>
        <div className="ad-banner-item light-blue" ref={bannerRef2} onClick={() => alert("선착순 탈락!")}>
        <img src={image11} alt="광고 이미지11" />
        </div>
      </div> */}
    </div>
  );
}

export default Ads;
