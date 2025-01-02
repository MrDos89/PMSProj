import { useState } from "react";
import { Wheel } from "react-custom-roulette";

import PropTypes from "prop-types";

function Roulette({ userData }) {
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

  const [userPoints, setUserPoints] = useState(userData.points);

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
      const requestUrl = `${apiUserUrl}${userData.id}`; // 올바른 URL 생성
      console.log("Request URL:", requestUrl); // 요청 URL 출력 (디버깅)

      const response = await fetch(requestUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // 요청 본문의 데이터 형식을 JSON으로 지정
        },
        body: JSON.stringify({
          points: Number(userData.points) + Number(resultPoint || 0), // 업데이트할 포인트 값
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

      setUserPoints(resultPoint);

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
      <div align="center">
        <h1 align="center">Roulette Game</h1>
        <div className="member-info">
          <img
            src={userData.photo}
            alt={`${userData.name} 프로필`}
            className="profile-image"
          />
          <div className="text-info">
            <p>
              <strong>이름:</strong> {userData.name}
            </p>
            <p>
              <strong>전화번호:</strong> {userData.phone}
            </p>
            <p>
              <strong>등급:</strong>{" "}
              {userData.isAdmin
                ? "신"
                : userData.grade === 3
                ? "VIP 회원"
                : userData.grade === 2
                ? "GOLD 회원"
                : userData.grade === 1
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
        {!mustSpin ? data[prizeNumber].option : "0"}
        <hr />
      </div>
    </>
  );
}
Roulette.propTypes = {
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

export default Roulette;
