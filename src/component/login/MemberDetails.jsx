import React, { useState, useEffect } from "react";
import "../../cssall/MemberDetails.css";
import History from "./History"; // 기록 보기 컴포넌트 추가

function MemberDetails({ member, onClose, onUpdate }) {
  const initialMember = member || {}; // member가 null일 경우 빈 객체로 초기화
  const [updatedMember, setUpdatedMember] = useState({ ...initialMember });
  const [pointInput, setPointInput] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // 기록 보기 상태 추가

  const handleRoleChange = (event) => {
    setUpdatedMember({ ...updatedMember, role: event.target.value });
  };

  useEffect(() => {
    console.log("MemberDetails useEffect triggered with:", member); // 이 로그 확인!
    setUpdatedMember(member ? { ...member } : {}); // member가 null일 경우 빈 객체 설정
  }, [member]);

  const handlePointChange = (amount) => {
    const parsedAmount = parseInt(pointInput);
    if (isNaN(parsedAmount)) {
      alert("숫자를 입력해주세요.");
      return;
    }
    setUpdatedMember({
      ...updatedMember,
      point: (updatedMember.point || 0) + amount * parsedAmount,
    });
    setPointInput("");
  };

  const handleSave = () => {
    onUpdate(updatedMember);
    alert("저장되었습니다."); // 저장 알림 추가
    onClose();
  };

  return (
    <div className="member-details">
      <button className="close-button" onClick={onClose}>
        닫기
      </button>
      {/* member가 있을 때만 이미지를 렌더링하고, 기본 이미지와 alt 텍스트 제공 */}
      {member && (
        <img
          src={updatedMember.photo || "/images/default_profile.png"}
          alt={updatedMember.name || "프로필 사진"}
          className="member-photo"
        />
      )}
      <h2>{updatedMember.name}</h2>
      <p>전화번호: {updatedMember.phone}</p>
      <p>전화량: {updatedMember.callUsage || 0}%</p>
      <p>데이터량: {updatedMember.dataUsage || 0}%</p>
      <p>
        등급:
        <select
          value={updatedMember.role}
          onChange={handleRoleChange}
          className="role-dropdown"
        >
          <option value="vip">VIP</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
        </select>
      </p>
      <p>포인트: {updatedMember.point || 0}</p>
      <div className="point-management">
        {/* 포인트 관리 영역 */}
        <input
          type="number"
          value={pointInput}
          onChange={(e) => setPointInput(e.target.value)}
          placeholder="포인트 입력"
          className="point-input"
        />
        <button onClick={() => handlePointChange(1)} className="point-button">
          후원
        </button>
        <button onClick={() => handlePointChange(-1)} className="point-button">
          강탈
        </button>
      </div>
      <button className="save-button bottom-right" onClick={handleSave}>
        저장
      </button>

      {/* 기록 보기 버튼 */}
      <button className="history-button" onClick={() => setIsHistoryOpen(true)}>
        기록 보기
      </button>

      {/* 기록 창 */}
      {isHistoryOpen && (
        <History
          member={updatedMember} // 현재 수정된 멤버 정보 전달
          onClose={() => setIsHistoryOpen(false)} // 기록 보기 닫기 핸들러
        />
      )}
    </div>
  );
}

export default MemberDetails;
