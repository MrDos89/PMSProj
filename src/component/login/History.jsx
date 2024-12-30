import React from "react";
import "../../cssall/History.css";

function History({ member, onClose }) {
  if (!member || !member.history) {
    // member 또는 member.history가 없을 경우 처리
    return (
      <div className="history-modal">
        <div className="history-content">
          <h2>기록 없음</h2> {/* 기록이 없을 경우 메시지 표시 */}
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-modal">
      <div className="history-content">
        <h2>{member.name}님 기록</h2>
        <ul className="history-list">
          {member.history.map((item, index) => (
            <li key={index} className="history-item">
              <span className="history-date">{item.date}</span>
              <span className="history-action">{item.action}</span>
              {item.amount !== undefined && item.amount !== null && (
                <span className="history-amount">{item.amount}</span>
              )}{" "}
              {/* amount가 undefined나 null이 아닐 경우에만 표시 */}
            </li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default History;
