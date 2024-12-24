import Header from "./component/Header";
import MainBanner from "./component/MainBanner";
// import MiniGames from "./component/MiniGames";
import PhoneList from "./component/PhoneList";
import MainBody from "./component/MainBody";

// @todo : 해당 코드 아직 작업 안됨
// @NOTE : 주석 설명
// @TEMP DHKIM 24.12.23 - 임시코드
import Login from "./component/login/Login";
import MemberList from "./component/login/MemberList";
// import MemberDetails from "./component/login/MemberDetails";
import React, { useState, useEffect } from "react";

import "./App.css";
import MiniGamesBody from "./component/minigame/MiniGamesBody";

const phoneData = {
  모두: [
    {
      rank: 1,
      name: "갤럭시 와이드7",
      capacity: "128G",
      price: "85,559원/월",
      provider: "SKT 5GX",
      img: "../image/A5KU_001_13.png",
    },
    {
      rank: 2,
      name: "iPhone 16 Pro",
      capacity: "128G | 1T | 256G | 512G",
      price: "137,184원/월",
      provider: "SKT 5GX",
      img: "../image/A5XC_001_13.png",
    },
    {
      rank: 3,
      name: "갤럭시 S24 5G",
      capacity: "512G | 256G",
      price: "120,138원/월",
      provider: "SKT 5GX",
      img: "../image/A5CK_001_13.png",
    },
  ],
  "10대": [
    {
      rank: 1,
      name: "iPhone SE",
      capacity: "64G | 128G",
      price: "55,000원/월",
      provider: "SKT 5GX",
      img: "../image/teen_1.png",
    },
    {
      rank: 2,
      name: "Galaxy A13",
      capacity: "128G",
      price: "45,000원/월",
      provider: "SKT 5GX",
      img: "../image/teen_2.png",
    },
    {
      rank: 3,
      name: "Galaxy M22",
      capacity: "128G",
      price: "40,000원/월",
      provider: "SKT 5GX",
      img: "../image/teen_3.png",
    },
  ],
  "20대": [
    {
      rank: 1,
      name: "iPhone 14",
      capacity: "128G | 256G",
      price: "95,000원/월",
      provider: "SKT 5GX",
      img: "../image/20s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy S22",
      capacity: "256G",
      price: "85,000원/월",
      provider: "SKT 5GX",
      img: "../image/20s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy Z Flip3",
      capacity: "128G",
      price: "75,000원/월",
      provider: "SKT 5GX",
      img: "../image/20s_3.png",
    },
  ],
  "30대": [
    {
      rank: 1,
      name: "iPhone 13 Pro",
      capacity: "128G | 256G",
      price: "105,000원/월",
      provider: "SKT 5GX",
      img: "../image/30s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy Note 20",
      capacity: "256G",
      price: "95,000원/월",
      provider: "SKT 5GX",
      img: "../image/30s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy S21",
      capacity: "256G",
      price: "85,000원/월",
      provider: "SKT 5GX",
      img: "../image/30s_3.png",
    },
  ],
  "40대": [
    {
      rank: 1,
      name: "iPhone 12",
      capacity: "128G",
      price: "75,000원/월",
      provider: "SKT 5GX",
      img: "../image/40s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy A52",
      capacity: "128G",
      price: "65,000원/월",
      provider: "SKT 5GX",
      img: "../image/40s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy M32",
      capacity: "128G",
      price: "55,000원/월",
      provider: "SKT 5GX",
      img: "../image/40s_3.png",
    },
  ],
  "50대": [
    {
      rank: 1,
      name: "Galaxy S20 FE",
      capacity: "128G",
      price: "65,000원/월",
      provider: "SKT 5GX",
      img: "../image/50s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy Note 10",
      capacity: "128G",
      price: "55,000원/월",
      provider: "SKT 5GX",
      img: "../image/50s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy A71",
      capacity: "128G",
      price: "50,000원/월",
      provider: "SKT 5GX",
      img: "../image/50s_3.png",
    },
  ],
};

function App() {
  // const [count, setCount] = useState(0);
  const [mode, setMode] = useState("MAIN");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("모두");
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setPhones(phoneData[selectedAgeGroup] || phoneData["모두"]);
  }, [selectedAgeGroup]);

  const handleFilter = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  let body = null;
  if (mode === "MAIN") {
    //@ todo - 홈페이지 메인 화면
    body = <MainBody phones={phones} ageHandle={handleFilter}></MainBody>;
  } else if (mode === "GAME") {
    //@ todo - 미니게임용 창 만들기
    body = <MiniGamesBody></MiniGamesBody>;
  } else {
    //@todo - 에러 창 만들기
    body = null;
  }

  // @hs - 로그인 창
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // 사용자 데이터 저장
  const [showMemberList, setShowMemberList] = useState(false); // 회원 목록 창 표시 여부

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserData(data); // 로그인한 사용자 정보 저장
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setShowMemberList(false); // 로그아웃 시 회원 목록 창 닫기
  };

  const isAdmin = userData?.role === "admin"; // 어드민인지 확인

  return (
    <div className="App">
      <Header />
      <MainBanner />
      {/* 슬라이드 네비게이션 버튼 */}
      {/* <div class="slide-dots">
        <button class="dot active" data-index="0"></button>
        <button class="dot" data-index="1"></button>
        <button class="dot" data-index="2"></button>
      </div> */}
      {/* @hs -로그인 */}
      <Login />
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="login-container">
          <h2>프로필</h2>
          <img
            src="https://via.placeholder.com/100"
            alt="프로필 사진"
            className="profile-picture"
          />
          <p>이름: {userData.name}</p>
          <p>전화번호: {userData.phone}</p>
          <p>회원 등급: {userData.role === "admin" ? "관리자" : "일반 회원"}</p>
          <button onClick={handleLogout}>로그아웃</button>
          {isAdmin && (
            <button onClick={() => setShowMemberList(true)}>
              회원 목록 보기
            </button>
          )}
        </div>
      )}
      {showMemberList && (
        <MemberList onClose={() => setShowMemberList(false)} />
      )}
      {body}
    </div>
  );
}

export default App;
