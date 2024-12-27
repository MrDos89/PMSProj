import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #e0f2f7;
  border-radius: 8px;
  padding: 20px;

  /* react-calendar 스타일 덮어쓰기 */
  .react-calendar {
    width: 100%; /* 캘린더 자체 너비 100% */
    max-width: 100%;
    border: none;
  }
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7개의 동일한 너비 열 생성 */
    grid-gap: 5px; /* 날짜 사이 간격 */
  }
  .react-calendar__tile {
    max-width: 100%; /* 타일 최대 너비 설정 */
    padding: 0.75em 0.5em;
  }
`;

const AttendanceButton = styled.button`
  width: 100%;
  height: 100%;

  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #bbdefb;
    cursor: default;
  }
`;

function Attendance() {
  const [date, setDate] = useState(new Date("2025-01-01"));
  const [mileage, setMileage] = useState(0);
  const [attendedDays, setAttendedDays] = useState({});

  useEffect(() => {
    // 로컬 스토리지에서 출석 정보 불러오기
    const storedAttendance = localStorage.getItem("attendance");
    if (storedAttendance) {
      setAttendedDays(JSON.parse(storedAttendance));
    }
    const storedMileage = localStorage.getItem("mileage");
    if (storedMileage) {
      setMileage(parseInt(storedMileage));
    }
  }, []);

  useEffect(() => {
    // 출석 정보가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem("attendance", JSON.stringify(attendedDays));
    localStorage.setItem("mileage", mileage.toString());
  }, [attendedDays, mileage]);

  const handleDateClick = (clickedDate) => {
    const today = new Date();
    const clickedDateString = clickedDate.toLocaleDateString();
    const todayString = today.toLocaleDateString();

    if (clickedDateString !== todayString) {
      alert("출석체크가 안됩니다.");
      return;
    }

    if (!attendedDays[clickedDateString]) {
      setMileage(mileage + 10);
      setAttendedDays({ ...attendedDays, [clickedDateString]: true });
      alert("출석체크 완료! 10 마일리지가 적립되었습니다.");
    } else {
      alert("이미 출석체크를 완료했습니다.");
    }
  };

  return (
    <>
      <h1>출석체크 이벤트</h1>
      <hr></hr>
      <CalendarContainer>
        <Calendar
          value={date}
          minDate={new Date("2024-01-01")}
          maxDate={new Date("2025-01-31")}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dateString = date.toLocaleDateString();
              return (
                <AttendanceButton
                  onClick={() => handleDateClick(date)}
                  disabled={
                    attendedDays[dateString] ||
                    dateString !== new Date().toDateString()
                  }
                >
                  {date.getDate()}
                </AttendanceButton>
              );
            }
          }}
        />
        <div>현재 마일리지: {mileage}</div>
      </CalendarContainer>
    </>
  );
}

export default Attendance;
