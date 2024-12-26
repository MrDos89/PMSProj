import React from "react";
import "../../cssall/MemberList.css";

function MemberList({ members, onSelect }) {
  return (
    <div className="member-list">
      <h2>회원 목록</h2>
      <ul>
        {(members ?? []).map((member) => (
          <li
            key={member.id}
            onClick={() => onSelect(member)}
            style={{ cursor: "pointer" }}
          >
            {member.name} ({member.phone})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
