//@note - 게임 기능
import "../../cssall/MiniGames.css";
import { useState, useEffect } from "react";
import ReactModal from "react-modal";

import Attendance from "./Attendance";
import Roulette from "./Roulette";
import Ladder from "./Ladder";
import ExchangeShop from "./ExchangeShop";

import PropTypes from "prop-types";

ReactModal.setAppElement("#root");
function MiniGameButtons({ games }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gameMode, setGameMode] = useState("EXCHANGESHOP");

  let body = null;

  //@ todo - 미니게임용 창 만들기
  if (gameMode === "ATTENDANCE") {
    body = <Attendance></Attendance>;
  } else if (gameMode === "ROULETTE") {
    body = <Roulette></Roulette>;
  } else if (gameMode === "LADDER") {
    body = <Ladder></Ladder>;
  } else if (gameMode === "EXCHANGESHOP") {
    // ExchangeShop를 위한 추가 데이터
    const memberData = {
      profileImage: "https://via.placeholder.com/100",
      name: "홍길동",
      phone: "010-1234-5678",
      rank: "Gold",
      points: 1200,
    };

    const productData = [
      {
        company: "4조 카페",
        name: "커피 10% 할인권",
        points: 100,
        image: "../../image/Wasabi Latte.png",
      },
      {
        company: "집게리아",
        name: "햄버거 15% 할인권",
        points: 200,
        image: "../../image/KrustyKrab.jpg",
      },
      {
        company: "HA.MI 돈카츠",
        name: "점심 30% 할인권",
        points: 300,
        image: "../../image/donkatsu2.png",
      },
      {
        company: "벤츠",
        name: "자동차 교환권",
        points: 9999999999999,
        image: "../../image/Benz.jpg",
      },
    ];

    const handleUpdatePoints = (newPoints) => {
      console.log("업데이트된 포인트:", newPoints);
    };

    body = (
      <ExchangeShop
        member={memberData}
        products={productData}
        onUpdatePoints={handleUpdatePoints}
      />
    );
  }

  const openModal = (mode) => {
    setGameMode(mode); // 선택된 게임 모드 설정
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: "1000",
    },
    content: {
      width: "800px",
      height: "650px",
      marginLeft: "0 auto",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      padding: "20px",
    },
  };

  return (
    <>
      {/*<div className="mini-games-container">*/}
      <h2 className="mini-font">도파민 팡팡! 오늘의 포인트는~🎶</h2>
      <ul className="mini-games">
        {games.map((game) => (
          <li key={game.id} className="game" alt="game.name">
            <a onClick={() => openModal(game.mode)}>
              <img src={game.img} alt={game.name} />
              {/* <a onClick={openModal}>
              <img src={game.img} alt={game.name} /> */}
              {/* {game.name} */}
            </a>
          </li>
        ))}
      </ul>
      {/*</div>*/}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {body}
        <button onClick={closeModal}>닫기</button>
      </ReactModal>
    </>
  );
}
MiniGameButtons.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MiniGameButtons;
