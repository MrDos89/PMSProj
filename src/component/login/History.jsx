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

  // "user_name": "홍길동",
  // "item_id": 1,
  // "point": 0,
  // "remain_point": 0,
  // "updateDate": "2024-12-30 00:00:00"

  return (
    <div className="history-modal">
      <div className="history-content">
        <h2>{member.name}님 기록</h2>
        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>이름</th>
                <th>아이템 ID</th>
                <th>포인트</th>
                <th>남은 포인트</th>
              </tr>
            </thead>
            <tbody>
              {member.history.map((item, index) => (
                <tr key={index}>
                  <td>{item.updateDate}</td>
                  <td>{item.user_name}</td>
                  <td>
                    {item.item_id === 3
                      ? "HA.MI 돈카츠 할인권"
                      : item.item_id === 2
                      ? "집게리아 할인권"
                      : item.item_id === 1
                      ? "4조 카페 할인권"
                      : "분류없음"}
                  </td>
                  <td>{item.point}</td>
                  <td>{item.remain_point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* amount가 undefined나 null이 아닐 경우에만 표시 */}
        {/* <ul className="history-list">
          {member.history.map((item, index) => (
            <li key={index} className="history-item">
              <span className="history-date">[{item.updateDate}] </span>
              <span className="history-action">{item.user_name} </span>
              <span className="history-action">{item.item_id} </span>
              <span className="history-action">{item.point} </span>
              <span className="history-action">{item.remain_point}</span>
              {item.amount !== undefined && item.amount !== null && (
                <span className="history-amount">{item.amount}</span>
              )}{" "}
            </li>
          ))}
        </ul> */}
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default History;
