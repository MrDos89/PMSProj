import React, { useState } from "react";
import "../../cssall/Login.css";

function Login({ userList, onLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const [user, setUser] = useState(null); // 로그인된 사용자 정보 저장
  const [userGrade, setUserGrade] = useState("일반 회원"); // 사용자 등급

  // @note - 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // @note - 폼 기본 제출 동작 방지
    setError("");

    // db.json의 userList에서 사용자 찾기
    const foundUser = userList.find(
      (u) => u.phone === phone && u.password === password
    );

    // @note - 사용자를 찾은 경우
    if (foundUser) {
      setUser(foundUser); // 사용자 정보 저장
      setIsLoggedIn(true); //로그인 상태 true로 변경
      localStorage.setItem("loggedInUserPhone", foundUser.phone); // 전화번호 저장
      onLogin(foundUser); // App.jsx로 사용자 정보 전달
      // @note - 사용자 등급 설정
      if (foundUser.grade === 3) {
        setUserGrade("VIP 회원");
      } else if (foundUser.grade === 2) {
        setUserGrade("GOLD 회원");
      } else if (foundUser.grade === 1) {
        setUserGrade("SILVER 회원");
      } else {
        setUserGrade("일반 회원");
      }
    } else {
      alert("전화번호나 비밀번호를 확인해주세요.");
      setError("전화번호나 비밀번호를 확인해주세요.");
    }
  };

  return (
    // @note - 로그인 컨테이너, 로그인 상태에 따라 hidden 클래스 추가/제거
    <div className={`login-container ${isLoggedIn ? "hidden" : ""}`}>
      {/* @note - 로그인되지 않은 경우 로그인 폼 표시 */}
      {!isLoggedIn ? (
        <div className="login-form-wrapper">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="전화번호"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-large"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-large"
            />
            <button type="submit">로그인</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="profile-container profile-active">
          <h2>프로필</h2>
          <img
            src={user.photo || "https://via.placeholder.com/100"} // photo 연결, 기본 이미지 설정
            alt="프로필 사진"
            className="profile-image"
          />
          {/* @note - 사용자 정보 표시 */}
          <p>이름: {user.name}</p>
          <p>전화번호: {user.phone}</p>
          <p>회원 등급: {user.isAdmin ? "신" : userGrade}</p>
          {/* isAdmin으로 변경 */}
          <button onClick={() => setIsLoggedIn(false)}>로그아웃</button>
        </div>
      )}
    </div>
  );
}

export default Login;
