import React, { useState, useEffect } from "react";
import "../../cssall/MemberDetails.css";
import History from "./History"; // 기록 보기 컴포넌트 추가

function MemberDetails({ member, onClose, onUpdate }) {
  const apiUserUrl = "http://localhost:3000/userList/";

  const initialMember = member || {}; // member가 null일 경우 빈 객체로 초기화
  const [updatedMember, setUpdatedMember] = useState({ ...initialMember });
  const [pointInput, setPointInput] = useState("");
  const [tempPoints, setTempPoints] = useState(null); // 포인트 값 화면에 보이기 상태 추가
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // 기록 보기 상태 추가

  useEffect(() => {
    setUpdatedMember(member ? { ...member } : {});
    setTempPoints(null); // member prop이 변경될 때 임시 포인트 초기화
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
      return;
    }

    const parsedAmount = parseInt(pointInput, 10);
    if (isNaN(parsedAmount) || parsedAmount === 0) {
      alert("0이 아닌 숫자를 입력해주세요.");
      setPointInput("");
      return;
    }

    // 임시 포인트 값 계산 및 저장
    setTempPoints((updatedMember.points || 0) + amount * parsedAmount);
    setPointInput("");
  };

  const handleSave = async () => {
    try {
      let pointsToUpdate; // 변수 선언 위치 수정

      if (tempPoints !== null) {
        pointsToUpdate = tempPoints;
      } else {
        pointsToUpdate = updatedMember.points || 0; // updatedMember.points가 undefined일 경우 0으로 설정
      }

      const requestUrl = `${apiUserUrl}${updatedMember.id}`;
      console.log("Request URL:", requestUrl);

      // @node: pointsToUpdate를 사용하여 updatedMember의 points를 업데이트한 후 전송
      const updatedMemberToSend = { ...updatedMember, points: pointsToUpdate };
      console.log("Sending to server:", updatedMemberToSend); // 추가: 전송 데이터 확인 나중에빼기

      const response = await fetch(requestUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMemberToSend), // updatedMemberToSend 전송 (등급 포함)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(`저장 실패: ${response.status} ${response.statusText}`);
      }

      const updatedData = await response.json();
      console.log("API Response Data:", updatedData);
      setUpdatedMember(updatedData);
      onUpdate(updatedData);
      setTempPoints(null);
      alert("저장되었습니다.");
      onClose();
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
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
            <p>
              포인트:
              {tempPoints !== null ? tempPoints : updatedMember.points || 0}
            </p>
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
