// 주석 예시
// @TODO : 작업할 예정
// @NOTE : 주석 설명
// @TEMP : 임시 기능

//@note - 메인 기능
import React, { useState, useEffect } from "react";
import "./App.css";
import db from "../db.json";

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

function App() {
  //@note - 서버 위치
  const apiUserUrl = "http://localhost:3000/userList/";
  const apiPhoneUrl = "http://localhost:3000/phoneList/";
  const apiGameUrl = "http://localhost:3000/gameList/";

  // const [count, setCount] = useState(0);
  const [mode, setMode] = useState("MAIN");
  //  페이지 로딩 상태 체크 state
  const [isLoading, setIsLoading] = useState(true);
  //  에러 메시지 출력을 위한 state
  const [error, setError] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("모두");
  const [phones, setPhones] = useState([]);
  const [userGrade, setUserGrade] = useState("일반 회원");

  //  API에서 목록 받아오는 함수
  const fetchPhones = async () => {
    try {
      const response = await fetch(apiPhoneUrl);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      // console.log(data);
      setPhoneList(data);
      setIsLoading(false); //  로딩이 끝났음을 알림
    } catch (err) {
      // console.error(err);
      setError(err.message);
      setIsLoading(false); //  로딩이 끝남
    }
  };
  useEffect(() => {
    fetchPhones();
  }, []); //  -> 컴포넌트가 처음 로딩되었을 때의 이펙트 발생

  useEffect(() => {
    let currentPhoneGroup = [];

    switch (selectedAgeGroup) {
      case "모두":
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 1);
        break;
      case "10대":
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 2);
        break;
      case "20대":
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 3);
        break;
      case "30대":
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 4);
        break;
      case "40대":
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 5);
        break;
      case "50대":
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 6);
        break;
      default:
        currentPhoneGroup = phoneList.filter((phone) => phone.categoryId === 1);
        break;
    }
    setPhones(currentPhoneGroup);
  }, [selectedAgeGroup, phoneList]);

  const handleFilter = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  // db.json 로딩 로직 (fetch 사용)
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setUserList(data.userList))
      .catch((error) => console.error("Error loading db.json:", error));
  }, []);

  const handleUpdate = (updatedMember) => {
    // userList 상태 업데이트
    setUserList(
      userList.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    if (userData && userData.id === updatedMember.id) {
      setUserData(updatedMember);
    }
    setSelectedMember(updatedMember);
    // db.json 업데이트 (선택적)
    fetch("/db.json", {
      method: "PUT", //또는 PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userList: userList.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        ),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error updating db.json:", error));
  };

  // //@note - 서버로부터 유저 데이터 받아옴
  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch(apiUserUrl);
  //     if (!response.ok) {
  //       throw new Error("유저 데이터를 받아오지 못했습니다.");
  //     }

  //     const users = await response.json();
  //     setUserList(users);
  //     setIsLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setIsLoading(false);
  //   }
  // };

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태
  const [userData, setUserData] = useState(null); // 사용자 데이터 저장
  const [showMemberList, setShowMemberList] = useState(false); // 회원 목록 창 표시 여부
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 회원

  const handleLogin = (user) => {
    // Login 컴포넌트에서 호출될 로그인 핸들러
    setIsLoggedIn(true);
    setUserData(user);

    if (user.grade === 3) {
      setUserGrade("VIP 회원");
    } else if (user.grade === 2) {
      setUserGrade("GOLD 회원");
    } else if (user.grade === 1) {
      setUserGrade("SILVER 회원");
    } else {
      setUserGrade("일반 회원");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setShowMemberList(false);
  };

  const isAdmin = userData?.isAdmin; // isAdmin으로 변경

  // @note - handleMemberClick 함수 추가 (핵심 변경 부분)
  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

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
      <Login /> {/* 로그인 컴포넌트 */}
      {/* @note - 로그인 상태에 따른 렌더링 */}
      {!isLoggedIn ? (
        <Login userList={userList} onLogin={handleLogin} />
      ) : (
        <div className="login-container">
          {/* ... (로그인 후 프로필 정보) */}
          <h2>프로필</h2>
          <img
            src={userData.photo || "https://via.placeholder.com/100"}
            alt="프로필 사진"
            className="profile-picture"
          />
          <p>이름: {userData.name}</p>
          <p>전화번호: {userData.phone}</p>
          <p>회원 등급: {userData.isAdmin ? "신" : userGrade}</p>
          <p>마일리지: {userData.points} </p>
          <button onClick={handleLogout}>로그아웃</button>
          {/* @note - 관리자 권한인 경우 회원 목록 보기 버튼 표시 */}
          {isAdmin && (
            <div>
              <button onClick={() => setShowMemberList(true)}>
                회원 목록 보기
              </button>
            </div>
          )}
        </div>
      )}
      {/* @note - 회원 목록 컴포넌트 */}
      {showMemberList && (
        <MemberList
          members={userList}
          onClose={() => setShowMemberList(false)}
          onSelect={setSelectedMember}
        />
      )}
      {/* @note - 회원 상세 정보 컴포넌트 */}
      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onUpdate={handleUpdate}
        />
      )}
      {mode === "HISTORY" && <div>상세정보 창입니다</div>}
      {/* @note - 미니게임 버튼 UI */}
      <MiniGameButtons games={gameList} userData={userData}></MiniGameButtons>
      {/* @note - 폰 리스트 나오는 바디 */}
      {body}
      <Ads />
      <Footer />
    </div>
  );
}

export default App;
