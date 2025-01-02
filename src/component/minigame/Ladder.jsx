import React, { useState, useEffect, useRef, useCallback } from "react";
import "../../cssall/Ladder.css";

import PropTypes from "prop-types";

function Ladder() {
  const apiUserUrl = "http://localhost:3000/userList/";

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [participants, setParticipants] = useState([]);
  const [ladder, setLadder] = useState([]);
  const [result, setResult] = useState(null);
  const [currentStart, setCurrentStart] = useState(null);
  // const [numParticipantsInput, setNumParticipantsInput] = useState("");
  // const [start, setStart] = useState(null);
  const [highlightPath, setHighlightPath] = useState(null);
  const ladderRef = useRef(null);

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
        alert(`${resultPoint} 포인트를 획득하였습니다!`); // 성공 메시지 추가
      } catch (error) {
        console.error("포인트 업데이트 실패:", error);
        alert("포인트 업데이트에 실패했습니다.");
      }
    },
    [apiUserUrl, member, participants, result]
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
    <>
      {loading ? (
        <p>로딩 중...</p>
      ) : !member ? (
        <p>회원 정보를 불러올 수 없습니다.</p>
      ) : (
        <div className="ladderGame">
          <h1>사다리 게임</h1>
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
          {renderParticipantsBottom()}
          <div className="ladder-container">
            {participants.length > 0 && (
              <>
                <div className="ladder" ref={ladderRef}>
                  {ladder.map((row, rowIndex) => (
                    <div key={rowIndex} className="ladder-row">
                      {participants.slice(0, -1).map((_, colIndex) => (
                        <div key={colIndex} className="ladder-segment">
                          {row[colIndex] && (
                            <div className="ladder-bridge"></div>
                          )}
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
      )}
    </>
  );
}

export default Ladder;
