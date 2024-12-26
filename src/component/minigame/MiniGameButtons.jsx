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
  const [gameMode, setGameMode] = useState("ROULETTE");

  let body = null;

  //@ todo - 미니게임용 창 만들기
  if (gameMode === "ATTENDANCE") {
    body = <Attendance></Attendance>;
  } else if (gameMode === "ROULETTE") {
    body = <Roulette></Roulette>;
  } else if (gameMode === "LADDER") {
    body = <Ladder></Ladder>;
  } else if (gameMode === "EXCHANGESHOP") {
    body = <ExchangeShop></ExchangeShop>;
  }

  const openModal = () => {
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
      height: "600px",
      marginLeft: "0 auto",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      padding: "20px",
    },
  };

  return (
    <>
      <ul className="mini-games">
        {games.map((game) => (
          <li key={game.id} className="game" alt="game.name">
            <a onClick={openModal}>
              <img src={game.img} alt={game.name} />
              {/* {game.name} */}
            </a>
          </li>
        ))}
      </ul>
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
  games: PropTypes.array,
};

export default MiniGameButtons;
