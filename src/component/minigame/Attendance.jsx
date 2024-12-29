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

  .react-calendar {
    width: 100%;
    max-width: 100%;
    border: none;
  }
  .react-calendar__tile {
    position: relative;
    padding: 0.5em;
  }
`;

const AttendanceButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #bbdefb;
    cursor: default;
  }
`;

function Attendance() {
  const [mileage, setMileage] = useState(0);
  const [attendedDays, setAttendedDays] = useState({});
  const todayString = new Date().toLocaleDateString();

  useEffect(() => {
    const storedAttendance = localStorage.getItem("attendance");
    if (storedAttendance) setAttendedDays(JSON.parse(storedAttendance));

    const storedMileage = localStorage.getItem("mileage");
    if (storedMileage) setMileage(parseInt(storedMileage));
  }, []);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendedDays));
    localStorage.setItem("mileage", mileage.toString());
  }, [attendedDays, mileage]);

  const handleDateClick = (clickedDate) => {
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
  };

  const isSameDay = (date1, date2) =>
    date1.toLocaleDateString() === date2.toLocaleDateString();

  return (
    <>
      <h1>출석체크 이벤트</h1>
      <CalendarContainer>
        <Calendar
          minDate={new Date("2024-01-01")}
          maxDate={new Date("2025-01-31")}
          tileContent={({ date, view }) =>
            view === "month" && (
              <AttendanceButton
                onClick={(e) => {
                  e.preventDefault(); // 이벤트 버블링 방지
                  handleDateClick(date);
                }}
                disabled={
                  attendedDays[date.toLocaleDateString()] ||
                  !isSameDay(date, new Date())
                }
              >
                {date.getDate()}
              </AttendanceButton>
            )
          }
        />
        <div>현재 마일리지: {mileage}</div>
      </CalendarContainer>
    </>
  );
}

export default Attendance;
