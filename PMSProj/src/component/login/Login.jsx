import React, { useState } from "react";
import "../../cssall/Login.css"; // 스타일링을 위한 CSS 파일

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 더미 회원 정보
  const mockUser = {
    phone: "010-1234-5678",
    password: "1234",
    name: "홍길동",
    grade: "VIP",
    profileImage: "https://via.placeholder.com/100", // 임시 프로필 이미지
  };

  // 로그인 처리
  const handleLogin = () => {
    if (phone === mockUser.phone && password === mockUser.password) {
      setIsLoggedIn(true);
      setUserInfo(mockUser);
      setErrorMessage("");
    } else {
      setErrorMessage("비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="profile-container">
          <img
            src={userInfo.profileImage}
            alt="프로필 사진"
            className="profile-image"
          />
          <h2>{userInfo.name}</h2>
          <p>전화번호: {userInfo.phone}</p>
          <p>회원 등급: {userInfo.grade}</p>
        </div>
      ) : (
        <div className="login-form">
          <h3>로그인</h3>
          <input
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
