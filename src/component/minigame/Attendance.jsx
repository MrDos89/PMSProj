import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

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
  const [mileage, setMileage] = useState(0);
  const [attendedDays, setAttendedDays] = useState({});
  const todayString = new Date().toLocaleDateString();

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
      } else {
        alert("이미 출석체크를 완료했습니다.");
      }
    },
    [attendedDays, todayString]
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
      <h1 style={{ textAlign: "center", color: "#1976d2" }}>출석체크 이벤트</h1>
      <CalendarContainer>
        <Calendar
          minDate={new Date("2024-01-01")}
          maxDate={new Date("2025-01-31")}
          tileContent={renderTileContent}
        />
        <div
          style={{ marginTop: "20px", textAlign: "center", color: "#0d47a1" }}
        >
          현재 마일리지: <strong>{mileage}</strong>
        </div>
      </CalendarContainer>
    </>
  );
}

export default Attendance;
