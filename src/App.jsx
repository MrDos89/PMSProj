// 주석 예시
// @TODO : 작업할 예정
// @NOTE : 주석 설명
// @TEMP : 임시 기능

//@note - 메인 기능
import React, { useState, useEffect } from "react";
import "./App.css";

import WaveBackground from "./component/WaveBackground";
import Header from "./component/Header";
import MainBanner from "./component/MainBanner";
// import PhoneList from "./component/PhoneList";
import MainBody from "./component/MainBody";

//@note - 로그인 기능
import Login from "./component/login/Login";
import MemberList from "./component/login/MemberList";
import MemberDetails from "./component/login/MemberDetails";
import MiniGameButtons from "./component/minigame/MiniGameButtons";

import Ads from "./component/Ads";
import Footer from "./component/Footer";

const phoneData = {
  모두: [
    {
      rank: 1,
      name: "갤럭시 와이드7",
      capacity: "128G",
      price: "85,559원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image24.png",
    },
    {
      rank: 2,
      name: "iPhone 16 Pro",
      capacity: "128G | 1T | 256G | 512G",
      price: "137,184원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image25.png",
    },
    {
      rank: 3,
      name: "갤럭시 S24 5G",
      capacity: "512G | 256G",
      price: "120,138원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image26.png",
    },
  ],
  "10대": [
    {
      rank: 1,
      name: "iPhone SE",
      capacity: "64G | 128G",
      price: "55,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image01.png",
    },
    {
      rank: 2,
      name: "Galaxy A13",
      capacity: "128G",
      price: "45,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image02.png",
    },
    {
      rank: 3,
      name: "Galaxy M22",
      capacity: "128G",
      price: "40,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image03.png",
    },
  ],
  "20대": [
    {
      rank: 1,
      name: "iPhone 14",
      capacity: "128G | 256G",
      price: "95,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image04.png",
    },
    {
      rank: 2,
      name: "Galaxy S22",
      capacity: "256G",
      price: "85,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image05.png",
    },
    {
      rank: 3,
      name: "Galaxy Z Flip3",
      capacity: "128G",
      price: "75,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image06.png",
    },
  ],
  "30대": [
    {
      rank: 1,
      name: "iPhone 13 Pro",
      capacity: "128G | 256G",
      price: "105,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image07.png",
    },
    {
      rank: 2,
      name: "Galaxy Note 20",
      capacity: "256G",
      price: "95,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image08.png",
    },
    {
      rank: 3,
      name: "Galaxy S21",
      capacity: "256G",
      price: "85,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image09.png",
    },
  ],
  "40대": [
    {
      rank: 1,
      name: "iPhone 12",
      capacity: "128G",
      price: "75,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image10.png",
    },
    {
      rank: 2,
      name: "Galaxy A52",
      capacity: "128G",
      price: "65,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image11.png",
    },
    {
      rank: 3,
      name: "Galaxy M32",
      capacity: "128G",
      price: "55,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image12.png",
    },
  ],
  "50대": [
    {
      rank: 1,
      name: "Galaxy S20 FE",
      capacity: "128G",
      price: "65,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image13.png",
    },
    {
      rank: 2,
      name: "Galaxy Note 10",
      capacity: "128G",
      price: "55,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image14.png",
    },
    {
      rank: 3,
      name: "Galaxy A71",
      capacity: "128G",
      price: "50,000원/월",
      provider: "GDH 5GX",
      img: "../image/phone/phone image15.png",
    },
  ],
};

const games = [
  {
    id: 1,
    name: "포인트 출석체크",
    img: "./image/pngtree-lucky-wheel-png-image_6518840.png",
    mode: "ATTENDANCE",
  },
  {
    id: 2,
    name: "포인트 룰렛",
    img: "./image/pngtree-lucky-wheel-png-image_6518840.png",
    mode: "ROULETTE",
  },
  {
    id: 3,
    name: "포인트 사다리타기",
    img: "./image/images.png",
    mode: "LADDER",
  },
  {
    id: 4,
    name: "포인트 교환",
    img: "./image/c1fa27f2b5cec238595a9f86b0e8c5c2.png",
    mode: "EXCHANGESHOP",
  },
];

