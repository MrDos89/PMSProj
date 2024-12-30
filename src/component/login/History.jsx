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
        <h3>{member.name} 너가 뭘했는지 난 알고있다</h3>
      </div>
    </div>
  );
}

export default History;
