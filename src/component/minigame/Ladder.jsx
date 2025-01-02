import React, { useState, useEffect, useRef, useCallback } from "react";
import "../../cssall/Ladder.css";

import PropTypes from "prop-types";

function Ladder({ userData }) {
  const apiUserUrl = "http://localhost:3000/userList/";

  const [participants, setParticipants] = useState([]);
  const [ladder, setLadder] = useState([]);
  const [result, setResult] = useState(null);
  const [currentStart, setCurrentStart] = useState(null);

  // const [numParticipantsInput, setNumParticipantsInput] = useState("");
  const [start, setStart] = useState(null);
  const [highlightPath, setHighlightPath] = useState(null);
  const ladderRef = useRef(null);

  useEffect(() => {
    const initLadder = () => {
      const newParticipants = Array.from(
        { length: 6 },
        (_, i) =>
          `${
            i * Math.round(Math.random() * 10 + 1) +
            Math.round(Math.random() * 5)
          }`
      );
      setParticipants(newParticipants);
    };

    initLadder();
  }, []);

  const sendRequest = useCallback(
    async (resultPoint) => {
      try {
        const requestUrl = `${apiUserUrl}${userData.id}`; // 올바른 URL 생성
        console.log("Request URL:", requestUrl); // 요청 URL 출력 (디버깅)

        const response = await fetch(requestUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // 요청 본문의 데이터 형식을 JSON으로 지정
          },
          body: JSON.stringify({
            points: Number(userData.points) + Number(resultPoint || 0), // 업데이트할 포인트 값
          }),
        });

        if (!response.ok) {
          const errorData = await response.json(); // 서버에서 보낸 에러 데이터를 JSON 형태로 파싱
          console.error("API Error Response:", errorData);
          throw new Error(
            `포인트 업데이트 실패: ${response.status} ${response.statusText}`
          );
        }

        const updatedData = await response.json();
        console.log("API Response Data:", updatedData); // 응답 데이터 출력 (디버깅)
        alert(`${resultPoint} 포인트를 획득하였습니다!`); // 성공 메시지 추가
      } catch (error) {
        console.error("포인트 업데이트 실패:", error);
        alert("포인트 업데이트에 실패했습니다.");
      }
    },
    [apiUserUrl, userData, participants, result]
  );

  const generateLadder = (startIndex) => {
    const numParticipants = 6;

    const newLadder = [];
    for (let i = 0; i < numParticipants * 2; i++) {
      newLadder.push(Array(numParticipants - 1).fill(false));
    }

    for (let i = 0; i < newLadder.length; i++) {
      let connected = new Array(numParticipants - 1).fill(false);
      for (let j = 0; j < newLadder[0].length; j++) {
        if (Math.random() < 0.3 && !newLadder[i][j] && !connected[j]) {
          newLadder[i][j] = true;
          connected[j] = true;
          if (j + 1 < newLadder[0].length) {
            connected[j + 1] = true;
          }
        }
      }
    }

    setLadder(newLadder);
    setResult(null);
    setHighlightPath(null);
    setCurrentStart(startIndex); // 시작 인덱스를 저장

    document.documentElement.style.setProperty(
      "--num-participants",
      numParticipants
    );
  };

  const renderParticipantsBottom = () => {
    return (
      <div className="participants bottom">
        {participants.map(
          (
            p,
            i // newParticipants를 사용해야 함
          ) => (
            <div key={i} className="participant">
              <button
                onClick={() => {
                  if (ladder.length === 0) {
                    // setStart(i);
                    generateLadder(i); // key 값(i)을 generateLadder에 전달
                  } else {
                    runLadder(i);
                  }
                }}
              >
                시작
              </button>
            </div>
          )
        )}
      </div>
    );
  };

  const runLadder = useCallback(
    async (startIndex) => {
      if (!ladderRef.current) return;

      let current = startIndex;
      const path = [];
      const ladderElement = ladderRef.current;

      const rowHeight = ladderElement.offsetHeight / ladder.length;
      const segmentWidth = ladderElement.offsetWidth / participants.length;

      // 시작점
      path.push({ x: current * segmentWidth, y: 0 });

      for (let i = 0; i < ladder.length; i++) {
        const prevX = current;

        // 오른쪽으로 이동
        if (current < ladder[i].length && ladder[i][current]) {
          current++;
        }
        // 왼쪽으로 이동
        else if (current > 0 && ladder[i][current - 1]) {
          current--;
        }

        // 이동 경로 계산
        if (prevX !== current) {
          path.push({ x: prevX * segmentWidth, y: i * rowHeight + 12 });
          path.push({ x: current * segmentWidth, y: i * rowHeight + 12 });
        }

        // 세로선 경로
        path.push({ x: current * segmentWidth, y: (i + 1) * rowHeight + 12 });
      }

      setResult(current);
      setHighlightPath({ start: startIndex, end: current, path });

      // 서버로 데이터 전송
      sendRequest(participants[current]);
    },
    [ladder, participants.length, sendRequest]
  );

  useEffect(() => {
    if (ladder.length > 0 && currentStart !== null) {
      runLadder(currentStart);
      setCurrentStart(null); // 초기화
    }
  }, [ladder, currentStart, runLadder]);

  const drawHighlight = () => {
    if (!highlightPath || !ladderRef.current || !highlightPath.path)
      return null;

    const pathData = highlightPath.path
      .map((point, index) => {
        return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
      })
      .join(" ");

    return (
      <svg
        className="highlight-svg"
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <path d={pathData} stroke="yellow" strokeWidth="4" fill="none" />
      </svg>
    );
  };

  useEffect(() => {
    if (participants.length > 0) {
      document.documentElement.style.setProperty(
        "--num-participants",
        participants.length
      );
    }
  }, [participants]);

  return (
    <div className="ladderGame">
      <h1>사다리 게임</h1>
      {/* <input
        type="number"
        placeholder="참가자 수를 입력하세요"
        value={numParticipantsInput}
        onChange={handleNumParticipantsChange}
      /> */}
      {/* <button onClick={generateLadder}>사다리 생성</button> */}
      {renderParticipantsBottom()}
      <div className="ladder-container">
        {participants.length > 0 && (
          <>
            <div className="ladder" ref={ladderRef}>
              {ladder.map((row, rowIndex) => (
                <div key={rowIndex} className="ladder-row">
                  {participants.slice(0, -1).map((_, colIndex) => (
                    <div key={colIndex} className="ladder-segment">
                      {row[colIndex] && <div className="ladder-bridge"></div>}
                    </div>
                  ))}
                  {drawHighlight()}
                </div>
              ))}
            </div>
            <div className="participants top">
              {participants.map((p, i) => (
                <div key={i} className="participant">
                  {p}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {result !== null && (
        <div className="result">결과: {participants[result]}</div>
      )}
    </div>
  );
}
Ladder.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    callUsage: PropTypes.number.isRequired,
    dataUsage: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Ladder;
