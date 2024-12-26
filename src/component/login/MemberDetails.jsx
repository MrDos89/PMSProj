import React from "react";
import "../../cssall/MemberDetails.css";

function MemberDetails({ member, onClose }) {
  if (!member) {
    return null; // 회원이 선택되지 않으면 아무것도 표시하지 않음
  }

  return (
    <div className="member-details">
      <button className="close-button" onClick={onClose}>
        닫기
      </button>
      <img
        src="https://via.placeholder.com/150"
        alt="회원 사진"
        className="member-photo"
      />
      <div className="member-info">
        <p>이름: {member.name}</p>
        <p>전화번호: {member.phone}</p>
        <p>등급: {member.role === "admin" ? "관리자" : "일반 회원"}</p>
        <p>포인트: {member.points}점</p>
      </div>
      <div className="usage-info">
        <div className="circle-graph">
          <p>통화량: {member.callUsage}%</p>
          <div
            className="circle"
            style={{
              background: `conic-gradient(#007bff ${member.callUsage}%, #eee ${member.callUsage}% 100%)`,
            }}
          ></div>
        </div>
        <div className="circle-graph">
          <p>데이터: {member.dataUsage}%</p>
          <div
            className="circle"
            style={{
              background: `conic-gradient(#28a745 ${member.dataUsage}%, #eee ${member.dataUsage}% 100%)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;
