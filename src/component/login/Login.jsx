import React, { useState } from "react";
import "../../cssall/Login.css";

function Login({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const [user, setUser] = useState(null); // 로그인된 사용자 정보 저장

  const handleSubmit = (e) => {
    e.preventDefault();

    // 관리자 계정
    const adminAccount = {
      phone: "admin123",
      password: "admin123",
      name: "관리자",
      role: "admin",
    };

    // 일반 사용자 계정
    const userAccount = {
      phone: "user123",
      password: "user123",
      name: "사용자",
      role: "user",
    };

    if (phone === adminAccount.phone && password === adminAccount.password) {
      setUser(adminAccount);
      setIsLoggedIn(true);
      onLogin(adminAccount);
    } else if (
      phone === userAccount.phone &&
      password === userAccount.password
    ) {
      setUser(userAccount);
      setIsLoggedIn(true);
      onLogin(userAccount);
    } else {
      alert("전화번호나 비밀번호를 확인해주세요.");
      setError("전화번호나 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className={`login-container ${isLoggedIn ? "hidden" : ""}`}>
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
            src="https://via.placeholder.com/100"
            alt="프로필 사진"
            className="profile-image"
          />
          <p>이름: {user.name}</p>
          <p>전화번호: {user.phone}</p>
          <p>회원 등급: {user.role === "admin" ? "신" : "일반 회원"}</p>
          <button onClick={() => setIsLoggedIn(false)}>로그아웃</button>
        </div>
      )}
    </div>
  );
}

export default Login;
