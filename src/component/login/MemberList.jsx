import React from "react";
import "../../cssall/MemberList.css";

function MemberList({ members, onClose, onSelect }) {
  return (
    <div className="member-list">
      <h2>회원 목록</h2>
      <button onClick={onClose}>닫기</button>
      <ul>
        {members.map((member) => (
          <li key={member.id} onClick={() => onSelect(member)}>
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