function App() {
  //@note - 서버 위치
  const apiUserUrl = "http://localhost:3000/userList/";
  const apiGameUrl = "http://localhost:3000/gameList/";

  // const [count, setCount] = useState(0);
  const [mode, setMode] = useState("MAIN");
  //  페이지 로딩 상태 체크 state
  const [isLoading, setIsLoading] = useState(true);
  //  에러 메시지 출력을 위한 state
  const [error, setError] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("모두");
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setPhones(phoneData[selectedAgeGroup] || phoneData["모두"]);
  }, [selectedAgeGroup]);

  const handleFilter = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  //@note - 서버로부터 유저 데이터 받아옴
  const fetchUsers = async () => {
    try {
      const response = await fetch(apiUserUrl);
      if (!response.ok) {
        throw new Error("유저 데이터를 받아오지 못했습니다.");
      }

      const users = await response.json();
      setUserList(users);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); //  -> 컴포넌트가 처음 로딩되었을 때의 이펙트 발생

  //@note - 서버로부터 게임 데이터 받아옴
  const fetchGames = async () => {
    try {
      const response = await fetch(apiGameUrl);
      if (!response.ok) {
        throw new Error("게임 데이터를 받아오지 못했습니다.");
      }

      const games = await response.json();
      setGameList(games);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []); //  -> 컴포넌트가 처음 로딩되었을 때의 이펙트 발생

  //@todo - 로딩창을 보여줄려고 하면 에러가 보임 아마 로딩창을 껏다켰다를 반복해서 그런듯
  //        한번에 처리하는 방법으로 바꿔야함
  // if (isLoading) return <div>데이터 로딩 중...</div>;
  // if (error) return <div>에러: {error}</div>;

  let body = null;
  if (mode === "MAIN") {
    //@ todo - 홈페이지 메인 화면
    body = <MainBody phones={phones} ageHandle={handleFilter}></MainBody>;
  } else {
    //@todo - 에러 창 만들기
    body = null;
  }

  // @hs - 로그인 창
  // @todo - 로그인 데이터에 있는 데이터로 로그인 되도록 수정할 예정
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

  // @note - handleMemberClick 함수 추가 (핵심 변경 부분)
  const handleMemberClick = (member) => {
    console.log("handleMemberClick called with:", member); // 이 로그 확인!
    setSelectedMember(member);
    console.log("selectedMember is now:", selectedMember); // 이 로그 확인!
  };

  // @note.hs : 멤버임시데이터
  // ... other states
  const [selectedMember, setSelectedMember] = useState(null);
  // const members = [
  //   {
  //     id: 1,
  //     name: "홍길동",
  //     phone: "010-1111-2222",
  //     role: "vip",
  //     points: 1500,
  //     callUsage: 70,
  //     dataUsage: 30,
  //     photo: "/images/profile1.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 2,
  //     name: "김영희",
  //     phone: "010-3333-4444",
  //     role: "gold",
  //     points: 2200,
  //     callUsage: 20,
  //     dataUsage: 90,
  //     photo: "/images/profile2.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 3,
  //     name: "이철수",
  //     phone: "010-5555-6666",
  //     role: "silver",
  //     points: 800,
  //     callUsage: 50,
  //     dataUsage: 60,
  //     photo: "/image/thumbnail/thumbnail_1.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 4,
  //     name: "박지성",
  //     phone: "010-7777-8888",
  //     role: "vip",
  //     points: 3000,
  //     callUsage: 90,
  //     dataUsage: 10,
  //     photo: "/images/profile4.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 5,
  //     name: "김연아",
  //     phone: "010-9999-0000",
  //     role: "gold",
  //     points: 1800,
  //     callUsage: 60,
  //     dataUsage: 40,
  //     photo: "/images/profile5.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 6,
  //     name: "류현진",
  //     phone: "010-1234-5678",
  //     role: "silver",
  //     points: 1200,
  //     callUsage: 40,
  //     dataUsage: 70,
  //     photo: "/images/profile6.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 7,
  //     name: "손흥민",
  //     phone: "010-8765-4321",
  //     role: "vip",
  //     points: 2500,
  //     callUsage: 80,
  //     dataUsage: 20,
  //     photo: "/images/profile7.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 8,
  //     name: "추신수",
  //     phone: "010-2468-1357",
  //     role: "gold",
  //     points: 2000,
  //     callUsage: 55,
  //     dataUsage: 55,
  //     photo: "/images/profile8.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 9,
  //     name: "박찬호",
  //     phone: "010-1357-2468",
  //     role: "silver",
  //     points: 900,
  //     callUsage: 30,
  //     dataUsage: 80,
  //     photo: "/images/profile9.jpg", // 프로필 사진 추가
  //   },
  //   {
  //     id: 10,
  //     name: "이승엽",
  //     phone: "010-9876-5432",
  //     role: "vip",
  //     points: 2800,
  //     callUsage: 85,
  //     dataUsage: 15,
  //     photo: "/images/profile10.jpg", // 프로필 사진 추가
  //   },
  // ];

  return (
    <div className="App">
      <Header />
      <WaveBackground />
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
          <p>회원 등급: {userData.role === "admin" ? "신" : "일반 회원"}</p>
          <button onClick={handleLogout}>로그아웃</button>
          {isAdmin && (
            <div>
              <button onClick={() => setShowMemberList(true)}>
                회원 목록 보기
              </button>
            </div>
          )}
        </div>
      )}

      {/* MemberList를 로그인 여부와 관계없이 항상 렌더링 */}
      {showMemberList && (
        <MemberList
          members={userList}
          onClose={() => setShowMemberList(false)}
          onSelect={handleMemberClick} // handleMemberClick 함수 전달
        />
      )}

      {/* 기존 멤버 상세 정보 표시 부분 유지 */}
      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)} // 기존 닫기 핸들러 유지
        />
      )}

      {mode === "HISTORY" && <div>상세정보 창입니다</div>}

      {/* @note - 미니게임 버튼 UI */}
      <MiniGameButtons games={gameList}></MiniGameButtons>

      {/* @note - 폰 리스트 나오는 바디 */}
      {body}
      <Ads />
      <Footer />
    </div>
  );
}

export default App;
