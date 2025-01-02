import React, { useState, useEffect } from "react";
// useState, useEffect 임포트
// useState: 상태 관리를 위해 사용합니다. (현재 슬라이드의 인덱스를 관리)
// useEffect: 컴포넌트가 렌더링되거나 업데이트될 때 실행되는 효과를 관리
import "../cssall/Banner.css";

const images = [
  { src: "./image/CK_ti375a38706082843.jpg" },
  { src: "./image/ti155t001114.jpg" },
  { src: "./image/ta0169t000687.jpg" },
];

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // useState로 상태 관리:
  // currentIndex: 현재 보여지고 있는 슬라이드의 인덱스를 저장
  // setCurrentIndex: 슬라이드 인덱스를 변경하는 함수
  // 초기값은 0 (첫 번째 이미지부터 시작)

  // 자동 슬라이드 효과 (useEffect) -> 5초마다 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    // setInterval: 5초마다(5000ms) currentIndex를 1씩 증가시키겠다
    // % images.length: 마지막 이미지를 넘어서면 처음으로 돌아간다
  


    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 정리
  }, []);
  // return () => clearInterval(interval);: 커ㅓㅁ포넌트가 언마운트될 때 setInterval을 정리해 메모리 누수를 방지
  // []: 의존성 배열이 비어 있어, 이 효과는 컴포넌트가 처음 마운트될 때 한 번만 실행된ㄷ


  // 다음 슬라이드 버튼 (handleNext)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  // currentIndex를 1 증가시켜 다음 슬라이드로 이동
  // 마지막 이미지에서는 첫 번째 이미지로 돌아가

  // 이전 슬라이드 버튼 (handlePrev)
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  // currentIndex를 1 감소시켜 이전 슬라이드로 이동
  // 첫 번째 이미지에서는 마지막 이미지로 이동해

  // 도트 클릭 핸들러 (handleDotClick)
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  // 사용자가 특정 도트를 클릭하면 해당 슬라이드로 이동
  // index: 클릭된 도트의 인덱스를 받아와 currentIndex에 설정

  return (
    <div>
      <div className="main-banner">
      {/* main-banner: 슬라이드 이미지와 내비게이션 버튼을 포함하는 컨테이너 */}
        {images.map((image, index) => (
          // images.map: 각 이미지 객체를 반복해 화면에 렌더링
          <img
            key={index}
            // key={index}: React에서 각 요소를 고유하게 식별하기 위해 사용
            src={image.src}
            // src={image.src}: 이미지 경로 설정
            alt={`슬라이드 ${index}`}
            // alt: 접근성을 위한 이미지 설명
            className={`banner-image ${index === currentIndex ? "active" : ""}`}
            // className: 현재 활성화된 이미지(currentIndex)에 active 클래스를 추가해 스타일을 적용
          />
        ))}
        <button className="prev" onClick={handlePrev}>    
        {/* handlePrev: 이전 슬라이드로 이동 */}
          ❮
        </button>
        <button className="next" onClick={handleNext}>
        {/* handleNext: 다음 슬라이드로 이동. */}
          ❯
        </button>
      </div>
      {/* ❮, ❯: 이전/다음 버튼의 화살표 아이콘 */}

      {/* 도트 내비게이션 (slide-dots)  */}
      <div className="slide-dots">
        {images.map((_, index) => (
          // images.map: 각 이미지에 대응하는 도트를 생성
          <span
            key={index}
            // key={index}: 각 도트를 고유하게 식별
            className={`dot ${index === currentIndex ? "active" : ""}`}
            // lassName: 현재 활성화된 도트(currentIndex)에 active 클래스를 추가해 강조
            onClick={() => handleDotClick(index)}
            // onClick: 도트를 클릭하면 해당 인덱스로 슬라이드가 이동
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MainBanner;


// useState: 현재 슬라이드 인덱스를 관리.
// useEffect: 자동 슬라이드 구현.
// handleNext, handlePrev: 슬라이드 버튼 동작.
// handleDotClick: 도트 클릭 시 슬라이드 이동.
// map: 이미지와 도트를 동적으로 렌더링.






// import React, { useState } from "react";
// import "../cssall/Banner.css";

// const images = [
//   { src: "./image/CK_ti375a38706082843.jpg" },
//   { src: "./image/ti155t001114.jpg" },
//   { src: "./image/ta0169t000687.jpg" },
// ];

// const MainBanner = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // 자동 슬라이드 효과
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // 3초마다 슬라이드 전환

//     return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 정리
//   }, []);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

  

//   return (
//     <div>
//       <div className="main-banner">
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image.src}
//             alt={image.alt}
//             className={`banner-image ${index === currentIndex ? "active" : ""}`}
//           />
//         ))}
//         <button className="prev" onClick={handlePrev}>
//           ❮
//         </button>
//         <button className="next" onClick={handleNext}>
//           ❯
//         </button>
//       </div>

//       <div className="slide-dots">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === currentIndex ? "active" : ""}`}
//             onClick={() => setCurrentIndex(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainBanner;
