import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import PropTypes from "prop-types";

function Roulette() {
  const apiUserUrl = "http://localhost:3000/userList/";

  const data = [
    { id: 1, option: 10 },
    { id: 2, option: 5 },
    { id: 3, option: 50 },
    { id: 4, option: 30 },
    { id: 5, option: 40 },
    { id: 6, option: 20 },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [member, setMember] = useState(null); // 회원 정보
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

  if (loading) return <p>로딩 중...</p>;
  if (!member) return <p>회원 정보를 불러올 수 없습니다.</p>;

  const handleSpinClick = () => {
    if (mustSpin === true) {
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleResult = async (resultPoint) => {
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
          // amount: 후원(+1) 또는 강탈(-1) 여부
          // parsedAmount: 입력된 포인트 값
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
      alert(`${resultPoint} 포인트를 획득하였습니다.`); // 성공 메시지 추가
    } catch (error) {
      console.error("포인트 업데이트 실패:", error);
      alert("포인트 업데이트에 실패했습니다.");
    }
  };

  return (
    <>
      {loading ? (
        <p>로딩 중...</p>
      ) : !member ? (
        <p>회원 정보를 불러올 수 없습니다.</p>
      ) : (
        <div align="center">
          <h1 align="center">Roulette Game</h1>
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
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={["#f2f2f2"]}
            outerBorderWidth={[25]}
            innerBorderColor={["#f2f2f2"]}
            radiusLineColor={["#dedede"]}
            radiusLineWidth={[10]}
            textColors={["#ffffff"]}
            fontSize={[50]}
            perpendicularText={[true]}
            backgroundColors={[
              "#F22B35",
              "#F99533",
              "#24CA69",
              "#514E50",
              "#46AEFF",
              "#9145B7",
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              alert(data[prizeNumber].option);
              handleResult(data[prizeNumber].option);
            }}
          />
          <button className="button2" onClick={handleSpinClick}>
            SPIN
          </button>
          <br />
          {/* {!mustSpin ? data[prizeNumber].option : "0"} */}
          <hr />
        </div>
      )}
    </>
  );
}

export default Roulette;
