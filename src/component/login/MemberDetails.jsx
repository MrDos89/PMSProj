import React, { useState, useEffect } from "react";
import "../../cssall/MemberDetails.css";
import History from "./History"; // 기록 보기 컴포넌트 추가

function MemberDetails({ member, onClose, onUpdate }) {
  const initialMember = member || {}; // member가 null일 경우 빈 객체로 초기화
  const [updatedMember, setUpdatedMember] = useState({ ...initialMember });
  const [pointInput, setPointInput] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // 기록 보기 상태 추가

  useEffect(() => {
    // member가 유효할 때만 상태 업데이트
    if (member) {
      setUpdatedMember({ ...member });
    } else {
      setUpdatedMember({}); // member가 null이나 undefined일 경우 빈 객체로 설정
    }
  }, [member]);

  const handleRoleChange = (event) => {
    setUpdatedMember({
      ...updatedMember,
      grade: parseInt(event.target.value, 10),
    });
  };

  useEffect(() => {
    console.log("MemberDetails useEffect triggered with:", member); // 이 로그 확인!
    setUpdatedMember(member ? { ...member } : {}); // member가 null일 경우 빈 객체 설정
  }, [member]);

  const handlePointChange = (amount) => {
    if (!pointInput) {
      // 빈 문자열일 경우 처리
      return; //아무것도 입력하지 않았을때는 그냥 리턴
    }

    const parsedAmount = parseInt(pointInput, 10);
    if (isNaN(parsedAmount) || parsedAmount === 0) {
      // 숫자가 아니거나 0일 경우 알림
      alert("0이 아닌 숫자를 입력해주세요.");
      setPointInput(""); // 입력 필드 초기화
      return;
    }

    setUpdatedMember({
      ...updatedMember,
      point: (updatedMember.points || 0) + amount * parsedAmount,
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
      {updatedMember &&
        updatedMember.name && ( // updatedMember가 유효할 때만 내용 렌더링
          <>
            {" "}
            {/* Fragment 사용 */}
            <div className="member-photo-details">
              <img
                src={updatedMember.photo || "/images/default_profile.png"}
                alt={updatedMember.name + " 프로필"} // alt 텍스트 개선
                className="profile-image-details"
              />
            </div>
            <h2>{updatedMember.name}</h2>
            <p>전화번호: {updatedMember.phone}</p>
            <p>전화량: {updatedMember.callUsage || 0}%</p>
            <p>데이터량: {updatedMember.dataUsage || 0}%</p>
            <p>
              등급:
              <select
                value={updatedMember.grade}
                onChange={handleRoleChange}
                className="grade-dropdown"
              >
                <option value={3}>VIP</option>
                <option value={2}>Gold</option>
                <option value={1}>Silver</option>
              </select>
            </p>
            <p>포인트: {updatedMember.points || 0}</p>
            <div className="point-management">
              <input
                type="number"
                value={pointInput}
                onChange={(e) => setPointInput(e.target.value)}
                placeholder="포인트 입력"
                className="point-input"
              />
              <button
                onClick={() => handlePointChange(1)}
                className="point-button"
              >
                후원
              </button>
              <button
                onClick={() => handlePointChange(-1)}
                className="point-button"
              >
                강탈
              </button>
            </div>
            <button className="save-button bottom-right" onClick={handleSave}>
              저장
            </button>
            <button
              className="history-button"
              onClick={() => setIsHistoryOpen(true)}
            >
              기록 보기
            </button>
            {isHistoryOpen && (
              <History
                member={updatedMember}
                onClose={() => setIsHistoryOpen(false)}
              />
            )}
          </>
        )}
    </div>
  );
}

export default MemberDetails;
