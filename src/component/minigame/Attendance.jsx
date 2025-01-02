import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import PropTypes from "prop-types";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #e3f2fd;
  border-radius: 8px;
  padding: 20px;

  .react-calendar {
    width: 100%;
    border: none;
  }

  .react-calendar__tile {
    position: relative;
    display: flex;
    flex-direction: column; /* 날짜와 버튼을 세로 정렬 */
    align-items: center;
    justify-content: center;
    padding: 10px 0; /* 타일 내부 여백 */
  }

  .react-calendar__tile > span {
    margin-bottom: 8px; /* 날짜와 버튼 사이 여백 */
    font-size: 14px;
    color: #333;
  }
`;

const AttendanceButton = styled.button`
  width: 80%;
  height: 35px; /* 버튼 높이 조정 */
  background-color: ${(props) => (props.disabled ? "#bbdefb" : "#2196f3")};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#bbdefb" : "#1e88e5")};
  }
`;

function Attendance() {
  const apiUserUrl = "http://localhost:3000/userList/";
  const [member, setMember] = useState(null);
  const [mileage, setMileage] = useState(0);
  const [attendedDays, setAttendedDays] = useState({});
  const todayString = new Date().toLocaleDateString();
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [userPoints, setUserPoints] = useState(0);

  // ✅ 초기 로드 시 회원 정보 복구
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUserPhone = localStorage.getItem("loggedInUserPhone");
        if (!loggedInUserPhone) {
          console.error("⚠️ 로그인된 회원의 전화번호를 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/userList");
        if (!response.ok) {
          throw new Error("⚠️ 회원 데이터를 가져오는 데 실패했습니다.");
        }

        const userList = await response.json();
        const foundMember = userList.find(
          (user) => user.phone === loggedInUserPhone
        );

        if (foundMember) {
          setMember(foundMember); // 회원 정보 저장
          setUserPoints(foundMember.points); // 포인트 설정
        } else {
          console.error("⚠️ 로그인된 회원 정보를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("⚠️ 회원 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchLoggedInUser();
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};
    const storedMileage = parseInt(localStorage.getItem("mileage")) || 0;

    setAttendedDays(storedAttendance);
    setMileage(storedMileage);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendedDays));
    localStorage.setItem("mileage", mileage.toString());
  }, [attendedDays, mileage]);

  const sendRequest = useCallback(
    async (resultPoint) => {
      try {
        if (!member) {
          console.error("⚠️ 회원 정보가 로드되지 않았습니다.");
          return;
        }

        const requestUrl = `${apiUserUrl}${member.id}`; // 올바른 URL 생성
        console.log("Request URL:", requestUrl); // 요청 URL 출력 (디버깅)

        const response = await fetch(requestUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // 요청 본문의 데이터 형식을 JSON으로 지정
          },
          body: JSON.stringify({
            points: Number(member.points) + Number(resultPoint || 0), // 업데이트할 포인트 값
          }),
        });

        if (!response.ok) {
          const errorData = await response.json(); // 서버에서 보낸 에러 데이터를 JSON 형태로 파싱
          console.error("API Error Response:", errorData);
          throw new Error(
            `포인트 업데이트 실패: ${response.status} ${response.statusText}`
          );
        }

        setUserPoints(Number(member.points) + Number(resultPoint));

        const updatedData = await response.json();
        console.log("API Response Data:", updatedData); // 응답 데이터 출력 (디버깅)
        // alert(`${resultPoint} 포인트를 획득하였습니다!`); // 성공 메시지 추가
      } catch (error) {
        console.error("포인트 업데이트 실패:", error);
        // alert("포인트 업데이트에 실패했습니다.");
      }
    },
    [apiUserUrl, member]
  );

  const handleDateClick = useCallback(
    (clickedDate) => {
      const clickedDateString = clickedDate.toLocaleDateString();

      if (clickedDateString !== todayString) {
        alert("출석체크는 오늘만 가능합니다.");
        return;
      }

      if (!attendedDays[clickedDateString]) {
        setMileage((prev) => prev + 10);
        setAttendedDays((prev) => ({ ...prev, [clickedDateString]: true }));
        alert("출석체크 완료! 10 마일리지가 적립되었습니다.");

        sendRequest(10);
      } else {
        alert("이미 출석체크를 완료했습니다.");
      }
    },
    [attendedDays, todayString, sendRequest]
  );

  const renderTileContent = useCallback(
    ({ date, view }) => {
      if (view !== "month") return null;

      const isToday = date.toLocaleDateString() === todayString;
      const isAttended = attendedDays[date.toLocaleDateString()];

      return (
        <>
          <AttendanceButton
            onClick={(e) => {
              e.preventDefault();
              handleDateClick(date);
            }}
            disabled={
              isAttended || !isToday // 오늘만 활성화
            }
          >
            출석
          </AttendanceButton>
        </>
      );
    },
    [attendedDays, handleDateClick, todayString]
  );

  return (
    <>
      {loading ? (
        <p>로딩 중...</p>
      ) : !member ? (
        <p>회원 정보를 불러올 수 없습니다.</p>
      ) : (
        <>
          <div className="member-info">
            <img
              src={member.photo}
              alt={`${member.name} 프로필`}
              className="profile-image"
            />
            <div className="text-info">
              <p>
                <strong>이름:</strong> {member.name}
              </p>
              <p>
                <strong>전화번호:</strong> {member.phone}
              </p>
              <p>
                <strong>등급:</strong>{" "}
                {member.isAdmin
                  ? "신"
                  : member.grade === 3
                  ? "VIP 회원"
                  : member.grade === 2
                  ? "GOLD 회원"
                  : member.grade === 1
                  ? "SILVER 회원"
                  : "일반 회원"}
              </p>
              <p className="point">
                <strong>포인트:</strong> {userPoints} point
              </p>
            </div>
          </div>
          <hr />
          <h1 style={{ textAlign: "center", color: "#1976d2" }}>
            출석체크 이벤트
          </h1>
          <CalendarContainer>
            <Calendar
              minDate={new Date("2024-01-01")}
              maxDate={new Date("2025-01-31")}
              tileContent={renderTileContent}
            />
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#0d47a1",
              }}
            >
              현재 마일리지: <strong>{mileage}</strong>
            </div>
          </CalendarContainer>
        </>
      )}
    </>
  );
}

export default Attendance;
