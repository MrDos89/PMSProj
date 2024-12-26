import React, { useState, useEffect, useRef } from "react";
import "../../cssall/Ladder.css";

function Ladder() {
  const [participants, setParticipants] = useState([]);
  const [ladder, setLadder] = useState([]);
  const [result, setResult] = useState(null);
  const [numParticipantsInput, setNumParticipantsInput] = useState("");

  const [highlightPath, setHighlightPath] = useState(null);
  const ladderRef = useRef(null);

  const handleNumParticipantsChange = (event) => {
    setNumParticipantsInput(event.target.value);
  };

  const generateLadder = () => {
    const numParticipants = parseInt(numParticipantsInput, 10);
    if (isNaN(numParticipants) || numParticipants < 2) {
      alert("2명 이상 입력해주세요.");
      return;
    }

    const newParticipants = Array.from(
      { length: numParticipants },
      (_, i) => `참가자 ${i + 1}`
    );
    setParticipants(newParticipants);

    const newLadder = [];
    for (let i = 0; i < numParticipants * 2; i++) {
      newLadder.push(Array(numParticipants - 1).fill(false));
    }

    for (let i = 0; i < newLadder.length; i++) {
      let connected = new Array(numParticipants - 1).fill(false); // 각 세로선이 연결되었는지 추적
      for (let j = 0; j < newLadder[0].length; j++) {
        if (Math.random() < 0.3 && !newLadder[i][j] && !connected[j]) {
          newLadder[i][j] = true;
          connected[j] = true; // 현재 세로선 연결됨 표시
          if (j + 1 < newLadder[0].length) {
            connected[j + 1] = true; // 다음 세로선도 연결됨 표시 (최대 2개 연결)
          }
        }
      }
    }

    setLadder(newLadder);
    setResult(null);
    document.documentElement.style.setProperty(
      "--num-participants",
      numParticipants
    );
  };

  const runLadder = (start) => {
    let current = start;
    const path = [];

    const ladderElement = ladderRef.current;
    if (!ladderElement) return;

    const rowHeight = ladderElement.offsetHeight / ladder.length;
    const numParticipants = participants.length;
    const segmentWidth = ladderElement.offsetWidth / numParticipants;

    // 시작점 x 좌표를 segment의 시작 위치로 조정
    path.push({ x: start * segmentWidth, y: 0 });

    for (let i = 0; i < ladder.length; i++) {
      const prevX = current;

      if (ladder[i][current]) {
        current++;
      } else if (current > 0 && ladder[i][current - 1]) {
        current--;
      }

      if (prevX !== current) {
        // 가로선 시작점과 끝점 x 좌표를 정확하게 계산
        const startX = prevX * segmentWidth;
        const endX = current * segmentWidth;

        path.push({ x: startX, y: i * rowHeight + 12 });
        path.push({ x: endX, y: i * rowHeight + 12 });
      }
      path.push({ x: current * segmentWidth, y: (i + 1) * rowHeight + 12 });
    }

    setResult(current);
    setHighlightPath({ start, end: current, path });
  };

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
      <input
        type="number"
        placeholder="참가자 수를 입력하세요"
        value={numParticipantsInput}
        onChange={handleNumParticipantsChange}
      />
      <button onClick={generateLadder}>사다리 생성</button>
      <div className="ladder-container">
        {participants.length > 0 && (
          <>
            <div className="participants bottom">
              {participants.map((p, i) => (
                <div key={i} className="participant">
                  <button onClick={() => runLadder(i)}>시작</button>
                </div>
              ))}
            </div>
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

export default Ladder;
