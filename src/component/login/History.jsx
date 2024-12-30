import React from "react";
import "../../cssall/History.css";

function History({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="history-modal">
      {" "}
      {/* 모달 래퍼 추가 */}
      <div className="history-content">
        {" "}
        {/* 내용 컨테이너 추가 */}
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
        <h3>{member.name} 기록</h3>
        <p>전화번호: {member.phone}</p>
        <p>전화량: {member.callUsage || 0}%</p>
        <p>데이터량: {member.dataUsage || 0}%</p>
        <p>기록 예시: (여기에 기록 내용을 추가하세요)</p>
      </div>
    </div>
  );
}

export default History;
