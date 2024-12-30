import React from "react";
import "../../cssall/History.css";

function History({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="history-modal">
      <div className="history-content">
        <div className="history-header">
          <h3>{member.name}님의 이용 내역</h3>
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
        </div>
        <div className="history-details">
          {member.history && member.history.length > 0 ? (
            <ul>
              {member.history.map((item, index) => (
                <li key={index}>
                  {item.date.toLocaleDateString()}: {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">이용 내역이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
