import React from "react";
import "../../cssall/MemberList.css";

function MemberList({ onClose }) {
  const members = [
    { id: 1, name: "홍길동", phone: "010-1111-2222", role: "user" },
    { id: 2, name: "김영희", phone: "010-3333-4444", role: "user" },
    { id: 3, name: "이철수", phone: "010-5555-6666", role: "user" },
  ];

  return (
    <div className="member-list">
      <h2>회원 목록</h2>
      <button className="close-button" onClick={onClose}>
        닫기
      </button>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <p>이름: {member.name}</p>
            <p>전화번호: {member.phone}</p>
            <p>등급: {member.role === "admin" ? "관리자" : "일반 회원"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
