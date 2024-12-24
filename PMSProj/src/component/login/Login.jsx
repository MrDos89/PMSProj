// import React, { useState } from "react";
// import "../../App.css";

// function Login({ onLoginSuccess }) {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   // 로그인 처리 함수
//   const handleLogin = () => {
//     // 더미 회원 정보
//     const mockUser = {
//       phone: "010-1234-5678",
//       password: "1234",
//       name: "홍길동",
//       grade: "VIP",
//     };

//     // 로그인 검증
//     if (phone === mockUser.phone && password === mockUser.password) {
//       onLoginSuccess({
//         name: mockUser.name,
//         grade: mockUser.grade,
//         phone: mockUser.phone,
//       });
//     } else {
//       alert("전화번호 또는 비밀번호가 잘못되었습니다.");
//     }
//   };

//   return (
//     <div className="login-form">
//       <input
//         type="text"
//         placeholder="전화번호"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="비밀번호"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>로그인</button>
//     </div>
//   );
// }

// export default Login;
