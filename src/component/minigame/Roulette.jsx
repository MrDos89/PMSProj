import { useState } from "react";
import { Wheel } from "react-custom-roulette";

function Roulette({ userData }) {
  const data = [
    { id: 1, option: 10 },
    { id: 2, option: -30 },
    { id: 3, option: 50 },
    { id: 4, option: 30 },
    { id: 5, option: 40 },
    { id: 6, option: 20 },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

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
      const requestUrl = `${apiUserUrl}${updatedMember.id}`; // 올바른 URL 생성
      console.log("Request URL:", requestUrl); // 요청 URL 출력 (디버깅)

      const response = await fetch(requestUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // 요청 본문의 데이터 형식을 JSON으로 지정
        },
        body: JSON.stringify({
          points: points + (resultPoint || 0), // 업데이트할 포인트 값
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

      const updatedData = await response.json();
      console.log("API Response Data:", updatedData); // 응답 데이터 출력 (디버깅)
      setUpdatedMember(updatedData);
      onUpdate(updatedData);
      alert("포인트가 업데이트 되었습니다."); // 성공 메시지 추가
    } catch (error) {
      console.error("포인트 업데이트 실패:", error);
      alert("포인트 업데이트에 실패했습니다.");
    }
  };

  return (
    <>
      <div align="center">
        <h1 align="center">Roulette Game</h1>
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
          onStopSpinning={handleResult(data[prizeNumber].option)}
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

export default Roulette;
