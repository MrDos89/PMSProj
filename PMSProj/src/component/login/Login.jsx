import React, { useState } from "react";
import "../../cssall/Login.css";

function Login({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 관리자 계정
    const adminAccount = {
      phone: "010-1234-5678",
      password: "admin123",
      name: "관리자",
      role: "admin",
    };

    // 일반 사용자 계정
    const userAccount = {
      phone: "010-9876-5432",
      password: "user123",
      name: "사용자",
      role: "user",
    };

    if (phone === adminAccount.phone && password === adminAccount.password) {
      onLogin(adminAccount);
    } else if (
      phone === userAccount.phone &&
      password === userAccount.password
    ) {
      onLogin(userAccount);
    } else {
      setError("전화번호나 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">로그인</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
